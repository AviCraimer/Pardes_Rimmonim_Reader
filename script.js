(async function () {
    // ---- data loading ----
    const [resp, heResp, lexResp, idxResp, aliasResp] = await Promise.all([
        fetch("translation.json"),
        fetch("Pardes_Rimmonim.json"),
        fetch("lexicon.json"),
        fetch("index.json"),
        // aliases.json is optional: a missing/invalid file must not break the app.
        fetch("aliases.json").catch(() => null),
    ]);
    const DATA = await resp.json();
    const HEB = await heResp.json();
    const LEX = await lexResp.json();
    const IDX = await idxResp.json();
    let ALIASES = { aliases: {} };
    if (aliasResp && aliasResp.ok) {
        try {
            ALIASES = await aliasResp.json();
        } catch (e) {
            console.warn("aliases.json present but could not be parsed:", e);
        }
    }

    DATA.index = IDX.gates.map((g) => g.chapters);
    DATA.gates = IDX.gates;
    const META = DATA;

    let curG = 0,
        curC = 0;

    function getChapter(g, c) {
        return DATA.text[g][c];
    }
    function getHebrewChapter(g, c) {
        return HEB.versions[0].text[g][c];
    }

    // ---- lexicon surface-form map ----
    const FORM_MAP = new Map(); // surfaceForm string → entry key
    for (const [key, entry] of Object.entries(LEX.entries)) {
        if (entry.candidates) {
            for (const cand of entry.candidates) {
                if (cand.decisions) {
                    for (const dec of cand.decisions) {
                        if (dec.surfaceForm) {
                            for (const form of dec.surfaceForm.split(" / ")) {
                                const f = form.trim();
                                if (f) FORM_MAP.set(f, key);
                            }
                        }
                    }
                }
            }
        }
        if (entry.surfaceForms) {
            for (const sf of Object.keys(entry.surfaceForms)) {
                FORM_MAP.set(sf, key);
            }
        }
    }

    // Merge extra forms from the standalone aliases.json. Kept separate so that
    // regenerating lexicon.json (whole-file updates) never loses hand-added forms.
    if (ALIASES.aliases) {
        for (const [key, spec] of Object.entries(ALIASES.aliases)) {
            if (!LEX.entries[key]) {
                console.warn(
                    'aliases.json: entry key "' + key + '" not found in lexicon.json'
                );
                continue;
            }
            const forms = (spec && spec.forms) || [];
            for (const form of forms) {
                const f = (form || "").trim();
                if (f) FORM_MAP.set(f, key);
            }
        }
    }

    // Split forms: multi-word phrases stay substring-matched (long & distinctive);
    // single-word forms go through boundary-aware token matching to avoid matching
    // inside unrelated words (e.g. קו inside מקום).
    const PHRASE_FORMS = [];
    const WORD_FORMS = new Map();
    for (const [form, key] of FORM_MAP) {
        if (/\s/.test(form)) PHRASE_FORMS.push(form);
        else WORD_FORMS.set(form, key);
    }
    PHRASE_FORMS.sort((a, b) => b.length - a.length);

    // Conservative Hebrew affixes. Bare ם/ן are intentionally excluded as suffixes
    // (they would re-admit false positives like מקום → מ + קו + ם).
    const PREFIX_SET = new Set(["ו", "ה", "ב", "כ", "ל", "מ", "ש", "ד"]);
    const SUFFIXES = ["ים", "ות", "יו", "יה", "נו", "כם", "הם", "ין", "י", "ך", "ה", "ת"];

    // Resolve a single Hebrew word token to a lexicon entry key, allowing up to two
    // stacked proclitic prefixes and one inflectional suffix. Whole-token / longest
    // stem is tested first so the longest legitimate form wins.
    function lookupToken(token) {
        if (WORD_FORMS.has(token)) return WORD_FORMS.get(token);
        for (let p = 0; p <= 2; p++) {
            const prefix = token.slice(0, p);
            if (p > 0 && ![...prefix].every((ch) => PREFIX_SET.has(ch))) break;
            const rest = token.slice(p);
            if (rest.length < 2) continue;
            if (WORD_FORMS.has(rest)) return WORD_FORMS.get(rest);
            for (const suf of SUFFIXES) {
                if (rest.length > suf.length + 1 && rest.endsWith(suf)) {
                    const stem = rest.slice(0, rest.length - suf.length);
                    if (stem.length >= 2 && WORD_FORMS.has(stem)) {
                        return WORD_FORMS.get(stem);
                    }
                }
            }
        }
        return null;
    }

    // ---- lexicon highlighting ----
    // Hebrew "word" characters: Hebrew letters plus geresh/gershayim and ASCII
    // quotes, so abbreviations like א"א / סת"ר tokenize as a single unit.
    const HEB_WORD_RE = /[א-ת׳״"']+/g;

    // Compute highlight ranges for one text-node string. Returns sorted,
    // non-overlapping [{start, end, entryKey}].
    function computeRanges(text) {
        const ranges = [];
        const taken = (s, e) => ranges.some((r) => s < r.end && e > r.start);

        // 1) Multi-word phrases first (longest-first, non-overlapping).
        for (const form of PHRASE_FORMS) {
            let idx = 0;
            while ((idx = text.indexOf(form, idx)) !== -1) {
                const end = idx + form.length;
                if (!taken(idx, end)) {
                    ranges.push({ start: idx, end, entryKey: FORM_MAP.get(form) });
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
            const key = lookupToken(m[0]);
            if (key) ranges.push({ start, end, entryKey: key });
        }

        ranges.sort((a, b) => a.start - b.start);
        return ranges;
    }

    function highlightLexicon(hebDiv) {
        // Walk text nodes so existing markup (e.g. <b> headers) is preserved and
        // we never match inside tags/attributes.
        const walker = document.createTreeWalker(
            hebDiv,
            NodeFilter.SHOW_TEXT,
            null
        );
        const textNodes = [];
        let node;
        while ((node = walker.nextNode())) textNodes.push(node);

        for (const textNode of textNodes) {
            const text = textNode.nodeValue;
            const ranges = computeRanges(text);
            if (!ranges.length) continue;

            const frag = document.createDocumentFragment();
            let cursor = 0;
            for (const r of ranges) {
                if (r.start > cursor) {
                    frag.appendChild(
                        document.createTextNode(text.slice(cursor, r.start))
                    );
                }
                const span = document.createElement("span");
                span.className = "lex-mark";
                span.dataset.lex = r.entryKey;
                span.textContent = text.slice(r.start, r.end);
                frag.appendChild(span);
                cursor = r.end;
            }
            if (cursor < text.length) {
                frag.appendChild(document.createTextNode(text.slice(cursor)));
            }
            textNode.parentNode.replaceChild(frag, textNode);
        }
    }

    // ---- lexicon popup ----
    const popup = document.getElementById("lex-popup");
    let activeMarkEl = null;

    function showPopup(lexSpan) {
        if (!popup.hidden && activeMarkEl === lexSpan) {
            dismissPopup();
            return;
        }
        activeMarkEl = lexSpan;
        const key = lexSpan.dataset.lex;
        const entry = LEX.entries[key];
        if (!entry) return;
        const pref = entry.candidates && entry.candidates.find((c) => c.status === "preferred");

        popup.innerHTML =
            '<div class="lex-popup-head">' +
            '<span class="lex-hw">' + entry.headword + "</span>" +
            '<span class="lex-tl">' + entry.transliteration + "</span>" +
            '<span class="lex-pos">' + entry.partOfSpeech + "</span>" +
            "</div>" +
            '<div class="lex-popup-body">' +
            (pref ? '<div class="lex-target">' + pref.target + "</div>" : "") +
            (pref && pref.gloss ? '<div class="lex-gloss">' + pref.gloss + "</div>" : "") +
            (entry.notes ? '<div class="lex-notes">' + entry.notes + "</div>" : "") +
            "</div>";

        const rect = lexSpan.getBoundingClientRect();
        const popW = 320;
        let left = rect.left + rect.width / 2 - popW / 2;
        left = Math.max(8, Math.min(left, window.innerWidth - popW - 8));
        let top = rect.bottom + 8;
        if (top + 200 > window.innerHeight) {
            top = rect.top - 8;
            popup.style.transform = "translateY(-100%)";
        } else {
            popup.style.transform = "";
        }
        popup.style.left = left + "px";
        popup.style.top = top + "px";
        popup.style.width = popW + "px";
        popup.hidden = false;
    }

    function dismissPopup() {
        popup.hidden = true;
        activeMarkEl = null;
    }

    document.addEventListener("click", function (e) {
        if (!e.target.closest("#lex-popup") && !e.target.closest(".lex-mark")) {
            dismissPopup();
        }
    });

    // ---- Hebrew toggle ----
    function toggleHebrew(paraEl) {
        const existing = paraEl.querySelector(".heb-text");
        if (existing) {
            existing.remove();
            return;
        }
        const p = +paraEl.dataset.p;
        const heParagraphs = getHebrewChapter(curG, curC);
        if (!heParagraphs || !heParagraphs[p]) return;

        const hebDiv = document.createElement("div");
        hebDiv.className = "heb-text";
        hebDiv.innerHTML = heParagraphs[p];
        highlightLexicon(hebDiv);

        // Insert after .pnum, before .en-text
        const enText = paraEl.querySelector(".en-text");
        paraEl.insertBefore(hebDiv, enText);
    }

    // ---- Hebrew numerals ----
    function heNum(n) {
        if (n === 15) return "ט״ו";
        if (n === 16) return "ט״ז";
        const tens = ["", "י", "כ", "ל"],
            ones = "אבגדהוזחט";
        let t = Math.floor(n / 10),
            o = n % 10,
            s = tens[t] + (o ? ones[o - 1] : "");
        return s.length > 1 ? s.slice(0, -1) + "״" + s.slice(-1) : s + "׳";
    }

    // ---- navigation ----
    function renderNav() {
        const nav = document.getElementById("nav");
        nav.innerHTML =
            '<div class="brand"><div class="he">' +
            META.heTitle +
            '</div><div class="en">' +
            META.title +
            "</div></div>";
        META.index.forEach((gate, g) => {
            const det = document.createElement("details");
            if (g === 0) det.open = true;
            const sum = document.createElement("summary");
            const gateInfo = META.gates[g];
            sum.innerHTML =
                '<span class="num">' +
                META.sectionNames[0] +
                " " +
                (g + 1) +
                '</span><span class="gate-title">' +
                gateInfo.title +
                '</span><span class="he">' +
                heNum(g + 1) +
                "</span>";
            det.appendChild(sum);
            gate.forEach((label, c) => {
                const row = document.createElement("div");
                row.className = "chap";
                row.tabIndex = 0;
                row.dataset.g = g;
                row.dataset.c = c;
                row.innerHTML =
                    "<span>" +
                    (c + 1) +
                    ".</span> " +
                    (label
                        ? '<span class="clab">' + label + "</span>"
                        : "Chapter " + (c + 1));
                row.onclick = () => open(g, c);
                row.onkeydown = (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        open(g, c);
                    }
                };
                det.appendChild(row);
            });
            nav.appendChild(det);
        });
    }

    // ---- next chapter button ----
    function nextChapterButton(g, c) {
        let ng = g, nc = c + 1;
        if (nc >= DATA.text[g].length) {
            ng = g + 1;
            nc = 0;
        }
        if (ng >= DATA.text.length) return "";
        return '<button class="next-ch-btn" data-g="' + ng + '" data-c="' + nc + '">' +
            META.sectionNames[0] + " " + (ng + 1) + ": " + META.gates[ng].title +
            " · " + META.sectionNames[1] + " " + (nc + 1) + " &rarr;</button>";
    }

    // ---- open chapter ----
    function open(g, c) {
        curG = g;
        curC = c;
        dismissPopup();
        const paras = getChapter(g, c);
        const sheet = document.getElementById("sheet");
        const gateInfo = META.gates[g];
        const label = META.index[g][c];
        sheet.innerHTML =
            '<div class="crumb">' +
            META.sectionNames[0] +
            " " +
            (g + 1) +
            ": " +
            gateInfo.title +
            " · " +
            META.sectionNames[1] +
            " " +
            (c + 1) +
            "</div>" +
            "<h1>" +
            (label || "Chapter " + (c + 1)) +
            '<span class="rule"></span></h1>' +
            paras
                .map(
                    (p, i) =>
                        '<div class="para" data-p="' +
                        i +
                        '"><span class="pnum">' +
                        (i + 1) +
                        '</span><span class="en-text">' +
                        p +
                        "</span></div>"
                )
                .join("") +
            nextChapterButton(g, c) +
            '<footer class="sheet-footer">' +
            '<p>Hebrew source text from <a href="https://www.sefaria.org/Pardes_Rimmonim?tab=contents" target="_blank" rel="noopener">Sefaria</a>.</p>' +
            '<p class="disclaimer">The English translation was produced by AI and may contain inaccuracies.</p>' +
            "</footer>";

        // Wire next chapter button
        const nextBtn = sheet.querySelector(".next-ch-btn");
        if (nextBtn) {
            nextBtn.addEventListener("click", function () {
                const ng = +nextBtn.dataset.g, nc = +nextBtn.dataset.c;
                open(ng, nc);
            });
        }

        // Wire click handlers for toggle and lexicon
        sheet.querySelectorAll(".en-text").forEach((en) => {
            en.addEventListener("click", function (e) {
                toggleHebrew(en.closest(".para"));
            });
        });
        sheet.querySelectorAll(".para .pnum").forEach((pn) => {
            pn.addEventListener("click", function () {
                toggleHebrew(pn.closest(".para"));
            });
        });

        document.querySelectorAll(".chap").forEach((el) =>
            el.classList.toggle(
                "active",
                +el.dataset.g === g && +el.dataset.c === c
            )
        );
        document.body.classList.remove("nav-open");
        document.querySelector("main").scrollTop = 0;
    }

    // Lexicon mark clicks (delegated — attached once, not per chapter)
    document.getElementById("sheet").addEventListener("click", function (e) {
        const mark = e.target.closest(".lex-mark");
        if (mark) {
            e.stopPropagation();
            showPopup(mark);
        }
    });

    renderNav();
    open(0, 0);
})();
