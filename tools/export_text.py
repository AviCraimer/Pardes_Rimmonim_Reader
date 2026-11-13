#!/usr/bin/env python3
"""Export the translation as one Markdown file (plus a standalone HTML page and,
optionally, a PDF).

    python3 tools/export_text.py          # writes export/Pardes_Rimmonim.md, .html, images/
    python3 tools/export_text.py --pdf    # also writes export/Pardes_Rimmonim.pdf (needs weasyprint)

Only translated paragraphs are exported, each followed by its Hebrew. The table of
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


def build_markdown():
    t = json.loads((ROOT / "translation.json").read_text(encoding="utf-8"))
    he = json.loads((ROOT / f"{BASENAME}.json").read_text(encoding="utf-8"))["versions"][0]["text"]
    notes = t.get("indexNotes", {})

    def done(g):
        return [any((p or "").strip() for p in ch) for ch in t["text"][g]]

    full = [g for g in range(len(t["text"])) if t["text"][g] and all(done(g))]
    partial = [g for g in range(len(t["text"])) if any(done(g)) and g not in full]

    L = [f"# {t['title']} ({t['heTitle']})", ""]
    L += ["*Orchard of Pomegranates*, by Rabbi Moshe Cordovero (the Ramak), Safed, 16th century. "
          "English translation with the Hebrew text, paragraph by paragraph.", ""]
    status = f"Gates translated so far: {', '.join(str(g + 1) for g in full) or 'none'}"
    if partial:
        status += f" (in progress: {', '.join(str(g + 1) for g in partial)})"
    L += [f"- Online reader: <{SITE_URL}>",
          f"- Source data and history: <{REPO_URL}>",
          "- Hebrew source text from Sefaria (public domain). Translation released under the MIT License.",
          "- The English translation was produced by AI, with terminology rulings by Avi Craimer, "
          "and may contain inaccuracies.",
          f"- {status} of 32.",
          "- References are Gate:Chapter:Paragraph. Each English paragraph is followed by the Hebrew it translates, as a quotation.",
          ""]
    for key in ("about", "translatorNotes"):
        if notes.get(key):
            L += [to_md(notes[key]), ""]

    L += ["## Contents", ""]
    for g, gate in enumerate(t["gates"]):
        L += [f"### Gate {g + 1}: {to_md(gate['title'])} (*{esc_md(gate.get('heTitle', ''))}*)", ""]
        if gate.get("description"):
            L += [to_md(gate["description"]), ""]
        for c, line in enumerate(gate.get("chapters", [])):
            L.append(f"{c + 1}. {to_md(line)}")
        L.append("")
    if notes.get("colophon"):
        L += [to_md(notes["colophon"]), ""]

    for g in full + partial:
        gate = t["gates"][g]
        L += ["---", "", f"## Gate {g + 1}: {to_md(gate['title'])}", ""]
        if gate.get("description"):
            L += [to_md(gate["description"]), ""]
        for c, paras in enumerate(t["text"][g]):
            title = gate["chapters"][c] if c < len(gate.get("chapters", [])) else ""
            L += [f"### Chapter {g + 1}:{c + 1}" + (f". {to_md(title)}" if title else ""), ""]
            for p, en in enumerate(paras):
                if not (en or "").strip():
                    continue
                L += [f"**{g + 1}:{c + 1}:{p + 1}** {to_md(en)}", ""]
                try:
                    h = he[g][c][p]
                except IndexError:
                    h = ""
                if (h or "").strip():
                    L += [blockquote(to_md(h)), ""]
    return "\n".join(L).rstrip() + "\n"


CSS = """
@page { size: A4; margin: 2cm 2cm 2.2cm; @bottom-center { content: counter(page); font-size: 9pt; color: #777; } }
body { font-family: "Noto Serif", "Liberation Serif", "FreeSerif", serif; font-size: 11pt; line-height: 1.45; color: #111; max-width: 46rem; margin: auto; padding: 1rem; }
h1 { font-size: 22pt; } h2 { font-size: 16pt; break-before: page; } h3 { font-size: 12.5pt; break-after: avoid; }
blockquote { direction: rtl; text-align: right; unicode-bidi: plaintext; margin: 0.2em 0 1.1em 2em; padding: 0 0.8em;
  border-right: 2px solid #c9b98f; border-left: none; color: #333;
  font-family: "Noto Serif Hebrew", "Frank Ruehl CLM", "FreeSerif", serif; font-size: 12pt; }
img { display: block; max-width: 100%; max-height: 18cm; margin: 0.8em auto; }
table { border-collapse: collapse; margin: 0.8em auto; } td { border: 1px solid #555; padding: 3px 6px; text-align: center; }
hr { display: none; }
"""


def build_html(md_text):
    import markdown  # pip install markdown

    body = markdown.markdown(md_text, extensions=["extra", "sane_lists"])
    body = body.replace("<blockquote>", '<blockquote dir="rtl" lang="he">')
    return ("<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n"
            "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n"
            "<title>Pardes Rimmonim: English translation with Hebrew</title>\n"
            "<meta name=\"description\" content=\"English translation of Moshe Cordovero's Pardes Rimmonim, "
            "paragraph by paragraph with the Hebrew text.\">\n"
            f"<link rel=\"canonical\" href=\"{SITE_URL}export/{BASENAME}.html\">\n"
            f"<style>{CSS}</style>\n</head>\n<body>\n{body}\n</body>\n</html>\n")


def main():
    OUT.mkdir(exist_ok=True)
    IMG_DIR.mkdir(exist_ok=True)
    md_text = build_markdown()
    (OUT / f"{BASENAME}.md").write_text(md_text, encoding="utf-8")
    page = build_html(md_text)
    (OUT / f"{BASENAME}.html").write_text(page, encoding="utf-8")
    keep = set(written_images.values())
    for f in IMG_DIR.iterdir():
        if f.name not in keep:
            f.unlink()
    print(f"export/{BASENAME}.md: {len(md_text):,} chars, {len(keep)} images")
    if "--pdf" in sys.argv:
        from weasyprint import HTML

        HTML(string=page, base_url=str(OUT)).write_pdf(OUT / f"{BASENAME}.pdf")
        print(f"export/{BASENAME}.pdf: {(OUT / f'{BASENAME}.pdf').stat().st_size:,} bytes")


if __name__ == "__main__":
    main()
