(async function () {
    const resp = await fetch("translation.json");
    const DATA = await resp.json();
    // Build an index from the text array: index[gate][chapter] = label
    DATA.index = DATA.text.map((gate) =>
        gate.map(() => "")
    );
    const META = DATA;
    function getChapter(g, c) {
        return DATA.text[g][c];
    }

    // Hebrew numerals 1..32 (with the 15/16 substitutions)
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

    function renderNav() {
        const nav = document.getElementById("nav");
        nav.innerHTML = '<div class="brand"><div class="he">' + META.heTitle + '</div><div class="en">' + META.title + "</div></div>";
        META.index.forEach((gate, g) => {
            const det = document.createElement("details");
            if (g === 0) det.open = true;
            const sum = document.createElement("summary");
            sum.innerHTML = '<span class="num">' + META.sectionNames[0] + " " + (g + 1) + "</span><span>" + gate.length + ' ch.</span><span class="he">' + heNum(g + 1) + "</span>";
            det.appendChild(sum);
            gate.forEach((label, c) => {
                const row = document.createElement("div");
                row.className = "chap";
                row.tabIndex = 0;
                row.dataset.g = g;
                row.dataset.c = c;
                row.innerHTML = "<span>" + (c + 1) + ".</span> " + (label ? '<span class="clab">' + label + "</span>" : "Chapter " + (c + 1));
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

    function open(g, c) {
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
            paras.map((p, i) => '<p class="para"><span class="pnum">' + (i + 1) + "</span>" + p + "</p>").join("");
        document.querySelectorAll(".chap").forEach((el) => el.classList.toggle("active", +el.dataset.g === g && +el.dataset.c === c));
        document.body.classList.remove("nav-open");
        document.querySelector("main").scrollTop = 0;
    }

    renderNav();
    open(0, 0);
})();
