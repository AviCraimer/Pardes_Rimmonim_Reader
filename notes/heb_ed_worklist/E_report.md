# Heb. Ed. conversion, Gates 24–32: worker E report (2026-11-20)

Branch `heb-ed-E`. Applied with `tools/put_paragraphs.py --force`; `translation.json` round-trips; `tools/revision_check.py --commits`: 11 approved paragraphs, 0 changed (none of them is in Gates 24–32).

## 1. Paragraphs changed: 65

From the work list (51): 24:1:5, 24:1:6, 24:2:2, 24:2:4, 24:4:2, 24:4:3, 24:5:1, 24:7:3, 24:9:2, 24:10:6, 24:10:8, 24:10:9, 24:11:1, 24:11:5, 24:13:3, 25:2:2, 25:3:4, 25:7:3, 25:7:4, 26:1:4, 26:2:1, 26:3:1, 26:4:1, 26:5:1, 27:2:3, 27:6:1, 27:11:1, 27:13:1, 27:13:2, 27:22:1, 27:26:1, 28:6:3, 29:1:7, 29:1:9, 29:2:3, 29:3:6, 29:5:3, 29:5:5, 30:6:2, 30:7:2, 31:1:10, 31:2:6, 31:3:5, 31:5:1, 31:6:1, 31:7:1, 31:8:8, 31:9:1, 31:9:4, 31:10:5, 32:3:2.

**Not on the work list (14), found by scanning the Hebrew of Gates 24–32 for all square brackets and נ"א / ס"א:** 24:3:1 (משער)[משאר]; 24:6:5 [בתוך]; 24:8:7 two (נ"א …]; 24:12:3 [שבק]; 24:12:5 (ממש)[לבוש]; 24:15:2 (בשעתא)[בתר]; 25:5:3 נ"א נחשיכו"ן; 26:6:1 (נ"א ותחת הממונה] and [אחת]; 26:7:1 (כאותם)(נ"א כל אותם] and two more (נ"א …]; 27:21:1 [מחבר]; 27:24:1 [ההר]; 28:5:3 (הפתח)[השבא] and [הפתח]; 31:5:9 [הזהר]; 31:6:5 (ועמל)[וסמל].

**Markers missing from the work list in listed paragraphs, also converted:** 24:4:3 גדובאל (נ"א גדודיא"ל] and [נהר]; 26:1:4 סרסרים (נ"א סרסורי"ה] and (טפסריני"א) נ"א ספסיריט"א; 26:3:1 (קטריט"יא)(נ"א סקפורטי"א], נגדיא"ל (נ"א סנגדיא"ל], אנגיריהו"ן (נ"א אנגריו"ן], [הכל]; 27:11:1 (כתר)[כח]; 30:7:2 [בגין]; 31:9:1 (התנאים)[המפ']; 32:3:2 [גם].

The work-list generator misses short brackets (one word), נ"א notes opened with "(" and closed with "]", and bare נ"א without brackets; the other workers' gates likely have the same gaps. (Its other false positives here were folio numbers like דף קנ"א, and note numbers [א], [ב] …, which I left alone.)

## 2. Omitted additions added

None. Every edition addition in these paragraphs already had an English rendering (in square brackets or an old variant form).

## 3. Asis Rimonim glosses

- 29:5:5: "(Heb. Ed., from Asis Rimonim: even though they are equal; for they change because of their place and their matter, etc.)".

## 4. Corrections handled

Form used: "Y (Heb. Ed. variant; the printed text reads X)"; the printed reading is in quotation marks when it is a phrase (single quotes inside a quotation), bare when a name.

- With נ"א: 24:1:5 Statoria / Sastoria; 26:1:4 Safsirita / Tafsarinia (English had "(Tafsarinia), another version Safsirita"); 26:3:1 Skafortia / Katritia; 26:7:1 "all those" / "like those"; 28:6:3 "into another fashion" / "into another existence" (the printed reading rendered with אחרא, which both readings share).
- **Without נ"א, plain (X) [Y]** (13 sites: 24:2:4, 24:3:1, 24:7:3, 24:11:5, 24:12:5, 24:15:2, 26:4:1, 27:6:1, 27:11:1, 27:13:2, 28:5:3, 31:6:5, 31:9:1). I used the same correction form, "variant" included, so all corrections look the same. **For review:** if "variant" should be kept for נ"א only, these could become "(Heb. Ed.: the printed text reads X)".

## 5. Flagged and left unchanged

- 25:5:3: the Hebrew has an odd parenthesis "(גווניו כעין נחשים הוא וכל מחנהו. העשירי דגדגירו"ן גווניו)" running across two entries, and the English mirrors it. I can't tell whether it is editorial (a doubtful passage) or a misplaced bracket, so I left it.
- 26:3:1 "(עד בן י"ג שנה)": I took this to be Cordovero's own aside, so it is unchanged.

## 6. Other observations

- **Translator glosses inside a converted note changed from round to square brackets** (so the parentheses don't nest, and the gloss shows as the translator's): 26:2:1 "Kos [Cup]"; 26:5:1 "Shod [Destruction]"; 27:26:1 "[Gen. 25:5]" (a reference the translator added; the Hebrew bracket has none); 29:1:7 "[<em>makifin</em>]".
- **Unbalanced brackets in the Hebrew**, opened with "(" and closed with "]": 24:4:3, 24:8:7, 26:1:4, 26:3:1, 26:6:1, 26:7:1. I treated them all as edition variant notes.
- 29:1:7: the bracket [אין מקיפין ב' חביות] is the Talmudic example Cordovero's sentence requires ("כמו …"). It may be Cordovero's own words that the edition only bracketed, but I converted it to Heb. Ed. as the rule requires. Worth a glance.
- 27:13:1: the English "up to here (Heb. Ed.: …) in their order" appears to leave out the printed words כלל הספי' ("the sefirot as a whole") before the bracket. This is a translation gap, not an edition addition, and I left it unchanged.
- 27:24:1: "[crags]" is the translator's gloss, and "of the mountain" renders the edition's [ההר]: "the teeth [crags] (Heb. Ed.: of the mountain)".
- Restoration notes are placed where the bracket stood, so a few read stiffly: 24:10:6 "the (Heb. Ed.: burning) lamp", 24:4:3 "that (Heb. Ed.: river of) fire", 24:11:1 "(Heb. Ed.: of Atzilut is)".
