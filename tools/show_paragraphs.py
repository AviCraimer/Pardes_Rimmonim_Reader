#!/usr/bin/env python3
"""Print Hebrew and/or English paragraphs with embedded images replaced by a
short placeholder, so that base64 diagram data never floods a terminal or an
AI agent's context.

Usage:
  python3 tools/show_paragraphs.py 8             # a whole gate
  python3 tools/show_paragraphs.py 8:14-16       # a range of chapters
  python3 tools/show_paragraphs.py 8:25          # a whole chapter
  python3 tools/show_paragraphs.py 8:25:6-8      # a range of paragraphs
  python3 tools/show_paragraphs.py 8:25:7 --en   # English only (--he: Hebrew only)
  python3 tools/show_paragraphs.py 8:25 --strip  # also strip all other HTML tags

References are 1-based: gate[:chapter[-chapter][:paragraph[-paragraph]]].
A paragraph range needs a single chapter.
"""
import json, os, re, sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
IMG = re.compile(r'<img\b[^>]*?src="data:([^;"]+);base64,([^"]*)"[^>]*>', re.S)


def clean(s, strip_tags=False):
    def repl(m):
        kb = len(m.group(2)) * 3 // 4 // 1024
        return f'[IMAGE {m.group(1)}, {kb} KB]'
    s = IMG.sub(repl, s)
    # any other data: URI, e.g. in CSS
    s = re.sub(r'data:[^;"\')]+;base64,[A-Za-z0-9+/=]{100,}', '[DATA URI]', s)
    if strip_tags:
        s = re.sub(r'<[^>]+>', ' ', s)
        s = re.sub(r'[ \t]+', ' ', s).strip()
    return s


def main():
    args = sys.argv[1:]
    if not args or args[0] in ('-h', '--help'):
        print(__doc__); return
    ref = args[0]
    show_he = '--en' not in args
    show_en = '--he' not in args
    strip = '--strip' in args
    parts = ref.split(':')
    g = int(parts[0]) - 1
    T = json.load(open(os.path.join(ROOT, 'translation.json'), encoding='utf-8'))['text']
    H = json.load(open(os.path.join(ROOT, 'Pardes_Rimmonim.json'), encoding='utf-8'))['versions'][0]['text']
    if len(parts) > 1:
        a, _, b = parts[1].partition('-')
        chapters = range(int(a) - 1, int(b or a))
    else:
        chapters = range(len(H[g]))
    if len(parts) > 2 and len(chapters) != 1:
        sys.exit('A paragraph range needs a single chapter.')
    for c in chapters:
        he_ch = H[g][c]
        en_ch = T[g][c] if c < len(T[g]) else []
        n = max(len(he_ch), len(en_ch))
        if len(parts) > 2:
            a, _, b = parts[2].partition('-')
            lo, hi = int(a), int(b or a)
        else:
            lo, hi = 1, n
        for p in range(lo - 1, min(hi, n)):
            print(f'### {g+1}:{c+1}:{p+1}')
            if show_he:
                print('HE:', clean(he_ch[p] if p < len(he_ch) else '', strip))
            if show_en:
                print('EN:', clean(en_ch[p] if p < len(en_ch) else '', strip))
            print()


if __name__ == '__main__':
    main()
