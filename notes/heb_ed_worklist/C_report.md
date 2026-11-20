# Worker C report: Heb. Ed. conversion, Gates 17–22

Branch `heb-ed-C`, commit "Heb. Ed. conversion, Gates 17–22 (worker C)". Checks: translation.json round-trips; `revision_check.py --commits` shows 11 approved paragraphs, 0 changed.

## 1. Paragraphs changed (44)

17:2:2, 17:3:4, 18:1:5, 18:2:1, 18:2:2, 18:2:4, 18:3:2, 18:4:10, 18:5:3, 18:5:7, 19:1:4, 19:1:5, 19:3:1, 19:3:2, 19:4:2, 19:4:5, 20:1:8, 20:1:18, 20:2:5, 20:2:7*, 20:4:1, 20:6:1, 20:6:3, 20:6:4, 20:6:5, 20:8:3*, 20:9:2, 20:9:3, 20:9:6, 20:10:1, 20:10:2, 20:11:2, 20:13:9, 20:13:10, 20:13:11, 21:1:4, 21:2:6, 21:2:9, 21:3:5, 21:6:1, 21:14:6, 21:14:7, 22:4:1, 22:4:2*.

\* Not on the work list. The Hebrew has edition notes in parentheses, not square brackets, so the work list missed them:
- 20:2:7: (ר"ל בשם אהיה המעלים אור החכמה. ע' עסיס רמונים) → "(Heb. Ed.: that is to say, in the name Ehyeh, which conceals the light of Chokhmah; see Asis Rimmonim)".
- 20:8:3: (ע' עסיס רמונים) → "(Heb. Ed.: see Asis Rimmonim)".
- 22:4:2: שבנה (שדרה), already rendered "(another version: that dwells [*she-darah*])" → "(Heb. Ed. variant: …)".

A work-list paragraph left unchanged: 21:13:10. Its only marker, [תקונא ס"ט דק"ג ע"ב], is a reference. The English already gives it in parentheses, "(Tikkun 69, folio 103b)", following the reference convention.

## 2. Omitted additions added

None. Every work-list marker was already rendered in the English. In 21:3:5 the English had rendered במחוייב [המציאות] without marking the addition ("the necessarily existent"). It now reads "the necessarily (Heb. Ed.: existent)".

## 3. Asis Rimonim glosses

- 17:2:2: [אשר עונות התחתונים תלוין בה. מעסיס רמונים] → "(Heb. Ed., from Asis Rimonim: on which the iniquities of the lower ones depend)".
- Cross-references to Asis Rimonim (not glosses), now marked Heb. Ed.: 20:1:18 ("see in Asis Rimmonim and in Pelach [ha-Rimmon]", `<small>` in the Hebrew), 20:2:7 and 20:8:3. In these the existing English spelling "Rimmonim" was kept. The prefix form in 17:2:2 uses "Rimonim", as the ruling has it.

## 4. Corrections handled

All of these have the form (X) [Y] **without** נ"א. I used the prescribed correction form, "Y (Heb. Ed. variant; the printed text reads X)":
- 17:2:2 (לישיבה) [ליצירה]: Yetzirah / the academy
- 19:3:2 (גילוי) [מילוי]: filling / revealing
- 20:9:2 (ה"ם שהם היא מה) [אלה"ם שהמלכות היא מ"ה]
- 20:9:3 (בהם אלה) [בשם אלהים]; (הבינה) [בנה]: built / Binah
- 20:11:2 (עב) [תג]: crownlet / cloud
- 20:13:9 (חילוק) [סילוק]: ascent / division
- 20:13:10 (מתחיל) [מתייחס]: is related / begins
- 21:1:4 (גרמו) [אבדנו]: we lost / they caused

Not treated as a correction: 20:6:1 and 20:6:4 דאתקברו [דאתחברו]. The printed word is not in parentheses, so the English keeps "buried" and gives "(Heb. Ed.: joined)".

Small rewordings, made so that a note holds the whole edition bracket:
- 18:2:4: "certainly disagrees [for according to his explanation]" → "disagrees (Heb. Ed.: certainly, for according to his explanation)". ודאי is inside the bracket.
- 19:1:5: "attribute it [the proper name] to Him" → "attribute it (Heb. Ed.: the proper name, to Him)". אליו is inside the bracket.
- 18:2:4: [בחולין ובז"ח) (the brackets don't match) is a source reference. I made it a plain reference, "(in Chullin and in Zohar Chadash)", with no Heb. Ed. prefix, following the reference convention. If it should be marked Heb. Ed. instead, change it to "(Heb. Ed.: …)".

## 5. Flagged, left unchanged

- 18:3:2: the edition brackets [שלא] … [הדבר] ("and the thing does not come to be") are not on the work list (probably filtered out as note numbers). The English renders them without marking, and marking them would need rewording.
- Hebrew parentheses that may be the edition's (doubtful or deleted words) or Cordovero's own; I couldn't tell, so the English is unchanged:
  - 18:5:7: (חוזר לבאר לשון הרע"מ שבפ"ב), "(He returns to explain the language of the Ra'aya Meheimna in chapter 2.)". It looks like an editorial heading.
  - 20:9:6: (בבינה המ' רומזת), "(in Binah the Mem hints)".
  - 20:10:2: (ושוי לה לקמיה), "(and sets her before him)", inside a Zohar quotation.
  - 21:1:4: (אינו כדמות). The English omits it entirely.
  - 21:6:1: (ז') "(seven)" and (אבן) "(A stone)".
  - 21:13:10: (ואית שם בן מ"ב בצורת חותמא דשעוה נכתב) and (ממש. שם מ"ב דאיהו דיוקנא), both kept as parentheses in the English. They look like dittography or doubtful-text marks.

## 6. Other

- 20:10:2: the [יעקב] in the Hebrew is an edition bracket. The work list had classed it only as an English bracket, and it is now "(Heb. Ed.: Jacob)".
- 19:4:2: the edition bracket contains its own parenthesis, so the English note nests: "(Heb. Ed.: with *shuruk* (which is *melupim*); …)". 17:2:2 also nests a correction note inside the translator's parenthetical aside.
