# Terminology conversion log, 10 November 2026

A record of every edit made to `translation.json` when Gates 1–7, 8:1 and the table of contents were brought into line with the rulings in `lexicon.json` and `Terminology_Update_Plan_DONE_2026-11-10.md`. Git holds the diffs; these files add the Hebrew behind each edit and the reasons for the judgment calls.

| File | What it holds | Entries |
|---|---|---|
| `01_agent_changes.jsonl` | The first pass, by a Claude Opus 5.5 agent. One JSON object per line: where, term, kind, old text, new text, the Hebrew it renders, and a note where a judgment was made. | 642 (107 with notes) |
| `02_review_corrections.json` | Corrections made on review of that pass. Each entry: reference, old text, new text, reason. | 32 |
| `03_second_round_decisions.json` | Edits applied after the open decisions were settled the same day. Each entry: reference, old text, new text. | 41 |

References are gate:chapter:paragraph, counted from one. `gates N …` refers to the table of contents.

Replaying `01` against the previous version of `translation.json` reproduces the agent's result exactly; `02` and `03` were applied on top, in that order. One later change is not in these files: the Gate 25 description was reworded to "evil opposed [*temurat*] to good" in the final commit.

The notes in `01` are the place to start for the deferred pass over "existence" (see "Still open" in the plan).
