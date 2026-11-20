#!/usr/bin/env python3
"""One-off migration (20 November 2026): add `by` (and `via` where stated) to
every decision in lexicon_translation.json, and name Avi where the lexicon and
TRANSLATION_CONVENTIONS.md said "user".

Conservative by design. A decision is attributed to Avi only when the record
itself says so:
  1. its own rationale names him ("User ruling", "USER RULING", "User picked",
     "Avi chose", "Confirmed by Avi", ...), or
  2. the entry's notes hold a USER RULING dated the same day that names the
     decision's candidate.
Rationales that leave the choice open ("awaiting user", "provisional pending
Avi", "flagged to the user") are the agent's provisional calls: by "Claude".
Everything else is "unattributed", even where Avi probably decided.

Kept for the record, like split_lexicon.py; not part of the normal workflow.
Usage: python3 tools/attribution_migration_2026-11-20.py [--dry-run]
"""
import json, os, re, sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
LEX = os.path.join(ROOT, 'lexicon_translation.json')
CONV = os.path.join(ROOT, 'TRANSLATION_CONVENTIONS.md')
AVI = 'Avi Craimer'

# Wording that records a choice he made (checked before the open-choice test,
# since a ruling can mention a provisional choice it supersedes).
RULED = re.compile(r'USER RULING|\bUser ruling\b|\bUSER \d|\bUser[:]|User (picked|chose|confirmed|correction)|'
                   r'\bAvi (chose|accepted|confirmed)\b|\bAvi:|Confirmed by Avi')
NAMES_HIM = re.compile(r'(?i)\b(user|avi)\b')
LEFT_OPEN = re.compile(r'(?i)await|pending|flag(ged)?\b[^.;]{0,40}\b(user|avi)\b|'
                       r'until the user|not yet ruled|provisional')
REFERS_ELSEWHERE = re.compile(r'(?i)\(user ruling of')   # a consequence of another ruling
NOTE_RULING = re.compile(r'(?i)user ruling|\(user\b|\buser,')
NOTE_NOT = re.compile(r'(?i)by consequence|not yet a user ruling')


def via_of(r):
    for pat, v in (('terminology doc', 'terminology doc'), ('workbench', 'workbench'),
                   ('(chat)', 'chat')):
        if pat in r:
            return v
    return None


def note_segments(entry):
    n = entry.get('notes')
    if isinstance(n, list):
        n = ' | '.join(x for x in n if isinstance(x, str))
    return [s.strip() for s in (n or '').split(' | ')]


def target_words(target):
    return [t.strip().strip("'\"").lower() for t in re.split(r'[/;,]', target or '')
            if len(t.strip()) > 2]


def attribute(entry, cand, dec):
    r = dec.get('rationale', '')
    if RULED.search(r):
        return AVI, 'rationale'
    if NAMES_HIM.search(r):
        if LEFT_OPEN.search(r):
            return 'Claude', 'rationale leaves the choice open'
        if REFERS_ELSEWHERE.search(r):
            return 'unattributed', 'follows from another ruling'
        return AVI, 'rationale'
    date = str(dec.get('timestamp', ''))[:10]
    words = target_words(cand.get('target'))
    for seg in note_segments(entry):
        if (seg.startswith(date) or f'RULING {date}' in seg) and NOTE_RULING.search(seg) \
                and not NOTE_NOT.search(seg) and any(w in seg.lower() for w in words):
            return AVI, 'entry notes'
    return 'unattributed', ''


# "user" -> "Avi" in the text of the records. Order matters.
RENAMES = [
    (r'\ba user ruling\b', 'a ruling by Avi'),
    (r'\bUSER RULING\b', "Avi's ruling"),
    (r'\b[Uu]ser ruling\b', "Avi's ruling"),
    (r'\bUSER-CONFIRMED\b', 'CONFIRMED BY AVI'),
    (r'\b[Uu]ser-(confirmed|corrected|approved)\b', lambda m: f'{m.group(1)} by Avi' if m.group(0)[0] == 'u' else f'{m.group(1).capitalize()} by Avi'),
    (r'\bawaiting user choice\b', "awaiting Avi's choice"),
    (r"\b[Tt]he user's\b", "Avi's"),
    (r"\b[Uu]ser's\b", "Avi's"),
    (r'\b[Tt]he user\b', 'Avi'),
    (r'\bUSER\b', 'Avi'),
    (r'\b[Uu]ser\b', 'Avi'),
]
# "a Avi's ruling" can't arise (the article pattern runs first), but tidy anyway.
FIXES = [(r'\ba Avi\b', 'Avi'), (r"\bAvi's ruling by Avi\b", "Avi's ruling")]


def rename(s):
    for pat, rep in RENAMES + FIXES:
        s = re.sub(pat, rep, s)
    return s


def walk_strings(o):
    if isinstance(o, dict):
        return {k: walk_strings(v) for k, v in o.items()}
    if isinstance(o, list):
        return [walk_strings(v) for v in o]
    if isinstance(o, str):
        return rename(o)
    return o


def main():
    dry = '--dry-run' in sys.argv
    T = json.load(open(LEX, encoding='utf-8'))
    if any('by' in d for e in T['entries'].values() for c in e.get('candidates') or []
           for d in c.get('decisions') or []):
        sys.exit('Already migrated: decisions carry `by`. Running again would misattribute '
                 '(the renamed text no longer says "user"). Nothing changed.')
    tally, report = {}, []
    for key, e in T['entries'].items():
        for c in e.get('candidates') or []:
            for d in c.get('decisions') or []:
                by, why = attribute(e, c, d)
                tally[(by, why)] = tally.get((by, why), 0) + 1
                if why in ('entry notes', 'rationale leaves the choice open', 'follows from another ruling'):
                    report.append(f'{by:13} {why:33} {key} = {c.get("target")}')
                d['by'] = by
                v = via_of(d.get('rationale', ''))
                if v and by == AVI:
                    d['via'] = v
    T['entries'] = walk_strings(T['entries'])
    T['description'] = rename(T['description'])
    for (by, why), n in sorted(tally.items()):
        print(f'{n:4}  {by} ({why or "no attribution in the record"})')
    print('\n'.join(sorted(report)))
    conv = open(CONV, encoding='utf-8').read()
    conv2 = re.sub(r'\(user([,)])', r'(Avi\1', conv)
    conv2 = conv2.replace('Rulings marked **(user)** were made by Avi', 'Rulings marked **(Avi)** were made by Avi Craimer')
    if not dry:
        with open(LEX, 'w', encoding='utf-8') as f:
            f.write(json.dumps(T, ensure_ascii=False, indent=1))
        with open(CONV, 'w', encoding='utf-8') as f:
            f.write(conv2)


if __name__ == '__main__':
    main()
