# Translation conventions

General rules for the English of *Pardes Rimmonim*. These are rules of grammar and house style that apply across many words. How a particular term is rendered belongs in `lexicon_translation.json`; this file holds the principles that no single entry can.

Rulings marked **(Avi)** were made by Avi Craimer; the date is when the rule was settled. How to work with the data files, the tools, and Avi's approved paragraphs is in `CLAUDE.md`.

## Grammar

### Adjectives used as nouns: "the … ones" (Avi, 2026-11-12)

When Hebrew or Aramaic uses an adjective or participle as a noun, with no separate noun naming what is meant, the English says "the … ones". It does not supply a noun.

- התחתונים *tachtonim* = "the lower ones"; העליונים *elyonim* = "the upper ones"
- likewise for other words of this kind: "the hidden ones", "the emanated ones", "the concealed ones"

**Why:** the Hebrew leaves the referent open, and the context fills it in. *Tachtonim* can mean the creatures of this world (8:20:1, "the Shekhinah among the lower ones is a need on high"), the lower worlds, or the lower Sefirot (8:14, Tiferet and Malkhut over against Chokhmah and Binah). A supplied noun such as "beings", "creatures" or "entities" narrows that range. It can also collide with a term that has its own ruling: "beings" is reserved for הוויות *havayot*.

**Exception:** where the Hebrew does have a noun, translate the noun. Examples are נבראים "creatures" and נאצלים "emanated ones", where נאצל is itself the participle.

### Cognate objects are folded (Avi, 2026-11-12)

When a verb takes a noun from its own root (שעשוע שהקב"ה משתעשע, "the reveling that the Holy One revels"; טיולא דמטייל), English folds the pair into one verb or gerund: "the reveling of the Holy One with the righteous"; "the stroll that the Holy One takes". The lexicon keeps a single word for the term. This is a rule about the construction, not about vocabulary.

### Impersonal plurals with a book: "it is explained in the Zohar" (Avi, 2026-11-19)

A plural verb whose setting is a book, such as כן בארו בזוהר, פירשו בתיקונים or אמרו במדרש, is impersonal: "it is explained in the Zohar", "it is said in the Midrash". Never write "they explained" unless a real group of people is the subject ("the commentators explained", פירשו המפרשים). See the lexicon entry פרש-באר-סתמי.

### Prepositions follow the Hebrew where English allows

Example: *sha'ashua* takes "revel in" where the Hebrew has ב־ (in the Torah, in His wisdom) and "revel with" where it has עם (with the righteous).

## One English word per term

A ruled English word belongs to one Hebrew term. If a second term would take the same word, one of them needs another word. Examples:
- "delight" = ra'ava / re'uta, so *sha'ashua* became "revel"
- "pleasure" = oneg / inuga
- "beings" = havayot, so *tachtonim* became "the lower ones"
- "compassion" = rachamim, so *chemlah* became "pity"

Before adopting a word, check the lexicon for an existing claim on it.

## House style

- **Hebrew in the English** is wrapped in `<span dir="rtl" lang="he">…</span>`. Transliterations are in `<em>`, usually in square brackets after the English: "delight [<em>re'uta</em>]".
- **Note numbers** in the Hebrew (e.g. [יב]) are dropped.
- **Editorial material** in the Hebrew is kept: variant readings as "(another version: …)", restorations in [square brackets], corrections such as "(in our texts: …)".
- **Words supplied by the translator** for sense go in [square brackets].
- **References** go in parentheses: biblical "(Psalms 133:2)"; Talmudic "(Ketubbot 61a)"; Zohar "Parashat Lech Lecha (fol. 92a)" as Cordovero gives them. A reference the translator adds, where Cordovero gives none, goes in square brackets like any other addition (Avi, 2026-11-19): "whose dwelling is not with flesh [Daniel 2:11]".
- **Quotations** close with "Thus far his words." / "Thus far its words." (ע"כ / עכ"ל); "as relevant to our matter" for לענייננו.
- **Aramaic and Hebrew titles:** Abba and Imma stay transliterated inside Aramaic quotations; Cordovero's own Hebrew אב / אם is "father" / "mother". Binah is "she" where the maternal image is in play.
- **Gate titles in cross-references:** use the forms in `translation.json` → `gates[*].title`, e.g. "the Gate of Whether the Ein Sof is the Keter", "the Gate 'Ten and Not Nine'", "the Gate of the Glossary of Titles".
- **Apparent textual errors** are translated as they stand and flagged in the commit or conversation, or given with the reading in brackets: "the Righteous One [text: <em>ve-ha-tzedakot</em>]".
- **Transliteration of words** (names, terms, glosses in brackets): readable, no diacritics. *ch* = ח; *kh* = כ without dagesh; *tz* = צ; *k* = כ and ק; *sh* = ש; *s* = ס and שׂ; *v* = ו and ב without dagesh; *f* = פ without dagesh; *t* = ט and ת; an apostrophe marks א or ע sounded between vowels (*ma'amar*, *Yeri'ah*). The reader-facing version of this and the two rules below is `translation.json` → `indexNotes.transliteration`, shown on the site as "Transliteration Conventions" before Gate 1 and in the exports; keep it in step when these rules change.
- **Hebrew letters named as letters** (Avi, 2026-11-16): spell out the letter name, capitalised: Alef, Bet, Gimel, Dalet, Heh, Vav, Zayin, Chet, Tet, Yod, Kaf, Lamed, Mem, Nun, Samekh, Ayin, Peh, Tzadi, Kof, Resh, Shin, Tav ("final Kaf", "final Mem"; Sin only where the dot matters). A group acting as one unit is hyphenated ("the three mothers, Alef-Mem-Shin", "the letters Yod-Heh"); an enumeration takes commas ("Bet, Gimel, Dalet …"). Never "He" for the letter (it reads as the pronoun). Where אין, Ayin "Nothing" (lexicon: "Nothing (Ayin)"), could be confused with the letter, gloss once: "Ayin [Nothing]".
- **Letter strings** (divine Names, permutations, ciphers quoted as strings) keep consonant transliteration, one capital per letter, using the key A = א, B = ב, G = ג, D = ד, H = ה, V = ו, Z = ז, Ch = ח, Ṭ = ט, Y = י, K = כ (and ך), L = ל, M = מ, N = נ, S = ס, Ā = ע, P = פ, Tz = צ, Q = ק, R = ר, Sh = ש, T = ת (final forms take the same sign). The letters are separated by non-breaking spaces (U+00A0), so a string never breaks across lines, and the string stands off from neighbouring words by a double space: an ordinary space plus a non-breaking one on each side (`word \u00a0M\u00a0Tz\u00a0P\u00a0Tz\u00a0 word`). Punctuation closes up against the string (`\u00a0M\u00a0Tz\u00a0P\u00a0Tz, is`). Vocalised acronyms read as words (KaChaB, TaGeL, ABYA) keep capitals and lower-case vowels, unspaced. YHVH (Avi, 2026-11-16) stays unspaced as the Name, but is spaced like the others (`\u00a0Y\u00a0H\u00a0V\u00a0H`) where it is set beside its permutations or other letter strings for comparison (e.g. 3:3:5, 4:9:3, 8:13:8–9, 10:5:2). Verse quotations and ordinary mentions keep YHVH.
## Gate 23 (Glossary of Titles): entry markup

Every entry of Gate 23 begins a paragraph and carries three markers. The site's Glossary page and the Gate 23 title lists in the table of contents are built from these markers alone, so an entry without them is invisible there (its paragraphs are read as a continuation of the entry above).

```html
<span class="gl-entry-title"><b>Father</b></span> [<span class="gl-entry-he" dir="rtl" lang="he">אב</span>, <em class="gl-entry-tl">av</em>]: Some explained it as Keter, …
```

- **`gl-entry-title`**: a `<span>` around the whole title, at the very start of the paragraph. The title itself stays in `<b>`; a title in more than one bold run keeps its runs inside the one span (`<span class="gl-entry-title"><b>Behind</b> and <b>back parts</b></span>`).
- **`gl-entry-he`**: on the Hebrew span of the bracket that follows the title (the first one, if the bracket has several).
- **`gl-entry-tl`**: on the `<em>` of the transliteration in that bracket. Every entry has one (Avi, 2026-11-18: the Hebrew and the transliteration both, always).
- **Continuation paragraphs** of an entry carry no markers; the entry runs until the next paragraph that opens with `gl-entry-title`.
- **Nowhere else:** the classes have no styling and are used only in Gate 23. Keep them when revising an entry, and add all three when adding one.

## Rulings of 18 November 2026

- **Italics for transliterations** (Avi): transliterated Hebrew and Aramaic words are italic (*tikkun*, *havayah*, *nefesh*). Not italic: names of the sefirot (Keter, Chokhmah …) and other proper names, spelled-out letter names (Alef, Heh), and letter strings (YHVH, M Tz P Tz). Applied 18 November 2026 (batch 2026-11-18c). Working decisions, for Avi's review: a lower-case transliteration is italic, a capitalised one is a name and roman (titles of the sefirot, worlds, books, ciphers, divine names; Ayin "Nothing" as a title of Keter); *havayah* italic; *sefirah/sefirot* roman; loanwords roman: Torah, Talmud, Mishnah (the work), Kabbalah, Sabbath/Shabbat, rabbi, amen, Halleluyah, cherub, seraph, Sanhedrin, Satan, shofar, matzah, menorah, tallit (and the biblical measures shekel, ephah, omer); but *tefillin*, *tzitzit*, *etrog*, *lulav*, *sukkah*, *halakhah*, *aggadah*, *baraita*, *midrashim* italic. A name inside a transliterated phrase stays roman ("<em>asher</em> li-Shlomo"). See `notes/batch_2026-11-18c_inventory.md`.
- **"Sefirot", "Sefirah"** (Avi): lower-case, *sefirot* / *sefirah*, as a common noun; no rationale for the capital had been recorded. The names of the individual sefirot stay capitalised (Keter, Chokhmah …), as do fixed titles that contain the word only where they are names. One sweep at the next batch (about 2,000 sites).
- **Bare ר' משה** (Avi): give the full name, with the surname in brackets where the text lacks it, so that he is not confused with Cordovero (also Moses): "Rabbi Moshe [de León]". ר' משה דליאון stays "Rabbi Moshe de León". Sites in Gates 9, 20, 23–28 at the next batch; check each against the context, since a bare ר' משה could in principle be another Moses (Nachmanides is always רמב"ן).
- **נשמה for the whole and for the part** (Avi): keep "soul" for both; the doubling belongs to the Kabbalistic discourse itself and is not to be translated away.
- **mishnah / Mishnah** (Avi): lower-case italic *mishnah* for a paragraph of another text, chiefly the Sefer Yetzirah ("this *mishnah*"); capital "Mishnah" only for the Mishnah itself, the code of Jewish law. Sweep the 73 current "Mishnah" at the next batch, checking each against the Hebrew.
- **Loanwords left roman** (Avi, 18 Nov; test: would a reader with basic knowledge of Judaism need it translated?): Torah, Talmud, Mishnah (the work), Midrash, Kabbalah, Kabbalist, Shabbat, amen, halleluyah, shofar, menorah, tefillin, sefirah / sefirot. Already English, also roman: Sabbath, rabbi, cherub(im), seraph(im), Satan, Sanhedrin. Everything else transliterated is italic, including *shekel*, *ephah*, *omer*, *matzah*, *tallit*, *tzitzit*, *mezuzah*, *sukkah*, *lulav*, *etrog*, *mitzvah*, *halakhah*, *kosher*, *tzaddik*. Gate 23 entry titles stay roman.
