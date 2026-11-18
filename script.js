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
    // The lexicon is split in two files with the same entry keys:
    // lexicon_translation.json (headword, renderings, candidates, surface
    // forms) and lexicon_reader.json (notes, etymologies, hidden entries,
    // hideForms, extraForms, skipTokens).
    //
    // The Hebrew (Pardes_Rimmonim.json, the largest file by far) is not
    // waited for: the page is drawn from the English and the lexicon, and the
    // Hebrew arrives in the background. Everything that needs it (paragraph
    // Hebrew, highlighting, the In Chapter filter, occurrence counts, exact
    // translation status) checks HEB or waits on hebReady.
    //
    // Likewise the English (translation.json, holding the text and the
    // contents) is not waited for when the page opens on a lexicon entry:
    // only the two lexicon files are. DATA/META are null until it arrives;
    // the TOC, chapters and occurrence lists wait on dataReady.
    let HEB = null;
    let DATA = null;
    let META = null;
    const hebFetch = fetch("Pardes_Rimmonim.json").then((r) => r.json());
    const dataFetch = fetch("translation.json").then((r) => r.json());
    const [lexResp, readerResp] = await Promise.all([
        fetch("lexicon_translation.json"),
        // lexicon_reader.json is optional: a missing/invalid file must not
        // break the app (popups then show renderings without notes).
        fetch("lexicon_reader.json").catch(() => null),
    ]);
    const LEX = await lexResp.json();
    let READER = { entries: {} };
    if (readerResp && readerResp.ok) {
        try {
            READER = await readerResp.json();
        } catch (e) {
            console.warn("lexicon_reader.json present but could not be parsed:", e);
        }
    }
    const READER_ENTRIES = READER.entries || {};
    const hebReady = hebFetch.then((j) => {
        HEB = j;
    });
    hebReady.catch((e) => console.warn("Could not load the Hebrew:", e));
    // The reader record of an entry ({} when it has none).
    function readerOf(key) {
        return READER_ENTRIES[key] || {};
    }
    // The reader's note on one particular form of an entry, if any.
    function formNote(key, form) {
        const forms = readerOf(key).forms;
        return (forms && forms[form] && forms[form].note) || "";
    }

    // The table of contents (gate titles, descriptions, chapter summaries)
    // lives in translation.json under `gates`, beside the text itself.
    const dataReady = dataFetch.then((j) => {
        j.index = j.gates.map((g) => g.chapters);
        DATA = META = j;
    });
    // "Gate" / "Chapter", available before translation.json arrives.
    let pendingOpen = false; // a chapter was asked for before DATA arrived
    const sectionName = (i) =>
        (META && META.sectionNames && META.sectionNames[i]) || ["Gate", "Chapter"][i];

    let curG = 0,
        curC = 0,
        curView = "chapter", // "chapter" | "lex"
        curLex = null; // id of the open lexicon entry

    function getChapter(g, c) {
        return DATA.text[g][c];
    }
    // null until the Hebrew has arrived.
    function getHebrewChapter(g, c) {
        return HEB ? HEB.versions[0].text[g][c] : null;
    }

    // ---- lexicon surface-form map ----
    // Each surface form resolves to ONE lexicon entry. When several entries claim
    // the same form, the more deliberate claim wins: an entry's `extraForms` in
    // lexicon_reader.json (3) > a key of an entry's `surfaceForms` (2) > a form
    // logged in a decision (1). Between equal claims the later entry wins.
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
        return (sf && (sf.rendering || sf.prefer)) || "";
    }

    for (const [key, entry] of Object.entries(LEX.entries)) {
        const rd = readerOf(key);
        if (rd.hidden === true) continue;
        // Forms the lexicon asks us never to highlight for this entry
        // (ambiguous everyday words, e.g. עלה "cause" vs. "went up").
        const hidden = new Set(rd.hideForms || []);
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

    // Merge extra forms (`extraForms` in lexicon_reader.json, formerly
    // aliases.json): hand-added forms that win over any other claim. Like the
    // old aliases they apply even to hidden entries.
    for (const [key, rd] of Object.entries(READER_ENTRIES)) {
        if (!rd || !rd.extraForms) continue;
        if (!LEX.entries[key]) {
            console.warn(
                'lexicon_reader.json: entry key "' + key +
                    '" not found in lexicon_translation.json'
            );
            continue;
        }
        for (const form of rd.extraForms) claimForm(form, key, 3);
    }

    // Whole Hebrew tokens that must never be highlighted, however they would
    // otherwise resolve (e.g. כדין "then", which looks like כ + דין "judgment").
    // Optional top-level list in lexicon_reader.json.
    const SKIP_TOKENS = READER.skipTokens || [];

    // The matching itself lives in matcher.js, shared with the background
    // worker that counts occurrences, so counts always agree with highlights.
    const { computeRanges } = createMatcher(FORM_MAP, SKIP_TOKENS);

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
    //  1. the form's own rendering (surfaceForms[form].rendering, else .prefer);
    //  2. the sense under which the form is logged, when that is not the
    //     entry's main sense (e.g. "parchment" beside the main sense "curtain");
    //  3. the entry's rendering;
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
        if (entry.rendering) return { target: entry.rendering, gloss: "" };
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

        const rendering = resolveRendering(entry, form);
        // Only the reader-facing note (lexicon_reader.json) is ever shown.
        // `entry.notes` is the translator's working record and stays out of
        // the popup.
        const note = formNote(key, form) || readerOf(key).note || "";

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
            recordReading();
            return;
        }
        const p = +paraEl.dataset.p;
        const hebDiv = document.createElement("div");
        hebDiv.className = "heb-text";
        const onIntro = curView === "intro" && curPage === "introduction";
        const fill = () => {
            const heParagraphs = onIntro
                ? HEB && HEB.versions[0].introduction
                : getHebrewChapter(curG, curC);
            if (!heParagraphs || !heParagraphs[p]) {
                hebDiv.remove();
                return;
            }
            hebDiv.classList.remove("heb-loading");
            hebDiv.innerHTML = heParagraphs[p];
            highlightLexicon(hebDiv);
        };
        if (HEB) fill();
        else {
            // The Hebrew is still downloading: hold the place, fill it in later.
            hebDiv.classList.add("heb-loading");
            hebDiv.textContent = "Loading the Hebrew…";
            const g = curG, c = curC;
            hebReady.then(() => {
                if (hebDiv.isConnected && (onIntro || (curG === g && curC === c))) fill();
            });
        }

        // Insert after .pnum, before .en-text
        const enText = paraEl.querySelector(".en-text");
        paraEl.insertBefore(hebDiv, enText);
        recordReading();
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
        // Before the Hebrew arrives: judged on the English alone (every
        // paragraph filled); refined by refreshTranslationStatus().
        if (!HEB) return en.length > 0 && en.every(hasText);
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
    // Re-mark the TOC once the Hebrew is known, without rebuilding it.
    function refreshTranslationStatus() {
        document.querySelectorAll("#toc-panel details").forEach((det, g) =>
            det.classList.toggle("untranslated", !isGateTranslated(g))
        );
        document.querySelectorAll("#toc-panel .chap").forEach((row) =>
            row.classList.toggle(
                "untranslated",
                !isChapterTranslated(+row.dataset.g, +row.dataset.c)
            )
        );
    }

    // ---- navigation ----
    function renderNav() {
        const nav = document.getElementById("nav");
        nav.innerHTML =
            '<div class="nav-tabs" role="tablist">' +
            '<button role="tab" data-tab="toc" aria-controls="toc-panel">TOC</button>' +
            '<button role="tab" data-tab="lex" aria-controls="lex-panel">Lexicon</button>' +
            '<button role="tab" data-tab="gloss" aria-controls="gloss-panel">Glossary</button>' +
            "</div>" +
            '<div class="nav-panel" id="toc-panel" role="tabpanel"></div>' +
            '<div class="nav-panel" id="lex-panel" role="tabpanel" hidden></div>' +
            '<div class="nav-panel" id="gloss-panel" role="tabpanel" hidden></div>';
        nav.querySelectorAll(".nav-tabs button").forEach((b) =>
            b.addEventListener("click", () => {
                setTab(b.dataset.tab);
                // The Glossary tab opens its page; its panel lists the letters.
                if (b.dataset.tab === "gloss" && curView !== "glossary") openGlossary();
            })
        );
        document.getElementById("toc-panel").innerHTML =
            '<p class="nav-loading">Loading contents…</p>';
        renderLexNav();
        setTab("toc");
    }

    // The table of contents: needs translation.json (titles and status).
    function renderToc() {
        const tocPanel = document.getElementById("toc-panel");
        tocPanel.textContent = "";
        // Front matter before the first gate: the transliteration conventions
        // (translation.json → indexNotes) and Cordovero's introduction
        // (translation.json → introduction).
        FRONT_PAGES.forEach((page) => {
            if (page.key === "introduction" && !(DATA.introduction || []).length) return;
            const row = document.createElement("div");
            row.className = "toc-intro";
            row.dataset.page = page.key;
            row.tabIndex = 0;
            row.textContent = page.title;
            row.onclick = () => openIntro({ page: page.key });
            row.onkeydown = (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openIntro({ page: page.key });
                }
            };
            tocPanel.appendChild(row);
        });
        META.index.forEach((gate, g) => {
            const det = document.createElement("details");
            // No gate is open by default: open() opens the current chapter's.
            if (!isGateTranslated(g)) det.classList.add("untranslated");
            // One gate open at a time: opening this one closes the others.
            det.addEventListener("toggle", () => {
                if (!det.open) return;
                tocPanel.querySelectorAll("details[open]").forEach((d) => {
                    if (d !== det) d.open = false;
                });
            });
            const sum = document.createElement("summary");
            const gateInfo = META.gates[g];
            sum.innerHTML =
                '<span class="num">' +
                sectionName(0) +
                " " +
                (g + 1) +
                '</span><span class="gate-title">' +
                gateInfo.title +
                "</span>";
            det.appendChild(sum);
            if (g === GLOSSARY_GATE) {
                // Icon at the right of the Gate 23 row: open the glossary page
                // (without opening or closing the gate).
                const go = el("a", "toc-gloss-btn", "");
                go.href = GLOSS_HASH;
                go.title = "Search and sort all the titles";
                go.setAttribute("aria-label", "Glossary: search and sort all the titles");
                go.innerHTML =
                    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h9M4 11h6M4 16h5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
                    '<circle cx="16.5" cy="14.5" r="3.6" fill="none" stroke="currentColor" stroke-width="2"/>' +
                    '<path d="M19.2 17.2L21.5 19.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
                go.addEventListener("click", (e) => e.stopPropagation());
                sum.appendChild(go);
            }
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
                    if (e.target !== row) return;
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        open(g, c);
                    }
                };
                det.appendChild(row);
                if (g === GLOSSARY_GATE && linkable) addEntryList(det, row, g, c);
            });
            tocPanel.appendChild(det);
        });
    }

    // Gate 23, the Glossary of Titles: each chapter can open a third level
    // listing its entries (the titles), each linking to its paragraph. Each
    // entry is marked in translation.json (see TRANSLATION_CONVENTIONS.md):
    //   <span class="gl-entry-title"><b>Father</b></span>
    //   [<span class="gl-entry-he" …>אב</span>, <em class="gl-entry-tl">av</em>]: …
    // A paragraph that opens with the title marker starts an entry; the
    // paragraphs after it, up to the next one, continue it.
    const GLOSSARY_GATE = 22;
    const ENTRY_RE = /^\s*<span class="gl-entry-title">([\s\S]*?)<\/span>/;
    const ENTRY_HE_RE = /<span class="gl-entry-he"[^>]*>([\s\S]*?)<\/span>/;
    const ENTRY_TL_RE = /<em class="gl-entry-tl">([\s\S]*?)<\/em>/;
    function glossaryEntries(g, c) {
        const out = [];
        (DATA.text[g][c] || []).forEach((html, p) => {
            const m = ENTRY_RE.exec(html || "");
            if (m) out.push({ p, title: textOf(m[1]).trim() });
        });
        return out;
    }
    function addEntryList(det, row, g, c) {
        const entries = glossaryEntries(g, c);
        if (!entries.length) return;
        const list = el("div", "toc-entries", "");
        list.hidden = true;
        const btn = el("button", "chap-toggle", "");
        btn.innerHTML =
            '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 2.5 L12.5 8 L5 13.5 Z" fill="currentColor"/></svg>';
        btn.type = "button";
        btn.setAttribute("aria-expanded", "false");
        btn.setAttribute("aria-label", "Show the titles in this chapter");
        btn.title = entries.length + " titles";
        btn.addEventListener("click", (e) => {
            e.stopPropagation(); // don't open the chapter
            const opening = list.hidden;
            // One chapter's titles open at a time.
            document.querySelectorAll("#toc-panel .toc-entries").forEach((l) => {
                l.hidden = true;
                l.previousElementSibling
                    .querySelector(".chap-toggle")
                    .setAttribute("aria-expanded", "false");
            });
            list.hidden = !opening;
            btn.setAttribute("aria-expanded", String(opening));
        });
        row.appendChild(btn);
        for (const { p, title } of entries) {
            const item = el("div", "toc-entry", title);
            item.tabIndex = 0;
            const go = () => open(g, c, { para: p });
            item.onclick = go;
            item.onkeydown = (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    go();
                }
            };
            list.appendChild(item);
        }
        det.appendChild(list);
    }

    function setTab(tab) {
        document.querySelectorAll(".nav-tabs button").forEach((b) =>
            b.setAttribute("aria-selected", String(b.dataset.tab === tab))
        );
        document.getElementById("toc-panel").hidden = tab !== "toc";
        document.getElementById("lex-panel").hidden = tab !== "lex";
        document.getElementById("gloss-panel").hidden = tab !== "gloss";
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
            sectionName(0) + " " + (ng + 1) + ": " + META.gates[ng].title +
            " · " + sectionName(1) + " " + (nc + 1) + " &rarr;</button>";
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

    const SHEET_FOOTER =
        '<footer class="sheet-footer">' +
        '<p>Hebrew source text from <a href="https://www.sefaria.org/Pardes_Rimmonim?tab=contents" target="_blank" rel="noopener">Sefaria</a>.</p>' +
        '<p>Plain-text editions: <a href="export/index.html">page per gate</a> · ' +
        '<a href="export/Pardes_Rimmonim.html">single page</a> · ' +
        '<a href="export/Pardes_Rimmonim.md">Markdown</a> · ' +
        '<a href="https://github.com/AviCraimer/Pardes_Rimmonim_Reader/releases/download/latest-text/Pardes_Rimmonim.pdf">Print PDF</a> · ' +
        '<a href="https://github.com/AviCraimer/Pardes_Rimmonim_Reader/releases/download/latest-text/Pardes_Rimmonim_mobile.pdf">Mobile PDF</a></p>' +
        '<p class="disclaimer">The English translation was produced by AI and may contain inaccuracies.</p>' +
        "</footer>";

    // ---- front-matter pages: transliteration conventions, introduction ----
    const FRONT_PAGES = [
        { key: "transliteration", hash: "#transliteration", title: "Transliteration Conventions" },
        { key: "introduction", hash: "#introduction", title: "Author's Introduction" },
    ];
    const INTRO_NOTES = ["transliteration"];
    let curPage = null; // key of the open front-matter page
    function frontPageOfHash(hash) {
        return FRONT_PAGES.find((pg) => pg.hash === hash) || null;
    }
    function openIntro(opts) {
        const { updateUrl = true, page: pageKey = "transliteration" } = opts || {};
        if (!DATA) {
            dataReady.then(() => openIntro(opts));
            return;
        }
        const page = FRONT_PAGES.find((pg) => pg.key === pageKey) || FRONT_PAGES[0];
        if (updateUrl && location.hash !== page.hash) {
            history.pushState(null, "", page.hash);
        }
        recordReading(); // remember the spot in the chapter being left
        curView = "intro";
        curPage = page.key;
        curLex = null;
        dismissPopup();
        setTab("toc");
        const sheet = document.getElementById("sheet");
        const crumb = '<div class="crumb">' + (META.title || "Pardes Rimmonim") + "</div>";
        let body, next;
        if (page.key === "introduction") {
            body = (DATA.introduction || [])
                .map(
                    (p, i) =>
                        '<div class="para" data-p="' + i + '"><span class="pnum">' + (i + 1) +
                        '</span><span class="en-text">' + p + "</span></div>"
                )
                .join("");
            next = nextChapterButton(0, -1);
        } else {
            const notes = META.indexNotes || {};
            body =
                '<div class="intro-notes">' +
                INTRO_NOTES.filter((k) => notes[k])
                    .map((k) => (/^\s*<p[\s>]/.test(notes[k]) ? notes[k] : "<p>" + notes[k] + "</p>"))
                    .join("") +
                "</div>";
            next = (DATA.introduction || []).length
                ? '<button class="next-ch-btn" data-page="introduction">Author\'s Introduction &rarr;</button>'
                : nextChapterButton(0, -1);
        }
        sheet.innerHTML = crumb + "<h1>" + page.title + '<span class="rule"></span></h1>' + body + next + SHEET_FOOTER;
        const nextBtn = sheet.querySelector(".next-ch-btn");
        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                if (nextBtn.dataset.page) openIntro({ page: nextBtn.dataset.page });
                else open(+nextBtn.dataset.g, +nextBtn.dataset.c);
            });
        }
        if (page.key === "introduction") {
            sheet.querySelectorAll(".para .en-text, .para .pnum").forEach((n) =>
                n.addEventListener("click", () => toggleHebrew(n.closest(".para")))
            );
        }
        document.querySelectorAll("#toc-panel .chap.active, .lex-item.active, #toc-panel .toc-intro.active").forEach((n) =>
            n.classList.remove("active")
        );
        const row = document.querySelector('#toc-panel .toc-intro[data-page="' + page.key + '"]');
        if (row) row.classList.add("active");
        document.body.classList.remove("nav-open");
        syncMenuBtn();
        document.querySelector("main").scrollTop = 0;
    }

    // ---- open chapter ----
    // opts.updateUrl: push a history entry for this chapter (default true).
    // Set false when the open was itself triggered by the URL.
    function open(g, c, opts) {
        // opts.restore: return to where the reader left this chapter (scroll
        // position and open Hebrew paragraphs), if it is the last one read.
        const { updateUrl = true, para = null, restore = false } = opts || {};
        if (!DATA) {
            // Reached before the English has arrived (e.g. the back button on
            // a lexicon page opened directly): open once it has.
            const sheet = document.getElementById("sheet");
            sheet.innerHTML = '<p class="sheet-loading">Loading…</p>';
            curView = "chapter";
            pendingOpen = true;
            dataReady.then(() => open(g, c, opts));
            return;
        }
        if (updateUrl && location.hash !== chapterHash(g, c)) {
            history.pushState(null, "", chapterHash(g, c));
        }
        curG = g;
        curC = c;
        curView = "chapter";
        const chapterChanged = !lastChapter || lastChapter.g !== g || lastChapter.c !== c;
        const resume = restore && !chapterChanged ? lastChapter : null;
        lastChapter = { g, c };
        saveLastChapter();
        if (lexInChapter && chapterChanged) renderLexNav();
        curLex = null;
        dismissPopup();
        setTab("toc");
        const paras = getChapter(g, c);
        const sheet = document.getElementById("sheet");
        const gateInfo = META.gates[g];
        const label = META.index[g][c];
        sheet.innerHTML =
            '<div class="crumb">' +
            sectionName(0) +
            " " +
            (g + 1) +
            ": " +
            gateInfo.title +
            " · " +
            sectionName(1) +
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
            SHEET_FOOTER;

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

        document.querySelectorAll(".lex-item.active, #toc-panel .toc-intro.active").forEach((el) =>
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
        else if (resume) resumeReading(resume);
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
        const rd = readerOf(key);
        if (rd.hidden === true) continue;
        if (entry.cluster) {
            for (const [form, sf] of Object.entries(entry.surfaceForms || {})) {
                const gloss = formGloss(entry, form);
                if (!gloss || !hasText(formNote(key, form))) continue;
                LEX_ITEMS.push({
                    id: key + "/" + form, key, form,
                    he: form, tl: sf.transliteration || "", en: gloss,
                });
            }
        } else {
            if (!hasText(rd.note)) continue;
            const tl = entry.transliteration;
            LEX_ITEMS.push({
                id: key, key, form: null,
                he: entry.headword,
                tl: tl && tl !== "—" ? tl : "",
                en:
                    entry.rendering ||
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

    // "In Chapter" filter: show only items that occur in the last chapter
    // opened. Matched on that chapter's Hebrew with the shared matcher (a few
    // milliseconds), so it doesn't wait for the background occurrence count.
    const FILTER_KEY = "pr-lex-in-chapter";
    let lexInChapter = false;
    try {
        lexInChapter = localStorage.getItem(FILTER_KEY) === "1";
    } catch (e) {}
    // { g, c } of the last chapter opened. Remembered across visits, so a
    // reload on a lexicon page still knows which chapter to filter by.
    const LAST_CHAPTER_KEY = "pr-last-chapter";
    let lastChapter = null;
    try {
        const saved = JSON.parse(localStorage.getItem(LAST_CHAPTER_KEY) || "null");
        // Checked against the text once translation.json has arrived.
        if (saved && Number.isInteger(saved.g) && Number.isInteger(saved.c)) {
            lastChapter = saved;
        }
    } catch (e) {}
    function saveLastChapter() {
        try {
            localStorage.setItem(LAST_CHAPTER_KEY, JSON.stringify(lastChapter));
        } catch (e) {}
    }

    // Where the reader is in the chapter: scroll position and which
    // paragraphs have their Hebrew open. Kept on lastChapter (and saved),
    // so the lexicon page's back button returns to the same spot.
    function recordReading() {
        if (curView !== "chapter" || !lastChapter) return;
        if (lastChapter.g !== curG || lastChapter.c !== curC) return;
        lastChapter.scrollTop = document.querySelector("main").scrollTop;
        lastChapter.he = [...document.querySelectorAll("#sheet .para")]
            .filter((p) => p.querySelector(".heb-text"))
            .map((p) => +p.dataset.p);
        saveLastChapter();
    }
    let recordTimer = null;
    document.querySelector("main").addEventListener(
        "scroll",
        () => {
            if (curView !== "chapter") return;
            clearTimeout(recordTimer);
            recordTimer = setTimeout(recordReading, 250);
        },
        { passive: true }
    );

    function resumeReading(state) {
        const sheet = document.getElementById("sheet");
        for (const p of state.he || []) {
            const para = sheet.querySelector('.para[data-p="' + p + '"]');
            if (para && !para.querySelector(".heb-text")) toggleHebrew(para);
        }
        const main = document.querySelector("main");
        const top = state.scrollTop || 0;
        main.scrollTop = top;
        // Diagrams can change height as they decode; settle once they have.
        const imgs = [...sheet.querySelectorAll("img")].filter((i) => !i.complete);
        if (imgs.length) {
            Promise.all(imgs.map((i) => i.decode().catch(() => {}))).then(() => {
                if (curView === "chapter") main.scrollTop = top;
            });
        }
        // Hebrew paragraphs still downloading will change the height; settle
        // again once they are filled in.
        if (!HEB && (state.he || []).length) {
            hebReady.then(() =>
                requestAnimationFrame(() => {
                    if (curView === "chapter") main.scrollTop = top;
                })
            );
        }
        lastChapter.scrollTop = top;
        lastChapter.he = state.he || [];
        saveLastChapter();
    }

    // Back-to-chapter button on lexicon pages: shown only while the
    // "In Chapter" filter is on and a chapter has been read.
    function updateLexBackButton() {
        const btn = document.querySelector(".lex-back");
        if (!btn) return;
        const show = lexInChapter && lastChapter !== null;
        btn.hidden = !show;
        if (show) {
            const label =
                "Back to " + sectionName(0) + " " + (lastChapter.g + 1) + ", " +
                sectionName(1) + " " + (lastChapter.c + 1);
            btn.title = label;
            btn.setAttribute("aria-label", label);
        }
    }

    const chapterItemsCache = new Map();
    function chapterItemIds(g, c) {
        const ck = g + ":" + c;
        if (chapterItemsCache.has(ck)) return chapterItemsCache.get(ck);
        const ids = new Set();
        for (const html of getHebrewChapter(g, c) || []) {
            if (!html) continue;
            // Same text preparation as countOccurrences in matcher.js.
            const text = html.replace(/<img[^>]*>/g, "").replace(/<[^>]*>/g, "\u0001");
            for (const r of computeRanges(text)) {
                const entry = LEX.entries[r.entryKey];
                ids.add(entry && entry.cluster ? r.entryKey + "/" + r.form : r.entryKey);
            }
        }
        chapterItemsCache.set(ck, ids);
        return ids;
    }

    function renderLexNav() {
        const panel = document.getElementById("lex-panel");
        panel.textContent = "";
        const toolbar = el("div", "lex-toolbar", "");
        panel.appendChild(toolbar);

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
        toolbar.appendChild(toggle);

        const filterLabel = el("label", "lex-filter", "");
        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.checked = lexInChapter;
        cb.addEventListener("change", () => {
            lexInChapter = cb.checked;
            try {
                localStorage.setItem(FILTER_KEY, lexInChapter ? "1" : "0");
            } catch (e) {}
            renderLexNav();
            updateLexBackButton();
        });
        filterLabel.appendChild(cb);
        filterLabel.appendChild(document.createTextNode(" In Chapter"));
        toolbar.appendChild(filterLabel);

        // With the filter on, say which chapter it is (or that none is open yet).
        const filtering = lexInChapter && lastChapter !== null && HEB !== null;
        const inChapter = filtering ? chapterItemIds(lastChapter.g, lastChapter.c) : null;
        const shown = filtering ? LEX_ITEMS.filter((it) => inChapter.has(it.id)) : LEX_ITEMS;
        if (lexInChapter) {
            const msg = lastChapter && !HEB
                ? "Loading the Hebrew to filter by chapter…"
                : lastChapter
                ? sectionName(0) + " " + (lastChapter.g + 1) + ", " +
                  sectionName(1) + " " + (lastChapter.c + 1) + " (" +
                  shown.length + (shown.length === 1 ? " entry)" : " entries)")
                : "Open a chapter to filter by it.";
            panel.appendChild(el("div", "lex-filter-note", msg));
        }

        // Group by initial letter.
        const groups = new Map();
        for (const it of shown) {
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
            // A filtered list is short: show it all at once.
            if (filtering) det.open = true;
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

    // ---- occurrences index ----
    // Where each lexicon item occurs in the Hebrew text, counted with the
    // shared matcher (matcher.js), so counts agree with the highlights.
    // Counting the whole book takes seconds on a phone, so a background
    // worker starts as soon as the page loads, and the result is cached in
    // localStorage for a day. The cache is also rebuilt at once when the set
    // of highlighted forms changes (a new entry or form in the lexicon).
    // OCC: { itemId: { total, gates: [[g, total, [[c, n, firstP], ...]], ...] } }
    let OCC = null;
    let occFailed = false;
    const OCC_CACHE_KEY = "pr-occurrences-v1";
    const OCC_MAX_AGE = 24 * 60 * 60 * 1000;

    // A short fingerprint of everything the counts depend on in the lexicon.
    function matcherFingerprint() {
        const parts = [...FORM_MAP].map(([f, k]) => f + "\u0002" + k).sort();
        parts.push("skip:" + [...SKIP_TOKENS].sort().join(","));
        const str = parts.join("\u0003");
        let h = 0x811c9dc5; // FNV-1a
        for (let i = 0; i < str.length; i++) {
            h ^= str.charCodeAt(i);
            h = Math.imul(h, 0x01000193);
        }
        return (h >>> 0).toString(16) + ":" + parts.length;
    }

    function occReady(counts) {
        OCC = counts;
        // If a lexicon page is waiting, fill in its section.
        const waiting = document.querySelector(".lex-occ[data-loading]");
        if (waiting && curView === "lex" && curLex) {
            waiting.replaceWith(occurrencesSection(curLex));
        }
    }

    function startOccurrences() {
        const fp = matcherFingerprint();
        try {
            const cached = JSON.parse(localStorage.getItem(OCC_CACHE_KEY) || "null");
            if (cached && cached.fp === fp && Date.now() - cached.builtAt < OCC_MAX_AGE) {
                occReady(cached.counts);
                return;
            }
        } catch (e) {}

        const clusterKeys = Object.keys(LEX.entries).filter((k) => LEX.entries[k].cluster);
        const save = (counts) => {
            try {
                localStorage.setItem(
                    OCC_CACHE_KEY,
                    JSON.stringify({ fp, builtAt: Date.now(), counts })
                );
            } catch (e) {} // storage full or unavailable: just don't cache
            occReady(counts);
        };
        // Last resort when workers are unavailable: count on the main thread,
        // after a pause so the first chapter is already on screen.
        const countHere = () =>
            setTimeout(() => {
                try {
                    save(countOccurrences(computeRanges, HEB.versions[0].text, clusterKeys));
                } catch (e) {
                    occFailed = true;
                    console.warn("Could not count occurrences:", e);
                    occReady(null);
                }
            }, 1500);

        let worker;
        try {
            worker = new Worker("occurrences-worker.js");
        } catch (e) {
            countHere();
            return;
        }
        worker.onmessage = (e) => {
            worker.terminate();
            if (e.data && e.data.ok) save(e.data.counts);
            else {
                console.warn("Occurrence worker failed:", e.data && e.data.error);
                countHere();
            }
        };
        worker.onerror = (e) => {
            e.preventDefault();
            worker.terminate();
            countHere();
        };
        worker.postMessage({
            formMap: [...FORM_MAP],
            skipTokens: [...SKIP_TOKENS],
            clusterKeys,
            hebrewText: HEB.versions[0].text,
        });
    }

    // The "Occurrences" section at the foot of a lexicon page: gates with
    // their counts, each opening to its chapters. Gates and chapters with no
    // occurrence are left out. A chapter link opens the chapter at its first
    // occurrence; untranslated chapters are listed but not linked.
    function occurrencesSection(id) {
        const box = el("section", "lex-occ", "");
        box.appendChild(el("h2", "lex-page-h2", "Occurrences"));
        if (!OCC) {
            if (occFailed) {
                box.appendChild(el("p", "lex-occ-none", "The occurrence count is unavailable."));
            } else {
                box.dataset.loading = "";
                box.appendChild(el("p", "lex-occ-loading", "Counting occurrences in the Hebrew text…"));
            }
            return box;
        }
        const o = OCC[id];
        if (!o) {
            box.appendChild(el("p", "lex-occ-none", "Not found in the Hebrew text."));
            return box;
        }
        const nCh = o.gates.reduce((a, og) => a + og[2].length, 0);
        box.appendChild(
            el(
                "p",
                "lex-occ-summary",
                o.total + (o.total === 1 ? " occurrence" : " occurrences") +
                    " in the Hebrew text, in " + nCh +
                    (nCh === 1 ? " chapter" : " chapters") + "."
            )
        );
        for (const [g, gTotal, chapters] of o.gates) {
            const det = document.createElement("details");
            det.className = "occ-gate";
            const sum = document.createElement("summary");
            sum.appendChild(el("span", "occ-num", sectionName(0) + " " + (g + 1)));
            sum.appendChild(el("span", "occ-title", META.gates[g].title));
            sum.appendChild(el("span", "occ-count", String(gTotal)));
            det.appendChild(sum);
            for (const [c, n, firstP] of chapters) {
                const linkable = hasAnyEnglish(g, c);
                const row = el("div", "occ-chap" + (linkable ? "" : " disabled"), "");
                row.appendChild(el("span", "occ-num", (c + 1) + "."));
                row.appendChild(
                    el("span", "occ-title", textOf(META.index[g][c]) || "Chapter " + (c + 1))
                );
                row.appendChild(el("span", "occ-count", String(n)));
                if (linkable) {
                    row.tabIndex = 0;
                    const go = () => open(g, c, { para: firstP });
                    row.onclick = go;
                    row.onkeydown = (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            go();
                        }
                    };
                } else {
                    row.title = "Not yet translated";
                }
                det.appendChild(row);
            }
            box.appendChild(det);
        }
        return box;
    }
    // Chapter labels carry a little markup (<em>); show them as plain text.
    function textOf(html) {
        const d = document.createElement("div");
        d.innerHTML = html || "";
        return d.textContent;
    }

    // ---- lexicon entry page ----
    function openLex(id, opts) {
        const { updateUrl = true } = opts || {};
        const it = LEX_BY_ID.get(id);
        if (!it) return;
        if (updateUrl && parseLexHash(location.hash) !== id) {
            history.pushState(null, "", lexHash(id));
        }
        recordReading(); // remember the spot in the chapter being left
        curView = "lex";
        curLex = id;
        dismissPopup();

        const entry = LEX.entries[it.key];
        const rd = readerOf(it.key);
        const sheet = document.getElementById("sheet");
        sheet.textContent = "";
        sheet.appendChild(el("div", "crumb", "Lexicon"));

        const back = el("button", "lex-back", "");
        back.type = "button";
        back.innerHTML =
            '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">' +
            '<path d="M20 12H5M11 5l-7 7 7 7" fill="none" stroke="currentColor" ' +
            'stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        back.addEventListener("click", () => {
            if (lastChapter) open(lastChapter.g, lastChapter.c, { restore: true });
        });
        sheet.appendChild(back);

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

        const note = it.form ? formNote(it.key, it.form) : rd.note;
        if (note) sheet.appendChild(el("p", "lex-page-note", note));

        if (!it.form && rd.etymology) {
            sheet.appendChild(el("h2", "lex-page-h2", "Etymology"));
            sheet.appendChild(el("p", "lex-page-note", rd.etymology));
        }

        // Forms of this entry that carry their own reader-facing text.
        if (!it.form && entry.surfaceForms) {
            const forms = Object.entries(entry.surfaceForms).filter(
                ([form, sf]) => sf.rendering || formNote(it.key, form)
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
                    if (sf.rendering) dt.appendChild(el("span", "lex-form-gloss", sf.rendering));
                    dl.appendChild(dt);
                    const fnote = formNote(it.key, form);
                    if (fnote) dl.appendChild(el("dd", "", fnote));
                }
                sheet.appendChild(dl);
            }
        }

        sheet.appendChild(occurrencesSection(id));

        setTab("lex");
        document.querySelectorAll("#toc-panel .chap.active, #toc-panel .toc-intro.active").forEach((n) =>
            n.classList.remove("active")
        );
        markActiveLex(id);
        updateLexBackButton();
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
    // ---- glossary page (Gate 23) ----
    // All of Gate 23's titles on one page (#glossary): in Cordovero's order
    // or English A–Z, filtered by one search box that looks either in the
    // whole entries (English and the original Hebrew) or in the titles only
    // (English title, transliteration, Hebrew). Each card links to its entry.
    // Built on first use from translation.json; the Hebrew joins the search
    // once Pardes_Rimmonim.json has arrived.
    const GLOSS_HASH = "#glossary";
    let GLOSS = null;
    const glossState = { q: "", scope: "full", order: "cordovero", scrollTop: 0 };
    try {
        const saved = JSON.parse(localStorage.getItem("pr-glossary") || "null");
        if (saved && saved.scope === "titles") glossState.scope = "titles";
        if (saved && saved.order === "en") glossState.order = "en";
    } catch (e) {}
    function saveGlossPrefs() {
        try {
            localStorage.setItem(
                "pr-glossary",
                JSON.stringify({ scope: glossState.scope, order: glossState.order })
            );
        } catch (e) {}
    }

    // Lower-case, without Hebrew vowel points or cantillation, keeping a map
    // from each searchable character back to the original text (for excerpts).
    function searchable(text) {
        let norm = "";
        const map = [];
        for (let i = 0; i < text.length; i++) {
            const ch = text[i];
            if (/[֑-ׇ]/.test(ch)) continue;
            norm += ch.toLowerCase();
            map.push(i);
        }
        return { text, norm, map };
    }
    const normQuery = (q) =>
        searchable(q.trim().replace(/\s+/g, " ")).norm.split(" ").filter(Boolean);
    const plain = (html) =>
        textOf((html || "").replace(/<img[^>]*>/g, "")).replace(/\s+/g, " ").trim();
    // English sort: ignore a leading article, quotation marks and brackets.
    const glossSortKey = (t) =>
        t.replace(/^[\s"'“‘(\[]+/, "").replace(/^(the|a|an)\s+/i, "").toLowerCase();

    function buildGlossary() {
        GLOSS = [];
        const g = GLOSSARY_GATE;
        DATA.text[g].forEach((paras, c) => {
            const letter = (META.gates[g].chapters[c] || "").replace(/^Entries for\s+/i, "");
            let cur = null;
            paras.forEach((html, p) => {
                const m = ENTRY_RE.exec(html || "");
                if (m) {
                    const he = ENTRY_HE_RE.exec(html);
                    const tl = ENTRY_TL_RE.exec(html);
                    const text = plain(html);
                    cur = {
                        c, p, letter, order: GLOSS.length,
                        title: textOf(m[1]).trim(),
                        he: he ? textOf(he[1]).trim() : "",
                        tl: tl ? textOf(tl[1]).trim() : "",
                        opening: text.slice(text.indexOf("]") + 1).replace(/^[\s:,;.]+/, ""),
                        paras: [p],
                        en: [text],
                    };
                    cur.titleS = searchable(cur.title + " · " + cur.tl + " · " + cur.he);
                    GLOSS.push(cur);
                } else if (cur && html) {
                    // A paragraph without a title continues the entry above.
                    cur.paras.push(p);
                    cur.en.push(plain(html));
                }
            });
        });
        GLOSS.forEach((e) => {
            e.enS = searchable(e.en.join(" "));
            e.sortKey = glossSortKey(e.title);
        });
    }
    function glossHebrew(e) {
        if (e.heS || !HEB) return e.heS || null;
        const he = HEB.versions[0].text[GLOSSARY_GATE][e.c] || [];
        e.heS = searchable(e.paras.map((p) => plain(he[p])).join(" "));
        return e.heS;
    }
    // Where all the terms occur in a searchable text: index of the first, or -1.
    function findTerms(s, terms) {
        let first = -1;
        for (const t of terms) {
            const i = s.norm.indexOf(t);
            if (i < 0) return -1;
            if (first < 0 || i < first) first = i;
        }
        return first;
    }
    // An excerpt of about 170 characters around a match, the terms marked.
    function excerpt(s, at, terms, rtl) {
        const node = el("span", "gloss-snip", "");
        if (rtl) {
            node.dir = "rtl";
            node.lang = "he";
        }
        const startN = Math.max(0, at - 60);
        let a = s.map[startN] || 0;
        let b = Math.min(s.text.length, a + 170);
        if (a > 0) a = s.text.indexOf(" ", a) + 1 || a;
        const slice = s.text.slice(a, b);
        const sliceS = searchable(slice);
        const marks = [];
        for (const t of terms) {
            let i = sliceS.norm.indexOf(t);
            while (i >= 0) {
                marks.push([sliceS.map[i], sliceS.map[i + t.length - 1] + 1]);
                i = sliceS.norm.indexOf(t, i + t.length);
            }
        }
        marks.sort((x, y) => x[0] - y[0]);
        let pos = 0;
        if (a > 0) node.appendChild(document.createTextNode("… "));
        for (const [x, y] of marks) {
            if (x < pos) continue;
            node.appendChild(document.createTextNode(slice.slice(pos, x)));
            node.appendChild(el("mark", "", slice.slice(x, y)));
            pos = y;
        }
        node.appendChild(document.createTextNode(slice.slice(pos)));
        if (b < s.text.length) node.appendChild(document.createTextNode(" …"));
        return node;
    }
    function openingLine(e) {
        const t = e.opening.length > 170 ? e.opening.slice(0, 170).replace(/\s+\S*$/, "") + " …" : e.opening;
        return el("span", "gloss-snip", t);
    }

    function glossResults() {
        const terms = normQuery(glossState.q);
        const rows = [];
        for (const e of GLOSS) {
            if (!terms.length) {
                rows.push({ e, snip: () => openingLine(e) });
                continue;
            }
            if (glossState.scope === "titles") {
                if (findTerms(e.titleS, terms) >= 0) rows.push({ e, snip: () => openingLine(e) });
                continue;
            }
            // Full entries: the terms may be spread over the title, the
            // English and the Hebrew, but each must occur somewhere.
            const hay = [e.titleS, e.enS, glossHebrew(e)].filter(Boolean);
            if (!terms.every((t) => hay.some((s) => s.norm.includes(t)))) continue;
            const inEn = findTerms(e.enS, terms.filter((t) => e.enS.norm.includes(t)));
            const heS = glossHebrew(e);
            rows.push({
                e,
                snip: () =>
                    terms.some((t) => e.enS.norm.includes(t))
                        ? excerpt(e.enS, inEn, terms, false)
                        : heS && terms.some((t) => heS.norm.includes(t))
                        ? excerpt(heS, findTerms(heS, terms.filter((t) => heS.norm.includes(t))), terms, true)
                        : openingLine(e),
            });
        }
        if (glossState.order === "en") {
            rows.sort((x, y) => x.e.sortKey.localeCompare(y.e.sortKey) || x.e.order - y.e.order);
        }
        return { rows, terms };
    }

    // ---- an entry opened in place ----
    let glossOpenRef = null; // the entry open on the page (its reference)
    function markTerms(root, terms) {
        if (!terms.length) return;
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        const nodes = [];
        while (walker.nextNode()) nodes.push(walker.currentNode);
        for (const node of nodes) {
            const s = searchable(node.nodeValue);
            const marks = [];
            for (const t of terms) {
                let i = s.norm.indexOf(t);
                while (i >= 0) {
                    marks.push([s.map[i], s.map[i + t.length - 1] + 1]);
                    i = s.norm.indexOf(t, i + t.length);
                }
            }
            if (!marks.length) continue;
            marks.sort((a, b) => a[0] - b[0]);
            const frag = document.createDocumentFragment();
            let pos = 0;
            for (const [x, y] of marks) {
                if (x < pos) continue;
                frag.appendChild(document.createTextNode(node.nodeValue.slice(pos, x)));
                frag.appendChild(el("mark", "", node.nodeValue.slice(x, y)));
                pos = y;
            }
            frag.appendChild(document.createTextNode(node.nodeValue.slice(pos)));
            node.parentNode.replaceChild(frag, node);
        }
    }
    function closeGlossEntries() {
        document.querySelectorAll("#gloss-results .gloss-card.open").forEach((c) => {
            c.classList.remove("open");
            c.querySelector(".gloss-card-head").setAttribute("aria-expanded", "false");
            const body = c.querySelector(".gloss-body");
            if (body) body.remove();
        });
        glossOpenRef = null;
    }
    function openGlossEntry(card, e, ref, terms, scroll) {
        closeGlossEntries();
        glossOpenRef = ref;
        card.classList.add("open");
        card.querySelector(".gloss-card-head").setAttribute("aria-expanded", "true");
        const body = el("div", "gloss-body", "");
        const paras = DATA.text[GLOSSARY_GATE][e.c];
        e.paras.forEach((p) => {
            const para = el("div", "gloss-para", "");
            para.innerHTML = paras[p];
            body.appendChild(para);
        });
        markTerms(body, terms);
        const more = el("a", "gloss-more", "Read it in " + sectionName(0) + " " + (GLOSSARY_GATE + 1) + " →");
        more.href = "#" + ref;
        body.appendChild(more);
        card.appendChild(body);
        if (scroll) {
            // Bring the title to just under the pinned bar.
            const main = document.querySelector("main");
            // The bar may only appear because of this scroll, so always leave
            // room for it.
            const bar = document.querySelector("#sheet .gloss-bar-row");
            const top = card.getBoundingClientRect().top - main.getBoundingClientRect().top;
            main.scrollTop += top - (bar ? bar.offsetHeight : 0) - 8;
        }
    }
    function toggleGlossEntry(card, e, ref, terms) {
        if (card.classList.contains("open")) {
            closeGlossEntries();
            return;
        }
        openGlossEntry(card, e, ref, terms, true);
    }

    const HEB_LETTERS = "אבגדהוזחטיכלמנסעפצקרשת";
    function renderGlossResults() {
        const box = document.getElementById("gloss-results");
        if (!box) return;
        const { rows, terms } = glossResults();
        glossCount = rows.length;
        const status = document.getElementById("gloss-status");
        const q = glossState.q.trim();
        status.textContent = !terms.length
            ? GLOSS.length + " titles"
            : rows.length +
              (rows.length === 1 ? " entry " : " entries ") +
              (glossState.scope === "titles" ? "with “" + q + "” in the title" : "mention “" + q + "”");
        box.textContent = "";
        const groups = [];
        let cur = null;
        for (const r of rows) {
            const label =
                glossState.order === "en"
                    ? (/[a-z]/.exec(r.e.sortKey) || ["#"])[0].toUpperCase()
                    : r.e.letter;
            if (!cur || cur.label !== label) {
                cur = { label, he: glossState.order === "en" ? "" : HEB_LETTERS[r.e.c] || "", rows: [] };
                groups.push(cur);
            }
            cur.rows.push(r);
        }
        groups.forEach((gr, i) => {
            const sec = el("section", "gloss-group", "");
            sec.id = "gloss-group-" + i;
            const h = el("h2", "gloss-letter", "");
            if (gr.he) {
                const hl = el("span", "gloss-letter-he", gr.he);
                hl.lang = "he";
                h.appendChild(hl);
            }
            h.appendChild(document.createTextNode(gr.label));
            sec.appendChild(h);
            for (const { e, snip } of gr.rows) {
                const ref = GLOSSARY_GATE + 1 + ":" + (e.c + 1) + ":" + (e.p + 1);
                // A card opens in place to show the whole entry; one at a time.
                const card = el("div", "gloss-card", "");
                const btn = el("button", "gloss-card-head", "");
                btn.type = "button";
                btn.setAttribute("aria-expanded", "false");
                const head = el("span", "gloss-head", "");
                head.appendChild(el("span", "gloss-title", e.title));
                if (e.he) {
                    const he = el("span", "gloss-he", e.he);
                    he.dir = "rtl";
                    he.lang = "he";
                    head.appendChild(he);
                }
                if (e.tl) head.appendChild(el("span", "gloss-tl", e.tl));
                btn.appendChild(head);
                const sn = snip();
                btn.appendChild(sn);
                btn.appendChild(el("span", "gloss-ref", ref));
                btn.insertAdjacentHTML(
                    "beforeend",
                    '<svg class="gloss-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
                );
                card.appendChild(btn);
                btn.addEventListener("click", () => toggleGlossEntry(card, e, ref, terms));
                if (glossOpenRef === ref) openGlossEntry(card, e, ref, terms, false);
                sec.appendChild(card);
            }
            box.appendChild(sec);
        });
        if (!rows.length) {
            const none = el("p", "gloss-none", "Nothing matches. ");
            const clear = el("button", "gloss-clear", "Clear the search");
            clear.type = "button";
            clear.addEventListener("click", () => {
                glossState.q = "";
                document.querySelectorAll("#sheet .gloss-q").forEach((i) => (i.value = ""));
                glossChanged(clear);
            });
            none.appendChild(clear);
            box.appendChild(none);
        }
        renderGlossNav(groups);
    }
    // The Glossary tab's panel: jump to a letter of the current results.
    function renderGlossNav(groups) {
        const panel = document.getElementById("gloss-panel");
        panel.textContent = "";
        panel.appendChild(el("p", "gloss-nav-note", "Jump to"));
        const list = el("div", "gloss-nav", "");
        groups.forEach((gr, i) => {
            const b = el("button", "gloss-nav-item", "");
            b.type = "button";
            if (gr.he) {
                const hl = el("span", "gloss-letter-he", gr.he);
                hl.lang = "he";
                b.appendChild(hl);
            }
            b.appendChild(document.createTextNode(gr.label));
            b.appendChild(el("span", "gloss-nav-count", String(gr.rows.length)));
            b.addEventListener("click", () => {
                const target = document.getElementById("gloss-group-" + i);
                if (target) target.scrollIntoView({ block: "start" });
                document.body.classList.remove("nav-open");
                syncMenuBtn();
            });
            list.appendChild(b);
        });
        panel.appendChild(list);
    }

    // The controls: built twice, once in place under the heading and once in
    // the shelf of the collapsed bar, both driven by glossState.
    const GLOSS_SCOPES = [["full", "Full entries"], ["titles", "Titles"]];
    const GLOSS_ORDERS = [["cordovero", "Cordovero's order"], ["en", "English A–Z"]];
    function segmented(label, key, options) {
        const wrap = el("div", "gloss-seg", "");
        wrap.setAttribute("role", "group");
        wrap.setAttribute("aria-label", label);
        for (const [val, text] of options) {
            const b = el("button", "", text);
            b.type = "button";
            b.dataset.key = key;
            b.dataset.val = val;
            b.addEventListener("click", () => {
                if (glossState[key] === val) return;
                glossState[key] = val;
                saveGlossPrefs();
                glossChanged(b);
            });
            wrap.appendChild(b);
        }
        return wrap;
    }
    function glossControls() {
        const box = el("div", "gloss-controls", "");
        const label = el("label", "gloss-search", "");
        label.appendChild(el("span", "gloss-label", "Search"));
        const input = document.createElement("input");
        input.type = "search";
        input.className = "gloss-q";
        input.autocomplete = "off";
        input.placeholder = "e.g. Tiferet, tower, מגדל";
        let timer = null;
        input.addEventListener("input", () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                glossState.q = input.value;
                glossChanged(input);
            }, 150);
        });
        label.appendChild(input);
        box.appendChild(label);
        const sw = el("div", "gloss-switches", "");
        sw.appendChild(segmented("Search in", "scope", GLOSS_SCOPES));
        sw.appendChild(segmented("Order", "order", GLOSS_ORDERS));
        box.appendChild(sw);
        return box;
    }
    // Bring every copy of the controls, and the bar's summary, in line with
    // glossState.
    let glossCount = 0;
    function syncGlossControls() {
        document.querySelectorAll("#sheet .gloss-q").forEach((i) => {
            if (i.value !== glossState.q && document.activeElement !== i) i.value = glossState.q;
        });
        document.querySelectorAll("#sheet .gloss-seg button").forEach((b) =>
            b.setAttribute("aria-pressed", String(glossState[b.dataset.key] === b.dataset.val))
        );
        const sum = document.querySelector("#sheet .gloss-bar-summary");
        if (!sum) return;
        const q = glossState.q.trim();
        const scope = glossState.scope === "titles" ? "in titles" : "in full entries";
        const order = (GLOSS_ORDERS.find(([v]) => v === glossState.order) || [])[1];
        sum.textContent = "";
        sum.appendChild(el("span", "gloss-bar-q", q ? "“" + q + "” " + scope : "All titles"));
        sum.appendChild(el("span", "gloss-bar-meta", " · " + order + " · " + glossCount));
    }
    // A change from the controls: re-list and sync the other copy. When the
    // change came from the shelf, show the new results from their start.
    function glossChanged(source) {
        renderGlossResults();
        syncGlossControls();
        if (source && source.closest(".gloss-shelf")) {
            const main = document.querySelector("main");
            const results = document.getElementById("gloss-results");
            const bar = document.querySelector("#sheet .gloss-bar");
            const offset =
                results.getBoundingClientRect().top -
                main.getBoundingClientRect().top -
                (bar ? bar.querySelector(".gloss-bar-row").offsetHeight : 0);
            if (offset < 0) main.scrollTop += offset;
        }
    }

    function setShelf(open) {
        const bar = document.querySelector("#sheet .gloss-bar");
        if (!bar) return;
        bar.classList.toggle("shelf-open", open);
        bar.querySelector(".gloss-bar-toggle").setAttribute("aria-expanded", String(open));
        bar.querySelector(".gloss-shelf").inert = !open;
        if (open) {
            setTimeout(() => {
                const q = bar.querySelector(".gloss-shelf .gloss-q");
                if (q) q.focus({ preventScroll: true });
            }, 60);
        }
    }

    let glossObserver = null;
    function openGlossary(opts) {
        const { updateUrl = true, restore = false } = opts || {};
        if (!DATA) {
            dataReady.then(() => openGlossary(opts));
            return;
        }
        if (!GLOSS) buildGlossary();
        if (updateUrl && location.hash !== GLOSS_HASH) history.pushState(null, "", GLOSS_HASH);
        recordReading(); // remember the spot in the chapter being left
        curView = "glossary";
        curLex = null;
        curPage = null;
        dismissPopup();
        setTab("gloss");
        document.querySelectorAll("#toc-panel .chap.active, .lex-item.active").forEach((n) =>
            n.classList.remove("active")
        );
        const sheet = document.getElementById("sheet");
        sheet.innerHTML =
            '<div class="crumb">' + sectionName(0) + " " + (GLOSSARY_GATE + 1) + " · " +
            META.gates[GLOSSARY_GATE].title + "</div>" +
            '<h1>Glossary of Titles Search<span class="rule"></span></h1>' +
            '<p class="gloss-intro">Every title Cordovero explains in this gate. Search the entries or the titles, in English or Hebrew, and read them in his order or A–Z. Each title opens its entry.</p>' +
            // The collapsed bar: sticks to the top once the controls below it
            // have scrolled away (anchored here so it is pinned whenever the list shows). Its shelf folds the controls down over the list.
            '<div class="gloss-sticky"><div class="gloss-bar">' +
            '<div class="gloss-bar-row">' +
            '<p class="gloss-bar-summary"></p>' +
            '<button type="button" class="gloss-bar-toggle" aria-expanded="false" aria-label="Search and order">' +
            '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6" fill="none" stroke="currentColor" stroke-width="2"/><path d="M15 15l5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' +
            '<svg class="gloss-bar-chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
            "</button></div>" +
            '<div class="gloss-shelf"><div class="gloss-shelf-inner"></div></div>' +
            "</div></div>" +
            '<div class="gloss-inline"></div>' +
            '<p class="gloss-status" id="gloss-status" aria-live="polite"></p>' +
            '<div id="gloss-results"></div>' +
            SHEET_FOOTER;
        const inline = glossControls();
        sheet.querySelector(".gloss-inline").appendChild(inline);
        sheet.querySelector(".gloss-shelf-inner").appendChild(glossControls());
        const bar = sheet.querySelector(".gloss-bar");
        bar.querySelector(".gloss-bar-toggle").addEventListener("click", () =>
            setShelf(!bar.classList.contains("shelf-open"))
        );
        bar.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                setShelf(false);
                bar.querySelector(".gloss-bar-toggle").focus();
            }
        });
        setShelf(false);
        // Show the bar once the controls in place have scrolled out of view.
        const main = document.querySelector("main");
        if (glossObserver) glossObserver.disconnect();
        glossObserver = new IntersectionObserver(
            ([entry]) => {
                const stuck =
                    !entry.isIntersecting &&
                    entry.boundingClientRect.top < (entry.rootBounds ? entry.rootBounds.top : 0);
                bar.classList.toggle("shown", stuck);
                bar.querySelector(".gloss-bar-row").inert = !stuck;
                if (!stuck) setShelf(false);
            },
            { root: main, threshold: 0 }
        );
        glossObserver.observe(inline);
        renderGlossResults();
        syncGlossControls();
        document.body.classList.remove("nav-open");
        syncMenuBtn();
        main.scrollTop = restore ? glossState.scrollTop : 0;
    }
    // The shelf folds back up when the reader scrolls the list themselves.
    ["wheel", "touchmove"].forEach((type) =>
        document.querySelector("main").addEventListener(
            type,
            (e) => {
                if (curView !== "glossary") return;
                if (e.target && e.target.closest && e.target.closest(".gloss-shelf")) return;
                if (document.querySelector("#sheet .gloss-bar.shelf-open")) setShelf(false);
            },
            { passive: true }
        )
    );
    document.querySelector("main").addEventListener(
        "scroll",
        () => {
            if (curView === "glossary") glossState.scrollTop = document.querySelector("main").scrollTop;
        },
        { passive: true }
    );
    // When the Hebrew arrives, a full-entry search already on screen can now
    // include it.
    hebReady.then(() => {
        if (curView === "glossary" && glossState.q.trim() && glossState.scope === "full") {
            renderGlossResults();
            syncGlossControls();
        }
    });

    window.addEventListener("hashchange", function () {
        const lexId = parseLexHash(location.hash);
        if (lexId) {
            if (!(curView === "lex" && curLex === lexId)) {
                openLex(lexId, { updateUrl: false });
            }
            return;
        }
        if (!DATA) {
            dataReady.then(() => window.dispatchEvent(new HashChangeEvent("hashchange")));
            return;
        }
        if (location.hash === GLOSS_HASH) {
            if (curView !== "glossary") openGlossary({ updateUrl: false, restore: true });
            return;
        }
        const fp = frontPageOfHash(location.hash);
        if (fp) {
            if (!(curView === "intro" && curPage === fp.key)) openIntro({ updateUrl: false, page: fp.key });
            return;
        }
        const loc = parseHash(location.hash);
        if (!loc) return;
        if (curView === "chapter" && loc.g === curG && loc.c === curC) {
            if (loc.p !== null) scrollToPara(loc.p);
            return;
        }
        open(loc.g, loc.c, { updateUrl: false, para: loc.p, restore: true });
    });

    renderNav();
    // A lexicon link needs only the lexicon files, already here: draw it now.
    const initialLex = parseLexHash(location.hash);
    if (initialLex) openLex(initialLex, { updateUrl: false });

    await dataReady;
    if (
        lastChapter &&
        !(DATA.text[lastChapter.g] && DATA.text[lastChapter.g][lastChapter.c])
    ) {
        lastChapter = null; // saved chapter no longer exists
        updateLexBackButton();
    }
    renderToc();
    if (curView === "lex" && curLex) {
        // The TOC wasn't there when the entry was drawn.
        setTab("lex");
        markActiveLex(curLex);
    } else if (!pendingOpen) {
        const initial = parseHash(location.hash);
        const initialPage = frontPageOfHash(location.hash);
        if (location.hash === GLOSS_HASH) openGlossary({ updateUrl: false });
        else if (initialPage) openIntro({ updateUrl: false, page: initialPage.key });
        else if (initial) open(initial.g, initial.c, { updateUrl: false, para: initial.p });
        else open(0, 0, { updateUrl: false });
    }
    // When the Hebrew arrives: settle the TOC status, apply the In Chapter
    // filter, and count lexicon occurrences in the background, so the index
    // is usually ready before the reader first opens a lexicon page.
    Promise.all([hebReady, dataReady]).then(() => {
        refreshTranslationStatus();
        if (lexInChapter) renderLexNav();
        startOccurrences(); // DATA is in by now: the lists need gate titles
    });
})();
