# Terminology update plan

*Drawn up 10 November 2026. Covers the terminology rulings made that day and how to bring the translated text into line with them.*

## Where things stand

- **Lexicon:** updated on this branch. All rulings below are recorded in `lexicon.json` with their reasons.
- **Translated text:** converted on 10 November (Gates 1–7, 8:1 and the table of contents; about 670 edits, each sorted against the Hebrew). The sections below are kept as the record of what was done and as the rules for the gates still to translate. What was left open is listed under "Left open after the conversion".
- **Table of contents:** now inside `translation.json` under `gates` (title, transliterated Hebrew title, description, chapter summaries), with `indexNotes` for the colophon and translator's notes. The separate `Pardes_Rimonim_Index_Translation.md`, `index.json` and `build-index.js` are gone. It still carries the old gate titles. Its Hebrew is now in the repo as `Pardes_Rimmonim_Index.json` (Sefaria's "Pardes Rimmonim, Index", Koretz 1780), in the same format as the main Hebrew file. The site does not display it yet. The Author's Introduction is not translated and is left out for now.

The lexicon and the text now agree, so the branch can be merged as a whole.

## Rulings to apply

| Term | Was | Now | Sites in Gates 1–8 |
|---|---|---|---|
| *metzi'ut* (מציאות), technical count noun | mode of existence | **manifestation** | 102 across three patterns |
| *metzi'ut*, ordinary idiom | [mode of] existence | idiomatic: "the well itself", "that there are…" | part of the 102 |
| *kinnui* (כינוי) | allusion (also epithet, appellation) | **title** | 23 + 5 + 7, plus gate titles |
| *remez* (רמז, רומז) | allusion, alludes to | **hint, hints at** | 58 verb forms + about 19 nouns |
| *al derekh ha-kinnui* (על דרך הכינוי) | by way of allusion / of the epithets | **as a title** | 2 (2:1:6, 1:10:1) |
| *shem* (שם, שמות) | Name(s) and name(s), mixed | **name(s)**, lowercase | 149 capitals |
| *ha-Shem* (השם) used absolutely for God | varies | **the Name** (the one capital) | about 21 Hebrew tokens to check |
| *dochak* (דוחק גדול) | forced, a great forced reading | **a (very) strained reading** | 6 |
| *hash'alah* (על דרך השאלה, מושאל) | by way of borrowing, borrowed | **in a borrowed sense, borrowed** | 1 (1:10:1), more from Gate 8 on |
| *havayot* (הויות) as things that have come to be | the existents | **the beings** | 30 "existents" + 2 others |
| *havayah, havayot* as forms of YHVH | permutations, existents | **untranslated** | 1:7:5, 4:6:4 |
| *nimtza'im* (נמצאים) | existents, beings | **existents**, uniformly | 5 paragraphs say "beings" |
| *nivra'im*, *nivra'av* (נבראים, נבראיו) | created beings, His creatures | **created entities, His created entities** | 31, plus about 9 "creatures" |
| *beriyot*, Aramaic *beriyin* (בריות, בריין) | creatures | **creatures** (now for this word only) | about 21, unchanged |
| *dak, dakut* (דק, דקות) | fine, fineness | **subtle, subtlety** | about 49, sorted from 10 other "fine" |
| *tziruf* (צירוף) as a technique | combination | **permutation** | 2, plus Gate 30 in the table of contents |
| *kanui, nikneh, kinyan* (קנוי, נקנה, קנין) | acquired, acquisition | **belongs to, possession** | 8, all in Gate 4 |

## Decisions still needed from Avi

Neither blocks the conversion. Both are small.

1. **"Contingent being"** (אפשרי המציאות). Confirmed earlier as final. It is now the one place where "being" renders the root of *metzi'ut* and not that of *havayot*. Keep, or change to "contingent existent"?
2. **Etymology on the reader site.** The new `etymology` field is not displayed. Showing it needs a small change in `script.js`.
3. **Hebrew contents on the reader site.** The Hebrew chapter titles are in the repo but not displayed. They could appear on click, as the Hebrew of a paragraph does.

## Left open after the conversion

- **"Contingent beings"** (4:9:5, three times): awaiting a ruling (see above).
- **Possible technical uses still reading "existence":** 1:2:10, 1:7:2, 3:5:4, 3:5:7, 4:7:4, 4:7:5, 4:9:8, 5:4:1, 5:4:4, 5:4:8, 5:5:3, 5:5:9. Reviewed and left, because the sense was not clear enough to change.
- **"Reality" for *metzi'ut* in the text:** 1:8:3, 2:1:5, 2:1:7, 8:1:5. Mostly the idiom "exists in reality".
- **"Combination" that may be *tziruf*:** contents 21:13–14, and 4:10:7 ("combined from the letters", "the combined twelve-lettered name").
- **5:5:14:** "acquisitive" renders a form of *kinyan*; no ruling covers it.
- **Cross-references outside the ruled titles** still read "Gate of the…": the Holy Palaces, the Fifty Gates, the Reversal of the Light.
- **Contents:** the two probable errors at 25:0 and 21:2; and 21:9, which seems to skip a phrase of the Hebrew.
- **Not read against the Hebrew:** the 234 contents lines that involve none of the terms.

## Gate titles (ruled)

Hebrew *ha-* is rendered "the" only where it has the force of a definite article. In running text either form may be used, by sense and by ear.

| Gate | Was | Now |
|---|---|---|
| 9 | The Mediators | Mediators |
| 10 | The Colors | Colors |
| 11 | The Tzachtzachot | Tzachtzachot |
| 14 | The Modes of Existence | The Gate of Manifestations |
| 20 | The Gate of the Names | The Gate of Names |
| 21 | The Particulars of the Names | Particulars of Names |
| 22 | The Gate of the Allusions | The Gate of Titles |
| 23 | The Values of the Allusions | Glossary of Titles |
| 25 | The Gate of the Substitutions | The Gate of Substitutions |
| 26 | The Palaces of the Substitutions | Palaces of Substitutions |
| 27 | The Gate of the Letters | The Gate of Letters |
| 28 | The Gate of the Vowel-Points | The Gate of Vowel-Points |
| 29 | The Gate of the Cantillation Marks | The Gate of Cantillation Marks |
| 30 | The Gate of Combination | The Gate of Permutation |

Unchanged, because the article is real: "The Reason for the Emanation", "The Order of the Emanation", "The Diminishment of the Moon", "The Four-Letter Name", "The Gate of the Soul".

**Where the titles occur.** In `gates` (the title and the "We named it…" description of each), and as cross-references in the text. Cross-references in Gates 1–8 that change: "Gate of the Values of the Allusions" (26) → "the Glossary of Titles"; "Gate of the Tzachtzachot" (12); "Gate of the Particulars of the Names" (6); "Gate of the Mediators" (5); "Gate of the Modes of Existence" (5); "Gate of the Colors" (3); "Gate of the Substitutions" (2); and one each of "Gate of the Allusions", "Gate of the Names", "Gate of the Vowel-Points", "Gate of Combination".

**Glossary cross-references.** "Under the entry X" for *be-erekh X* everywhere (seven now say "under the heading"). *Erekh* in its other sense stays "in relation to".

## Table of contents: check against the Hebrew

Done on 10 November for structure and for every line that involves a term under review (85 of 319 lines). The other 234 lines have not been read against the Hebrew.

**Structure.** Gate and chapter counts agree, with two known oddities of the printing that the English already notes: the contents omit Gate 27's chapter for Dalet, and state 23 chapters for Gate 23 while listing 22. Gate 32's fourth Hebrew line is the colophon.

**Corrections found.**

- **Gate 14** (title, description, chapters 1–4) and **15:1**: all *metzi'uyot*, plural. "Manifestations" throughout; 14:3 "a manifestation of Binah, of Tiferet, and of Malkhut". Title: "The Gate of Manifestations".
- **5:5**: "in kinds of manifestation" renders *minei ha-giluyim*. It must be "kinds of revelation", since "manifestation" is now *metzi'ut*.
- **5:4**: *havayot*, so "the beings cannot be revealed through Keter". Also "He and His name alone".
- **8:10, 8:22, 25:1**: *havayah* as process. Use "coming-to-be" (now "existence" once and "coming-into-being" twice).
- **"Reality" for *metzi'ut***, 8 times (8:2, 8:10, 8:26, 18:0, 25:0, 27:27, 28:1, 31:9). Use "existence" or plain idiom. 8:26 is probably technical: "her manifestation after the exile".
- **8:4, 30:0–4, 21:15**: *tziruf* is "permutation". 21:15 reads "the twelve *havayot* permuted from the four-letter name". 21:13–14 use the same word for deriving a name from a verse; "permutation" probably, to confirm when translated.
- **21:0, 21:11, 21:15, 32:3**: *havayot* as forms of YHVH, left untranslated.
- **22:0, 22:2, 32:3**: *kinnuyim*, so "titles". 22:2 confirms the link to aspects: "the multiplicity of titles according to the multitude of aspects".
- **30:8**: "further allusions to it" renders *remazim*, so "further hints at it".
- **24:13**: *nivra'im*, so "the choicest of created entities".
- **19:0**: "designated by the Kabbalists" renders *meyuchas*, not *mekhuneh*. Use "which the Kabbalists hold to be the name of the self".
- **Two probable errors to look at.** 25:0: the English has the husks as "grave evils over against the good". The Hebrew word looks like a misprint of *temurat* ("evil in exchange for good"), which would explain the gate's name, "Substitutions". 21:2: the English names the author of "Ma'arekhet Elohut", but the Hebrew says *Ma'arakhot Elohim Chayyim*.

## Method

No blind find-and-replace for any term except the capitalization of "name". Every other site is sorted against the Hebrew of its paragraph.

1. **List the candidates** with a script that prints, for each hit, the reference, the English sentence and the Hebrew paragraph.
2. **Sort each site** by the rules in the sections below.
3. **Edit `translation.json`** one gate at a time, keeping the existing HTML and bracket conventions.
4. **Record** any new judgment call as a decision in the lexicon entry.
5. **Verify** with the checks at the end of this plan.
6. **Commit per gate**, in the repo's existing style (`3:8:9: …`).

Suggested order: names (mechanical), then the few-site terms (*dochak*, *hash'alah*, *tziruf*), then *kinnui* and *remez*, then *dak* and *nivra'im*, then *havayot* and *metzi'ut* together, since both cluster in Gate 5. Gate titles can go in the same pass; all are ruled.

One pass per gate is the aim: sort every term in a paragraph while its Hebrew is open.

## *Metzi'ut* (מציאות): manifestation

### Find all three surface patterns

| Pattern to search | Sites | Where |
|---|---|---|
| `mode of existence`, `modes of existence` | 48 | Gates 1, 2, 3, 7 |
| `[mode of] existence`, with the square brackets | 22 | 21 in 3:8, 1 in Gate 4 |
| bare `mode`, `modes` | 32 | 25 in Gate 5, 2 in Gate 6, 5 in Gate 7 |
| `Modes of Existence` in the gate title | 5 | Gates 1, 2, 3, 7 |

Search for the literal string `[mode of]` as well as `mode of existence`: the bracketed form is a separate pattern, and a search for one does not find the other. Chapters with the most sites: 3:8 (21), 5:5 (20), 7:3 (11), 1:2 (10), 2:3 (10).

Not every bare "mode" is *metzi'ut*. In 6:8:6, 7:2:10 and 7:3:4 it renders other words ("in two modes", "the mode of its issuing"). Check the Hebrew before touching these.

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

## *Kinnui* and *remez* (כינוי, רמז): title and hint

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

- **Gate 22:** "The Gate of Titles". One cross-reference in the text, plus the table of contents heading, its description and chapter 2.
- **Gate 23:** "Glossary of Titles". Also bring the seven "under the heading" to "under the entry". 26 cross-references, plus the table of contents.
- **Contents chapters** 30:8 and 32:3 also say "allusions": 30:8 is *remazim* (hints), 32:3 is *kinnuyim* (titles).

## *Shem* (שם): lowercase "name"

- **Rule.** "name" and "names" are lowercase everywhere, divine names included: "the four-letter name", "the forty-two-letter name", "the name El", "the holy names", "the names that may not be erased", "the name of the self".
- **The one capital.** "the Name" where the Hebrew is השם used absolutely for God, as in השם יתברך, "the Name, blessed be He" (4:3:1 already reads so). Do not write "Hashem". About 21 השם tokens in the translated gates: most are "the name" in an ordinary construction, a few are absolute.
- **Sites.** 118 "Name" and 31 "Names" in the text; 46 and 7 in the table of contents.
- **Procedure.** This one can be scripted: lowercase every "Name(s)" that is not sentence-initial, then restore the capital at the absolute השם sites and in gate titles that are in title case ("The Gate of the Names", "The Four-Letter Name").

## *Dochak* (דוחק): strained reading

Six sites read "forced": 2:1:10, 2:2:3, 2:4:3, 4:10:6, 5:2:2, 5:3:2. Convert to "strained" ("this is certainly very strained"; "a very strained reading"). The word occurs 33 times in Gates 1–8, so check how the other 27 were rendered and bring them into line.

## *Hash'alah* (השאלה): in a borrowed sense

- "In a borrowed sense" for על דרך השאלה and בהשאלה; "borrowed" for מושאל.
- One site so far (1:10:1), already "borrowed". The term matters from Gate 8 on: 8:8:2, 8:16:7, 8:19:3, 15:4:3, 17:4:1.
- Keep it apart from *kinnui*. A title is properly said of its bearer; a borrowed name is not intrinsically true of it. 17:4:1: "Hod is called Chesed. Intrinsically it is not Chesed; it is called so in a borrowed sense."
- The bare form השאלה is usually "the question". Never match it as this term.

## *Havayot* (הויות): beings, or left untranslated

The word is split by sense.

**Things that have come to be → "beings"** (count noun: "a being", "the beings"). This covers the general sense and the Gate 5 sense.

- 5:4:1: "by reason of the absence of the beings"; "how much more so that the beings should be by means of it"
- 6:6:6: "subtle beings, corporealizing themselves in a subtle and pure body" (was "fine entities")
- 3:4:10: "although the beings have spread for ever and ever" (was "comings-into-being")

**Forms of the name YHVH → untranslated, *havayah* / *havayot*.**

- 1:7:5: "the twelve *havayot* [permutations of the four-letter name]"
- 4:6:4: "because they are bounded by that name or that *havayah*. But in the Ein Sof there is no *havayah* or name that bounds Him." This is each Sefirah's own form of YHVH, not the twelve permutations.
- Table of contents 21:11, 21:15, 32:3: replace "permutations (*havayot*)" accordingly.

**The process stays "coming-to-be"**, as in "coming-to-be and passing-away".

**Where the senses meet, translate and bracket.** 4:10:7: "the four-letter name indicates that He was [*hayah*] before every being [*havayah*], meaning that He is the essence of the beings [*havayot*] and the cause prior to them… and He is within every being." The Hebrew has no "all".

Sites: 35 "existents" in the text. Thirty are in paragraphs whose Hebrew has *havayot* (28 in Gate 5) and convert. Five are in paragraphs with *nimtza'im* and stay.

### Companion rule: *nimtza'im* (נמצאים) = "existents"

Uniformly. Five paragraphs now render it "beings" or "existent" things; bring them to "existents". "Beings" then belongs to *havayot* alone, apart from "human beings".

## *Nivra'im* (נבראים): created entities

- "created being(s)" → "created entity", "created entities": 31 sites.
- The possessive forms follow: *nivra'av* and *beru'av* are "His created entities", not "His creatures". 2:6:1 has both forms in one sentence: "to the eyes of the created entities, so that He might be recognized by His created entities."
- About 9 "creatures" sit in paragraphs whose Hebrew is *nivra'im* (Gates 2, 4, 7, 8). Check each.

### Companion rule: *beriyot* (בריות, Aramaic בריין) = "creatures"

"Creature" is kept for this word alone. A check of every occurrence in the book shows it is used only of living things: those God judges and shows mercy to, those who can know Him, the inhabitants of the seven earths, the animals, a golem. It is never used of stones or rivers. So the two words now differ in sense: created entities are whatever is created, creatures are the living inhabitants of the world.

- 4:10:1: "on account of the creatures that were destined to be created; for were there no creatures of the world, why would He be called 'merciful', 'judge'?" Unchanged.
- "Creations" was considered and dropped ("the creations of the world" is ambiguous).

## *Dak*, *dakut* (דק, דקות): subtle, subtlety

- "fine" → "subtle"; "fineness" → "subtlety"; "finer" → "subtler"; "the utmost fineness" → "the utmost subtlety".
- English sites: "fine" 27, "fineness" 18, "finer" 3, "finest" 1. Seven sites already say "subtle" or "subtlety".
- **Sort against the Hebrew.** At least ten "fine" render other words in the sense "excellent" or "precise" and must stay: "a fine parable" (5:4:1, 4:4:7), "fine study" (1:2:2), "the fine point of the phrasing" (2:5:2), "a fine and pleasant resolution" (4:9:1). That double use is the reason for the change.
- 8:9:3, when reached: "the first, subtle manifestation is a choice manifestation".

## *Tziruf* (צירוף): permutation

Cordovero defines the technique at 30:1:4 by Sefer Yetzirah's count of orderings (2, 6, 24, 120, 720, 5,040), which is permutation in the exact sense.

- 3:8:8: "by permutation, *de'ot* is *edut*" (was "in the combination [of letters]").
- 1:2:9: "by way of permutation" (was "by way of letter-combination").
- Table of contents: Gate 30 becomes "The Gate of Permutation", with its description and chapters 1–4; also chapter 8:4. Check 21:13–14 ("combining" a name from a verse) against the Hebrew before changing them.
- Not affected: the ordinary verb "to join" (7:2:13 "which combines them"; 4:10:6).

## *Kanui*, *nikneh*, *kinyan* (קנוי, נקנה, קנין): belongs to, possession

The predicate of Gate 4 for what the Self does not have as its own. "Acquired" suggested an event of getting; the sense is having.

- 4:4:4: "in truth that change of color does not belong to the water"
- 4:4:5: "the change does not belong to the light as an intrinsic possession, but only in relation to its aspect toward the beholders… it is not an intrinsic change belonging to the light"
- 4:6:4: "the judgment and the mercy effected by means of the Self that spreads forth do not belong to the Self as a possession"
- 4:8:2: "that likeness and form belongs to the water only while it is there, not intrinsically but accidentally… the changes and the attributes do not belong to it intrinsically but accidentally… after His withdrawal from the Sefirot, no attribute belongs to Him"
- 4:10:6: "and yet the names do not belong to Him"
- 8:1:6: "a power fitted to the Sefirah and belonging to it"
- Event sense, "comes to possess": 14:1:5, when reached.

**Rephrase nearby loose uses of "belong".** 4:8:2 "the second aspect that belongs to the Emanator" → "the second aspect of the Emanator"; 4:7:5 "the first aspect that belongs to Chokhmah" → "of Chokhmah". Check 8:1:5 against the Hebrew. The other 17 uses of "belong" (verse quotations, assignment to a Sefirah, idiom) stay.

## Unchanged, confirmed in discussion

| Term | Stays | Note |
|---|---|---|
| *bechinah* (בחינה) | aspect | Its heaviest use is ahead: Gates 22, 7, 10, 14, and 232 occurrences in Gate 8. In 5:5:9 it is nearly a synonym of *metzi'ut*. |
| *atzmut* (עצמות) | Self | Capital only for the Emanator's own (ruling of 7 October). |
| *be-etzem / be-mikreh* (בעצם, במקרה) | intrinsically / accidentally | "In itself" was considered for 4:4:4 and dropped, since 4:6:4 and 4:8:2 distribute the pair over two subjects. |
| *mahut* (מהות) | essence | |
| *mekhuneh* (מכונה) | designated | The verb of *kinnui*; unchanged. |
| *ne'lam / mitgaleh* (נעלם, מתגלה) | concealed / revealed | Now load-bearing beside "manifestation". |
| *middah / to'ar* (מדה, תואר) | attribute / predicate | No clash with "title". |

## Files to change

1. `translation.json`, `text`: all of the above.
2. `translation.json`, `gates` (the table of contents): Gates 14, 22, 23, 30 titles, descriptions and chapters; chapters 5:4 ("the existents"), 8:4, 15:1, 21:11, 21:13–15, 30:8, 32:3; "Name(s)" throughout. Text there is HTML (`<strong>`, `<em>`), not Markdown.
3. `lexicon.json`: done on this branch; add decisions as sites raise new questions.
4. `script.js`: only if the etymology field is to be shown.

## Checks when finished

Each of these searches over `translation.json` should return nothing, or only the exceptions named:

- `mode of existence`, `modes of existence`, `[mode of]`, `[modes of]`
- bare `mode`, `modes`: only the sites in Gates 6 and 7 that render other words
- `allusion`, `allud`: nothing
- `epithet`, `appellation`: nothing
- `forced`: nothing in the sense of דוחק
- `Name`, `Names` mid-sentence: only "the Name" at absolute השם sites
- `manifest` as a rendering of גלה: nothing
- `existents`: only where the Hebrew is *nimtza'im*
- `created being`: nothing
- `creature`: only where the Hebrew is *beriyot* / *beriyin*
- `fine`, `fineness`, `finer`: only the "excellent" and "precise" senses
- `combination` for *tziruf*: nothing
- `acquired`, `acquisition`: nothing in Gate 4 (one unrelated "acquired" in Gate 3 to check)

Then open the reader site, and spot-check 3:8, 5:5, 4:10 and 2:3 for popups that agree with the text.

## For the gates still to translate

- **Gate 14 chapter 1** states the doctrine of the manifestations and should be read before translating further in Gate 8. In bodies each earlier מציאות is annulled by the next (fleece, washed wool, yarn, cloth); in the Emanation the earlier ones remain; each later one is "more revealed"; the prior is "the principal and the root" of the newer; the series begins with the manifestations of the Tzachtzachot.
- **8:9:1–3** distinguishes two kinds of upper manifestation: one from above to below at the emanation, one "from below to above" left by the Sefirot's ascent.
- **Gate 22 chapter 2** ties the multiplicity of titles to "the multitude of aspects", which is the reason for "title".
- **Gate 23** is the longest gate in the book (1,161 paragraphs) and is where "title" will be used most.

## Related: the Fuṣūṣ chapter 12 translation

Kept as a separate project, but the two now share a vocabulary through the medieval Hebrew calques of Arabic:

| Term | Arabic | Shared English |
|---|---|---|
| *metzi'ut* (מציאות) | wujūd | existence (both from roots meaning "to find") |
| *atzmut* (עצמות) | dhāt | self |
| *mahut* (מהות) | māhiyya | essence |
| *mikreh* (מקרה) | ʿaraḍ | accident |
| *be-etzem, atzmi* (בעצם, עצמי) | dhātī | intrinsic(ally) |

In that translation nafs is "soul" and huwiyya is rendered by a phrase, "what 'he' refers to". Here נפש remains "vital soul" beside נשמה, "soul".
