#!/usr/bin/env python3
"""Print a compact digest of lexicon.json: one block per entry with the Hebrew
forms and the English renderings, leaving out notes, decisions and reader notes.
Usage: python3 tools/lexicon_digest.py [lexicon.json] > digest.txt
       python3 tools/lexicon_digest.py --entry KEY   (full record of one entry)
"""
import json, sys, os
args = sys.argv[1:]
path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'lexicon.json')
if '--entry' in args:
    key = args[args.index('--entry') + 1]
    E = json.load(open(path, encoding='utf-8'))['entries']
    print(json.dumps(E[key], ensure_ascii=False, indent=1)); sys.exit()
if args: path = args[0]
E = json.load(open(path, encoding='utf-8'))['entries']
for key, e in E.items():
    print(f"## {key} | {e.get('headword','')} | {e.get('transliteration','')}")
    if e.get('readerGloss'): print(f"  gloss: {e['readerGloss']}")
    by = {}
    for c in e.get('candidates', []):
        by.setdefault(c.get('status', '?'), []).append(c.get('target', ''))
    for st, ts in by.items():
        print(f"  {st}: " + '; '.join(ts))
    for f, v in (e.get('surfaceForms') or {}).items():
        g = v.get('readerGloss') or v.get('gloss') or v.get('target') or '' if isinstance(v, dict) else str(v)
        print(f"  {f} = {g}" if g else f"  {f}")
