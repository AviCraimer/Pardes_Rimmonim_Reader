# Pardes Rimmonim Reader

An English translation of Moses Cordovero's *Pardes Rimmonim*, with the Hebrew alongside, published as a reader site (`index.html`, `script.js`, `style.css`). Avi Craimer makes the terminology rulings; the translator proposes and records them.

## Read first, in this order

1. **`TRANSLATION_CONVENTIONS.md`**: the general rules, including how to read the data files safely, grammar rules ("the … ones", folded cognate objects), one English word per term, and house style (Hebrew markup, citations, brackets, gate titles).
2. **`LEXICON.md`**: how the two lexicon files are organised and what goes in each.
3. **The lexicon itself, through the digest:** `python3 tools/lexicon_digest.py` (all renderings), or `--entry KEY` for one entry's full record. Don't read the lexicon JSON whole.
4. **`notes/pending_conversions.md`**: rulings that earlier gates do not yet follow. Know what is on it, but don't convert those sites unless asked.
5. **The reading notes for the gate you are working on**, if any (e.g. `notes/gate8_preview.md`).

Don't read `Terminology_Update_Plan_DONE_2026-11-10.md` or `logs/`. They are the finished record of an earlier conversion and are kept for history only.

## The data files

- **`translation.json`**:
  - `text[g][c][p]` holds the English paragraphs as HTML strings.
  - `gates[g]` holds the English contents: `title`, `description`, and `chapters` (one line per chapter).
- **`Pardes_Rimmonim.json`**: the Hebrew, at `versions[0].text[g][c][p]`.
- **`Pardes_Rimmonim_Index.json`**: the Hebrew table of contents.
- **`lexicon_translation.json`** and **`lexicon_reader.json`**: see `LEXICON.md`.

Indices in the files are 0-based. References in conversation, commits and tools are 1-based: 8:25:7 is `text[7][24][6]`.

**Never print these files or whole paragraphs from them raw.** They embed base64 diagram images, some over 150,000 characters. Use the tools:

- `python3 tools/show_paragraphs.py REF [--he|--en] [--strip]`: read a gate (`8`), chapters (`8:14-16`), a chapter (`8:25`) or paragraphs (`8:25:6-8`), with images shown as placeholders.
- `python3 tools/put_paragraphs.py FILE`: write paragraphs from a JSON file `{"8:2:1": "text", …}`. It refuses to overwrite a filled paragraph unless given `--force`.
- `python3 tools/check_lexicon.py`: run after any lexicon edit; it must report 0 errors.

## How a gate is translated

1. **Read the whole gate in Hebrew first** (`show_paragraphs.py G --he`), against the lexicon digest. Note terms that have no ruling, and rulings the gate seems to strain.
2. **Ask Avi for rulings** where a real choice is needed: show the passages, give the candidates and say which you prefer. Don't invent choices for the sake of asking. Record each ruling in `lexicon_translation.json`, which is the file to work in while translating. Then check whether the entry has a record in `lexicon_reader.json`; if it does, make sure its reader note and etymology still agree with the ruling, and update them if not. List any earlier sites the ruling affects in `notes/pending_conversions.md`.
3. **Translate chapter by chapter**, following the conventions and the lexicon. Flag textual problems (apparent corruptions, uncertain readings, missing diagrams) in your report rather than silently fixing them.
4. **Commit after each chunk and push after about each third of a chapter.** Others edit the site code in the same repo, so always `git pull --rebase` before pushing. End commit messages with the attribution lines your session specifies.

`export/` (one-file Markdown, single-page HTML, images) is generated from the data files by `tools/export_text.py`; a GitHub workflow regenerates it on every push and uploads the PDF to the `latest-text` release. Don't edit `export/` by hand, and expect a bot commit after your pushes (hence `git pull --rebase`).

Don't change the site code (`index.html`, `script.js`, `style.css`) unless asked. `ibn_arabi/` is a separate project.
