# Editorial decisions

Decisions about what the book and the site are, as distinct from the English of the text (that is `TRANSLATION_CONVENTIONS.md`) and the rendering of terms (that is `lexicon_translation.json`). One dated line per decision, newest within each section last.

Every decision carries an attribution tag, as in `TRANSLATION_CONVENTIONS.md`: **(Avi, YYYY-MM-DD, via)** for Avi Craimer's decisions (`via`: `chat`, `terminology doc` or `workbench`), **(Claude, YYYY-MM-DD)** for the translator's own, **(unattributed)** where the record doesn't say. `tools/attribution_stats.py` counts the tags. Add a line whenever such a decision is made; a later decision that changes an earlier one is added as a new line, and the old line is marked "superseded" rather than deleted.

## The book

- **Title translated** as *The Pomegranate Orchard*, with *Pardes Rimmonim* as the transliterated title beside it (Avi, 2026-11-18, terminology doc).
- **The gates hold only text from the book.** Reference material the reader needs (tables of marks, keys) goes in the front matter, not inside a gate (Avi, 2026-11-18, chat).
- **Front matter order:** table of contents, Transliteration Conventions, Author's Introduction, Gate 1 (unattributed).
- **Square brackets belong to the translator alone.** Additions by the Hebrew edition are set in parentheses marked "Heb. Ed." (see `TRANSLATION_CONVENTIONS.md`) (Avi, 2026-11-20, chat).
- **Textual problems** are translated as printed and flagged; an emendation is given in brackets beside the printed reading, and the list of flagged problems is kept for checking against a printed edition (unattributed).

## Transliteration Conventions page

- **Vowel table:** one mark per row, no slashes; the mark, its transliterated name and its Hebrew name aligned on the baseline; no column headers; left-aligned with fixed gaps; extra space between rows (Avi, 2026-11-18, chat).
- **Vowel and cantillation marks** are shown on the letter Bet at about twice the text size, since a blank carrier (◌) does not hold the marks in the PDF font (Claude, 2026-11-18).
- **Cantillation marks** get their own table on this page, beside the vowel table, not in Gate 29 (Avi, 2026-11-18, chat).
- **The cantillation table** follows Cordovero's order and spelling (Gate 29), flagging modern names that differ (\*) and uncertain identifications (?) (Claude, 2026-11-18).

## The site

- **Title bar:** three lines: the transliterated title, the English title, the author. The English title is in the same gold as the transliterated title, at the author's size; the sizes step down on mobile so nothing runs off the right edge (Avi, 2026-11-18, chat).
- **Glossary page:** a separate search page for the Gate 23 entries, built from the entry markup (Avi, 2026-11-18, chat).
- **Images of marks replaced by text:** the scanned images of the zarka (29:1:6) and shalshelet (29:3:7) are replaced by the Unicode marks, which stay sharp at any size (Claude, 2026-11-18).

## Workflow and records

- **Avi's hand revisions** are made in the translation workbench, and each approved paragraph is recorded with a fingerprint in `human_revision_status.json`, which only the workbench writes (Avi, 2026-11-19, chat).
- **Attribution:** every terminology decision, convention and editorial decision records who made it; Avi is credited only where his decision-making is on record (Avi, 2026-11-20, chat).
- **Three places for decisions:** terms in the lexicon, rules for the English in `TRANSLATION_CONVENTIONS.md`, decisions about the book and site here (Avi, 2026-11-20, chat).
