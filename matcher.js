// Lexicon matching, shared by the page (script.js) and the background worker
// that counts occurrences (occurrences-worker.js), so that counts always agree
// with the highlights a reader sees.

// createMatcher(formMap, skipTokens)
//   formMap:    Map surface form → lexicon entry key (already resolved)
//   skipTokens: whole Hebrew tokens never highlighted
// Returns { computeRanges, lookupToken }.
function createMatcher(formMap, skipTokens) {
    // Split forms: multi-word phrases stay substring-matched (long & distinctive);
    // single-word forms go through boundary-aware token matching to avoid matching
    // inside unrelated words (e.g. קו inside מקום).
    const SKIP_TOKENS = new Set(skipTokens || []);
    const PHRASE_FORMS = [];
    const WORD_FORMS = new Map();
    for (const [form, key] of formMap) {
        if (/\s/.test(form)) PHRASE_FORMS.push(form);
        else WORD_FORMS.set(form, key);
    }
    PHRASE_FORMS.sort((a, b) => b.length - a.length);

    // Conservative Hebrew affixes. Bare ם/ן are intentionally excluded as suffixes
    // (they would re-admit false positives like מקום → מ + קו + ם).
    const PREFIX_SET = new Set(["ו", "ה", "ב", "כ", "ל", "מ", "ש", "ד"]);
    const SUFFIXES = ["ים", "ות", "יו", "יה", "נו", "כם", "הם", "ין", "י", "ך", "ה", "ת"];

    // Resolve a single Hebrew word token to a lexicon entry, allowing up to two
    // stacked proclitic prefixes and one inflectional suffix. Whole-token / longest
    // stem is tested first so the longest legitimate form wins. Returns
    // { key, form } — `form` is the lexicon form that matched — or null.
    function lookupToken(token) {
        const hit = (form) => ({ key: WORD_FORMS.get(form), form });
        if (WORD_FORMS.has(token)) return hit(token);
        for (let p = 0; p <= 2; p++) {
            const prefix = token.slice(0, p);
            if (p > 0 && ![...prefix].every((ch) => PREFIX_SET.has(ch))) break;
            const rest = token.slice(p);
            if (rest.length < 2) continue;
            if (WORD_FORMS.has(rest)) return hit(rest);
            for (const suf of SUFFIXES) {
                if (rest.length > suf.length + 1 && rest.endsWith(suf)) {
                    const stem = rest.slice(0, rest.length - suf.length);
                    if (stem.length >= 2 && WORD_FORMS.has(stem)) return hit(stem);
                }
            }
        }
        return null;
    }

    // Hebrew "word" characters: Hebrew letters plus geresh/gershayim and ASCII
    // quotes, so abbreviations like א"א / סת"ר tokenize as a single unit.
    const HEB_WORD_RE = /[א-ת׳״"']+/g;

    // Compute highlight ranges for one text-node string. Returns sorted,
    // non-overlapping [{start, end, entryKey, form}].
    function computeRanges(text) {
        const ranges = [];
        const taken = (s, e) => ranges.some((r) => s < r.end && e > r.start);

        // 1) Multi-word phrases first (longest-first, non-overlapping).
        for (const form of PHRASE_FORMS) {
            let idx = 0;
            while ((idx = text.indexOf(form, idx)) !== -1) {
                const end = idx + form.length;
                if (!taken(idx, end)) {
                    ranges.push({ start: idx, end, entryKey: formMap.get(form), form });
                }
                idx = end;
            }
        }

        // 2) Single-word tokens via boundary-aware lookup.
        let m;
        HEB_WORD_RE.lastIndex = 0;
        while ((m = HEB_WORD_RE.exec(text)) !== null) {
            const start = m.index;
            const end = start + m[0].length;
            if (taken(start, end)) continue;
            if (SKIP_TOKENS.has(m[0])) continue;
            const hit = lookupToken(m[0]);
            if (hit) ranges.push({ start, end, entryKey: hit.key, form: hit.form });
        }

        ranges.sort((a, b) => a.start - b.start);
        return ranges;
    }

    return { computeRanges, lookupToken };
}

// countOccurrences(computeRanges, hebrewText, clusterKeys)
//   hebrewText:  [gate][chapter][paragraph] HTML strings
//   clusterKeys: entry keys of cluster entries (counted per form, "key/form")
// Returns a plain (JSON-safe) object:
//   { itemId: { total, gates: [[g, total, [[c, n, firstP], ...]], ...] } }
// Gates and chapters are in book order; zero counts are absent.
function countOccurrences(computeRanges, hebrewText, clusterKeys) {
    const clusters = new Set(clusterKeys);
    const out = {};
    hebrewText.forEach((gate, g) => {
        gate.forEach((chapter, c) => {
            chapter.forEach((html, p) => {
                if (!html) return;
                // Drop images; turn other tags into a separator so that, as in
                // the highlighter (which walks text nodes), no match spans a
                // tag boundary.
                const text = html.replace(/<img[^>]*>/g, "").replace(/<[^>]*>/g, "\u0001");
                for (const r of computeRanges(text)) {
                    const id = clusters.has(r.entryKey) ? r.entryKey + "/" + r.form : r.entryKey;
                    const o = out[id] || (out[id] = { total: 0, gates: [] });
                    o.total++;
                    let og = o.gates[o.gates.length - 1];
                    if (!og || og[0] !== g) o.gates.push((og = [g, 0, []]));
                    og[1]++;
                    const oc = og[2][og[2].length - 1];
                    if (oc && oc[0] === c) oc[1]++;
                    else og[2].push([c, 1, p]);
                }
            });
        });
    });
    return out;
}

// Make the functions available to a worker's importScripts and to Node.
if (typeof module !== "undefined") module.exports = { createMatcher, countOccurrences };
