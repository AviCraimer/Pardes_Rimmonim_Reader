# Translation conventions

General rules for the English of *Pardes Rimmonim*. These are rules of grammar and house style that apply across many words. How a particular term is rendered belongs in `lexicon_translation.json`; this file holds the principles that no single entry can.

Rulings marked **(user)** were made by Avi; the date is when the rule was settled.

## Working with the data files

`translation.json` and `Pardes_Rimmonim.json` contain diagrams stored as base64 images inside paragraph HTML (46 in the Hebrew, 17 so far in the English), some over 150,000 characters each. Never print whole chapters or paragraphs from these files raw: one diagram can fill a terminal or an AI agent's context with junk.

- To read paragraphs, use `tools/show_paragraphs.py`. It replaces each embedded image with `[IMAGE image/jpeg, 54 KB]`. For example: `python3 tools/show_paragraphs.py 8:25:6-8`; a whole gate (`8`) or a range of chapters (`8:14-16`) also works; `--en` / `--he` limit the output to one language; `--strip` drops other HTML.
- In your own scripts, substitute `re.sub(r'data:[^;"]+;base64,[^"]*', '[DATA]', s)` before printing, or print only slices of known-safe paragraphs.
- To write paragraphs, use `tools/put_paragraphs.py`. It never needs to read the images.
- For the lexicon, use `tools/lexicon_digest.py` rather than reading the JSON whole.

## Grammar

### Adjectives used as nouns: "the … ones" (user, 2026-11-12)

When Hebrew or Aramaic uses an adjective or participle as a noun, with no separate noun naming what is meant, the English says "the … ones". It does not supply a noun.

- התחתונים *tachtonim* = "the lower ones"; העליונים *elyonim* = "the upper ones"
- likewise for other words of this kind: "the hidden ones", "the emanated ones", "the concealed ones"

**Why:** the Hebrew leaves the referent open, and the context fills it in. *Tachtonim* can mean the creatures of this world (8:20:1, "the Shekhinah among the lower ones is a need on high"), the lower worlds, or the lower Sefirot (8:14, Tiferet and Malkhut over against Chokhmah and Binah). A supplied noun such as "beings", "creatures" or "entities" narrows that range. It can also collide with a term that has its own ruling: "beings" is reserved for הוויות *havayot*.

**Exception:** where the Hebrew does have a noun, translate the noun. Examples are נבראים "creatures" and נאצלים "emanated ones", where נאצל is itself the participle.

### Cognate objects are folded (user, 2026-11-12)

When a verb takes a noun from its own root (שעשוע שהקב"ה משתעשע, "the reveling that the Holy One revels"; טיולא דמטייל), English folds the pair into one verb or gerund: "the reveling of the Holy One with the righteous"; "the stroll that the Holy One takes". The lexicon keeps a single word for the term. This is a rule about the construction, not about vocabulary.

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
- **References** go in parentheses: biblical "(Psalms 133:2)"; Talmudic "(Ketubbot 61a)"; Zohar "Parashat Lech Lecha (fol. 92a)" as Cordovero gives them.
- **Quotations** close with "Thus far his words." / "Thus far its words." (ע"כ / עכ"ל); "as relevant to our matter" for לענייננו.
- **Aramaic and Hebrew titles:** Abba and Imma stay transliterated inside Aramaic quotations; Cordovero's own Hebrew אב / אם is "father" / "mother". Binah is "she" where the maternal image is in play.
- **Gate titles in cross-references:** use the forms in `translation.json` → `gates[*].title`, e.g. "the Gate of Whether the Ein Sof is the Keter", "the Gate 'Ten and Not Nine'", "the Gate of the Glossary of Titles".
- **Apparent textual errors** are translated as they stand and flagged in the commit or conversation, or given with the reading in brackets: "the Righteous One [text: <em>ve-ha-tzedakot</em>]".
