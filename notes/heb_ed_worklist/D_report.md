# Heb. Ed. conversion, Gate 23: worker D report (2026-11-20)

Branch `heb-ed-D`. Applied with `tools/put_paragraphs.py --force`; translation.json round-trips (indent=1, no trailing newline); `revision_check.py --commits`: 11 approved paragraphs, 0 changed (no Gate 23 paragraph is approved). Only bracket/parenthesis notes were changed; entry markup (gl-entry-*) untouched.

## 1. Paragraphs changed: 89 (96 replacements)

**All 60 worklist paragraphs:** 23:1:59, 1:62, 1:79, 1:159, 1:169, 1:227, 1:229, 1:233, 2:9, 2:10, 2:27, 3:3, 3:6, 3:11, 3:17, 4:1, 4:8, 4:10, 6:8, 7:1, 7:6, 7:7, 7:10, 7:18, 8:5, 8:16, 8:33, 8:60, 8:88, 8:93, 8:106, 9:2, 10:7, 10:10, 10:29, 10:37, 10:42, 11:15, 11:30, 12:9, 13:9, 13:50, 13:55, 13:108, 14:5, 14:9, 14:31, 14:36, 15:24, 16:21, 16:48, 16:68, 17:7, 17:14, 17:21, 20:18, 20:32, 20:40, 21:27, 21:35.

**29 more, not on the worklist** (see 6 for why the worklist missed them):
- Short edition brackets (≤ 4 letters, which `heb_ed_worklist.py` skips as "note numbers") that the English had in square brackets: 23:1:5 [אז] then; 1:59 [ראש] the head of (worklist paragraph, second bracket); 1:67 [כתב] he wrote; 1:80 [על] above; 1:141 [אלי] *Eli*; 2:10 [לכל] to all (worklist paragraph); 3:3 [בזהר] in the Zohar (worklist paragraph); 8:93 [כתב] he wrote (worklist paragraph); 11:13 [גם] too; 11:38 [אור] light; 12:18 [שהם] which are; 13:114 [בהם] in them; 14:21 [עון] the iniquity; 16:44 [על] through; 17:4 [תימא] wonder; 17:6 [ע"י] through it; 20:15 [שלה] her; 20:22 [בת"ת] in Tiferet; 20:30 [ריח] *re'ach*; 20:37 [ג"כ] too; 22:11 [מגלה] revealing; 22:26 [בחי'] the aspects of.
- Edition notes in parentheses citing later works (Asis Rimonim, Kehillat Ya'akov), now "(Heb. Ed.: …)": 23:4:2, 13:111, 16:53, 20:17, 20:32 (worklist paragraph), 21:18 (Kehillat Ya'akov); 14:30, 21:43 (Asis Rimonim, was "(see Asis Rimmonim)"); 1:85, 5:16, 13:79 (Asis Rimonim, mistranslated; see 3).

## 2. Omitted additions added

None. (The "ע' בעס"ר" that opens the Hebrew of 23:14:31 is already rendered at the end of 23:14:30, where it belongs; converted there, not duplicated.)

## 3. Asis Rimonim glosses

- 23:2:10, 23:8:88: brackets ending עס"ר (without מ, so the worklist classed them "restoration"). The English had mistranslated עס"ר as `see the entry "ten"`. Now "(Heb. Ed., from Asis Rimonim: …)" with that tail dropped.
- 23:5:16 `(ע' בעס"ר)`, 23:13:79 `(מעס"ר)`, 23:1:85 `(ע' בעס"ר ע"ב)`: also mistranslated (`see the entry "ten"`, `See the entry Ayin, fol. 72`). Now "(Heb. Ed.: see Asis Rimonim)", "(Heb. Ed.: from Asis Rimonim)", "(Heb. Ed.: see Asis Rimonim, fol. 72.)". In 13:79 the note stands at the paragraph's end, and how much of the text it covers is unclear. In 1:85, "ע"ב" might be an entry name rather than fol. 72; the translator's "fol. 72" is kept.
- Spelling: the ruling's forms say "Asis Rimonim"; the old English had "Asis Rimmonim" (14:30, 21:43). I used "Asis Rimonim" throughout. Avi may prefer "Rimmonim" to match *Pardes Rimmonim*.

## 4. Corrections (X) [Y]: Y in the text + "(Heb. Ed. variant; the printed text reads X)"

- With נ"א: 23:14:5 (הם רחמים) [נ"א הוא חם]: "is hot … reads "is compassion"".
- Without נ"א (I used the same form): 23:1:159 (ואפילו על) [ת"ת עם]; 1:194 (שם) [שש]; 2:27 (ויבקר) [ויבקש] (the English had silently followed the correction); 3:17 (קצוות) [זרועות]; 8:93 (ממצות) [המצוות] (silently followed); 10:29 (כדברים) [הדברים]; 10:42 (נקראת) [נקראים] (silently followed); 17:7 (התיבות) [הבחינות].
- Variants: 23:7:7, 23:15:24 "(another version: …)" → "(Heb. Ed. variant: …)".

## 5. Flagged, left unchanged

- 23:1:128 [עם]: "*allon* is the masculine of *elah*". The restored "with" is folded into "of" and can't be marked without rewording.
- 23:2:4 [בו]: "a thing that has substance". "In it" is folded into "has".
- 23:4:9 [וגו']: the edition's "etc." is rendered as the translator's "[into Egypt] …".
- 23:1:62 "(perhaps hinting at Tikkun 4, fol. 17)": an editor-sounding parenthesis, but reference parentheses are left unmarked by convention.
- 23:10:37: the Hebrew parenthesis (ראשית חכמה יראת מלכות בינה … (משלי כב ד).) may be editorial; I can't tell, so it is left as it was.

## 6. Other findings

- **Worklist gap (affects all gates):** `heb_ed_worklist.py` drops every bracket of 1–4 Hebrew letters as a note number, so short restorations ([אז], [על], [גם], [ע"י] …) are missed. In Gate 23 the real note numbers are sequential (א … קסב). Check the other workers' gates for this. The script also catches only מעס"ר, not plain עס"ר, and doesn't catch parenthesised notes citing Asis Rimonim / Kehillat Ya'akov (קה"י, ק"י), or corrections (X)[Y] without נ"א.
- 23:12:9: the translator's bracket also took in Cordovero's own "for the Nun is exchanged for Heh". That phrase is now in the running text, and only the edition's part is in the note. The translator's "(Mem-Tet)", formerly nested in that bracket, is now "[Mem-Tet]". The same change was made in 23:14:31 "[*nitzav*]" and 23:21:27 "[lily of the valley]": translator glosses that had been in parentheses only because they sat inside square brackets.
- 23:7:10: one Hebrew bracket [דב"נ בקדמיתא] had become two English brackets ("[first] … [of a man]"). It is now one note, "(Heb. Ed.: of a man, first)".
- 23:1:85 opens with the edition note, and its entry **Then** (אז) has no gl-entry markup, so it is missing from the Glossary page. The note probably belongs at the end of 23:1:84 (compare 23:14:30/31).
- 23:2:10: the Asis gloss reads וגם הוא בית ("he too"), which the English renders "she is also a house". Wording left alone.
- Hebrew oddities: 23:14:36 "[בתקונא כ"א דף נ"ד)" has a mismatched bracket (a reference, not a note). Note numbers out of sequence: [ב] 1:109, [ס] 4:3, [קג] 21:64, [ג] 10:7.
- I did not update the status list in `notes/heb_ed_conversion_plan.md`, so that the parallel branches don't conflict when merged.
