#!/usr/bin/env python3
"""Show translation progress: per gate, how many paragraphs are filled, and the
first untranslated paragraph. Images and empty Hebrew paragraphs are ignored.

Usage: python3 tools/progress.py
"""
import json, os, re

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
T = json.load(open(os.path.join(ROOT, 'translation.json'), encoding='utf-8'))['text']
H = json.load(open(os.path.join(ROOT, 'Pardes_Rimmonim.json'), encoding='utf-8'))['versions'][0]['text']

first = None
for g, G in enumerate(H):
    total = done = 0
    for c, ch in enumerate(G):
        for p, x in enumerate(ch):
            if not re.sub(r'<[^>]+>|\s', '', x) and '<img' not in x:
                continue
            total += 1
            en = T[g][c][p] if g < len(T) and c < len(T[g]) and p < len(T[g][c]) else ''
            if en.strip():
                done += 1
            elif first is None:
                first = f'{g+1}:{c+1}:{p+1}'
    mark = 'done' if done == total else ('-' if done == 0 else 'partial')
    print(f'Gate {g+1:2}: {done:4}/{total:<4} {mark}')
print('First untranslated paragraph:', first)
