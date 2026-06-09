(async function () {
    // ---- data loading ----
    const [resp, heResp, lexResp] = await Promise.all([
        fetch("translation.json"),
        fetch("Pardes_Rimmonim.json"),
        fetch("lexicon.json"),
    ]);
    const DATA = await resp.json();
    const HEB = await heResp.json();
    const LEX = await lexResp.json();

    DATA.index = DATA.text.map((gate) => gate.map(() => ""));
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
    const SORTED_FORMS = [...FORM_MAP.keys()].sort((a, b) => b.length - a.length);

    // ---- lexicon highlighting ----
    function highlightLexicon(hebDiv) {
        let html = hebDiv.innerHTML;
        const replacements = [];

        for (const form of SORTED_FORMS) {
            let idx = 0;
            while ((idx = html.indexOf(form, idx)) !== -1) {
                const end = idx + form.length;
                const overlaps = replacements.some(
                    (r) => idx < r.end && end > r.start
                );
                if (!overlaps) {
                    replacements.push({
                        start: idx,
                        end,
                        entryKey: FORM_MAP.get(form),
                        original: form,
                    });
                }
                idx = end;
            }
        }

        replacements.sort((a, b) => b.start - a.start);
        for (const r of replacements) {
            html =
                html.slice(0, r.start) +
                '<span class="lex-mark" data-lex="' +
                r.entryKey +
                '">' +
                r.original +
                "</span>" +
                html.slice(r.end);
        }
        hebDiv.innerHTML = html;
    }

    // ---- lexicon popup ----
    const popup = document.getElementById("lex-popup");

    function showPopup(lexSpan) {
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
            sum.innerHTML =
                '<span class="num">' +
                META.sectionNames[0] +
                " " +
                (g + 1) +
                "</span><span>" +
                gate.length +
                ' ch.</span><span class="he">' +
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
            META.sectionNames[0] + " " + (ng + 1) + " · " +
            META.sectionNames[1] + " " + (nc + 1) + " &rarr;</button>";
    }

    // ---- open chapter ----
    function open(g, c) {
        curG = g;
        curC = c;
        dismissPopup();
        const paras = getChapter(g, c);
        const sheet = document.getElementById("sheet");
        const label = META.index[g][c];
        sheet.innerHTML =
            '<div class="crumb">' +
            META.sectionNames[0] +
            " " +
            (g + 1) +
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

        // Lexicon mark clicks (delegated since they are added dynamically)
        sheet.addEventListener("click", function (e) {
            const mark = e.target.closest(".lex-mark");
            if (mark) {
                e.stopPropagation();
                showPopup(mark);
            }
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

    renderNav();
    open(0, 0);
})();
