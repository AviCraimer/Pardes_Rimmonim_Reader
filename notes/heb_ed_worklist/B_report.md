# Heb. Ed. conversion, Gates 9–16 (worker B): report

Branch `heb-ed-B`. Ruling: Avi, 2026-11-20 (chat). Checks: `translation.json` round-trips (indent=1, no trailing newline). `revision_check.py --commits`: 11 approved paragraphs, 0 changed.

## 1. Paragraphs changed: 64

There are 51 work-list paragraphs (all 55 markers handled) and 13 more paragraphs in these gates (see below):

9:1:5, 9:5:6, 9:5:7*, 10:1:5*, 10:1:6, 11:1:6, 11:2:5*, 11:3:2, 11:3:5, 11:4:1, 11:5:1, 11:5:4, 11:6:8*, 11:7:4, 12:2:40, 12:2:45, 12:2:52, 12:2:57, 12:2:60, 12:2:63, 12:3:5, 12:3:13, 12:3:18, 12:4:2, 12:4:7, 12:4:9, 12:5:4, 12:5:10, 12:6:3, 13:1:54*, 13:2:2, 13:3:2*, 13:3:5*, 13:3:8, 13:3:9, 13:3:12*, 13:3:14, 13:4:1, 13:5:2, 14:1:6*, 14:1:7, 14:2:6*, 14:3:2, 15:1:6, 15:2:2, 15:2:4, 15:3:2, 15:3:5*, 15:4:3*, 15:4:4, 15:4:6, 15:5:2, 16:1:7, 16:1:11, 16:2:3, 16:3:2, 16:4:2, 16:4:4, 16:5:1, 16:6:3, 16:6:4, 16:8:3, 16:8:8*, 16:9:3.

\* = not on the work list. `tools/heb_ed_worklist.py` drops every Hebrew bracket of 1–4 letters as a note number. That also dropped real words: [מרה] 10:1:5, [ויחס] 11:2:5, [קרא] 11:6:8, [ובו] 13:3:2, [ולמה] 13:3:12, [דלאו] 14:1:6, [המים] 15:3:5, [אפשר] 15:4:3. The script also misses editorial notes in parentheses: (א"ה: …) 13:1:54, (חסרה מלה) 14:2:6, (אולי צ"ל …) 16:8:8, and the cross-references "(ע' בעסיס רמונים …)" / "(ע' בפלח הרימון …)" at 9:5:7, 13:3:5, 16:1:11. The other workers' gates probably have the same gaps.

Forms used:
- A correction written as (X) [Y], or as X [Y] where the English already translated Y, gets "Y (Heb. Ed. variant; the printed text reads X)". The edition marks no נ"א in Gates 9–16, but I still used the documented correction form. Where the English translated the printed X and gave Y in a bracket (11:3:5), it gets "X (Heb. Ed.: Y)".
- Where a converted note held translator transliterations in parentheses, those became square brackets so the parentheses don't nest (16:1:7 [*u-veretato*], 16:4:4 [*temurah*], [*te'udah*]). In 16:1:7 the citation (Josh. 17:18) moved outside the note, because in the Hebrew it stands outside the bracket.
- 11:7:4: the bracket [האחרונות רומז על] includes the verb, so the English now reads "the three Yods (Heb. Ed.: the last ones hint at) the three concealed points". Before, it read "the three [last] Yods hint at".
- 12:2:40: I kept the translator's [*berekhot*] and added the variant note after it.

## 2. Omitted additions added

None. Every edition addition was already rendered in the English, as a bracket, an old form, or in the running text (14:1:6 [דלאו], now marked "(Heb. Ed.: that are not) seen").

## 3. Asis Rimonim glosses

No bracket in these gates ends with מעסיס רמונים / מעס"ר. Three parenthesised cross-references by the edition (not glosses) are now "(Heb. Ed.: see …)": 9:5:7 (Pelach ha-Rimmon and Asis Rimmonim), 13:3:5, 16:1:11 (Asis Rimmonim, ch. 7, and Pelach ha-Rimmon, ch. 3). I kept the existing spelling "Asis Rimmonim" in these. The ruling's form is "Asis Rimonim", so these could be harmonised.

## 4. Corrections handled

10:1:6 (לבשו)[אלביש], "they clothed"; 10:1:6 (הסבות)[מסבות], "the reasons"; 11:2:5 ויחד[ויחס]; 11:3:5 משפעת[מושפעת] (gloss form); 12:2:40 (הבריאות)[הבריכות]; 12:2:45 (הנתנת)[הנתיבות]; 12:2:52 (ממשותו)[עצמותו]; 12:2:60 (החסידים)[החדשים]; 12:2:63 (בגבולם)[בגידולם]; 12:3:5 (בזהר)[בתקונים הנ"ל]; 12:4:7 (הנאמרות)[והמראות]; 12:4:9 בנתיב[בכתוב]; 12:5:4 (הבינה)[היסוד]; 13:3:2 (וכן)[ובו]; 15:3:5 (היום)[המים]. 16:8:8 (בת זכר ונקבה)(אולי צ"ל …) is now "of male and female (Heb. Ed.: doubtful; perhaps it should read: …)".

## 5. Flagged, left unchanged

- 13:3:3 and 14:1:6 have (על)[עם] ("nevertheless"). Both readings give the same English, so a note would say nothing.
- 14:3:2 has (כיפין) (שבכין), two readings in parentheses with no נ"א, rendered "(vaults) (lattices)". It is probably an editorial doublet, but the form is unclear.
- 14:4:9 has כשנעלה (כשתעלה), rendered "when we raise (when you raise)". It is probably an unmarked variant.
- These parenthesised words could be editorial doubtful-marks or Cordovero's own asides, and I couldn't tell which: 12:1:9 (אותיות), 12:4:3 (לקבלו), 13:4:1 (דא כו'), 13:6:2 (תרין הא עשר), 14:3:7 (שהיא הה' לזון בו התחתונים), 14:4:1 (לתתא), 14:4:8 (שלה), 15:4:6 (לכן חשבה כנ"ל), 16:3:9 (הנ"ל).
- The bracket at 16:8:3, [דפרחין בבני נשא דמכרסייא], also covers "from the Throne". The English puts "From the Throne" outside, so only "(Heb. Ed.: that fly in human beings)" is marked.

## 6. Other

- The "[text: …]" brackets at 9:3:5, 11:7:4, 12:3:2, 12:5:3, 13:5:2, 13:7:4 and 16:4:2 are the translator's readings, with no edition marker in the Hebrew. I left them unchanged.
- The single-letter brackets in these gates ([יח] … [לו]) are note numbers. [לב] at 13:3:14 is note 32 and is not translated.
