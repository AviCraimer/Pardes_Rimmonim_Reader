#!/usr/bin/env python3
"""Check lexicon_translation.json and lexicon_reader.json against each other.
Errors (exit 1): unreadable JSON or duplicate keys, wrong schemaVersion, a
reader record whose key has no translation entry (including extraForms), an
unknown or misplaced field (e.g. readerGloss / readerNote left in either file),
a visible non-cluster entry with neither a rendering nor a preferred
candidate, malformed lists.
Warnings: notes on forms that are not in the entry's surfaceForms, hidden
forms, extraForms clashing with other entries, `prefer` left beside a
different `rendering`, and the like.
Usage: python3 tools/check_lexicon.py [--translation P] [--reader P]
"""
import json, os, sys, argparse

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
STATUSES = {'preferred', 'acceptable', 'rejected'}
T_FIELDS = {'headword', 'transliteration', 'partOfSpeech', 'rendering',
            'cluster', 'candidates', 'surfaceForms', 'notes'}
T_FORM_FIELDS = {'rendering', 'prefer', 'notes', 'transliteration',
                 'candidates', 'decisions'}
R_FIELDS = {'note', 'etymology', 'forms', 'hideForms', 'extraForms',
            'extraFormsNote', 'hidden'}
# Old (schema 1.0) names: finding one means someone wrote to the wrong place.
OLD_NAMES = {'readerGloss': 'rendering (lexicon_translation.json)',
             'readerNote': 'note (lexicon_reader.json)',
             'public': 'hidden: true (lexicon_reader.json)'}

errors, warnings = [], []
err = errors.append
warn = warnings.append


def load(path):
    def hook(pairs):
        keys = [k for k, _ in pairs]
        for k in sorted({k for k in keys if keys.count(k) > 1}):
            err(f'{os.path.basename(path)}: duplicate key {k!r}')
        return dict(pairs)
    try:
        with open(path, encoding='utf-8') as f:
            return json.load(f, object_pairs_hook=hook)
    except (OSError, ValueError) as e:
        err(f'{path}: cannot read JSON: {e}')
        return None


def str_list(v):
    return isinstance(v, list) and all(isinstance(x, str) and x.strip() for x in v)


def decision_forms(entry):
    """Surface forms logged in the entry's decisions (what the site uses)."""
    out = set()
    for c in entry.get('candidates') or []:
        for d in (c.get('decisions') or []) if isinstance(c, dict) else []:
            for f in (d.get('surfaceForm') or '').split(' / '):
                if f.strip():
                    out.add(f.strip())
    return out


def check(T, R):
    for name, doc in (('translation', T), ('reader', R)):
        if doc.get('schemaVersion') != '2.0':
            err(f'{name}: schemaVersion is {doc.get("schemaVersion")!r}, expected "2.0"')
        if not isinstance(doc.get('entries'), dict):
            err(f'{name}: `entries` missing or not an object')
            return
    if 'skipTokens' in R and not str_list(R['skipTokens']):
        err('reader: skipTokens must be a list of non-empty strings')
    for k in set(T) - {'schemaVersion', 'sourceLanguage', 'targetLanguage',
                       'description', 'entries'}:
        warn(f'translation: unexpected top-level key {k!r}')
    for k in set(R) - {'schemaVersion', 'description', 'skipTokens', 'entries'}:
        err(f'reader: unknown top-level key {k!r} (the site ignores it)')

    TE, RE = T['entries'], R['entries']
    # surface form -> entry keys that claim it via surfaceForms (for clashes)
    sf_owner = {}
    for key, t in TE.items():
        if isinstance(t, dict):
            for f in (t.get('surfaceForms') or {}):
                sf_owner.setdefault(f, []).append(key)

    # ---- translation entries ----
    for key, t in TE.items():
        if not isinstance(t, dict):
            err(f'translation {key}: entry is not an object')
            continue
        r = RE.get(key) or {}
        for k in t:
            if k in OLD_NAMES:
                err(f'translation {key}: old field {k!r}; use {OLD_NAMES[k]}')
            elif k in R_FIELDS - T_FIELDS:
                err(f'translation {key}: {k!r} belongs in lexicon_reader.json')
            elif k not in T_FIELDS:
                warn(f'translation {key}: unexpected field {k!r}')
        if not t.get('headword'):
            warn(f'translation {key}: no headword')
        cands = t.get('candidates')
        if not isinstance(cands, list):
            err(f'translation {key}: candidates must be a list')
            cands = []
        for i, c in enumerate(cands):
            if not isinstance(c, dict):
                err(f'translation {key}: candidate {i} is not an object')
                continue
            if c.get('status') not in STATUSES:
                err(f'translation {key}: candidate {i} has status {c.get("status")!r}')
            if not c.get('target'):
                warn(f'translation {key}: candidate {i} has no target')
            if not isinstance(c.get('decisions', []), list):
                err(f'translation {key}: candidate {i} decisions must be a list')
        if 'rendering' in t and not (isinstance(t['rendering'], str) and t['rendering'].strip()):
            warn(f'translation {key}: empty rendering')
        if 'cluster' in t and t['cluster'] is not True:
            warn(f'translation {key}: cluster is {t["cluster"]!r} (only true has an effect)')
        sfs = t.get('surfaceForms') or {}
        if not isinstance(sfs, dict):
            err(f'translation {key}: surfaceForms must be an object')
            sfs = {}
        for form, sf in sfs.items():
            if not isinstance(sf, dict):
                warn(f'translation {key}/{form}: form value is not an object')
                continue
            for k in sf:
                if k in OLD_NAMES:
                    err(f'translation {key}/{form}: old field {k!r}; use {OLD_NAMES[k]}')
                elif k not in T_FORM_FIELDS:
                    warn(f'translation {key}/{form}: unexpected field {k!r}')
            if 'prefer' in sf and sf.get('rendering') != sf['prefer']:
                warn(f'translation {key}/{form}: prefer {sf["prefer"]!r} differs from '
                     f'rendering {sf.get("rendering")!r} (the site shows rendering)')
        hidden = r.get('hidden') is True
        is_cluster = t.get('cluster') is True
        has_pref = any(isinstance(c, dict) and c.get('status') == 'preferred' for c in cands)
        if not hidden and not is_cluster and not t.get('rendering') and not has_pref:
            err(f'translation {key}: visible entry with no rendering and no preferred candidate')
        if is_cluster and not hidden and not any(
                isinstance(sf, dict) and (sf.get('rendering') or sf.get('prefer'))
                for sf in sfs.values()):
            warn(f'translation {key}: cluster with no rendered form is never highlighted')

    # ---- reader entries ----
    extra_owner = {}
    for key, r in RE.items():
        if not isinstance(r, dict):
            err(f'reader {key}: record is not an object')
            continue
        t = TE.get(key)
        if t is None or not isinstance(t, dict):
            what = 'extraForms' if 'extraForms' in r else 'record'
            err(f'reader {key}: {what} for an entry key not in lexicon_translation.json')
            t = {}
        if not r:
            warn(f'reader {key}: empty record')
        for k in r:
            if k in OLD_NAMES:
                err(f'reader {key}: old field {k!r}; use {OLD_NAMES[k]}')
            elif k not in R_FIELDS:
                err(f'reader {key}: unknown field {k!r} (the site ignores it)')
        for k in ('note', 'etymology', 'extraFormsNote'):
            if k in r and not (isinstance(r[k], str) and r[k].strip()):
                warn(f'reader {key}: {k} is empty or not a string')
        if 'hidden' in r and r['hidden'] is not True:
            err(f'reader {key}: hidden must be true (omit it otherwise), got {r["hidden"]!r}')
        sfs = t.get('surfaceForms') or {}
        dforms = decision_forms(t) if t.get('cluster') is not True else set()
        hide = set(r.get('hideForms') or [])
        if 'hideForms' in r:
            if not str_list(r['hideForms']):
                err(f'reader {key}: hideForms must be a list of non-empty strings')
            for f in hide:
                if f not in sfs and f not in dforms:
                    warn(f'reader {key}: hideForms {f!r} is not a form of this entry (no effect)')
        if 'extraForms' in r:
            if not str_list(r['extraForms']):
                err(f'reader {key}: extraForms must be a list of non-empty strings')
            else:
                for f in r['extraForms']:
                    f = f.strip()
                    extra_owner.setdefault(f, []).append(key)
                    others = [k for k in sf_owner.get(f, []) if k != key]
                    if others:
                        warn(f'reader {key}: extraForms {f!r} overrides surfaceForms of {others}')
                    if f in sfs:
                        warn(f'reader {key}: extraForms {f!r} is already a surface form')
        forms = r.get('forms')
        if forms is None:
            continue
        if not isinstance(forms, dict):
            err(f'reader {key}: forms must be an object')
            continue
        for form, fr in forms.items():
            if not isinstance(fr, dict) or set(fr) != {'note'}:
                err(f'reader {key}/{form}: forms entry must be {{"note": ...}}, got {fr!r}')
                continue
            if not (isinstance(fr['note'], str) and fr['note'].strip()):
                warn(f'reader {key}/{form}: empty note')
            if form in sfs:
                if form in hide:
                    warn(f'reader {key}/{form}: note on a hidden form (never shown)')
                continue
            via = [m for m, ok in (('decisions', form in dforms),
                                   ('extraForms', form in (r.get('extraForms') or [])))
                   if ok]
            if via:
                warn(f'reader {key}/{form}: note on a form not in surfaceForms '
                     f'(reached only via {" and ".join(via)})')
            else:
                warn(f'reader {key}/{form}: note on a form that is not in surfaceForms '
                     'and is never highlighted for this entry')
    for f, keys in extra_owner.items():
        if len(keys) > 1:
            warn(f'reader: extraForms {f!r} claimed by several entries {keys} (the last wins)')


def main():
    ap = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    ap.add_argument('--translation', default=os.path.join(ROOT, 'lexicon_translation.json'))
    ap.add_argument('--reader', default=os.path.join(ROOT, 'lexicon_reader.json'))
    a = ap.parse_args()
    T, R = load(a.translation), load(a.reader)
    if T is not None and R is not None:
        check(T, R)
        print(f'{len(T.get("entries", {}))} translation entries, '
              f'{len(R.get("entries", {}))} reader records')
    for w in warnings:
        print('WARNING', w)
    for e in errors:
        print('ERROR', e)
    print(f'{len(errors)} errors, {len(warnings)} warnings')
    sys.exit(1 if errors else 0)


if __name__ == '__main__':
    main()
