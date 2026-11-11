#!/usr/bin/env python3
"""Write translated paragraphs into translation.json.
Usage: python3 tools/put_paragraphs.py FILE
FILE is JSON: {"8:2:1": "English text", ...} (gate:chapter:paragraph, one-based).
Refuses to overwrite a non-empty paragraph unless --force is given.
"""
import json, sys, os
root = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
force = '--force' in sys.argv
src = [a for a in sys.argv[1:] if not a.startswith('--')][0]
new = json.load(open(src, encoding='utf-8'))
path = os.path.join(root, 'translation.json')
T = json.load(open(path, encoding='utf-8'))
for ref, text in new.items():
    g, c, p = (int(x) - 1 for x in ref.split(':'))
    old = T['text'][g][c][p]
    if old and not force:
        sys.exit(f'{ref} is already translated; use --force to replace it')
    T['text'][g][c][p] = text
    print(ref, len(text), 'chars')
open(path, 'w', encoding='utf-8').write(json.dumps(T, ensure_ascii=False, indent=1))
