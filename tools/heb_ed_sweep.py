#!/usr/bin/env python3
"""After the Heb. Ed. conversion: paragraphs whose Hebrew has more edition
markers than the English has "Heb. Ed." notes. Broad detector: every
[bracket] with a Hebrew word of 2+ letters that is not a plain note number
(note numbers are 1-3 letters with no final letters and appear as gematria),
(נ"א/ס"א …), (X)[Y] corrections, (אולי צ"ל …), (א"ה …), (ע' …עס"ר / קה"י …).
Usage: python3 tools/heb_ed_sweep.py [GATE-RANGE e.g. 1-8]"""
import json, os, re, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
H = json.load(open(os.path.join(ROOT, 'Pardes_Rimmonim.json')))['versions'][0]['text']
T = json.load(open(os.path.join(ROOT, 'translation.json')))['text']
strip = lambda s: re.sub(r'<[^>]+>', '', re.sub(r'data:[^;"]+;base64,[^"]*', '', s or ''))
GEM = set('אבגדהוזחטיכלמנסעפצקרשת')
def is_note_number(b):
    b = b.replace('"', '').replace("'", '')
    if not (1 <= len(b) <= 3) or any(ch not in GEM for ch in b): return False
    vals = dict(zip('אבגדהוזחטיכלמנסעפצקרשת', [1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90,100,200,300,400]))
    v = [vals[ch] for ch in b]
    return v == sorted(v, reverse=True)   # gematria order (e.g. קג, לב), unlike words such as על, גם
MARK = [re.compile(r'\[([^\[\]]*[א-ת][^\[\]]*)\]'),
        re.compile(r'\((?:נ"א|ס"א|אולי|א"ה|ע\'|עיין|ע"ש)[^()]*\)'),
        re.compile(r'\([^()]*(?:עס"ר|עסיס|קה"י|ק"י|קהלת יעקב|פלח)[^()]*\)')]
lo, hi = (1, 32)
if len(sys.argv) > 1:
    a, _, b = sys.argv[1].partition('-'); lo, hi = int(a), int(b or a)
APPROVED = set(json.load(open(os.path.join(ROOT, 'human_revision_status.json')))['paragraphs'])
for g in range(lo - 1, hi):
    for c, C in enumerate(H[g]):
        for p, P in enumerate(C):
            ref = f'{g+1}:{c+1}:{p+1}'
            if ref in APPROVED or (g == 29 and c == 4): continue
            h = strip(P); found = []
            for rx in MARK:
                for m in rx.finditer(h):
                    body = m.group(1) if rx is MARK[0] else m.group(0)
                    if rx is MARK[0] and is_note_number(body.strip()): continue
                    found.append(m.group(0))
            if not found: continue
            e = strip(T[g][c][p]); n = e.count('Heb. Ed.')
            if len(found) > n:
                print(f'{ref}\t{len(found)} markers / {n} Heb. Ed.\t' + ' | '.join(x[:60] for x in found))
