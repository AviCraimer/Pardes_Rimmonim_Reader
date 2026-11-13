#!/usr/bin/env python3
"""Split lexicon.json + aliases.json (schema 1.0) into
  lexicon_translation.json  how Hebrew becomes English: renderings,
                            candidates, decisions, surface forms, notes
  lexicon_reader.json       reader-facing prose and site display settings
(schema 2.0), then rebuild the old structures from the written files with
merge_lexicon.py and compare them strictly with the originals. Exits 1 on any
mismatch. The inputs are never modified.

Usage:
  python3 tools/split_lexicon.py [--lexicon P] [--aliases P] [--out DIR] [--force]
DIR defaults to the repository root. Existing outputs are not overwritten
without --force. See merge_lexicon.py for the field mapping.
"""
import copy, json, os, sys, argparse
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from merge_lexicon import (MergeError, load_json, merge, verify, counts,
                           print_counts, unfold)

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')

TRANSLATION_DESCRIPTION = (
    "Translation lexicon for Pardes Rimmonim: the source of truth for how "
    "Hebrew and Aramaic terms become English. Each entry holds the rulings "
    "(candidates with status preferred / acceptable / rejected, contextNotes "
    "and dated decisions), the translator's working notes, and `rendering`, "
    "the English shown to readers for the entry. surfaceForms[form].rendering "
    "is the English for one particular form (a form keeps a separate `prefer` "
    "only where the old file had both). `cluster: true` marks a working group "
    "of unrelated names and idioms: its popup is headed by the clicked form, "
    "and only forms with their own rendering are highlighted. Notes, "
    "candidates and decisions are never shown on the site. Reader-facing prose "
    "(notes, etymologies, notes on single forms) and display settings (hidden "
    "entries, hideForms, extra highlight forms, skipTokens) live in "
    "lexicon_reader.json under the same entry keys. Schema 2.0, split from "
    "lexicon.json + aliases.json by tools/split_lexicon.py.")

READER_DESCRIPTION = (
    "Reader-facing lexicon text and display settings for the reader site, "
    "keyed by the entry keys of lexicon_translation.json (which holds the "
    "English renderings and the translator's working record). Everything here "
    "is shown to readers or controls what is highlighted. Entry fields: `note` "
    "(popup text and the Lexicon page; entries with a note are listed in the "
    "Lexicon tab), `etymology` (Lexicon page), `forms[form].note` (popup text "
    "for one surface form; a cluster's forms with a rendering and a note are "
    "listed in the Lexicon tab), `hideForms` (forms of the entry never "
    "highlighted), `extraForms` (additional unpointed surface strings to "
    "highlight, formerly aliases.json: single words are matched with Hebrew "
    "prefix/suffix awareness, multi-word forms as exact phrases; they win over "
    "any other claim on the same form; `extraFormsNote` documents them), "
    "`hidden: true` (entry neither highlighted nor listed). Top-level "
    "`skipTokens` lists whole Hebrew tokens that are never highlighted. A "
    "record exists only for entries with something in it. Schema 2.0.")

KNOWN_ENTRY = {'headword', 'transliteration', 'partOfSpeech', 'notes',
               'candidates', 'readerNote', 'readerGloss', 'surfaceForms',
               'etymology', 'hideForms', 'cluster', 'public'}
KNOWN_FORM = {'readerGloss', 'readerNote', 'notes', 'prefer',
              'transliteration', 'candidates', 'decisions'}
TRANSLATION_ORDER = ['headword', 'transliteration', 'partOfSpeech', 'rendering',
                     'cluster', 'candidates', 'surfaceForms', 'notes']
READER_ORDER = ['note', 'etymology', 'forms', 'hideForms', 'extraForms',
                'extraFormsNote', 'hidden']


class SplitError(Exception):
    pass


def split(lex, aliases):
    """Return (translation, reader, report). Inputs are not modified."""
    lex, aliases = copy.deepcopy(lex), copy.deepcopy(aliases)
    rep = {'folded': [], 'both': [], 'unknown_entry': [], 'unknown_form': [],
           'unknown_top': [], 'nondict_forms': [], 'empty_note': [],
           'orphan_aliases': [], 'empty_forms': []}
    if lex.get('schemaVersion') != '1.0':
        raise SplitError(f'lexicon schemaVersion is {lex.get("schemaVersion")!r}, expected "1.0"')
    unknown_al = set(aliases) - {'schemaVersion', 'description', 'aliases'}
    if unknown_al:
        raise SplitError(f'aliases.json: unknown top-level keys {sorted(unknown_al)}')

    T = {'schemaVersion': '2.0', 'sourceLanguage': lex['sourceLanguage'],
         'targetLanguage': lex['targetLanguage'],
         'description': TRANSLATION_DESCRIPTION, 'entries': {}}
    R = {'schemaVersion': '2.0', 'description': READER_DESCRIPTION}
    if 'skipTokens' in lex:
        R['skipTokens'] = lex['skipTokens']
    R['entries'] = {}
    for k in lex:
        if k not in ('schemaVersion', 'sourceLanguage', 'targetLanguage',
                     'entries', 'readerFields', 'skipTokens'):
            T[k] = lex[k]          # never drop unknown data
            rep['unknown_top'].append(k)

    for key, e in lex['entries'].items():
        t, r = {}, {}
        for k, v in e.items():
            if k == 'readerGloss':
                t['rendering'] = v
            elif k == 'readerNote':
                if v == '':
                    rep['empty_note'].append(key)   # rebuilt as "" by merge
                else:
                    r['note'] = v
            elif k in ('etymology', 'hideForms'):
                r[k] = v
            elif k == 'public' and v is False:
                r['hidden'] = True
            elif k == 'surfaceForms':
                tforms = {}
                for form, sf in v.items():
                    if not isinstance(sf, dict):
                        rep['nondict_forms'].append((key, form))
                        tforms[form] = sf
                        continue
                    tf = {}
                    for fk, fv in sf.items():
                        if fk == 'readerGloss':
                            tf['rendering'] = fv
                        elif fk == 'prefer' and 'readerGloss' not in sf:
                            tf['rendering'] = fv
                            rep['folded'].append((key, form, fv))
                        elif fk == 'readerNote':
                            r.setdefault('forms', {})[form] = {'note': fv}
                        else:
                            if fk not in KNOWN_FORM:
                                rep['unknown_form'].append((key, form, fk))
                            tf[fk] = fv
                    if 'prefer' in sf and 'readerGloss' in sf:
                        rep['both'].append((key, form, sf['prefer'], sf['readerGloss']))
                    if not tf:
                        rep['empty_forms'].append((key, form))
                    tforms[form] = tf
                t['surfaceForms'] = tforms
            else:
                if k not in KNOWN_ENTRY or k == 'public':
                    rep['unknown_entry'].append((key, k, v if k == 'public' else '...'))
                t[k] = v
        known = [k for k in TRANSLATION_ORDER if k in t]
        T['entries'][key] = {k: t[k] for k in known + [k for k in t if k not in known]}
        if r:
            R['entries'][key] = r

    for key, spec in aliases.get('aliases', {}).items():
        if not isinstance(spec, dict) or not spec or set(spec) - {'forms', 'note'}:
            raise SplitError(f'aliases.json: cannot map alias {key!r}: {spec!r}')
        if key not in lex['entries']:
            rep['orphan_aliases'].append(key)
        r = R['entries'].setdefault(key, {})
        if 'forms' in spec:
            r['extraForms'] = spec['forms']
        if 'note' in spec:
            r['extraFormsNote'] = spec['note']

    # Reader records in lexicon order (orphan aliases last), fields in READER_ORDER.
    order = [k for k in lex['entries'] if k in R['entries']] + \
            [k for k in R['entries'] if k not in lex['entries']]
    R['entries'] = {k: {f: R['entries'][k][f] for f in READER_ORDER if f in R['entries'][k]}
                    for k in order}
    return T, R, rep


def dump(obj):
    return json.dumps(obj, ensure_ascii=False, indent=1) + '\n'


def report(rep):
    print(f'forms whose lone `prefer` became `rendering`: {len(rep["folded"])}')
    for key, form, v in rep['folded']:
        print(f'  {key} / {form}: {v!r}')
    print(f'forms with both `prefer` and `readerGloss` (prefer kept): {len(rep["both"])}')
    for key, form, p, g in rep['both']:
        print(f'  {key} / {form}: prefer {p!r}, rendering {g!r}'
              + ('' if p == g else '   <-- DIFFERENT'))
    print(f'entries with an empty readerNote (no reader note stored): {rep["empty_note"]}')
    for name, label in (('unknown_top', 'unknown top-level keys kept in translation file'),
                        ('unknown_entry', 'unknown entry fields kept in translation file'),
                        ('unknown_form', 'unknown form fields kept in translation file'),
                        ('nondict_forms', 'surfaceForms values that are not objects (kept)'),
                        ('empty_forms', 'forms left empty in translation file (note only)'),
                        ('orphan_aliases', 'aliases for keys not in the lexicon (kept in reader file)')):
        print(f'{label}: {len(rep[name])}')
        for x in rep[name]:
            print(f'  {x}')


def main():
    ap = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    ap.add_argument('--lexicon', default=os.path.join(ROOT, 'lexicon.json'))
    ap.add_argument('--aliases', default=os.path.join(ROOT, 'aliases.json'))
    ap.add_argument('--out', default=ROOT, help='output directory (default: repo root)')
    ap.add_argument('--force', action='store_true', help='overwrite existing outputs')
    a = ap.parse_args()

    raw_lex = open(a.lexicon, 'rb').read()
    raw_al = open(a.aliases, 'rb').read()
    try:
        lex, aliases = load_json(a.lexicon), load_json(a.aliases)
        T, R, rep = split(lex, aliases)
    except (MergeError, SplitError) as e:
        sys.exit(f'split failed: {e}')
    report(rep)

    tpath = os.path.join(a.out, 'lexicon_translation.json')
    rpath = os.path.join(a.out, 'lexicon_reader.json')
    for p in (tpath, rpath):
        if os.path.exists(p) and not a.force:
            sys.exit(f'{p} exists; use --force to overwrite')
    os.makedirs(a.out, exist_ok=True)
    for p, obj in ((tpath, T), (rpath, R)):
        with open(p, 'w', encoding='utf-8') as f:
            f.write(dump(obj))
        print(f'wrote {p} ({os.path.getsize(p)} bytes, {len(obj["entries"])} entries)')

    # ---- round-trip verification, from the files as written ----
    print('\nverifying: merge(split(old)) against the old files')
    errs = []
    if open(a.lexicon, 'rb').read() != raw_lex or open(a.aliases, 'rb').read() != raw_al:
        errs.append('an input file changed during the split')
    folded = {(k, f) for k, f, _ in rep['folded']}
    T2 = {'entries': {}}
    try:
        T2, R2 = load_json(tpath), load_json(rpath)
        # 1) with the fold list: must rebuild the old data exactly
        new_lex, new_al = merge(T2, R2, folded)
        print_counts(counts(lex, aliases), counts(new_lex, new_al))
        errs += verify(lex, aliases, new_lex, new_al)
        # 2) from the files alone: identical except that folded forms come
        #    back as readerGloss
        plain_lex, plain_al = merge(T2, R2)
        errs += [f'(without fold list) {e}' for e in
                 verify(unfold(lex, folded), aliases, plain_lex, plain_al, quiet=True)]
    except (MergeError, KeyError) as e:
        errs.append(f'merge failed: {e!r}')
    # The new pair must hold exactly the data of the old pair, nothing more:
    # no surviving old field names in either file.
    for key, t in T2['entries'].items():
        for f in ('readerGloss', 'readerNote', 'etymology', 'hideForms'):
            if f in t:
                errs.append(f'translation {key}: still has {f}')
        if t.get('public') is False:
            errs.append(f'translation {key}: still has public=false')
        for form, sf in (t.get('surfaceForms') or {}).items():
            if isinstance(sf, dict) and ('readerGloss' in sf or 'readerNote' in sf):
                errs.append(f'translation {key}/{form}: old reader field left')
    for e in errs:
        print('MISMATCH', e)
    if errs:
        sys.exit(f'VERIFICATION FAILED: {len(errs)} mismatches')
    print('round trip OK: every entry, field, candidate, decision, surface form, '
          'note and alias rebuilt identically; entry order preserved')


if __name__ == '__main__':
    main()
