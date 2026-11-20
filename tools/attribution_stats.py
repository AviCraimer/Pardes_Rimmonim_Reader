#!/usr/bin/env python3
"""Who made the translation's decisions: statistics from the records.

Counts what the records themselves show, and nothing more:
  - terminology decisions in lexicon_translation.json, by `by` (see LEXICON.md,
    "Attribution"), by month, and for Avi's rulings by `via`;
  - rules in TRANSLATION_CONVENTIONS.md and decisions in EDITORIAL_DECISIONS.md,
    by their attribution tags: (Avi, date, via), (Claude, date), (unattributed);
  - paragraphs Avi has approved (human_revision_status.json) against all
    translated paragraphs;
  - commits by author, and commits carrying a `Ruling-by: Avi Craimer` trailer.

Usage:
  python3 tools/attribution_stats.py              print the summary
  python3 tools/attribution_stats.py --markdown   also write ATTRIBUTION.md
"""
import collections, json, os, re, subprocess, sys, datetime

ROOT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
AVI = 'Avi Craimer'
ORDER = [AVI, 'Claude', 'unattributed']


def load(name):
    with open(os.path.join(ROOT, name), encoding='utf-8') as f:
        return json.load(f)


def lexicon_stats():
    E = load('lexicon_translation.json')['entries']
    by = collections.Counter()
    month = collections.defaultdict(collections.Counter)
    via = collections.Counter()
    entries_ruled = set()
    cands = rejected = 0
    for key, e in E.items():
        for c in e.get('candidates') or []:
            cands += 1
            rejected += c.get('status') == 'rejected'
            for d in c.get('decisions') or []:
                who = d.get('by', 'missing')
                by[who] += 1
                month[str(d.get('timestamp', ''))[:7] or 'undated'][who] += 1
                if who == AVI:
                    entries_ruled.add(key)
                    via[d.get('via', 'not recorded')] += 1
    return dict(entries=len(E), candidates=cands, rejected=rejected, by=by,
                month=month, via=via, entries_ruled=len(entries_ruled))


TAG = re.compile(r'\((Avi|Claude)(?:, (\d{4}-\d{2}-\d{2}))(?:, ([a-z ]+?))?[):]|\((unattributed)\)')


def tag_stats(name):
    """Count attribution tags in a Markdown file, after its introduction (the first '## ')."""
    path = os.path.join(ROOT, name)
    if not os.path.exists(path):
        return None
    with open(path, encoding='utf-8') as f:
        text = f.read()
    i = text.find('\n## ')
    body = text[i:] if i >= 0 else text
    by = collections.Counter()
    via = collections.Counter()
    for m in TAG.finditer(body):
        who = m.group(1) or m.group(4)
        by[who] += 1
        if who == 'Avi':
            via[m.group(3) or 'not recorded'] += 1
    by[AVI] = by.pop('Avi', 0)
    return dict(by=by, via=via)


def paragraph_stats():
    approved = len(load('human_revision_status.json').get('paragraphs', {}))
    total = 0
    stack = [load('translation.json')['text']]
    while stack:
        o = stack.pop()
        if isinstance(o, list):
            stack.extend(o)
        elif isinstance(o, str) and o.strip():
            total += 1
    return approved, total


def git(*args):
    r = subprocess.run(['git', '-C', ROOT, *args], capture_output=True, text=True)
    return r.stdout if r.returncode == 0 else None


def git_stats():
    if (git('rev-parse', '--is-shallow-repository') or '').strip() != 'false':
        return None
    authors = collections.Counter(a for a in (git('log', '--format=%an') or '').splitlines() if a)
    trailers = git('log', '--format=%(trailers:key=Ruling-by,valueonly)%x00') or ''
    ruling_commits = sum(1 for t in trailers.split('\x00') if AVI in t)
    return dict(authors=authors, ruling_commits=ruling_commits)


def pct(n, d):
    if not d:
        return '-'
    v = 100 * n / d
    return f'{v:.1f}%' if v < 1 else f'{v:.0f}%'


def build():
    L = lexicon_stats()
    conv = tag_stats('TRANSLATION_CONVENTIONS.md')
    edit = tag_stats('EDITORIAL_DECISIONS.md')
    approved, total = paragraph_stats()
    G = git_stats()
    n = sum(L['by'].values())
    out = []
    out.append('## Terminology decisions (`lexicon_translation.json`)\n')
    out.append(f'{L["entries"]} entries, {L["candidates"]} candidate renderings '
               f'({L["rejected"]} rejected), {n} dated decisions.\n')
    out.append('| Decided by | Decisions | Share |\n|---|---:|---:|')
    for who in ORDER + sorted(set(L['by']) - set(ORDER)):
        if L['by'][who]:
            out.append(f'| {who} | {L["by"][who]} | {pct(L["by"][who], n)} |')
    out.append(f'\nAvi\'s rulings touch {L["entries_ruled"]} of the {L["entries"]} entries. '
               'Where he gave them: ' + ', '.join(f'{v} {k}' for k, v in L['via'].most_common()) + '.\n')
    out.append('By month:\n\n| Month | ' + ' | '.join(ORDER) + ' |\n|---|' + '---:|' * len(ORDER))
    for m in sorted(L['month']):
        out.append(f'| {m} | ' + ' | '.join(str(L['month'][m][w]) for w in ORDER) + ' |')
    out.append('\n"unattributed" means the record does not say who decided. Before '
               '20 November 2026 decisions were not tagged; the migration of that date '
               'credited Avi only where the record names him, so some earlier decisions '
               'that were his may be counted here as unattributed.\n')
    for title, fname, T in (('Conventions', 'TRANSLATION_CONVENTIONS.md', conv),
                            ('Editorial decisions', 'EDITORIAL_DECISIONS.md', edit)):
        if T is None:
            continue
        k = sum(T['by'].values())
        out.append(f'## {title} (`{fname}`)\n')
        out.append(f'{k} tagged rules and rulings: ' + ', '.join(
            f'{w} {T["by"][w]}' for w in ORDER + sorted(set(T['by']) - set(ORDER)) if T['by'][w]) + '.' +
            (' Avi\'s, by where he gave them: ' + ', '.join(f'{v} {w}' for w, v in T['via'].most_common()) + '.'
             if T['via'] else '') + '\n')
    out.append('## Paragraphs revised and approved by Avi\n')
    out.append(f'{approved} of {total} translated paragraphs ({pct(approved, total)}) are approved in the '
               'translation workbench (`human_revision_status.json`), each with a fingerprint of the '
               'exact text he approved.\n')
    out.append('## Commits\n')
    if G is None:
        out.append('Not computed: this is a shallow clone.\n')
    else:
        tot = sum(G['authors'].values())
        out.append(f'{tot} commits: ' + ', '.join(f'{a} {c}' for a, c in G['authors'].most_common()) + '. '
                   'Commit authorship shows who typed or pushed a change, not who decided it. '
                   f'{G["ruling_commits"]} commits carry a `Ruling-by: {AVI}` trailer '
                   '(the convention began on 20 November 2026).\n')
    return '\n'.join(out)


def main():
    body = build()
    print(body)
    if '--markdown' in sys.argv:
        head = ('# Attribution\n\n*Generated by `python3 tools/attribution_stats.py --markdown` on '
                f'{datetime.date.today().isoformat()}. Don\'t edit by hand.*\n\n'
                'Who made the decisions behind this translation, as far as the records show. '
                'Claude drafts the English; Avi Craimer makes the terminology rulings, sets the '
                'conventions and revises the text. The rules for recording attribution are in '
                '`LEXICON.md` ("Attribution") and `CLAUDE.md`.\n\n')
        with open(os.path.join(ROOT, 'ATTRIBUTION.md'), 'w', encoding='utf-8') as f:
            f.write(head + body + '\n')


if __name__ == '__main__':
    main()
