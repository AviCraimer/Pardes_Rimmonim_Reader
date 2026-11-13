#!/usr/bin/env python3
"""Print a compact digest of lexicon_translation.json: one block per entry with
the Hebrew forms and the English renderings, leaving out notes, decisions and
everything in lexicon_reader.json.
Usage: python3 tools/lexicon_digest.py [lexicon_translation.json] > digest.txt
       python3 tools/lexicon_digest.py --entry KEY [lexicon_translation.json]
       (full translation record of one entry, then its reader record from the
       lexicon_reader.json beside it, if any)
"""
import json, sys, os
args = sys.argv[1:]
path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'lexicon_translation.json')
if '--entry' in args:
    i = args.index('--entry')
    key = args[i + 1]
    rest = args[:i] + args[i + 2:]
    if rest: path = rest[0]
    E = json.load(open(path, encoding='utf-8'))['entries']
    print(json.dumps(E[key], ensure_ascii=False, indent=1))
    rpath = os.path.join(os.path.dirname(os.path.abspath(path)), 'lexicon_reader.json')
    R = json.load(open(rpath, encoding='utf-8'))['entries'] if os.path.exists(rpath) else {}
    if key in R:
        print('# reader record (lexicon_reader.json)')
        print(json.dumps(R[key], ensure_ascii=False, indent=1))
    sys.exit()
if args: path = args[0]
E = json.load(open(path, encoding='utf-8'))['entries']
for key, e in E.items():
    print(f"## {key} | {e.get('headword','')} | {e.get('transliteration','')}")
    if e.get('rendering'): print(f"  gloss: {e['rendering']}")
    by = {}
    for c in e.get('candidates', []):
        by.setdefault(c.get('status', '?'), []).append(c.get('target', ''))
    for st, ts in by.items():
        print(f"  {st}: " + '; '.join(ts))
    for f, v in (e.get('surfaceForms') or {}).items():
        g = v.get('rendering') or v.get('gloss') or v.get('target') or '' if isinstance(v, dict) else str(v)
        print(f"  {f} = {g}" if g else f"  {f}")
