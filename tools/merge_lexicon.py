#!/usr/bin/env python3
"""Rebuild the old (schema 1.0) lexicon.json + aliases.json structures from
the split pair lexicon_translation.json + lexicon_reader.json (schema 2.0),
and compare them strictly with the originals. split_lexicon.py uses this to
prove the split loses nothing.

Usage:
  python3 tools/merge_lexicon.py [--translation P] [--reader P] [--out DIR]
      write the rebuilt lexicon.json and aliases.json into DIR
  python3 tools/merge_lexicon.py [--translation P] [--reader P] \\
      --verify-against OLD_LEXICON OLD_ALIASES
      compare the rebuilt structures with the old files; exit 1 on mismatch

Field mapping (old -> new), reversed here:
  entry.readerGloss            -> translation entry.rendering
  entry.readerNote             -> reader entry.note ("" is not stored)
  entry.etymology              -> reader entry.etymology
  entry.hideForms              -> reader entry.hideForms
  entry.public === false       -> reader entry.hidden = true
  surfaceForms[f].readerGloss  -> translation surfaceForms[f].rendering
  surfaceForms[f].prefer       -> translation surfaceForms[f].rendering when
                                  the form had no readerGloss; kept as
                                  `prefer` when it had both
  surfaceForms[f].readerNote   -> reader entry.forms[f].note
  aliases[k].forms / .note     -> reader entry.extraForms / .extraFormsNote
  lexicon.skipTokens           -> reader skipTokens
  lexicon.readerFields, aliases.description: doc strings, replaced by the
  `description` of the two new files (not rebuilt).
A form whose `prefer` was folded into `rendering` is rebuilt as `readerGloss`
unless the fold list from split_lexicon.split() is passed in.
"""
import json, os, sys, argparse

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')

# Order of fields in a rebuilt schema-1.0 entry (the commonest order in the
# old file). JSON object order carries no meaning; it is reported, not enforced.
OLD_ENTRY_ORDER = ['headword', 'transliteration', 'partOfSpeech', 'public',
                   'etymology', 'notes', 'candidates', 'readerNote',
                   'readerGloss', 'cluster', 'hideForms', 'surfaceForms']
READER_FIELDS = ['note', 'etymology', 'forms', 'hideForms', 'extraForms',
                 'extraFormsNote', 'hidden']
READER_FORM_FIELDS = ['note']


class MergeError(Exception):
    pass


def load_json(path):
    """Load JSON, refusing duplicate object keys (json.load keeps the last)."""
    def hook(pairs):
        seen = set()
        for k, _ in pairs:
            if k in seen:
                raise MergeError(f'{path}: duplicate key {k!r}')
            seen.add(k)
        return dict(pairs)
    with open(path, encoding='utf-8') as f:
        return json.load(f, object_pairs_hook=hook)


def merge_form(key, form, tf, rform, restore_prefer):
    """Rebuild one old surfaceForms value from its translation object and the
    reader's forms[form] object (or None)."""
    if not isinstance(tf, dict):
        if rform is not None:
            raise MergeError(f'{key}/{form}: reader note on a non-object form')
        return tf
    if restore_prefer and 'prefer' in tf:
        raise MergeError(f'{key}/{form}: folded form still has `prefer`')
    out = {}
    for k, v in tf.items():
        if k == 'rendering':
            out['prefer' if restore_prefer else 'readerGloss'] = v
        else:
            out[k] = v
    if rform is not None:
        if not isinstance(rform, dict) or set(rform) - set(READER_FORM_FIELDS):
            raise MergeError(f'{key}/{form}: unexpected reader form {rform!r}')
        if 'note' in rform:
            out['readerNote'] = rform['note']
    return out


def merge(T, R, folded=None):
    """Return (lexicon, aliases) in the old schema-1.0 shape.
    T, R: parsed lexicon_translation.json / lexicon_reader.json.
    folded: optional set of (entryKey, form) whose `rendering` came from a
    lone `prefer`; those are rebuilt as `prefer` instead of `readerGloss`."""
    folded = set(folded or ())
    TE, RE = T['entries'], R.get('entries', {})
    for key, r in RE.items():
        if not isinstance(r, dict):
            raise MergeError(f'reader {key}: record is not an object')
        unknown = set(r) - set(READER_FIELDS)
        if unknown:
            raise MergeError(f'reader {key}: unknown fields {sorted(unknown)}')
        if key not in TE and set(r) - {'extraForms', 'extraFormsNote'}:
            raise MergeError(f'reader {key}: no translation entry to hold it')
        if 'hidden' in r and r['hidden'] is not True:
            raise MergeError(f'reader {key}: hidden must be true, got {r["hidden"]!r}')

    entries = {}
    for key, t in TE.items():
        r = RE.get(key, {})
        d = {}
        for k, v in t.items():
            if k == 'rendering':
                d['readerGloss'] = v
            elif k == 'surfaceForms':
                rforms = r.get('forms', {})
                sf = {}
                for form, tf in v.items():
                    sf[form] = merge_form(key, form, tf, rforms.get(form),
                                          (key, form) in folded)
                for form, rf in rforms.items():   # note on a form unknown to T
                    if form not in v:
                        sf[form] = merge_form(key, form, {}, rf, False)
                d['surfaceForms'] = sf
            else:
                d[k] = v
        if r.get('forms') and 'surfaceForms' not in t:
            d['surfaceForms'] = {f: merge_form(key, f, {}, rf, False)
                                 for f, rf in r['forms'].items()}
        d['readerNote'] = r.get('note', '')
        if 'etymology' in r:
            d['etymology'] = r['etymology']
        if 'hideForms' in r:
            d['hideForms'] = r['hideForms']
        if r.get('hidden') is True:
            d['public'] = False
        known = [k for k in OLD_ENTRY_ORDER if k in d]
        entries[key] = {k: d[k] for k in known + [k for k in d if k not in known]}

    lex = {'schemaVersion': '1.0',
           'sourceLanguage': T['sourceLanguage'],
           'targetLanguage': T['targetLanguage'],
           'entries': entries}
    if 'skipTokens' in R:
        lex['skipTokens'] = R['skipTokens']
    for k, v in T.items():   # unknown top-level data kept by the split
        if k not in ('schemaVersion', 'sourceLanguage', 'targetLanguage',
                     'description', 'entries'):
            lex[k] = v

    aliases = {}
    for key, r in RE.items():
        if 'extraForms' in r or 'extraFormsNote' in r:
            spec = {}
            if 'extraForms' in r:
                spec['forms'] = r['extraForms']
            if 'extraFormsNote' in r:
                spec['note'] = r['extraFormsNote']
            aliases[key] = spec
    return lex, {'schemaVersion': '1.0', 'aliases': aliases}


# ---- strict comparison ----

def _fmt(path):
    return '/'.join(str(p) for p in path) or '(root)'


def strict_compare(a, b, path, errs, order_exempt=lambda p: False):
    """Append to errs every difference between a (old) and b (rebuilt):
    types must match exactly (True is not 1), every key and list item is
    compared, and dict key order must match unless order_exempt(path)."""
    if type(a) is not type(b):
        errs.append(f'{_fmt(path)}: type {type(a).__name__} became {type(b).__name__}')
        return
    if isinstance(a, dict):
        for k in a:
            if k not in b:
                errs.append(f'{_fmt(path + (k,))}: missing after round trip')
        for k in b:
            if k not in a:
                errs.append(f'{_fmt(path + (k,))}: added by round trip')
        ka = [k for k in a if k in b]
        kb = [k for k in b if k in a]
        if ka != kb and not order_exempt(path):
            errs.append(f'{_fmt(path)}: key order changed')
        for k in ka:
            strict_compare(a[k], b[k], path + (k,), errs, order_exempt)
    elif isinstance(a, list):
        if len(a) != len(b):
            errs.append(f'{_fmt(path)}: list length {len(a)} became {len(b)}')
        for i, (x, y) in enumerate(zip(a, b)):
            strict_compare(x, y, path + (i,), errs, order_exempt)
    elif a != b:
        errs.append(f'{_fmt(path)}: {a!r} became {b!r}')


def unfold(old_lex, folded):
    """Copy of old_lex with each folded form's lone `prefer` renamed to
    `readerGloss` (in place in the key order): what merge() rebuilds when it
    is not given the fold list."""
    lex = json.loads(json.dumps(old_lex))
    for key, form in folded:
        sf = lex['entries'][key]['surfaceForms'][form]
        assert 'readerGloss' not in sf and 'prefer' in sf
        lex['entries'][key]['surfaceForms'][form] = {
            ('readerGloss' if k == 'prefer' else k): v for k, v in sf.items()}
    return lex


def counts(lex, aliases):
    """Counts over an old-shape (lexicon, aliases) pair."""
    c = dict.fromkeys(
        ['entries', 'candidates', 'candidate decisions', 'surface forms',
         'form candidates', 'form decisions', 'entry readerGloss',
         'form readerGloss', 'form prefer', 'reader notes (non-empty)',
         'etymologies', 'forms with readerNote', 'hideForms entries',
         'cluster entries', 'hidden (public=false)', 'alias entries',
         'alias forms', 'alias notes', 'skipTokens'], 0)
    for e in lex['entries'].values():
        c['entries'] += 1
        for cand in e.get('candidates', []):
            c['candidates'] += 1
            c['candidate decisions'] += len(cand.get('decisions') or [])
        c['entry readerGloss'] += 'readerGloss' in e
        c['reader notes (non-empty)'] += bool(e.get('readerNote'))
        c['etymologies'] += 'etymology' in e
        c['hideForms entries'] += 'hideForms' in e
        c['cluster entries'] += 'cluster' in e
        c['hidden (public=false)'] += e.get('public') is False
        for sf in (e.get('surfaceForms') or {}).values():
            c['surface forms'] += 1
            if not isinstance(sf, dict):
                continue
            c['form candidates'] += len(sf.get('candidates') or [])
            c['form decisions'] += len(sf.get('decisions') or [])
            c['form readerGloss'] += 'readerGloss' in sf
            c['form prefer'] += 'prefer' in sf
            c['forms with readerNote'] += 'readerNote' in sf
    for spec in aliases.get('aliases', {}).values():
        c['alias entries'] += 1
        c['alias forms'] += len(spec.get('forms') or [])
        c['alias notes'] += 'note' in spec
    c['skipTokens'] = len(lex.get('skipTokens') or [])
    return c


def print_counts(old, new, label_old='old', label_new='rebuilt'):
    w = max(len(k) for k in old)
    print(f'  {"":{w}}  {label_old:>8}  {label_new:>8}')
    for k in old:
        mark = '' if old[k] == new.get(k) else '   <-- DIFFERS'
        print(f'  {k:{w}}  {old[k]:>8}  {new.get(k, "-"):>8}{mark}')


def verify(old_lex, old_aliases, new_lex, new_aliases, quiet=False):
    """Strictly compare the old files with a rebuild. Returns the list of
    errors (empty = identical modulo the documented doc strings)."""
    errs = []
    a = {k: v for k, v in old_lex.items() if k != 'readerFields'}
    # Every dict's key order is checked except the fields of an entry,
    # whose order varied in the old file and is normalised by the split.
    exempt = lambda p: len(p) == 2 and p[0] == 'entries'
    strict_compare(a, new_lex, (), errs, exempt)
    if list(old_lex['entries']) != list(new_lex['entries']):
        errs.append('entries: order of entry keys changed')
    strict_compare(old_aliases.get('aliases', {}), new_aliases.get('aliases', {}),
                   ('aliases',), errs, lambda p: p == ('aliases',))
    # Belt and braces: canonical serialisations must be identical too.
    canon = lambda x: json.dumps(x, ensure_ascii=False, sort_keys=True)
    if canon(a) != canon(new_lex):
        errs.append('canonical JSON of the lexicon differs')
    if canon(old_aliases.get('aliases', {})) != canon(new_aliases.get('aliases', {})):
        errs.append('canonical JSON of the aliases differs')
    if not quiet:
        reordered = sum(1 for k, e in old_lex['entries'].items()
                        if k in new_lex['entries']
                        and list(e) != list(new_lex['entries'][k]))
        print(f'  entry field order normalised in {reordered} of '
              f'{len(old_lex["entries"])} entries (not an error)')
        if list(old_aliases.get('aliases', {})) != list(new_aliases.get('aliases', {})):
            print('  alias key order differs (follows the lexicon order now; not an error)')
        print('  not rebuilt (doc strings): lexicon.readerFields, aliases.description; '
              f'schemaVersion {old_aliases.get("schemaVersion")!r} of aliases.json')
    return errs


def main():
    ap = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    ap.add_argument('--translation', default=os.path.join(ROOT, 'lexicon_translation.json'))
    ap.add_argument('--reader', default=os.path.join(ROOT, 'lexicon_reader.json'))
    ap.add_argument('--out', help='directory for the rebuilt lexicon.json and aliases.json')
    ap.add_argument('--verify-against', nargs=2, metavar=('OLD_LEXICON', 'OLD_ALIASES'))
    a = ap.parse_args()
    if not a.out and not a.verify_against:
        ap.error('give --out and/or --verify-against')
    try:
        lex, aliases = merge(load_json(a.translation), load_json(a.reader))
    except MergeError as e:
        sys.exit(f'merge failed: {e}')
    if a.out:
        os.makedirs(a.out, exist_ok=True)
        for name, obj in (('lexicon.json', lex), ('aliases.json', aliases)):
            with open(os.path.join(a.out, name), 'w', encoding='utf-8') as f:
                f.write(json.dumps(obj, ensure_ascii=False, indent=1) + '\n')
        print(f'wrote lexicon.json and aliases.json to {a.out}')
    if a.verify_against:
        old_lex, old_al = (load_json(p) for p in a.verify_against)
        # Without the split's fold list, folded forms come back as readerGloss.
        folded = {(k, f) for k, e in old_lex['entries'].items()
                  for f, sf in (e.get('surfaceForms') or {}).items()
                  if isinstance(sf, dict) and 'prefer' in sf and 'readerGloss' not in sf}
        print(f'{len(folded)} forms with a lone `prefer` compared as `readerGloss`'
              ' (the counts below treat them so on both sides)')
        old_lex = unfold(old_lex, folded)
        print_counts(counts(old_lex, old_al), counts(lex, aliases))
        errs = verify(old_lex, old_al, lex, aliases)
        for e in errs:
            print('MISMATCH', e)
        if errs:
            sys.exit(f'{len(errs)} mismatches')
        print('round trip OK')


if __name__ == '__main__':
    main()
