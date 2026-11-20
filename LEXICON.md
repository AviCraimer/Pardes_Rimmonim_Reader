# The lexicon: where things go

The lexicon is two files with the same entry keys.

## `lexicon_translation.json`: the source of truth for the translation

Everything that decides how a Hebrew or Aramaic word becomes English. Rulings go here.

- `headword`, `transliteration`, `partOfSpeech`
- `rendering`: the English shown to readers for the entry (formerly `readerGloss`)
- `candidates`: each with `target`, `status` (`preferred` / `acceptable` / `rejected`), `contextNotes`, optional `gloss`, `register`, and dated `decisions` (`section`, `surfaceForm`, `rationale`, `timestamp`, `by`, optional `via`; see "Attribution" below)
- `surfaceForms`: `{ form: { rendering, ... } }`. `rendering` is the English for that particular form (formerly `readerGloss`). A few forms also keep a `prefer`.
- `notes`: the translator's working record. Never shown on the site.
- `cluster: true`: a working group of unrelated names and idioms. Only forms with their own `rendering` are highlighted, and the popup is headed by the clicked form.

## `lexicon_reader.json`: what readers see, and highlighting settings

Keyed by the same entry keys. A record exists only when it has something in it.

- `note`: the reader's note. It shows in popups and on the entry's Lexicon page. Only entries with a note are listed in the Lexicon tab.
- `etymology`: shown on the Lexicon page.
- `forms`: `{ form: { note } }`, a reader's note on one surface form. For a cluster, each form with a rendering and a note is listed in the Lexicon tab.
- `hideForms`: forms of this entry never highlighted.
- `extraForms` (and `extraFormsNote`): additional unpointed forms to highlight. These replace the old `aliases.json` and win over any other claim on the same form.
- `hidden: true`: the entry is neither highlighted nor listed.
- Top-level `skipTokens`: whole Hebrew tokens never highlighted.

`lexicon.json` and `aliases.json` no longer exist. Don't recreate them; the site ignores them.

## Attribution

Every decision records who made it, so that the record shows the human judgment behind the text and not only who typed it.

- `by` (required) is one of:
  - `"Avi Craimer"`: Avi made the ruling. What counts is that his decision-making was involved: he proposed the rendering, or he considered a proposal (usually the agent's, weighed against the related terms) and confirmed or changed it, in the session, the terminology doc or the workbench. It is his whether he kept the proposal or altered it; the record doesn't try to separate the two. A choice he didn't object to, or never looked at, is not his ruling.
  - `"Claude"`: the agent chose, whether as a provisional choice awaiting Avi or as an obvious call he left to the agent. List provisional choices under **Terminology to rule on** in `notes/pending_conversions.md`.
  - `"unattributed"`: the record doesn't say. This is for decisions made before 20 November 2026, when attribution began. Don't use it for new decisions.
- `via` (optional, Avi's rulings only) is where he gave it: `"chat"`, `"terminology doc"` or `"workbench"`.
- Write Avi's rulings as `"Avi's ruling YYYY-MM-DD (via): …"` in the `rationale`. Name him; don't write "the user". In `notes` and `contextNotes`, mark his rulings the same way. In `TRANSLATION_CONVENTIONS.md` they are marked `(Avi, YYYY-MM-DD)`.
- When Avi confirms a choice that was recorded as `"Claude"`, don't rewrite the old decision: add a new one with `by: "Avi Craimer"`.
- Never upgrade an `"unattributed"` decision to Avi's without his say-so: the backfill of 20 November 2026 was deliberately conservative. If Avi confirms that an old decision was his, change its `by` and add "(attributed by Avi, YYYY-MM-DD)" to the rationale.

`python3 tools/attribution_stats.py --markdown` counts all this and regenerates `ATTRIBUTION.md`. `tools/attribution_migration_2026-11-20.py` is the one-off backfill, kept for the record.

## Checking

After changing either lexicon file, run this before committing:

```
python3 tools/check_lexicon.py
```

It reports reader records whose key or form no longer exists in the translation file (for example after renaming or merging an entry), visible entries with no rendering, and malformed JSON. It must report 0 errors. Renaming an entry key means renaming it in both files.

## Tools

- `python3 tools/lexicon_digest.py`: a compact digest of the renderings.
- `python3 tools/lexicon_digest.py --entry KEY`: one entry's full translation record, followed by its reader record.
- `tools/split_lexicon.py` and `tools/merge_lexicon.py`: the one-off migration from `lexicon.json` (12 November 2026) and its round-trip check. They are kept for the record and are not part of the normal workflow.
