"""Mark the entries of Gate 23 (Glossary of Titles) in translation.json.

An entry paragraph starts with its title in bold followed by a bracket with the
Hebrew and the transliteration:
    <b>Father</b> [<span dir="rtl" lang="he">אב</span>, <em>av</em>]: ...
This adds markers, changing nothing else:
    <span class="gl-entry-title"><b>Father</b></span> [<span class="gl-entry-he" dir="rtl" lang="he">אב</span>,
    <em class="gl-entry-tl">av</em>]: ...
The title marker is a span around the whole title, because three titles are made
of more than one bold run ("<b>Behind</b> and <b>back parts</b>"). Only the first
Hebrew span and the first <em> inside the bracket are marked.
Verifies that the marked file yields exactly the entries the old pattern found,
and that nothing outside Gate 23's entry paragraphs changed. Run from the repo root.
"""
import json, re, sys

G = 22  # Gate 23, 0-based
OLD_ENTRY = re.compile(r'^\s*<b>([\s\S]*?)</b>\s*\[')
OLD_BRACKET = re.compile(r'^\s*<b>[\s\S]*?</b>\s*\[([\s\S]*?)\]')
NEW_TITLE = re.compile(r'^\s*<span class="gl-entry-title">([\s\S]*?)</span>')
TITLE_REGION = re.compile(r'^(\s*)(<b>[\s\S]*?</b>)(\s*\[)')
NEW_HE = re.compile(r'<span class="gl-entry-he"[^>]*>([\s\S]*?)</span>')
NEW_TL = re.compile(r'<em class="gl-entry-tl">([\s\S]*?)</em>')
TAGS = re.compile(r'<[^>]+>')


def old_extract(html):
    m = OLD_ENTRY.match(html or "")
    if not m:
        return None
    br = OLD_BRACKET.match(html)
    he = br and re.search(r'<span[^>]*lang="he"[^>]*>([\s\S]*?)</span>', br.group(1))
    tl = br and re.search(r'<em>([\s\S]*?)</em>', br.group(1))
    return (TAGS.sub("", m.group(1)).strip(), TAGS.sub("", he.group(1)).strip() if he else "",
            TAGS.sub("", tl.group(1)).strip() if tl else "")


def new_extract(html):
    m = NEW_TITLE.match(html or "")
    if not m:
        return None
    he, tl = NEW_HE.search(html), NEW_TL.search(html)
    return (TAGS.sub("", m.group(1)).strip(), TAGS.sub("", he.group(1)).strip() if he else "",
            TAGS.sub("", tl.group(1)).strip() if tl else "")


def mark(html):
    br = OLD_BRACKET.match(html)
    start, end = br.start(1), br.end(1)          # the bracket's contents
    inner = br.group(1)
    inner = re.sub(r'<span(?=[^>]*lang="he")', '<span class="gl-entry-he"', inner, count=1)
    inner = inner.replace("<em>", '<em class="gl-entry-tl">', 1)
    html = html[:start] + inner + html[end:]
    return TITLE_REGION.sub(r'\1<span class="gl-entry-title">\2</span>\3', html, count=1)


def main():
    raw = open("translation.json", encoding="utf-8").read()
    T = json.loads(raw)
    before = json.loads(raw)
    old, new, changed = [], [], 0
    for c, ch in enumerate(T["text"][G]):
        for p, html in enumerate(ch):
            e = old_extract(html)
            if e is None:
                continue
            if 'class="gl-entry-' in html:
                sys.exit(f"23:{c+1}:{p+1} is already marked; nothing written")
            old.append(((c, p),) + e)
            ch[p] = mark(html)
            changed += 1
    for c, ch in enumerate(T["text"][G]):
        for p, html in enumerate(ch):
            e = new_extract(html)
            if e is not None:
                new.append(((c, p),) + e)
    assert old == new, "marked entries differ from the old parse"
    # Removing the classes must give back the original text exactly.
    unmark = lambda s: re.sub(r'^(\s*)<span class="gl-entry-title">([\s\S]*?)</span>', r'\1\2', s, count=1).replace(' class="gl-entry-he"', "").replace(' class="gl-entry-tl"', "")
    after = json.loads(json.dumps(T))
    for c, ch in enumerate(after["text"][G]):
        after["text"][G][c] = [unmark(x) if isinstance(x, str) else x for x in ch]
    assert after == before, "something other than the marker classes changed"
    out = json.dumps(T, ensure_ascii=False, indent=1)
    open("translation.json", "w", encoding="utf-8").write(out)
    no_he = sum(1 for e in new if not e[2])
    no_tl = sum(1 for e in new if not e[3])
    print(f"marked {changed} entries; parse identical before/after ({len(new)}); "
          f"without a Hebrew span: {no_he}; without a transliteration: {no_tl}")


if __name__ == "__main__":
    main()
