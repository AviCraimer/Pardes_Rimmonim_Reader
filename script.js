(async function () {
    // ---- table-of-contents toggle ----
    // Mobile (≤760px): the nav is an overlay drawer, toggled by `nav-open`.
    // Wider screens: the nav is a grid column that can be collapsed with
    // `nav-collapsed`; the reading column resizes, nothing overlaps.
    // Wired before the data loads so the button works immediately.
    const MOBILE = window.matchMedia("(max-width: 760px)");
    const COLLAPSE_KEY = "pr-nav-collapsed";
    try {
        if (localStorage.getItem(COLLAPSE_KEY) === "1") {
            document.body.classList.add("nav-collapsed");
        }
    } catch (e) {}
    const menuBtn = document.getElementById("menu-btn");
    function syncMenuBtn() {
        const expanded = MOBILE.matches
            ? document.body.classList.contains("nav-open")
            : !document.body.classList.contains("nav-collapsed");
        menuBtn.setAttribute("aria-expanded", String(expanded));
    }
    menuBtn.addEventListener("click", function () {
        if (MOBILE.matches) {
            document.body.classList.toggle("nav-open");
        } else {
            const collapsed = document.body.classList.toggle("nav-collapsed");
            try {
                localStorage.setItem(COLLAPSE_KEY, collapsed ? "1" : "0");
            } catch (e) {}
        }
        syncMenuBtn();
    });
    MOBILE.addEventListener("change", syncMenuBtn);
    syncMenuBtn();

    // ---- data loading ----
    const [resp, heResp, lexResp, aliasResp] = await Promise.all([
        fetch("translation.json"),
        fetch("Pardes_Rimmonim.json"),
        fetch("lexicon.json"),
        // aliases.json is optional: a missing/invalid file must not break the app.
        fetch("aliases.json").catch(() => null),
    ]);
    const DATA = await resp.json();
    const HEB = await heResp.json();
    const LEX = await lexResp.json();
    let ALIASES = { aliases: {} };
    if (aliasResp && aliasResp.ok) {
        try {
            ALIASES = await aliasResp.json();
        } catch (e) {
            console.warn("aliases.json present but could not be parsed:", e);
        }
    }

    // The table of contents (gate titles, descriptions, chapter summaries)
    // lives in translation.json under `gates`, beside the text itself.
    DATA.index = DATA.gates.map((g) => g.chapters);
    const META = DATA;

    let curG = 0,
        curC = 0,
        curView = "chapter", // "chapter" | "lex"
        curLex = null; // id of the open lexicon entry

    function getChapter(g, c) {
        return DATA.text[g][c];
    }
    function getHebrewChapter(g, c) {
        return HEB.versions[0].text[g][c];
    }

    // ---- lexicon surface-form map ----
    // Each surface form resolves to ONE lexicon entry. When several entries claim
    // the same form, the more deliberate claim wins: aliases.json (3) > a key of
    // an entry's `surfaceForms` (2) > a form logged in a decision (1). Between
    // equal claims the later entry wins.
    const FORM_MAP = new Map(); // surfaceForm string → entry key
    const FORM_RANK = new Map(); // surfaceForm string → rank of the winning claim
    function claimForm(form, key, rank) {
        const f = (form || "").trim();
        if (!f) return;
        if (rank >= (FORM_RANK.get(f) || 0)) {
            FORM_MAP.set(f, key);
            FORM_RANK.set(f, rank);
        }
    }

    // The reader-facing rendering recorded for one particular form, if any.
    function formGloss(entry, form) {
        const sf = entry.surfaceForms && entry.surfaceForms[form];
        return (sf && (sf.readerGloss || sf.prefer)) || "";
    }

    for (const [key, entry] of Object.entries(LEX.entries)) {
        if (entry.public === false) continue;
        // Forms the lexicon asks us never to highlight for this entry
        // (ambiguous everyday words, e.g. עלה "cause" vs. "went up").
        const hidden = new Set(entry.hideForms || []);
        // A "cluster" entry groups unrelated names and idioms. Its popup is
        // headed by the clicked form, so only forms that carry their own
        // rendering are highlighted, and its decision log is not used.
        const isCluster = entry.cluster === true;

        if (!isCluster && entry.candidates) {
            for (const cand of entry.candidates) {
                for (const dec of cand.decisions || []) {
                    if (!dec.surfaceForm) continue;
                    for (const form of dec.surfaceForm.split(" / ")) {
                        const f = form.trim();
                        if (f && !hidden.has(f)) claimForm(f, key, 1);
                    }
                }
            }
        }
        if (entry.surfaceForms) {
            for (const sf of Object.keys(entry.surfaceForms)) {
                if (hidden.has(sf)) continue;
                if (isCluster && !formGloss(entry, sf)) continue;
                claimForm(sf, key, 2);
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
            for (const form of forms) claimForm(form, key, 3);
        }
    }

    // Split forms: multi-word phrases stay substring-matched (long & distinctive);
    // single-word forms go through boundary-aware token matching to avoid matching
    // inside unrelated words (e.g. קו inside מקום).
    // Whole Hebrew tokens that must never be highlighted, however they would
    // otherwise resolve (e.g. כדין "then", which looks like כ + דין "judgment").
    // Optional top-level list in lexicon.json.
    const SKIP_TOKENS = new Set(LEX.skipTokens || []);

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

    // ---- lexicon highlighting ----
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
                    ranges.push({ start: idx, end, entryKey: FORM_MAP.get(form), form });
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
                span.dataset.form = r.form;
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

    function el(tag, cls, text) {
        const node = document.createElement(tag);
        node.className = cls;
        node.textContent = text;
        return node;
    }

    // Which English rendering to show for the clicked form:
    //  1. the form's own rendering (surfaceForms[form].readerGloss, else .prefer);
    //  2. the sense under which the form is logged, when that is not the
    //     entry's main sense (e.g. "parchment" beside the main sense "curtain");
    //  3. the entry's readerGloss;
    //  4. the entry's first preferred candidate.
    function resolveRendering(entry, form) {
        const cands = entry.candidates || [];
        const first = cands.find((c) => c.status === "preferred") || null;
        const own = formGloss(entry, form);
        if (own) return { target: own, gloss: "" };
        const logged = cands.find(
            (c) =>
                c.status !== "rejected" &&
                (c.decisions || []).some((d) =>
                    (d.surfaceForm || "").split(" / ").some((f) => f.trim() === form)
                )
        );
        if (logged && logged !== first) {
            return { target: logged.target, gloss: logged.gloss || "" };
        }
        if (entry.readerGloss) return { target: entry.readerGloss, gloss: "" };
        if (first) return { target: first.target, gloss: first.gloss || "" };
        return { target: "", gloss: "" };
    }

    function showPopup(lexSpan) {
        if (!popup.hidden && activeMarkEl === lexSpan) {
            dismissPopup();
            return;
        }
        activeMarkEl = lexSpan;
        const key = lexSpan.dataset.lex;
        const form = lexSpan.dataset.form || "";
        const entry = LEX.entries[key];
        if (!entry) return;

        const sf = (entry.surfaceForms && entry.surfaceForms[form]) || {};
        const rendering = resolveRendering(entry, form);
        // Only the reader-facing note is ever shown. `entry.notes` is the
        // translator's working record and stays out of the popup.
        const note = sf.readerNote || entry.readerNote || "";

        popup.textContent = "";
        const head = el("div", "lex-popup-head", "");
        if (entry.cluster) {
            head.appendChild(el("span", "lex-hw", form));
        } else {
            head.appendChild(el("span", "lex-hw", entry.headword || form));
            const tl = entry.transliteration;
            if (tl && tl !== "—") head.appendChild(el("span", "lex-tl", tl));
            if (entry.partOfSpeech) head.appendChild(el("span", "lex-pos", entry.partOfSpeech));
        }
        const body = el("div", "lex-popup-body", "");
        if (rendering.target) body.appendChild(el("div", "lex-target", rendering.target));
        if (rendering.gloss && !note) body.appendChild(el("div", "lex-gloss", rendering.gloss));
        if (note) body.appendChild(el("div", "lex-notes", note));
        popup.appendChild(head);
        popup.appendChild(body);

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

    // ---- translation status ----
    // A chapter is translated when every paragraph that has Hebrew text has
    // English text. (Empty Hebrew paragraphs, e.g. where a printed diagram
    // stood, need no translation.) A gate is translated when all its
    // chapters are.
    const hasText = (s) => !!s && s.replace(/<[^>]*>/g, "").trim() !== "";
    function isChapterTranslated(g, c) {
        const en = DATA.text[g][c] || [];
        const he = getHebrewChapter(g, c) || [];
        const n = Math.max(en.length, he.length);
        for (let p = 0; p < n; p++) {
            if (hasText(he[p]) && !hasText(en[p])) return false;
        }
        return true;
    }
    // Chapters with no English at all are not linked from the nav.
    // Partly translated chapters stay clickable (but faint).
    function hasAnyEnglish(g, c) {
        return (DATA.text[g][c] || []).some(hasText);
    }
    function isGateTranslated(g) {
        return DATA.text[g].every((_, c) => isChapterTranslated(g, c));
    }

    // ---- navigation ----
    function renderNav() {
        const nav = document.getElementById("nav");
        nav.innerHTML =
            '<div class="brand"><div class="he">' +
            META.heTitle +
            '</div><div class="en">' +
            META.title +
            "</div></div>" +
            '<div class="nav-tabs" role="tablist">' +
            '<button role="tab" data-tab="toc" aria-controls="toc-panel">TOC</button>' +
            '<button role="tab" data-tab="lex" aria-controls="lex-panel">Lexicon</button>' +
            "</div>" +
            '<div class="nav-panel" id="toc-panel" role="tabpanel"></div>' +
            '<div class="nav-panel" id="lex-panel" role="tabpanel" hidden></div>';
        nav.querySelectorAll(".nav-tabs button").forEach((b) =>
            b.addEventListener("click", () => setTab(b.dataset.tab))
        );
        const tocPanel = document.getElementById("toc-panel");
        META.index.forEach((gate, g) => {
            const det = document.createElement("details");
            if (g === 0) det.open = true;
            if (!isGateTranslated(g)) det.classList.add("untranslated");
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
                if (!isChapterTranslated(g, c)) row.classList.add("untranslated");
                const linkable = hasAnyEnglish(g, c);
                if (!linkable) {
                    row.classList.add("disabled");
                    row.setAttribute("aria-disabled", "true");
                    row.title = "Not yet translated";
                }
                row.tabIndex = linkable ? 0 : -1;
                row.dataset.g = g;
                row.dataset.c = c;
                row.innerHTML =
                    "<span>" +
                    (c + 1) +
                    ".</span> " +
                    (label
                        ? '<span class="clab">' + label + "</span>"
                        : "Chapter " + (c + 1));
                if (linkable) row.onclick = () => open(g, c);
                if (linkable) row.onkeydown = (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        open(g, c);
                    }
                };
                det.appendChild(row);
            });
            tocPanel.appendChild(det);
        });
        renderLexNav();
        setTab("toc");
    }

    function setTab(tab) {
        document.querySelectorAll(".nav-tabs button").forEach((b) =>
            b.setAttribute("aria-selected", String(b.dataset.tab === tab))
        );
        document.getElementById("toc-panel").hidden = tab !== "toc";
        document.getElementById("lex-panel").hidden = tab !== "lex";
    }

    // ---- next chapter button ----
    function nextChapterButton(g, c) {
        let ng = g, nc = c + 1;
        if (nc >= DATA.text[g].length) {
            ng = g + 1;
            nc = 0;
        }
        if (ng >= DATA.text.length) return "";
        if (!hasAnyEnglish(ng, nc)) return "";
        return '<button class="next-ch-btn" data-g="' + ng + '" data-c="' + nc + '">' +
            META.sectionNames[0] + " " + (ng + 1) + ": " + META.gates[ng].title +
            " · " + META.sectionNames[1] + " " + (nc + 1) + " &rarr;</button>";
    }

    // ---- deep links ----
    // URL fragment uses the notes' citation style, 1-indexed:
    //   #8:4   → Gate 8, chapter 4
    //   #8:4:6 → same, scrolled to paragraph 6
    // "." is accepted as a separator too (#8.4.6).
    function parseHash(hash) {
        const m = /^#?(\d+)[:.](\d+)(?:[:.](\d+))?$/.exec(
            decodeURIComponent(hash || "")
        );
        if (!m) return null;
        const g = +m[1] - 1,
            c = +m[2] - 1,
            p = m[3] ? +m[3] - 1 : null;
        if (!DATA.text[g] || !DATA.text[g][c]) return null;
        return { g, c, p };
    }
    function chapterHash(g, c) {
        return "#" + (g + 1) + ":" + (c + 1);
    }

    function scrollToPara(p) {
        const sheet = document.getElementById("sheet");
        sheet.querySelectorAll(".para.targeted").forEach((n) =>
            n.classList.remove("targeted")
        );
        const target = sheet.querySelector('.para[data-p="' + p + '"]');
        if (!target) return;
        target.classList.add("targeted");
        target.scrollIntoView({ block: "start" });
    }

    // ---- open chapter ----
    // opts.updateUrl: push a history entry for this chapter (default true).
    // Set false when the open was itself triggered by the URL.
    function open(g, c, opts) {
        const { updateUrl = true, para = null } = opts || {};
        if (updateUrl && location.hash !== chapterHash(g, c)) {
            history.pushState(null, "", chapterHash(g, c));
        }
        curG = g;
        curC = c;
        curView = "chapter";
        curLex = null;
        dismissPopup();
        setTab("toc");
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
            // Reachable only by a direct link; the nav doesn't link these.
            (hasAnyEnglish(g, c)
                ? ""
                : '<p class="not-translated">This chapter has not been translated yet. ' +
                  "Click a paragraph number to see the Hebrew.</p>") +
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

        document.querySelectorAll(".lex-item.active").forEach((el) =>
            el.classList.remove("active")
        );
        document.querySelectorAll("#toc-panel .chap").forEach((el) => {
            const on = +el.dataset.g === g && +el.dataset.c === c;
            el.classList.toggle("active", on);
            if (on) {
                // Expand this gate in the sidebar so the link target is visible.
                el.closest("details").open = true;
                el.scrollIntoView({ block: "nearest" });
            }
        });
        document.body.classList.remove("nav-open");
        syncMenuBtn();
        document.querySelector("main").scrollTop = 0;
        if (para !== null) scrollToPara(para);
    }

    // ---- lexicon browser ----
    // One list item per public entry. A "cluster" entry is a working group
    // of unrelated names and idioms, so each of its glossed forms is listed
    // as an item of its own (id "key/form").
    // Only items with a reader's note are listed; bare glosses stay in the
    // text popups.
    const HE_ALPHABET = "אבגדהוזחטיכלמנסעפצקרשת";
    const FINAL_TO_REG = { ך: "כ", ם: "מ", ן: "נ", ף: "פ", ץ: "צ" };
    const stripPoints = (s) => (s || "").replace(/[֑-ׇ]/g, "");
    function heInitial(s) {
        const m = /[א-ת]/.exec(stripPoints(s));
        return m ? FINAL_TO_REG[m[0]] || m[0] : "#";
    }
    // English sort key: ignore a leading article, quotes and brackets.
    function enSortKey(s) {
        return (s || "")
            .replace(/^[\s"'“‘(\[]+/, "")
            .replace(/^(the|a|an)\s+/i, "")
            .toLowerCase();
    }

    const LEX_ITEMS = [];
    for (const [key, entry] of Object.entries(LEX.entries)) {
        if (entry.public === false) continue;
        if (entry.cluster) {
            for (const [form, sf] of Object.entries(entry.surfaceForms || {})) {
                const gloss = formGloss(entry, form);
                if (!gloss || !hasText(sf.readerNote)) continue;
                LEX_ITEMS.push({
                    id: key + "/" + form, key, form,
                    he: form, tl: sf.transliteration || "", en: gloss,
                });
            }
        } else {
            if (!hasText(entry.readerNote)) continue;
            const tl = entry.transliteration;
            LEX_ITEMS.push({
                id: key, key, form: null,
                he: entry.headword,
                tl: tl && tl !== "—" ? tl : "",
                en:
                    entry.readerGloss ||
                    ((entry.candidates || []).find((c) => c.status === "preferred") || {})
                        .target ||
                    "",
            });
        }
    }
    const LEX_BY_ID = new Map(LEX_ITEMS.map((it) => [it.id, it]));

    const SORT_KEY = "pr-lex-sort";
    let lexSort = "he";
    try {
        if (localStorage.getItem(SORT_KEY) === "en") lexSort = "en";
    } catch (e) {}

    function renderLexNav() {
        const panel = document.getElementById("lex-panel");
        panel.textContent = "";

        const toggle = document.createElement("div");
        toggle.className = "lex-sort";
        toggle.setAttribute("role", "group");
        toggle.setAttribute("aria-label", "Sort lexicon by");
        for (const [mode, label, title] of [
            ["en", "A", "Sort by English"],
            ["he", "א", "Sort by Hebrew / Aramaic"],
        ]) {
            const b = el("button", "", label);
            b.title = title;
            b.setAttribute("aria-label", title);
            b.setAttribute("aria-pressed", String(lexSort === mode));
            b.addEventListener("click", () => {
                if (lexSort === mode) return;
                lexSort = mode;
                try {
                    localStorage.setItem(SORT_KEY, mode);
                } catch (e) {}
                renderLexNav();
            });
            toggle.appendChild(b);
        }
        panel.appendChild(toggle);

        // Group by initial letter.
        const groups = new Map();
        for (const it of LEX_ITEMS) {
            const letter =
                lexSort === "he"
                    ? heInitial(it.he)
                    : (/[a-z]/.exec(enSortKey(it.en)) || ["#"])[0].toUpperCase();
            if (!groups.has(letter)) groups.set(letter, []);
            groups.get(letter).push(it);
        }
        const order =
            lexSort === "he"
                ? (a, b) => HE_ALPHABET.indexOf(a) - HE_ALPHABET.indexOf(b)
                : (a, b) => (a === "#") - (b === "#") || a.localeCompare(b);
        const itemOrder =
            lexSort === "he"
                ? (a, b) => stripPoints(a.he).localeCompare(stripPoints(b.he), "he")
                : (a, b) => enSortKey(a.en).localeCompare(enSortKey(b.en), "en");

        for (const letter of [...groups.keys()].sort(order)) {
            const det = document.createElement("details");
            det.className = "lex-group";
            const sum = document.createElement("summary");
            const lt = el("span", "lex-letter", letter);
            if (lexSort === "he") lt.dir = "rtl";
            sum.appendChild(lt);
            sum.appendChild(el("span", "lex-count", String(groups.get(letter).length)));
            det.appendChild(sum);
            for (const it of groups.get(letter).sort(itemOrder)) {
                const row = el("div", "chap lex-item", "");
                row.tabIndex = 0;
                row.dataset.id = it.id;
                const he = el("span", "lex-he", it.he);
                he.dir = "rtl";
                he.lang = "he";
                if (lexSort === "he") {
                    if (it.tl) row.appendChild(el("span", "lex-tl-nav", it.tl));
                    row.appendChild(he);
                } else {
                    row.appendChild(el("span", "lex-en-nav", it.en || "—"));
                    row.appendChild(he);
                }
                row.onclick = () => openLex(it.id);
                row.onkeydown = (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openLex(it.id);
                    }
                };
                det.appendChild(row);
            }
            panel.appendChild(det);
        }
        if (curView === "lex" && curLex) markActiveLex(curLex);
    }

    function markActiveLex(id) {
        document.querySelectorAll("#lex-panel .lex-item").forEach((row) => {
            const on = row.dataset.id === id;
            row.classList.toggle("active", on);
            if (on) {
                row.closest("details").open = true;
                row.scrollIntoView({ block: "nearest" });
            }
        });
    }

    function lexHash(id) {
        return "#lex/" + id.split("/").map(encodeURIComponent).join("/");
    }
    function parseLexHash(hash) {
        const m = /^#lex\/(.+)$/.exec(hash || "");
        if (!m) return null;
        let id;
        try {
            id = m[1].split("/").map(decodeURIComponent).join("/");
        } catch (e) {
            return null;
        }
        return LEX_BY_ID.has(id) ? id : null;
    }

    // ---- lexicon entry page ----
    function openLex(id, opts) {
        const { updateUrl = true } = opts || {};
        const it = LEX_BY_ID.get(id);
        if (!it) return;
        if (updateUrl && parseLexHash(location.hash) !== id) {
            history.pushState(null, "", lexHash(id));
        }
        curView = "lex";
        curLex = id;
        dismissPopup();

        const entry = LEX.entries[it.key];
        const sheet = document.getElementById("sheet");
        sheet.textContent = "";
        sheet.appendChild(el("div", "crumb", "Lexicon"));

        const h1 = el("h1", "lex-page-hw", "");
        const hw = el("span", "", it.he);
        hw.dir = "rtl";
        hw.lang = "he";
        h1.appendChild(hw);
        h1.appendChild(el("span", "rule", ""));
        sheet.appendChild(h1);

        const meta = [it.tl, it.form ? "" : entry.partOfSpeech].filter(Boolean);
        if (meta.length) sheet.appendChild(el("div", "lex-page-meta", meta.join(" · ")));
        if (it.en) sheet.appendChild(el("div", "lex-page-target", it.en));

        const note = it.form
            ? (entry.surfaceForms[it.form] || {}).readerNote
            : entry.readerNote;
        if (note) sheet.appendChild(el("p", "lex-page-note", note));

        if (!it.form && entry.etymology) {
            sheet.appendChild(el("h2", "lex-page-h2", "Etymology"));
            sheet.appendChild(el("p", "lex-page-note", entry.etymology));
        }

        // Forms of this entry that carry their own reader-facing text.
        if (!it.form && entry.surfaceForms) {
            const forms = Object.entries(entry.surfaceForms).filter(
                ([, sf]) => sf.readerGloss || sf.readerNote
            );
            if (forms.length) {
                sheet.appendChild(el("h2", "lex-page-h2", "Forms"));
                const dl = el("dl", "lex-forms", "");
                for (const [form, sf] of forms) {
                    const dt = el("dt", "", "");
                    const f = el("span", "lex-he", form);
                    f.dir = "rtl";
                    f.lang = "he";
                    dt.appendChild(f);
                    if (sf.readerGloss) dt.appendChild(el("span", "lex-form-gloss", sf.readerGloss));
                    dl.appendChild(dt);
                    if (sf.readerNote) dl.appendChild(el("dd", "", sf.readerNote));
                }
                sheet.appendChild(dl);
            }
        }

        setTab("lex");
        document.querySelectorAll("#toc-panel .chap.active").forEach((n) =>
            n.classList.remove("active")
        );
        markActiveLex(id);
        document.body.classList.remove("nav-open");
        syncMenuBtn();
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

    // Back/forward buttons and hand-edited URLs.
    window.addEventListener("hashchange", function () {
        const lexId = parseLexHash(location.hash);
        if (lexId) {
            if (!(curView === "lex" && curLex === lexId)) {
                openLex(lexId, { updateUrl: false });
            }
            return;
        }
        const loc = parseHash(location.hash);
        if (!loc) return;
        if (curView === "chapter" && loc.g === curG && loc.c === curC) {
            if (loc.p !== null) scrollToPara(loc.p);
            return;
        }
        open(loc.g, loc.c, { updateUrl: false, para: loc.p });
    });

    renderNav();
    const initial = parseHash(location.hash);
    const initialLex = parseLexHash(location.hash);
    if (initialLex) {
        openLex(initialLex, { updateUrl: false });
    } else if (initial) {
        open(initial.g, initial.c, { updateUrl: false, para: initial.p });
    } else {
        open(0, 0, { updateUrl: false });
    }
})();
