# "Heb. Ed." conversion: plan and status

Ruling (Avi, 2026-11-20, chat): additions by the Hebrew edition go in parentheses marked "Heb. Ed."; square brackets are the translator's alone. The rule is in `TRANSLATION_CONVENTIONS.md` ("Additions by the Hebrew editor"); the reader-facing note is on the Transliteration Conventions page.

Scheduled to run Friday 20 Nov 2026 from 17:45 (Toronto), with resume checks at 22:45 and 03:45. Update the status list below as each step finishes, and commit it, so a resumed session knows where to pick up.

## Scope

262 paragraphs whose Hebrew has the edition's square brackets (Hebrew words, not note numbers like [יב]) or נ"א / ס"א variant notes. By gate: G1 3, G2 4, G3 5, G4 9, G5 5, G6 3, G7 6, G8 21, G9 2, G10 1, G11 7, G12 15, G13 6, G14 2, G15 7, G16 11, G17 2, G18 8, G19 6, G20 17, G21 8, G22 1, G23 60, G24 15, G25 4, G26 7, G27 7, G28 1, G29 6, G30 2, G31 10, G32 1. Gate 30's alphabet tables are excluded. **1:1:7 is approved by Avi: exclude it; report the omitted bracket [וכן נאמר בספירות ג"כ] to him instead.**

## Forms

- Restoration or gloss: "(Heb. Ed.: in the time of exile)".
- Gloss from Asis Rimonim (bracket ends מעסיס רמונים / מעס"ר): "(Heb. Ed., from Asis Rimonim: …)".
- Variant (נ"א / ס"א): "(Heb. Ed. variant: sapphire)".
- Correction (X) [נ"א Y]: "Y (Heb. Ed. variant; the printed text reads X)".
- A word the edition marks doubtful with parentheses alone, e.g. (ממש): keep the word, add "(Heb. Ed.: doubtful)".
- Old forms to convert: "(another version: …)", "(a variant reads …)", "(a variant: …)", "[another reading: …]", and plain square brackets that render an edition bracket.
- Never change the translator's own square brackets or any other wording. Cordovero's own parentheses take no prefix.
- If the English omitted an edition addition, translate it and add it in the Heb. Ed. form; list it in the report.
- Uncertain cases (can't match the marker to the English; a bracket that might be the translator's): leave unchanged and flag.

## Steps

1. Work list: `tools/heb_ed_worklist.py` (or a script in /mnt/user-data/outputs/claude/pardes_tools/) writes one JSON record per paragraph: ref, edition markers with their class, current English, English square brackets. Save under `notes/heb_ed_worklist/`.
2. Five workers in parallel, each in its own git worktree and branch (`heb-ed-A` … `heb-ed-E`), writing with `tools/put_paragraphs.py --force`, committing on the branch, returning a report (changes, added omissions, flags): A Gates 1–8 (56), B 9–16 (51), C 17–22 (42), D 23 (60), E 24–32 (53).
3. Independent checker (fresh agent): for every changed paragraph against main, only bracket / parenthesis notes changed; each Heb. Ed. note matches the Hebrew; no translator bracket converted; no old forms remain; translation.json round-trips (`json.dumps(T, ensure_ascii=False, indent=1)`, no trailing newline); `tools/revision_check.py --commits` shows no approved paragraph changed.
4. Merge the five branches into main, run the checks, mark the pending line in `notes/pending_conversions.md` converted, regenerate `ATTRIBUTION.md` if needed, commit with `Ruling-by: Avi Craimer`, pull --rebase, push. Report to Avi: added omissions, Asis Rimonim glosses, flagged sites, and 1:1:7.

## Status

- [x] 1 Work list (tools/heb_ed_worklist.py → notes/heb_ed_worklist/A-E.json: 259 paragraphs, 307 markers)
- [x] 2A  - [x] 2B  - [x] 2C  - [x] 2D  - [x] 2E  (done; merged on branch heb-ed-merge with fixes: "Asis Rimmonim" spelling, "variant" only where the Hebrew has נ"א/ס"א)
- [x] 2F sweep (32 paragraphs changed; merged into heb-ed-merge)
- [ ] 3 Checker (running on heb-ed-merge in /home/claude/wt_heb_check; report to /home/claude/heb_ed_check_report.md)
- [ ] 4 Merged and pushed; report sent
