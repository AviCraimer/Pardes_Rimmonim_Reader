# Check of the "Heb. Ed." conversion (heb-ed-merge at a58a651 vs main)

Independent check, 2026-11-20. Report only: nothing in the repo was edited.

348 paragraphs differ. The merge branch has 431 "(Heb. Ed." notes in all, 57 of them variants.

## Results by check

| # | Check | Result |
|---|---|---|
| 1 | Running text changed only where a note or correction needs it | **PASS.** 59 paragraphs change words outside the notes. I read all 59: each change moves bracketed words into a note or swaps in a corrected reading. One small point at 4:9:4 (below). |
| 2 | Every Heb. Ed. note has a Hebrew counterpart | **PASS except 1:** 23:14:30. |
| 3 | "variant" only where the Hebrew has נ"א / ס"א | **FAIL, 3 notes:** 22:4:2, 31:6:5, 6:3:5 (second note). |
| 4 | No translator's bracket converted | **PASS.** Every lost square bracket has an edition bracket behind it in the Hebrew. 18:2:4 and 20:2:1 rest on mixed `[…)` brackets in the Hebrew, which I accept. |
| 5 | No old forms left; no "Asis Rimonim" | **FAIL, 2 sites:** 3:8:7 "(variant: …)" and 8:16:10 "(in our texts: …)". No "Asis Rimonim" (single m) anywhere in `text`. "another version" at 8:12:3 and "another reading" at 7:3:4 are Cordovero's own words, not notes. "another version" at 8:11:2 translates the edition's [בנוסח אחר], so it is correct. |
| 6 | HTML sanity | **PASS.** Parentheses and square brackets balance in every changed paragraph. Tags balance. Images (`data:`) are byte-identical. The Gate 23 gl-entry spans are unchanged (76 paragraphs). Six paragraphs lose an `<em>` pair (11:2:5, 11:3:5, 12:2:45, 12:2:52, 12:2:60, 12:2:63); these are correct, because old "[text: <em>…</em>; read …]" notes became Heb. Ed. notes. |
| 7 | File checks | **PASS.** The file round-trips exactly as `json.dumps(T, ensure_ascii=False, indent=1)` with no trailing newline. Only the "text" key differs, and its shape is unchanged. `revision_check.py --commits`: 11 approved paragraphs, 0 changed. |

How I read: the sweep printed every changed paragraph's Hebrew markers beside its Heb. Ed. notes, and I read all 348 that way. I read the full diff context, with the Hebrew, for about 90 paragraphs, including every judgement call named in the brief. I did not read 40 whole paragraphs end to end against the Hebrew.

## Problems to fix

1. **31:6:5.** "sign and symbol (Heb. Ed. variant; the printed text reads "and toil")". The Hebrew has (ועמל) [וסמל] and no נ"א; the נ"א the scan matched is the folio number קנ"א. Fix: "(Heb. Ed.: the printed text reads "and toil")".
2. **6:3:5.** "(Heb. Ed. variant; the printed text reads "and He commanded to Tevel")". The Hebrew has (ויצו לתבל) [משחקת בתבל] and no נ"א; the paragraph's ס"א belongs to the other note, [ס"א רקיעין]. Fix: "(Heb. Ed.: the printed text reads …)".
3. **22:4:2.** "(Heb. Ed. variant: that dwells [she-darah])". The Hebrew has שבנה (שדרה) in bare parentheses, with no נ"א. Fix: "(Heb. Ed.: that dwells [she-darah])".
4. **3:8:7.** An old form is left: "(variant: and this 'son' (ben) is the union of Abba and Imma)". The Hebrew is (לפנינו איתא והאי בן איהו יחודא דאו"א), an editorial note with no נ"א. Fix: "(Heb. Ed.: in our texts it reads: and this 'son' [ben] is the union of Abba and Imma)".
5. **8:16:10.** An old form is left: "(in our texts: "YHVH," and not Elohim)". The Hebrew is (לפנינו "ה'" ולא אלוקים). Fix: "(Heb. Ed.: in our texts, "YHVH," and not Elohim)".
6. **6:7:8.** Missed: "[and the grades' being one beneath another — from Asis Rimmonim]" is still in square brackets; only the spelling was fixed. The Hebrew is [והיות מדרגות זו תחת זו. מעסיס רמונים). Fix: "(Heb. Ed., from Asis Rimmonim: and the grades' being one beneath another)".
7. **31:5:3.** Missed: "[and goes out from potential to actual; see Asis Rimmonim]" is still in square brackets. The Hebrew is [ותצא מכח אל הפועל ע' בעס"ר). Fix: "(Heb. Ed.: and goes out from potential to actual; see Asis Rimmonim)".
8. **21:9:4.** Missed old correction form: "(that are) [names]". The Hebrew is (שהם) [שמות). Fix: "names (Heb. Ed.: the printed text reads "that are")".
9. **7:2:8.** Missed: "the [effluence of] Chokhmah". The Hebrew is [שפע] החכמה. Fix: "the (Heb. Ed.: effluence of) Chokhmah".
10. **6:3:7.** Missed: "ascribe place, [that is,] rank". The Hebrew is [ר"ל]. Fix: "(Heb. Ed.: that is,)".
11. **3:6:1.** Probably missed: "'and a river issues from Eden [to water the garden,' etc. Again,]". The Hebrew bracket is [להשקות את הגן וגו'. תו), exactly those words. Fix: "(Heb. Ed.: to water the garden,' etc. Again,)".
12. **17:1:4 and 20:13:8.** Probably missed, inside Zohar / Tikkunim quotations: "[to recall that this is the thigh of Israel …]" (Hebrew [לאדכרא … וגם נצח ישראל)) and "[by Imma, who is the Alef of Adonai … ascend?]" (Hebrew [באימא … סליקת)). Both mirror mixed `[…)` edition brackets in the Hebrew. Convert them, or have Avi decide.
13. **21:11:2.** Uncertain: "(to investigate) [as a source for]". The Hebrew is (לחקור) (למקור), a correction set out in two pairs of parentheses. It is still in the old form. Fix: "as a source for (Heb. Ed.: the printed text reads "to investigate")".
14. **18:3:2.** Two edition brackets, [שלא] and [הדבר], are translated with no note ("and the thing does not come to be"). This was already so on main. Add notes, or list the omission.
15. **23:14:30.** "(Heb. Ed.: see Asis Rimmonim)" has no counterpart in our Hebrew, which ends "(דף קע"א ע"א):". The note came over from main's "(see Asis Rimmonim)", so its source is unknown. Delete it, or check where it came from.
16. **Small corrections left unmarked:** (על) [עם] "with all this" at 1:6:8, 4:4:5, 8:10:4 and 14:1:6; (המוסתרות) [המסותרת] at 8:4:8; (כוונא) [כגוונא] at 6:3:5. These are idiomatic or spelling fixes that don't change the English, so leaving them unmarked is defensible. Better to record it as a policy than leave it silent.

## Inconsistencies to settle

- **References inside edition brackets.** Some take the prefix: 7:2:22 "(Heb. Ed.: Tikkun 18, fol. 33a)", 15:1:6, 16:2:3, 16:3:2, 16:4:2 and 23:4:10. Others are plain: 5:6:3, 18:2:4, 21:14:7 and 23:14:36. The rule says plain references stay in parentheses without a prefix, so I would drop the prefix at the six prefixed sites.
- **A bare [Y] after a printed word, with no (X).** Two treatments are in use:
  - At 11:2:5 (ויחד [ויחס]) and 12:4:9 (בנתיב [בכתוב]), the corrected reading is translated and the printed one is noted.
  - At 11:3:5 (משפעת [מושפעת]), 20:6:1 and 20:6:4 (דאתקברו [דאתחברו]), the printed reading stays in the text and the edition's word is given as a gloss: "buried (Heb. Ed.: joined)".

  Pick one. I would follow the correction rule, since the edition's bracket proposes a reading. That gives, for example, "pouring forth" → "receiving effluence (Heb. Ed.: the printed text reads mashpa'at, "pouring forth")". The gloss reading of "buried (Heb. Ed.: joined)" is defensible too, but say so in the conventions.
- **4:9:4.** "the free will will prevail" became "it will prevail (Heb. Ed.: the free will over the foreknowledge, …)". "it" is a word the translator supplied, outside any bracket. Make it "[it] will prevail", or leave it.

## Judgement calls

- **Agree:**
  - 1:3:4
  - 4:7:1
  - 8:26:9: the reading "from Asis Rimmonim", rather than the old rendering as a quotation from Song of Songs 8:2, is right. Tell Avi, because it changes the sense of the old English.
  - 11:7:4: the bracket covers "the last ones hint at", so the move is right.
  - 20:2:1: the mixed bracket [שעיקר השם) is acceptable as the edition's.
  - 21:3:5
  - 23:7:10: one Hebrew bracket, [דב"נ בקדמיתא], so merging into one note is right.
  - 23:12:9: "for the Nun is exchanged for Heh" is Cordovero's own text and correctly comes out of the brackets.
  - 27:24:1
- **Mild disagreement:**
  - 20:6:1: see the bare-[Y] point above.
  - 29:1:7: "as (Heb. Ed.: "one may not join [makifin] two casks") (Betzah 32b)" leaves "as" leading straight into a note, with the reference dangling after it. Better: "as (Heb. Ed.: "one may not join [makifin] two casks," Betzah 32b)", or leave it.

## Housekeeping

`notes/heb_ed_conversion_plan.md` ("Forms") still spells the name "Asis Rimonim" twice. It is not part of the text, but fix it so the next session doesn't copy it.
