# Pardes Rimmonim Reader

An English translation of Moses Cordovero's *Pardes Rimmonim*, with the Hebrew alongside, published as a reader site (`index.html`, `script.js`, `style.css`). Avi Craimer makes the terminology rulings; the translator proposes and records them.

## Read first, in this order

1. **`TRANSLATION_CONVENTIONS.md`**: the general rules (and **`EDITORIAL_DECISIONS.md`** for decisions about the book and the site): grammar ("the … ones", folded cognate objects), one English word per term, and house style (Hebrew markup, citations, brackets, gate titles).
2. **`LEXICON.md`**: how the two lexicon files are organised and what goes in each.
3. **The lexicon itself, through the digest:** `python3 tools/lexicon_digest.py` (all renderings), or `--entry KEY` for one entry's full record. Don't read the lexicon JSON whole.
4. **`notes/pending_conversions.md`**: rulings that earlier gates do not yet follow (don't convert those sites unless asked), and, at the end, **Terminology to rule on**: choices made without a ruling, kept for Avi to review. Add to it whenever you make such a choice.
5. **The reading notes for the gate you are working on**, if any (e.g. `notes/gate8_preview.md`).

Don't read `Terminology_Update_Plan_DONE_2026-11-10.md` or `logs/`. They are the finished record of an earlier conversion and are kept for history only.

## The data files

- **`translation.json`**:
  - `text[g][c][p]` holds the English paragraphs as HTML strings.
  - `gates[g]` holds the English contents: `title`, `description`, and `chapters` (one line per chapter).
  - `introduction` holds Cordovero's Author's Introduction, a list of English paragraphs.
  - `indexNotes` holds the front-matter notes (`transliteration` is shown as "Transliteration Conventions").
- **`Pardes_Rimmonim.json`**: the Hebrew, at `versions[0].text[g][c][p]`; the introduction at `versions[0].introduction[p]`, split into the same paragraphs as the English (keep the two lists parallel). This file is compact JSON (`ensure_ascii=False`, no indent, no trailing newline).
- **`Pardes_Rimmonim_Index.json`**: the Hebrew table of contents.
- **`lexicon_translation.json`** and **`lexicon_reader.json`**: see `LEXICON.md`.

Indices in the files are 0-based. References in conversation, commits and tools are 1-based: 8:25:7 is `text[7][24][6]`.

**Never print these files or whole paragraphs from them raw.** They embed base64 diagram images, some over 150,000 characters. Use the tools:

- `python3 tools/show_paragraphs.py REF [--he|--en] [--strip]`: read a gate (`8`), chapters (`8:14-16`), a chapter (`8:25`) or paragraphs (`8:25:6-8`), with images shown as placeholders.
- In your own scripts, substitute `re.sub(r'data:[^;"]+;base64,[^"]*', '[DATA]', s)` before printing.
- `python3 tools/put_paragraphs.py FILE`: write paragraphs from a JSON file `{"8:2:1": "text", …}`. It refuses to overwrite a filled paragraph unless given `--force`.
- `python3 tools/check_lexicon.py`: run after any lexicon edit; it must report 0 errors.
- `python3 tools/progress.py`: paragraphs translated per gate, and the first untranslated paragraph.

Front matter order on the site and in the exports: table of contents, Transliteration Conventions, Author's Introduction, Gate 1.

## How a gate is translated

1. **Read the whole gate in Hebrew first** (`show_paragraphs.py G --he`), against the lexicon digest. Note terms that have no ruling, and rulings the gate seems to strain.
2. **Ask Avi for rulings** where a real choice is needed: show the passages, give the candidates and say which you prefer. Don't invent choices for the sake of asking. Record each ruling in `lexicon_translation.json`, which is the file to work in while translating, with the attribution described below. Then check whether the entry has a record in `lexicon_reader.json`; if it does, make sure its reader note and etymology still agree with the ruling, and update them if not. List any earlier sites the ruling affects in `notes/pending_conversions.md`.
3. **Translate chapter by chapter**, following the conventions and the lexicon. Flag textual problems (apparent corruptions, uncertain readings, missing diagrams) in your report rather than silently fixing them.
4. **Commit after each chunk and push after about each third of a chapter.** Others edit the site code in the same repo, so always `git pull --rebase` before pushing. End commit messages with the attribution lines your session specifies.

## Attribution

The record must show whose judgment shaped the translation, not only who typed it. The format is in `LEXICON.md` ("Attribution"). In short:

- **Every lexicon decision gets `by`:** `"Avi Craimer"` for his rulings (with `via`: `chat`, `terminology doc` or `workbench`), `"Claude"` for your own choices, provisional or obvious. Never write `"unattributed"` for a new decision.
- **Credit Avi when his decision-making was involved:** he proposed the rendering, or considered yours and confirmed or changed it. A decision credited to Avi means he examined the term in context, asked about its linguistic range and made a considered ruling. It does not mean he glanced at a proposal and approved it. Silence is not a ruling, and neither is accepting a batch without looking at the item. When in doubt, record `"Claude"` and list the item under **Terminology to rule on**.
- **Name him.** Write "Avi's ruling YYYY-MM-DD (via): …" in rationales and notes, and `(Avi, YYYY-MM-DD)` in `TRANSLATION_CONVENTIONS.md`. Never write "user" or "the user".
- **Commit trailer:** a commit that records or applies one of Avi's rulings ends with `Ruling-by: Avi Craimer` on its own line, just before your session's attribution lines. Name the ruling in the subject ("Ruling 19 Nov: מערכה = configuration").
- **Where a decision goes:** the rendering of a term in the lexicon; a rule for the English that covers many words (grammar, transliteration, letters, italics, brackets, citations) in `TRANSLATION_CONVENTIONS.md`; a decision about the book or the site (title, front matter, tables, layout, workflow) in `EDITORIAL_DECISIONS.md`. In both Markdown files every rule or decision carries a tag: `(Avi, YYYY-MM-DD, via)`, `(Claude, YYYY-MM-DD)`, or `(unattributed)` for old rules only.
- **Statistics:** after recording rulings, run `python3 tools/attribution_stats.py --markdown` and commit the regenerated `ATTRIBUTION.md` with them. Don't edit `ATTRIBUTION.md` by hand.

## Paragraphs Avi has revised

Avi revises the English by hand in the translation workbench (repo `AviCraimer/claude-translation-workbench`). Each paragraph he approves is recorded in **`human_revision_status.json`**, with the fingerprint of the exact text he approved. Only the workbench writes this file, when it commits his revisions: **agents editing the translation directly must never edit it.** Load the workbench repo only when Avi asks to edit the translation by hand; a session making changes directly doesn't need it.

- **Before changing approved paragraphs** (a terminology conversion, say), go ahead if the change is approved, but know that each one goes back to Avi for re-review.
- **After any change to `translation.json`**, run `python3 tools/revision_check.py --commits`. Name the approved paragraphs you changed in the commit message ("re-review: 1:1:5, 1:1:8"). The workbench picks them up as **Needs re-review** and shows Avi exactly what changed since his approval, and why.
- Don't try to preserve Avi's uncommitted workbench edits. You can't see them; the workbench flags conflicts on its side.

`export/` (one-file Markdown and HTML, a page per gate, images) is generated from the data files by `tools/export_text.py`; a GitHub workflow regenerates it on every push and uploads the two PDFs (Print, Letter size; Mobile, a continuous phone-width column) to the `latest-text` release. Don't edit `export/` by hand, and expect a bot commit after your pushes (hence `git pull --rebase`).

Don't change the site code (`index.html`, `script.js`, `style.css`) unless asked. `ibn_arabi/` is a separate project.
