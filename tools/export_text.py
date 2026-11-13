#!/usr/bin/env python3
"""Export the translation as static files in export/:

    Pardes_Rimmonim.md / .html   the whole translation in one file, English with Hebrew
    index.html, gate-NN.html     the same split into a contents page and one page per gate,
                                 big gates in parts (gate-NN-K.html), so crawlers don't truncate them
    images/                      diagrams extracted from the base64 in the data files
    Pardes_Rimmonim.pdf          English only, with --pdf (needs weasyprint); not committed

    python3 tools/export_text.py [--pdf]

Only translated paragraphs are exported, each followed by its Hebrew (diagrams that
already appear with the English aren't repeated). The table of
contents covers all 32 gates. Embedded base64 images are written to export/images/
(deduplicated by content hash) and referenced by relative path.

The GitHub workflow .github/workflows/export-text.yml runs this on every push that
changes the text, so the files in export/ are generated: don't edit them by hand.
"""
import base64
import hashlib
import html
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "export"
IMG_DIR = OUT / "images"
BASENAME = "Pardes_Rimmonim"
SITE_URL = "https://avicraimer.github.io/Pardes_Rimmonim_Reader/"
REPO_URL = "https://github.com/AviCraimer/Pardes_Rimmonim_Reader"
PDF_URL = REPO_URL + "/releases/download/latest-text/Pardes_Rimmonim.pdf"

EXT = {"jpeg": "jpg", "jpg": "jpg", "png": "png", "gif": "gif", "svg+xml": "svg", "webp": "webp"}
written_images = {}  # sha -> filename


def save_image(src):
    m = re.match(r"data:image/([\w+.-]+);base64,(.*)", src, re.S)
    if not m:
        return src  # already a URL
    data = base64.b64decode(m.group(2))
    sha = hashlib.sha1(data).hexdigest()[:12]
    if sha not in written_images:
        name = f"{sha}.{EXT.get(m.group(1).lower(), 'bin')}"
        (IMG_DIR / name).write_bytes(data)
        written_images[sha] = name
    return f"images/{written_images[sha]}"


def esc_md(text):
    text = text.replace("\\", "\\\\")
    text = re.sub(r"([*_`])", r"\\\1", text)
    return text.replace("<", "&lt;").replace(">", "&gt;")


class ToMarkdown(HTMLParser):
    """Inline HTML -> Markdown. Tables are kept as plain HTML (styles dropped)."""

    BOLD = {"b", "strong", "big"}
    ITAL = {"i", "em"}

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.out = []
        self.table = None  # list of html chunks while inside a table

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if self.table is not None:
            if tag == "img":
                self.table.append(f'<img src="{save_image(a.get("src", ""))}" alt="{html.escape(a.get("alt") or "")}">')
            else:
                self.table.append(f"<{tag}>")
            return
        if tag == "table":
            self.table = ["<table>"]
        elif tag in self.BOLD:
            self.out.append("**")
        elif tag in self.ITAL:
            self.out.append("*")
        elif tag == "br":
            self.out.append("  \n")
        elif tag in ("div", "p"):
            self.out.append("\n\n")
        elif tag == "img":
            alt = (a.get("alt") or "diagram").replace("]", "")
            self.out.append(f"\n\n![{alt}]({save_image(a.get('src', ''))})\n\n")

    def handle_endtag(self, tag):
        if self.table is not None:
            self.table.append(f"</{tag}>")
            if tag == "table":
                self.out.append("\n\n" + "".join(self.table) + "\n\n")
                self.table = None
            return
        if tag in self.BOLD:
            self.out.append("**")
        elif tag in self.ITAL:
            self.out.append("*")
        elif tag in ("div", "p"):
            self.out.append("\n\n")

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)

    def handle_data(self, data):
        if self.table is not None:
            self.table.append(html.escape(data, quote=False))
        else:
            self.out.append(esc_md(data))


def to_md(s):
    p = ToMarkdown()
    p.feed(s or "")
    p.close()
    text = "".join(p.out)
    text = re.sub(r"\*\*(\s*)\*\*", r"\1", text)  # empty bold runs
    text = re.sub(r"[ \t]+\n", lambda m: "  \n" if m.group(0).startswith("  ") else "\n", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def blockquote(md):
    return "\n".join(("> " + line) if line.strip() else ">" for line in md.split("\n"))


def load():
    t = json.loads((ROOT / "translation.json").read_text(encoding="utf-8"))
    he = json.loads((ROOT / f"{BASENAME}.json").read_text(encoding="utf-8"))["versions"][0]["text"]
    return t, he


def gate_status(t):
    def done(g):
        return [any((p or "").strip() for p in ch) for ch in t["text"][g]]

    full = [g for g in range(len(t["text"])) if t["text"][g] and all(done(g))]
    partial = [g for g in range(len(t["text"])) if any(done(g)) and g not in full]
    return full, partial


def intro(t, full, partial, hebrew=True):
    notes = t.get("indexNotes", {})
    L = [f"# {t['title']} ({t['heTitle']})", ""]
    L += ["*Orchard of Pomegranates*, by Rabbi Moshe Cordovero (the Ramak), Safed, 16th century. "
          "English translation" + (" with the Hebrew text, paragraph by paragraph." if hebrew else "."), ""]
    status = f"Gates translated so far: {', '.join(str(g + 1) for g in full) or 'none'}"
    if partial:
        status += f" (in progress: {', '.join(str(g + 1) for g in partial)})"
    L += [f"- Online reader: <{SITE_URL}>",
          f"- Source data and history: <{REPO_URL}>",
          "- Hebrew source text from Sefaria (public domain). Translation released under the MIT License.",
          "- The English translation was produced by AI, with terminology rulings by Avi Craimer, "
          "and may contain inaccuracies.",
          f"- {status} of 32.",
          "- References are Gate:Chapter:Paragraph."
          + (" Each English paragraph is followed by the Hebrew it translates, as a quotation." if hebrew else ""),
          ""]
    for key in ("about", "translatorNotes"):
        if notes.get(key):
            L += [to_md(notes[key]), ""]
    return L


def contents(t, link=None, attrs=False):
    """link(g) / link(g, c) -> URL of a translated gate / chapter, or None.
    attrs: tag the headings {.toc} (Markdown attr_list) so the PDF leaves them out of its outline."""
    L = ["## Contents" + (" {#contents}" if attrs else ""), ""]
    for g, gate in enumerate(t["gates"]):
        title = f"Gate {g + 1}: {to_md(gate['title'])}"
        url = link(g) if link else None
        if url:
            title = f"[{title}]({url})"
        L += [f"### {title} (*{esc_md(gate.get('heTitle', ''))}*)" + (" {.toc}" if attrs else ""), ""]
        if gate.get("description"):
            L += [to_md(gate["description"]), ""]
        for c, line in enumerate(gate.get("chapters", [])):
            url = link(g, c) if link else None
            L.append(f"{c + 1}. " + (f"[{to_md(line)}]({url})" if url else to_md(line)))
        L.append("")
    colophon = t.get("indexNotes", {}).get("colophon")
    if colophon:
        L += [to_md(colophon), ""]
    return L


def img_refs(md):
    return set(re.findall(r"\]\((images/[^)]+)\)", md)) | set(re.findall(r'src="(images/[^"]+)"', md))


def strip_imgs(md, refs):
    md = re.sub(r"!\[[^\]]*\]\((images/[^)]+)\)", lambda m: "" if m.group(1) in refs else m.group(0), md)
    return re.sub(r"\n{3,}", "\n\n", md).strip()


def gate_body(t, he, g, hebrew=True, heading="##", chapters=None, part="", anchors=False):
    gate = t["gates"][g]
    L = [f"{heading} Gate {g + 1}: {to_md(gate['title'])}{part}" + (f" {{#gate-{g + 1}}}" if anchors else ""), ""]
    if gate.get("description"):
        L += [to_md(gate["description"]), ""]
    sub = heading + "#"
    chapters = chapters if chapters is not None else range(len(t["text"][g]))
    for c in chapters:
        paras = t["text"][g][c]
        title = gate["chapters"][c] if c < len(gate.get("chapters", [])) else ""
        L += [f"{sub} Chapter {g + 1}:{c + 1}" + (f". {to_md(title)}" if title else "")
              + (f" {{#ch-{g + 1}-{c + 1}}}" if anchors else ""), ""]
        for p, en in enumerate(paras):
            if not (en or "").strip():
                continue
            en_md = to_md(en)
            L += [f"**{g + 1}:{c + 1}:{p + 1}** {en_md}", ""]
            if not hebrew:
                continue
            try:
                h = he[g][c][p]
            except IndexError:
                h = ""
            if (h or "").strip():
                # Diagrams already shown with the English aren't repeated in the Hebrew.
                h_md = strip_imgs(to_md(h), img_refs(en_md))
                if h_md:
                    L += [blockquote(h_md), ""]
    return L


def anchor(g, c=None):
    return f"#gate-{g + 1}" if c is None else f"#ch-{g + 1}-{c + 1}"


def build_markdown(t, he, hebrew=True, anchors=False):
    """anchors: give gates and chapters ids and link the contents to them (for HTML and PDF;
    the attr_list syntax would show literally in plain Markdown)."""
    full, partial = gate_status(t)
    done = set(full + partial)
    link = (lambda g, c=None: anchor(g, c) if g in done else None) if anchors else None
    L = intro(t, full, partial, hebrew) + contents(t, link, attrs=anchors)
    for g in full + partial:
        L += ["---", ""] + gate_body(t, he, g, hebrew, anchors=anchors)
    return "\n".join(L).rstrip() + "\n"


CSS = """
@page { size: A4; margin: 2cm 2cm 2.2cm; @bottom-center { content: counter(page); font-size: 9pt; color: #777; } }
body { font-family: "Noto Serif", "Liberation Serif", "Noto Serif Hebrew", "FreeSerif", serif; font-size: 11pt; line-height: 1.45; color: #111; max-width: 46rem; margin: auto; padding: 1rem; }
h1 { font-size: 22pt; } h2 { font-size: 16pt; break-before: page; } h3 { font-size: 12.5pt; break-after: avoid; }
blockquote { direction: rtl; text-align: right; unicode-bidi: plaintext; margin: 0.2em 0 1.1em 2em; padding: 0 0.8em;
  border-right: 2px solid #c9b98f; border-left: none; color: #333;
  font-family: "Noto Serif Hebrew", "Frank Ruehl CLM", "FreeSerif", serif; font-size: 12pt; }
img { display: block; max-width: 100%; max-height: 18cm; margin: 0.8em auto; }
table { border-collapse: collapse; margin: 0.8em auto; } td { border: 1px solid #555; padding: 3px 6px; text-align: center; }
hr { display: none; }
"""


MAX_PAGE = 600_000  # bytes; Common Crawl truncates responses at 1 MiB


def split_pages(t, he, done):
    """[(g, chapter list, filename, part label)]: one page per gate, or several for big gates."""
    pages = []
    for g in done:
        n = len(t["text"][g])
        sizes = [len("\n".join(gate_body(t, he, g, chapters=[c])).encode()) * 1.05 for c in range(n)]
        groups, cur, size = [], [], 0
        for c in range(n):
            if cur and size + sizes[c] > MAX_PAGE:
                groups.append(cur)
                cur, size = [], 0
            cur.append(c)
            size += sizes[c]
        groups.append(cur)
        for i, chs in enumerate(groups):
            if len(groups) == 1:
                pages.append((g, chs, f"gate-{g + 1:02d}.html", ""))
            else:
                pages.append((g, chs, f"gate-{g + 1:02d}-{i + 1}.html",
                              f", chapters {chs[0] + 1}–{chs[-1] + 1}"))
    return pages


# PDF outline (bookmarks): Contents and gates at the top level, chapters beneath them.
PDF_CSS = """
h1, h4, h5, h6, .toc { bookmark-level: none; }
h2 { bookmark-level: 1; } h3 { bookmark-level: 2; }
a { color: inherit; text-decoration: none; }
ol a { color: #5a2a2a; }
"""

NAV_CSS = ".pager { display: flex; justify-content: space-between; gap: 1em; margin: 2em 0; font-size: 10pt; }"


def build_html(md_text, title, canonical, nav="", css=""):
    import markdown  # pip install markdown

    body = markdown.markdown(md_text, extensions=["extra", "sane_lists"])
    body = body.replace("<blockquote>", '<blockquote dir="rtl" lang="he">')
    return ("<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n"
            "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n"
            f"<title>{html.escape(title)}</title>\n"
            "<meta name=\"description\" content=\"English translation of Moshe Cordovero's Pardes Rimmonim, "
            "paragraph by paragraph with the Hebrew text.\">\n"
            f"<link rel=\"canonical\" href=\"{SITE_URL}export/{canonical}\">\n"
            f"<style>{CSS}{NAV_CSS}{css}</style>\n</head>\n<body>\n{nav}{body}\n{nav}</body>\n</html>\n")


def pager(pages, i):
    def label(k):
        g, chs, _, part = pages[k]
        return f"Gate {g + 1}" + (f":{chs[0] + 1}–{chs[-1] + 1}" if part else "")

    prev = f'<a href="{pages[i - 1][2]}">← {label(i - 1)}</a>' if i else "<span></span>"
    nxt = f'<a href="{pages[i + 1][2]}">{label(i + 1)} →</a>' if i + 1 < len(pages) else "<span></span>"
    return f'<nav class="pager">{prev}<a href="index.html">Contents</a>{nxt}</nav>\n'


def main():
    OUT.mkdir(exist_ok=True)
    IMG_DIR.mkdir(exist_ok=True)
    t, he = load()
    full, partial = gate_status(t)
    done = sorted(full + partial)
    generated = set()

    def write(name, text):
        (OUT / name).write_text(text, encoding="utf-8")
        generated.add(name)

    # One file: Markdown and a single HTML page, English with Hebrew.
    md_text = build_markdown(t, he)
    write(f"{BASENAME}.md", md_text)
    write(f"{BASENAME}.html", build_html(build_markdown(t, he, anchors=True), "Pardes Rimmonim: English translation with Hebrew", f"{BASENAME}.html"))

    # Split pages for crawlers: a contents page plus one page per gate (big gates in parts).
    pages = split_pages(t, he, done)
    first, where = {}, {}
    for g, chs, fname, _ in pages:
        first.setdefault(g, fname)
        where.update({(g, c): fname for c in chs})

    def page_link(g, c=None):
        if g not in first:
            return None
        return first[g] if c is None else where[(g, c)] + anchor(g, c)
    index_md = "\n".join(intro(t, full, partial) + [f"The whole translation is also available as one "
                          f"[Markdown file]({BASENAME}.md), a [single page]({BASENAME}.html) and a [PDF]({PDF_URL}).", ""]
                          + contents(t, page_link))
    write("index.html", build_html(index_md, "Pardes Rimmonim: English translation with Hebrew", "index.html"))
    for i, (g, chs, fname, part) in enumerate(pages):
        body = "\n".join([f"*[{t['title']}](index.html), English translation with the Hebrew.*", ""]
                         + gate_body(t, he, g, heading="#", chapters=chs, part=part, anchors=True))
        title = f"Pardes Rimmonim, Gate {g + 1}{part}: {re.sub(r'<[^>]+>', '', t['gates'][g]['title'])}"
        write(fname, build_html(body, title, fname, pager(pages, i)))

    for f in OUT.glob("gate-*.html"):
        if f.name not in generated:
            f.unlink()
    keep = set(written_images.values())
    for f in IMG_DIR.iterdir():
        if f.name not in keep:
            f.unlink()
    print(f"export/: {len(generated)} files, {len(keep)} images; largest page "
          f"{max((OUT / n).stat().st_size for n in generated if n.endswith('.html') and n != BASENAME + '.html'):,} bytes")

    if "--pdf" in sys.argv:
        # The PDF is English only (Hebrew characters inside the English still need Hebrew fonts).
        from weasyprint import HTML

        page = build_html(build_markdown(t, he, hebrew=False, anchors=True), "Pardes Rimmonim: English translation",
                          f"{BASENAME}.html", css=PDF_CSS)
        HTML(string=page, base_url=str(OUT)).write_pdf(OUT / f"{BASENAME}.pdf")
        print(f"export/{BASENAME}.pdf: {(OUT / f'{BASENAME}.pdf').stat().st_size:,} bytes")


if __name__ == "__main__":
    main()
