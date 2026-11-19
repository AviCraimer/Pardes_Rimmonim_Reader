#!/usr/bin/env python3
"""Check paragraphs Avi has approved (human_revision_status.json) against the
current text, and show what changed them since.

Each approved paragraph stores approvedHash, the fingerprint of the exact HTML
Avi approved (sha256 of the UTF-8 text, first 16 hex digits). If the paragraph's
current fingerprint differs, it was changed after approval (for example by a
terminology conversion) and needs Avi's re-review in the translation workbench.

Usage:
  python3 tools/revision_check.py                 # summary + changed paragraphs
  python3 tools/revision_check.py --commits       # also the commits that changed each one
  python3 tools/revision_check.py --json [--commits] [--approved-text] [--unit G:C]
                                                  # machine-readable, for the workbench

Run it after any bulk change to translation.json, and name the changed approved
paragraphs in your commit message. It reads git history only with --commits; in
a shallow clone it may ask you to fetch more history.
"""
import hashlib, json, os, subprocess, sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
STATUS = os.path.join(ROOT, 'human_revision_status.json')


def fingerprint(html):
    return hashlib.sha256(html.encode('utf-8')).hexdigest()[:16]


def para(text, ref):
    g, c, p = (int(x) - 1 for x in ref.split(':'))
    try:
        return text[g][c][p]
    except (IndexError, TypeError):
        return None


def git(*args):
    return subprocess.run(['git', '-C', ROOT, *args], capture_output=True, text=True, check=True).stdout


_versions = {}
def text_at(sha):
    if sha not in _versions:
        _versions[sha] = json.loads(git('show', f'{sha}:translation.json'))['text']
    return _versions[sha]


def history(ref, approved_hash, current_hash):
    """Commits (newest first) that changed `ref` since the approved version,
    and the approved HTML if found. Returns (commits, approved_html, complete)."""
    log = git('log', '--format=%H%x09%ad%x09%s', '--date=short', '--', 'translation.json').splitlines()
    changers, newer_hash, newer = [], current_hash, None
    for line in log:
        sha, date, subject = line.split('\t', 2)
        html = para(text_at(sha), ref)
        h = fingerprint(html) if html is not None else None
        if newer is not None and h != newer_hash:
            changers.append(newer)  # the newer commit changed the paragraph
        if h == approved_hash:
            return changers, html, True
        newer_hash, newer = h, {'sha': sha, 'date': date, 'subject': subject}
    return changers, None, False


def main():
    args = sys.argv[1:]
    as_json, want_commits, want_text = '--json' in args, '--commits' in args, '--approved-text' in args
    unit = args[args.index('--unit') + 1] if '--unit' in args else None
    status = json.load(open(STATUS, encoding='utf-8')) if os.path.exists(STATUS) else {'paragraphs': {}}
    text = json.load(open(os.path.join(ROOT, 'translation.json'), encoding='utf-8'))['text']
    out, unchanged = {}, 0
    for ref, st in sorted(status.get('paragraphs', {}).items(), key=lambda kv: [int(x) for x in kv[0].split(':')]):
        if unit and not ref.startswith(unit + ':'):
            continue
        cur = para(text, ref)
        cur_hash = fingerprint(cur) if cur is not None else None
        entry = {'approvedHash': st['approvedHash'], 'approvedAt': st.get('approvedAt'), 'currentHash': cur_hash,
                 'current': cur_hash == st['approvedHash']}
        if entry['current']:
            unchanged += 1
        elif want_commits or want_text:
            try:
                commits, html, complete = history(ref, st['approvedHash'], cur_hash)
                entry['changedBy'] = commits
                entry['historyComplete'] = complete
                if want_text and html is not None:
                    entry['approvedHtml'] = html
            except subprocess.CalledProcessError as e:
                entry['historyError'] = (e.stderr or str(e)).strip()[:300]
        out[ref] = entry
    if as_json:
        json.dump(out, sys.stdout, ensure_ascii=False)
        return
    changed = {r: e for r, e in out.items() if not e['current']}
    print(f'{len(out)} approved paragraphs: {unchanged} unchanged, {len(changed)} changed since approval')
    for ref, e in changed.items():
        print(f'  {ref}  approved {e.get("approvedAt") or "?"}: needs re-review')
        for c in e.get('changedBy', []):
            print(f'      {c["date"]} {c["sha"][:8]} {c["subject"]}')
        if want_commits and not e.get('historyComplete', True):
            print('      (approved version not found in the history here: run `git fetch --deepen=200` and retry)')


if __name__ == '__main__':
    main()
