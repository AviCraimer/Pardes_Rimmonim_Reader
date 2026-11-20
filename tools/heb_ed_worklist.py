#!/usr/bin/env python3
"""Work list for the "Heb. Ed." conversion (ruling of 2026-11-20).

One record per paragraph whose Hebrew carries the edition's additions:
square brackets holding Hebrew words (not note numbers such as [יב]),
variant notes (נ"א …) / (ס"א …), and corrections (X) [נ"א Y].
Writes notes/heb_ed_worklist/<A-E>.json. Usage: python3 tools/heb_ed_worklist.py
"""
import json, os, re
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
H = json.load(open(os.path.join(ROOT, 'Pardes_Rimmonim.json')))['versions'][0]['text']
T = json.load(open(os.path.join(ROOT, 'translation.json')))['text']
IMG = re.compile(r'data:[^;"]+;base64,[^"]*')
strip = lambda s: re.sub(r'<[^>]+>', '', IMG.sub('[DATA]', s or ''))
BRK = re.compile(r'\[([^\[\]]+)\]')
VAR = re.compile(r'\((?:נ"א|ס"א|נ״א|ס״א)\s*([^()]*)\)')
CORR = re.compile(r'\(([^()]{1,40})\)\s*\[(?:נ"א|ס"א)\s*([^\]]+)\]')
EXCLUDE = {'1:1:7'}
GROUPS = {'A': range(1, 9), 'B': range(9, 17), 'C': range(17, 23), 'D': range(23, 24), 'E': range(24, 33)}

def markers(h, gate):
    out = []
    for m in CORR.finditer(h):
        out.append({'class': 'correction', 'printed': m.group(1), 'corrected': m.group(2), 'hebrew': m.group(0)})
    corr_spans = [m.span() for m in CORR.finditer(h)]
    inside = lambda m: any(a <= m.start() < b for a, b in corr_spans)
    for m in BRK.finditer(h):
        if inside(m):
            continue
        body = m.group(1).strip()
        if re.fullmatch(r'[א-ת"\'׳״]{1,4}', body):   # note numbers
            continue
        if not re.search(r'[א-ת]{2,}', body):
            continue
        if re.match(r'(?:נ"א|ס"א)', body):
            cls = 'variant'
        elif re.search(r'עסיס|מעס"ר', body):
            cls = 'asis-gloss'
        else:
            cls = 'restoration'
        out.append({'class': cls, 'hebrew': m.group(0)})
    for m in VAR.finditer(h):
        if inside(m):
            continue
        out.append({'class': 'variant', 'hebrew': m.group(0)})
    return out

lists = {k: [] for k in GROUPS}
for g, G in enumerate(H):
    for c, C in enumerate(G):
        for p, P in enumerate(C):
            ref = f'{g+1}:{c+1}:{p+1}'
            if ref in EXCLUDE or (g + 1 == 30 and c + 1 == 5):  # Gate 30 alphabet tables
                continue
            h = strip(P)
            ms = markers(h, g + 1)
            if not ms:
                continue
            e = strip(T[g][c][p])
            rec = {'ref': ref, 'markers': ms,
                   'english_brackets': re.findall(r'\[[^\]]{1,120}\]', e),
                   'english_old_forms': re.findall(r'\((?:another version|a variant|variant|in our texts|other version|another reading)[^)]*\)|\[another reading[^\]]*\]', e)}
            for k, rg in GROUPS.items():
                if g + 1 in rg:
                    lists[k].append(rec)
os.makedirs(os.path.join(ROOT, 'notes/heb_ed_worklist'), exist_ok=True)
for k, L in lists.items():
    json.dump(L, open(os.path.join(ROOT, f'notes/heb_ed_worklist/{k}.json'), 'w'), ensure_ascii=False, indent=1)
    print(k, len(L), 'paragraphs', sum(len(r['markers']) for r in L), 'markers')
