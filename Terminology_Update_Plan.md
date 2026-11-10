# Terminology update plan

*Drawn up 10 November 2026. Covers the terminology rulings made that day and how to bring the translated text into line with them.*

## Where things stand

- **Lexicon:** updated on this branch. All rulings below are recorded in `lexicon.json` with their reasons.
- **Translated text:** not yet converted. `translation.json` covers Gates 1–7 and 8:1 (469 paragraphs).
- **Index:** `Pardes_Rimonim_Index_Translation.md` and the generated `index.json` still carry the old gate titles.

Until the text is converted, the reader site's popups will show the new renderings beside the old wording. Merge the lexicon and the text conversion together if that mismatch matters.

## Rulings to apply

| Hebrew | Was | Now | Sites in Gates 1–8 |
|---|---|---|---|
| מציאות (technical, count noun) | mode of existence | **manifestation** | 102 across three patterns |
| מציאות (ordinary idiom) | [mode of] existence | idiomatic: "the well itself", "that there are…" | part of the 102 |
| כינוי | allusion (also epithet, appellation) | **title** | 23 + 5 + 7, plus gate titles |
| רמז, רומז | allusion, alludes to | **hint, hints at** | 58 verb forms + about 19 nouns |
| על דרך הכינוי | by way of allusion / of the epithets | **as a title** | 2 (2:1:6, 1:10:1) |
| שם, שמות | Name(s) and name(s), mixed | **name(s)**, lowercase | 149 capitals |
| השם used absolutely for God | varies | **the Name** (the one capital) | about 21 Hebrew tokens to check |
| דוחק (גדול) | forced, a great forced reading | **a (very) strained reading** | 6 |
| על דרך השאלה, מושאל | by way of borrowing, borrowed | **in a borrowed sense, borrowed** | 1 (1:10:1), more from Gate 8 on |

## Decisions still needed from Avi

These block part of the work. Each is recorded as pending in the lexicon.

1. **Gate 14 title.** "The Gate of the Manifestations" follows from the ruling but is not confirmed. Affects 5 cross-references in the text and the Gate 14 section of the index.
2. **Gate 23 title.** "The Gate of the Entries of the Titles" (proposed, since the gate is a lexicon and the text already renders בערך as "under the entry") or "the Gate of the Values of the Titles". Affects 26 cross-references.
3. **הויות, "the existents".** "Existents" is the usual word for נמצאים, which stays "existents". Proposed: "the beings" or transliterated "the Havayot". 35 sites, 28 of them in Gate 5.
4. **דק, "fine".** Ambiguous with "excellent", most of all beside נבחר ("choice") in the manifestation passages (8:9, 14:1). "Subtle" was rejected earlier on a majority count. About 105 Hebrew occurrences in the translated gates.
5. **קנוי / נקנה, "acquired".** The key predicate of Gate 4, with no lexicon entry. Probably the philosophers' קנין (a settled possession). Sense to verify, rendering to decide.
6. **Etymology on the reader site.** The new `etymology` field is not displayed. Showing it needs a small change in `script.js`.

## Method

No blind find-and-replace for any term except the capitalization of "name". Every other site is sorted against the Hebrew of its paragraph.

1. **List the candidates** with a script that prints, for each hit, the reference, the English sentence and the Hebrew paragraph.
2. **Sort each site** by the rules in the sections below.
3. **Edit `translation.json`** one gate at a time, keeping the existing HTML and bracket conventions.
4. **Record** any new judgment call as a decision in the lexicon entry.
5. **Verify** with the checks at the end of this plan.
6. **Commit per gate**, in the repo's existing style (`3:8:9: …`).

Suggested order: names (mechanical) → דוחק and השאלה (few sites) → כינוי and רמז → מציאות (most judgment). Gate titles last, once items 1 and 2 above are ruled.

## מציאות: manifestation

### Find all three surface patterns

| Pattern to search | Sites | Where |
|---|---|---|
| `mode of existence`, `modes of existence` | 48 | Gates 1, 2, 3, 7 |
| `[mode of] existence`, with the square brackets | 22 | 21 in 3:8, 1 in Gate 4 |
| bare `mode`, `modes` | 32 | 25 in Gate 5, 2 in Gate 6, 5 in Gate 7 |
| `Modes of Existence` in the gate title | 5 | Gates 1, 2, 3, 7 |

Search for the literal string `[mode of]` as well as `mode of existence`: the bracketed form is a separate pattern, and a search for one does not find the other. Chapters with the most sites: 3:8 (21), 5:5 (20), 7:3 (11), 1:2 (10), 2:3 (10).

Not every bare "mode" is מציאות. In 6:8:6, 7:2:10 and 7:3:4 it renders other words ("in two modes", "the mode of its issuing"). Check the Hebrew before touching these.

### Sort each site three ways

**Technical count noun → "manifestation".** The Sefirah itself as it exists at one stage of its emanation.

- 2:3:4: "this Da'at, which is the concealed manifestation of Tiferet… the other manifestations of the Sefirot… the manifestation of Binah concealed within Chokhmah"
- 3:8:8: "Da'at, which is Tiferet in its concealed manifestation"; "her manifestation after the accusation"
- 3:8:9: "the concealed manifestation of Tiferet"; "aspects of the manifestation of what is below"; "the several other manifestations that the Sefirot have"
- 5:5:2: "three necessary manifestations: the manifestation of planting, which are the roots…"
- 7:3:4–5: "her manifestation that ascends to be united with her husband, and her manifestation that remains in her place"

**Ordinary idiom → plain English, no "manifestation", no bracket.**

- 3:8:9 מציאות הבאר: "the well itself is Binah" (not "the [mode of] existence of the well")
- 3:8:9 מציאות הכתר בעצמו: "Keter itself"
- 3:8:9 ללמדנו מציאות ג' קוין: "to teach us that there are three lines"
- 3:8:8 להכריח מציאות יחוד: "to prove that the union exists"

**Generic or philosophical → "existence".** Unchanged, including מחוייב המציאות, "necessary of existence".

### Second pass over plain "existence"

The text has 176 plain "existence" outside the patterns above. Some are technical uses that were never marked. The clearest is 5:5:9, "and this is the [proper] existence of the Sefirah", which is the third of the six aspects. Review any "existence" whose Hebrew is מציאות followed by a Sefirah's name or by נעלם / מתגלה.

### Rules that go with it

- **Keep "revealed" for גלוי, התגלות, מתגלה.** Never "manifest" for these. מציאות מתגלה is "revealed manifestation"; מציאותו אינו מתגלה is "its manifestation is not revealed".
- **"Concealed manifestation" is correct**, not a contradiction. מציאות is paired with נעלם about 64 times in the book.
- **Direction.** English suggests a manifestation is downstream of the thing. In Cordovero the concealed manifestation is usually upstream, the root of the later one. Where a passage depends on this, say so in a bracket or note.
- **Grammar.** Cordovero treats מציאות as masculine, so a following masculine adjective modifies it and not the Sefirah.
- **Verb echo.** 8:9:1 מציאות מתמצא: "a manifestation that comes to be found".

## כינוי and רמז: title and hint

The text used "allusion" for both words. Of the 43 "allusion(s)" outside gate titles, 23 are in paragraphs whose Hebrew has only כינוי, 18 in paragraphs with only רמז, and 2 need a closer look.

### Sorting

- **Hebrew כינוי, כנוי → "title", "titles".**
- **Hebrew רמז (noun) → "hint".**
- **Hebrew רומז, רמז ל, נרמז → "hints at", "hinted at", "is hinted".** All 58 "allude" forms.
- **Leftover "epithet(s)"** (1:8:4, 1:10:1, 1:10:4 twice, 5:4:1) **and "appellation(s)"** (1:1:6, 1:1:8, 1:2:10, 1:3:2, 1:3:3, 1:5:6, 1:7:3) → "title". Confirm each is כינוי.
- **The verb מכונה, מכנים stays "designated"** (22 sites; no change).

### Passages with agreed wording

- 2:1:6: "the dimensions of body are found in the roots as titles."
- 1:10:1: "And the name El, which is the holy one, is borrowed for it from Chesed as a title."
- 4:10:1: "And therefore all the names are His titles, after His deeds." No "these": the Aramaic is כל שמהן.
- 4:10:6: "and it is a very strained reading to say that titles came to be in Him with the coming-to-be of human beings. And therefore he answered that the titles and the attributes and the changes are forever from the side of human beings."
- 4:10:7: "there is not in Him any name among the holy names, how much more so titles, which literally indicate actions."
- 7:3:5: "and what is the name and the title that delimits and defines this aspect?"
- 3:8:8: "the bet hints at two."

### Gate titles

- **Gate 22:** "The Gate of the Titles". One cross-reference in the text, plus the index heading, its description and chapter 2.
- **Gate 23:** pending (item 2 above). 26 cross-references, plus the index.
- **Index chapters** 30:8 and 32:3 also say "allusions". Check the Hebrew of the printed index to see which word each renders.

## שם: lowercase "name"

- **Rule.** "name" and "names" are lowercase everywhere, divine names included: "the four-letter name", "the forty-two-letter name", "the name El", "the holy names", "the names that may not be erased", "the name of the self".
- **The one capital.** "the Name" where the Hebrew is השם used absolutely for God, as in השם יתברך, "the Name, blessed be He" (4:3:1 already reads so). Do not write "Hashem". About 21 השם tokens in the translated gates: most are "the name" in an ordinary construction, a few are absolute.
- **Sites.** 118 "Name" and 31 "Names" in the text; 46 and 7 in the index.
- **Procedure.** This one can be scripted: lowercase every "Name(s)" that is not sentence-initial, then restore the capital at the absolute השם sites and in gate titles that are in title case ("The Gate of the Names", "The Four-Letter Name").

## דוחק: strained reading

Six sites read "forced": 2:1:10, 2:2:3, 2:4:3, 4:10:6, 5:2:2, 5:3:2. Convert to "strained" ("this is certainly very strained"; "a very strained reading"). דוחק occurs 33 times in Gates 1–8, so check how the other 27 were rendered and bring them into line.

## השאלה: in a borrowed sense

- על דרך השאלה, בהשאלה: "in a borrowed sense". מושאל: "borrowed".
- One site so far (1:10:1), already "borrowed". The term matters from Gate 8 on: 8:8:2, 8:16:7, 8:19:3, 15:4:3, 17:4:1.
- Keep it apart from כינוי. A title is properly said of its bearer; a borrowed name is not intrinsically true of it. 17:4:1: "Hod is called Chesed. Intrinsically it is not Chesed; it is called so in a borrowed sense."
- Bare השאלה is usually "the question". Never match it as this term.

## Unchanged, confirmed in discussion

| Hebrew | Stays | Note |
|---|---|---|
| בחינה | aspect | Its heaviest use is ahead: Gates 22, 7, 10, 14, and 232 occurrences in Gate 8. In 5:5:9 it is nearly a synonym of מציאות. |
| עצמות | Self | Capital only for the Emanator's own (ruling of 7 October). |
| בעצם / במקרה | intrinsically / accidentally | "In itself" was considered for 4:4:4 and dropped, since 4:6:4 and 4:8:2 distribute the pair over two subjects. |
| מהות | essence | |
| נמצאים | existents | The generic sense of the root; not affected by "manifestation". |
| נעלם / מתגלה | concealed / revealed | Now load-bearing beside "manifestation". |
| מדה / תואר | attribute / predicate | No clash with "title". |

## Files to change

1. `translation.json`: all of the above.
2. `Pardes_Rimonim_Index_Translation.md`: Gates 14, 22, 23 headings, descriptions and chapters; chapters 15:1, 30:8, 32:3; "Name(s)" throughout.
3. `index.json`: regenerate with `node build-index.js`. Do not edit by hand.
4. `lexicon.json`: done on this branch; add decisions as sites raise new questions.
5. `script.js`: only if the etymology field is to be shown.

## Checks when finished

Each of these searches over `translation.json` should return nothing, or only the exceptions named:

- `mode of existence`, `modes of existence`, `[mode of]`, `[modes of]`
- bare `mode`, `modes`: only the non-מציאות sites in Gates 6 and 7
- `allusion`, `allud`: nothing
- `epithet`, `appellation`: nothing
- `forced`: nothing in the sense of דוחק
- `Name`, `Names` mid-sentence: only "the Name" at absolute השם sites
- `manifest` as a rendering of גלה: nothing

Then open the reader site, and spot-check 3:8, 5:5, 4:10 and 2:3 for popups that agree with the text.

## For the gates still to translate

- **Gate 14 chapter 1** states the doctrine of the manifestations and should be read before translating further in Gate 8. In bodies each earlier מציאות is annulled by the next (fleece, washed wool, yarn, cloth); in the Emanation the earlier ones remain; each later one is "more revealed"; the prior is "the principal and the root" of the newer; the series begins with the manifestations of the Tzachtzachot.
- **8:9:1–3** distinguishes two kinds of upper manifestation: one from above to below at the emanation, one "from below to above" left by the Sefirot's ascent.
- **Gate 22 chapter 2** ties the multiplicity of titles to "the multitude of aspects", which is the reason for "title".
- **Gate 23** is the longest gate in the book (1,161 paragraphs) and is where "title" will be used most.

## Related: the Fuṣūṣ chapter 12 translation

Kept as a separate project, but the two now share a vocabulary through the medieval Hebrew calques of Arabic:

| Hebrew | Arabic | Shared English |
|---|---|---|
| מציאות | wujūd | existence (both from roots meaning "to find") |
| עצמות | dhāt | self |
| מהות | māhiyya | essence |
| מקרה | ʿaraḍ | accident |
| בעצם, עצמי | dhātī | intrinsic(ally) |

In that translation nafs is "soul" and huwiyya is rendered by a phrase, "what 'he' refers to". Here נפש remains "vital soul" beside נשמה, "soul".
