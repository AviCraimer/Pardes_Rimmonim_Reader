# Batch 2026-11-18c: inventory of transliterations (italics ruling of 18 November 2026)

Ruling (Avi, 18 Nov): transliterated Hebrew and Aramaic words are italic; names (sefirot and their titles used as names, persons, places, angels, books, divine names), spelled-out letter names, letter strings and naturalised English loanwords are roman. This file lists every distinct candidate form found in the reader text before the sweep (`translation.json`: `text`, `gates`, `introduction`, `indexNotes`), with its classification. Avi to review the loanword list and the items marked *for review* / *unsure*.

**How candidates were found:** script over text nodes only (not inside `<em>`, Hebrew spans, tag attributes or image data); a form is a candidate if it is italicised somewhere, appears in a lexicon `transliteration`, appears inside [ ] glosses, or is not in an English word list (web2) and has a transliteration pattern (ch, tz, kh, sh, apostrophe, ha-/ve-/be- prefixes, -im/-ot/-ah/-ut/-ei endings). English words, inflections and abbreviations that the filter caught are listed as "English". Counts are tokens (hyphenated forms count as one); "roman before" includes Gate 23 entry titles.

## Decisions in brief

- **Default:** a lower-case transliterated word is italicised; a capitalised one is a name and stays roman, unless it is a word or vowel name at the start of a sentence (italicised: *Hu* 3:1:5, 4:2:2, 4:2:3, 8:6:8; *Ani* 3:1:5; *Mi* 8:4:7; *Cheili* 7:2:3; the vowel names *Kamatz*, *Sheva*, *Segol*, *Shuruk*, *Shurek*, *Cholam*, *Chirik* at sentence starts in 19:4 and 20:1:10). Edge cases fixed by hand: 1:3:2 *guf u-brit*, 1:6:11 *chakor me-hem*, 1:7:2 *or mufla*, 2:4:1 "light [*or*]", 3:2:1 *asarah asarah ha-kaf*, 5:1:4 *bat kol*, 8:2:1 *even sappir*, 8:4:7 *shin millah*, 23:14:25 *Hav, hav*, gates[29].ch2 *yerach ben yomo*. Partial words ("Ch[okhmah]") were skipped.
- **Names kept roman:** names and titles of the sefirot (Keter … Malkhut, Gedulah, Din, Rachamim, Pachad, Tzaddik, Tzedek, Teshuvah, Tevunah, Atarah, Shekhinah, Knesset Yisrael); Ein Sof, Atika Kadisha, Arikh Anpin, Ze'ir Anpin, Abba, Imma, Adam Kadmon, Botzina de-Kardinuta; Ayin "Nothing" as a title of Keter; the worlds Atzilut, Beriah, Yetzirah, Asiyah (lower-case *yetzirah*, *beri'ah*, *asiyah* where they are the words "formation", "creation", "making"); firmaments (Vilon, Raki'a, Shechakim, Zevul, Ma'on, Makhon, Aravot); angel classes when capitalised (Ofannim, Chayyot, Erelim, Ishim, Chashmalim); Tzachtzachot (capitalised, the three lights and Gate 11's title; lower-case generic *tzachtzachot* italic); books and sections (Zohar, Tikkunim, "Tikkun 13", Ra'aya Meheimna, Sefer ha-Bahir, Sefer ha-Temunah …); parashot and tractates; prayers (Shema, Amidah, Kedushah, Hallel); festivals; cipher systems (Atbash, Avgad, Albam, Achas Beta, Ayak Bekhar, Atbach); names of the 42-letter and other divine names (Kuzu Bemukhsaz Kuzu, Kera Satan, Agla …); names of tefillin passages (Kadesh, Ve-haya ki yevi'akha, Shema, Ve-haya im shamoa).
- **havayah / havayot:** term, italic. **sefirah / sefirot:** treated as naturalised, **roman** (recommended, as Scholem and Matt; for review).
- **Loanwords kept roman (for review):** Torah, Talmud, Mishnah (the work), Kabbalah, Kabbalist(s), Sabbath, Shabbat (name of the day; Shabbatot), rabbi, amen, Halleluyah, cherub/cherubim, seraph/seraphim, Sanhedrin, Satan, **shofar, matzah, menorah, tallit**, and the biblical measures shekel, ephah, omer. Existing italic glosses of these (e.g. "[*shofar*]" as a cantillation name, "[*menorah*]" as an entry gloss) were left italic.
- **Not treated as naturalised, so italic (for review):** *tefillin*, *tzitzit*, *etrog*, *lulav*, *sukkah*, *mezuzah*, *mikveh*, *chuppah*, *halakhah*, *aggadah*/*aggadot*, *haggadah*, *baraita*, *midrashim*, *golem*, *gematria*, *notarikon*, *mishnah*, *mazal*, and *kabbalah* where it glosses "received tradition". Most of these were already mostly italic.
- **Mixed phrases:** inside a newly italicised phrase a name stays roman ("<em>asher</em> li-Shlomo"); existing italic phrases that contain a name (*El gibbor*, *Elohim chayyim*, *Netzach Yisra'el*, *chatzrot YHVH*, *ben Yah*, *Bereshit bara Elohim et* …) were left as they were.
- **Gate 23 entry titles** (`gl-entry-title`) were not touched, though some are transliterated terms (Mazal, Halakhah, Eruv, Etrog, Lulav, Baraita, Ov, Sitnah, Gezerah shavah, "A broken matzah", "The white tallit" …).

## Un-italicised (names that were italic)

- **book title:** Arukh (1), Asis Rimmonim (4), Beit Yosef (1), Berit Menuchah (3), Gur Yehudah (1), Kehillat Ya'akov (6), Ma'aneh Eliyahu (1), Ma'arakhot Elohim Chayyim (1), Ma'ayan Chokhmah (1), Ma'ayan ha-Chokhmah (3), Me'irat Einayim (4), Me'orei Or (2), Mikdash Melekh (1), Or Yakar (7), Pardes Rimmonim (1), Ra'aya Meheimna (1), Ra'aya Mehemna (4), Sefat Emet (2), Sefer Or ha-Sekhel (1), Sefer Otzar ha-Kavod (1), Sefer Pardes Rimonim (1), Sefer Sha'arei Tzedek (1), Sefer ha-Heikhalot (1), Sefer ha-Orah (1), Sefer ha-Shem (2), Sefer ha-Temunah (23), Sefer ha-Yichud (1), Sha'arei Orah (1), Sha'arei Tzedek (8), Shimmusha Rabba (2), Shimmusha Zuta (1), Sifra di-Tzeni'uta (1), Tikkunei Zohar (1)
- **cipher name:** Achas Beta (4), Albam (1), Atbash (9), Avgad (9), Ayak Bekhar (1)
- **divine name:** Abag (1), Adonai (5), Aga'el (1), Agila (1), Agla (1), Anaktam (1), Anaktam Pastam Paspasim Dyonsim (1), Avgitatz (2), Ayah Beyah Geyah Deyah (1), Batar Tzatag (2), Chakav Tana (2), Dyonsim (1), Ehyeh asher Ehyeh (3), Ehyeh asher ehyeh (4), El (24), El Chai (3), El Elyon (3), El Shaddai (4), Eloah (6), Elohim (28), Elokim (1), Elyon (1), Kera (1), Kera Satan (2), Kuzu Bemukhsaz Kuzu (1), Neged Yakhash (2), Paspasim (1), Pastam (1), Shaddai (2), Shakutzit (2), Tutrusya Tarkusya Vetzlitzya (1), Tzeva'ot (5), Vetzlitzya (1), Yagal Pazak (2), Yah (3), Yakhash (1)
- **letter name:** Alef (4), Ayin-Bet (2), Chet (1), Dalet (1), Gimel (1), Kaf (1), Lamed-Peh (1), Nun (1), Resh (1), Samekh-Yod-Tet (1), Shin-Dalet (1), Tav (1), Tzadi-Bet (1), Vav-Heh-Vav (1), Yod (2), Yod-Lamed-Yod (1), Zayin (1)
- **letter string/acronym:** AYeH (1), B Y Ṭ (1), BaKh (1), BiNaH (1), Ch Sh Q (1), ChaDaR (2), ChaG (1), ILeM (1), KeSheR (3), KeSheT (1), KoSHeR (1), LaV (1), MaLA (2), MaNTzPaKh (9), PaRDeS (1), RaChUM (1), RaMaCh (2), RoMaCh (1), SHuRuK (1), SaK (1), SaRaH (1), Sh M N (1), ShTzaM ChaNKaL (1), SoD (1), Y T N (1), YaBaK (1), YeSoD (1), YiSRa'EL (1)
- **name/title:** Adam Kadmon (1), Arikh Anpin (1), Attika (2), Ayin (23), Botzina de-Kardinuta (1), Dumah (1), Gavri'el (1), Shekhinah (2), Torah (3)
- **sefirah name:** Binah (1), Chesed (1), Chokhmah (2), Gevurah (1), Hod (1), Keter (2), Tiferet (1)
- **world name:** Asiyah (1), Atzilut (1), Beriah (1), Yetzirah (1)

Sefirah names were set roman only where they are the name or the word as a name (9:5:4, 20:1:18, 21:4:3, 27:11:1, 30:8:4, 30:8:10); kept italic where they gloss a common noun in a verse (8:17:5 "understanding [*Binah*]", 27:1:4 "Beauty [*Tiferet*] of Israel", 16:3:10 and 17:1:4 "Eternal [*Netzach*] of Israel"). *Peh* at 27:3:3 is the word "mouth" and stays italic. Phrases kept italic: "Atah Gibbor Le-olam Adonai" (21:6:4, a verse), "Echad Rosh Achduto …" (21:3:1, a mnemonic), *Or Paniel* (24:2:1), *Zohar* [Radiance] (24:5:1).

## Forms

Columns: form · roman before · italic before · italicised now · roman after (outside Gate 23 titles) · italic after · classification.

| form | roman before | italic before | italicised | roman after | italic after | classification |
|---|---|---|---|---|---|---|
| acherim | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| ad | 4 | 19 | 4 | 0 | 23 | italicise: transliterated word |
| adamah | 1 | 5 | 1 | 0 | 6 | italicise: transliterated word |
| adei | 2 | 0 | 2 | 0 | 2 | italicise: transliterated word |
| adumah | 1 | 2 | 1 | 0 | 3 | italicise: transliterated word |
| afa'er | 2 | 0 | 2 | 0 | 2 | italicise: transliterated word |
| afik | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| aggadah | 2 | 0 | 2 | 0 | 2 | italicise |
| aggadot | 3 | 0 | 3 | 0 | 3 | italicise |
| akar | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| aklidei | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| aliyah | 2 | 1 | 2 | 0 | 3 | italicise: transliterated word |
| aluf | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| amah | 3 | 1 | 3 | 0 | 4 | italicise: transliterated word |
| amir | 1 | 1 | 1 | 0 | 2 | italicise: transliterated word |
| amon | 1 | 6 | 1 | 0 | 7 | italicise: transliterated word |
| Ani | 2 | 3 | 2 | 0 | 5 | italicise at 3:1:5 (the word "I") |
| ani | 1 | 14 | 1 | 0 | 15 | italicise: transliterated word |
| apik | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| argaman | 1 | 5 | 1 | 0 | 6 | italicise: transliterated word |
| aron | 1 | 2 | 1 | 0 | 3 | italicise: transliterated word |
| asarah | 2 | 0 | 2 | 0 | 2 | italicise: transliterated word |
| asher | 6 | 63 | 2 | 11 | 58 | italicise, except inside the divine name Ehyeh asher Ehyeh (roman) |
| ashkiyan | 2 | 0 | 2 | 0 | 2 | italicise: transliterated word |
| ashmai | 1 | 1 | 1 | 0 | 2 | italicise: transliterated word |
| asiyah | 1 | 4 | 1 | 0 | 5 | italicise: the word "making" (2:4:1) |
| atarah | 1 | 6 | 1 | 0 | 7 | italicise: transliterated word |
| ateret | 1 | 3 | 1 | 0 | 4 | italicise: transliterated word |
| atzmut | 2 | 1 | 2 | 0 | 3 | italicise: transliterated word |
| avir | 3 | 21 | 3 | 0 | 24 | italicise: transliterated word |
| ayin | 2 | 15 | 2 | 0 | 17 | italicise: transliterated word |
| azla | 1 | 4 | 1 | 0 | 5 | italicise: transliterated word |
| ba'al | 1 | 2 | 1 | 0 | 3 | italicise: transliterated word |
| ba'alei | 1 | 3 | 1 | 0 | 4 | italicise: transliterated word |
| ba-neti'ot | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| bahem | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| banai | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| baraita | 5 | 4 | 5 | 0 | 9 | italicise — for review |
| barukh | 6 | 11 | 6 | 0 | 17 | italicise: transliterated word |
| batuchot | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| bayit | 4 | 6 | 4 | 0 | 10 | italicise: transliterated word |
| be-appekha | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| be-chokhmah | 2 | 1 | 2 | 0 | 3 | italicise: transliterated word |
| be-chokhmeta | 5 | 0 | 5 | 0 | 5 | italicise: transliterated word |
| be-gavna | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| be-kiyyumaihu | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| be-matun | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| be-vinah | 2 | 0 | 2 | 0 | 2 | italicise: transliterated word |
| bechon | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| bekha | 1 | 1 | 1 | 0 | 2 | italicise: transliterated word |
| beli | 6 | 3 | 6 | 0 | 9 | italicise: transliterated word |
| belimah | 17 | 1 | 17 | 0 | 18 | italicise: transliterated word |
| ben | 32 | 33 | 1 | 30 | 35 | keep roman: in personal names; italicised only at 3:8:7 ("son" (ben)) |
| berakhot | 1 | 1 | 1 | 0 | 2 | italicise: transliterated word |
| berekhah | 1 | 3 | 1 | 0 | 4 | italicise: transliterated word |
| bereshit | 14 | 13 | 14 | 0 | 27 | italicise: transliterated word |
| beri'ah | 1 | 1 | 1 | 0 | 2 | italicise: the word |
| bi-devar | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| bilak | 1 | 1 | 1 | 0 | 2 | italicise: transliterated word |
| binah | 2 | 4 | 2 | 0 | 6 | italicise: transliterated word |
| binyan | 1 | 1 | 1 | 0 | 2 | italicise: transliterated word |
| bitza | 2 | 1 | 2 | 0 | 3 | italicise: transliterated word |
| bohu | 5 | 10 | 5 | 0 | 15 | italicise: transliterated word |
| boryo | 2 | 0 | 2 | 0 | 2 | italicise: transliterated word |
| botzina | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| brit | 3 | 0 | 3 | 0 | 3 | italicise: transliterated word |
| chai | 1 | 18 | 1 | 0 | 19 | italicise: transliterated word |
| chakam | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| chakkem | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| chakor | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| chasidekha | 1 | 1 | 1 | 0 | 2 | italicise: transliterated word |
| chataf | 3 | 10 | 3 | 0 | 13 | italicise: transliterated word |
| chataf-kamatz | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| chataf-segol | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| chayei | 2 | 0 | 2 | 0 | 2 | italicise: transliterated word |
| cheil | 1 | 1 | 1 | 0 | 2 | italicise: transliterated word |
| Cheili | 1 | 0 | 1 | 0 | 1 | italicise at 7:2:3 (the word) |
| cheili | 7 | 2 | 7 | 0 | 9 | italicise: transliterated word |
| chesadim | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| chesed | 7 | 31 | 7 | 0 | 38 | italicise: transliterated word |
| chilak | 1 | 1 | 1 | 0 | 2 | italicise: transliterated word |
| chirik | 12 | 24 | 12 | 0 | 36 | italicise: transliterated word |
| Chirik | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| chiyyunit | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| chok | 2 | 6 | 2 | 0 | 8 | italicise: transliterated word |
| chokhmah | 3 | 8 | 3 | 0 | 11 | italicise: transliterated word |
| chokhmeta | 2 | 0 | 2 | 0 | 2 | italicise: transliterated word |
| chokhmot | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| cholam | 22 | 33 | 22 | 0 | 55 | italicise: transliterated word |
| Cholam | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| chonen | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| da'at | 5 | 7 | 5 | 0 | 12 | italicise: transliterated word |
| dagesh | 10 | 18 | 10 | 0 | 28 | italicise: transliterated word |
| dai | 3 | 1 | 3 | 0 | 4 | italicise: transliterated word |
| dan | 1 | 1 | 1 | 0 | 2 | italicise: transliterated word |
| darom | 1 | 1 | 1 | 0 | 2 | italicise: transliterated word |
| davah | 1 | 3 | 1 | 0 | 4 | italicise: transliterated word |
| davar | 2 | 9 | 2 | 0 | 11 | italicise: transliterated word |
| de'ah | 1 | 1 | 1 | 0 | 2 | italicise: transliterated word |
| de'ot | 4 | 4 | 4 | 0 | 8 | italicise: transliterated word |
| de-anhir | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| de-fiku | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| de-itnehir | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| de-kulfa | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| de-kumra | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| de-nahir | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| de-orayta | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| dekhurin | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| dibbur | 1 | 4 | 1 | 0 | 5 | italicise: transliterated word |
| dikna | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| din | 2 | 6 | 2 | 0 | 8 | italicise: transliterated word |
| dinei | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| dok | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| du-partzufin | 1 | 1 | 1 | 0 | 2 | italicise: transliterated word |
| echad | 8 | 13 | 8 | 0 | 21 | italicise: transliterated word |
| edut | 3 | 3 | 3 | 0 | 6 | italicise: transliterated word |
| elef | 1 | 2 | 1 | 0 | 3 | italicise: transliterated word |
| eleh | 1 | 64 | 1 | 0 | 65 | italicise: transliterated word |
| em | 2 | 4 | 2 | 0 | 6 | italicise: transliterated word |
| erev | 1 | 7 | 1 | 0 | 8 | italicise: transliterated word |
| eruv | 1 | 6 | 1 | 0 | 7 | italicise: transliterated word |
| ervah | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| esh | 1 | 23 | 1 | 0 | 24 | italicise: transliterated word |
| et | 5 | 56 | 5 | 0 | 61 | italicise: transliterated word |
| etpa'er | 2 | 0 | 2 | 0 | 2 | italicise: transliterated word |
| etrog | 2 | 5 | 2 | 0 | 7 | italicise — for review |
| farah | 1 | 3 | 1 | 0 | 4 | italicise: transliterated word |
| ga'aya | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| gachelet | 1 | 2 | 1 | 0 | 3 | italicise: transliterated word |
| gadol | 2 | 17 | 2 | 0 | 19 | italicise: transliterated word |
| galgal | 1 | 2 | 1 | 0 | 3 | italicise: transliterated word |
| galgalei | 1 | 1 | 1 | 0 | 2 | italicise: transliterated word |
| gematria | 5 | 10 | 5 | 0 | 15 | italicise (ruling) |
| geresh | 1 | 4 | 1 | 0 | 5 | italicise: transliterated word |
| geshem | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| gevah | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| gevulin | 1 | 1 | 1 | 0 | 2 | italicise: transliterated word |
| gevurah | 2 | 6 | 2 | 0 | 8 | italicise: transliterated word |
| gevurot | 3 | 12 | 3 | 0 | 15 | italicise: transliterated word |
| gibbor | 1 | 12 | 1 | 0 | 13 | italicise: transliterated word |
| gidrei | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| gilgul | 1 | 1 | 1 | 0 | 2 | italicise: transliterated word |
| golem | 2 | 11 | 2 | 0 | 13 | italicise: Hebrew term (unformed matter), not the folk-tale golem |
| guf | 2 | 6 | 2 | 0 | 8 | italicise: transliterated word |
| gulgalta | 2 | 0 | 2 | 0 | 2 | italicise: transliterated word |
| ha-ba | 1 | 2 | 1 | 0 | 3 | italicise: transliterated word |
| ha-beinayim | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| ha-da'at | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| ha-din | 1 | 1 | 1 | 0 | 2 | italicise: transliterated word |
| ha-gedulah | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| ha-gevurah | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| ha-guf | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| ha-migba'ot | 1 | 2 | 1 | 0 | 3 | italicise: transliterated word |
| ha-nogah | 1 | 1 | 1 | 0 | 2 | italicise: transliterated word |
| ha-rafah | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| ha-sarim | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| ha-shal | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| ha-shamayim | 2 | 13 | 2 | 0 | 15 | italicise: transliterated word |
| ha-shirim | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| ha-sovev | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| ha-tekhunah | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| ha-yachid | 1 | 1 | 1 | 0 | 2 | italicise: transliterated word |
| halakhah | 4 | 7 | 4 | 0 | 11 | italicise — for review |
| hashev | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| hav | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| havayah | 9 | 63 | 9 | 0 | 72 | italicise: term |
| havayot | 11 | 69 | 11 | 0 | 80 | italicise: term |
| havein | 2 | 0 | 2 | 0 | 2 | italicise: transliterated word |
| hayah | 2 | 0 | 2 | 0 | 2 | italicise: transliterated word |
| heh | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| heikhalot | 1 | 2 | 1 | 0 | 3 | italicise: transliterated word |
| hekef | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| hod | 1 | 5 | 1 | 0 | 6 | italicise: transliterated word |
| hoda'ah | 1 | 2 | 1 | 0 | 3 | italicise: transliterated word |
| hodi | 1 | 2 | 1 | 0 | 3 | italicise: transliterated word |
| hodot | 2 | 0 | 2 | 0 | 2 | italicise: transliterated word |
| holekh | 1 | 4 | 1 | 0 | 5 | italicise: transliterated word |
| hoveh | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| Hu | 5 | 1 | 5 | 0 | 6 | italicise: the word "He" (3:1:5, 4:2:2, 4:2:3, 8:6:8) |
| hu | 5 | 45 | 5 | 0 | 50 | italicise: transliterated word |
| ilan | 1 | 3 | 1 | 0 | 4 | italicise: transliterated word |
| illah | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| im | 11 | 0 | 6 | 5 | 6 | italicise, except in the passage names "Ve-haya im shamoa" (kept roman as names) |
| imrato | 3 | 3 | 3 | 0 | 6 | italicise: transliterated word |
| ish | 4 | 40 | 4 | 0 | 44 | italicise: transliterated word |
| isheh | 1 | 6 | 1 | 0 | 7 | italicise: transliterated word |
| ishtakiyan | 2 | 0 | 2 | 0 | 2 | italicise: transliterated word |
| kabbalah | 1 | 3 | 1 | 0 | 4 | italicise: gloss "[kabbalah]" = received tradition (7:4:2); "Kabbalah" stays roman |
| kaddisha | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| kadma | 1 | 2 | 1 | 0 | 3 | italicise: transliterated word |
| kadmon | 1 | 4 | 1 | 0 | 5 | italicise: transliterated word |
| kadosh | 1 | 17 | 1 | 0 | 18 | italicise: transliterated word |
| kadrinuta | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| kallah | 1 | 6 | 1 | 0 | 7 | italicise: transliterated word |
| kamatz | 25 | 45 | 25 | 0 | 70 | italicise: transliterated word |
| Kamatz | 3 | 2 | 2 | 1 | 4 | vowel name italicised at 19:4:3, 20:1:10; the mnemonic "Kamatz" (קמ"ץ) in gates[11].ch1 kept roman as an acronym |
| kametz | 2 | 0 | 2 | 0 | 2 | italicise: transliterated word |
| karnei | 1 | 2 | 1 | 0 | 3 | italicise: transliterated word |
| katan | 1 | 4 | 1 | 0 | 5 | italicise: transliterated word |
| kav | 1 | 6 | 1 | 0 | 7 | italicise: transliterated word |
| kayyama | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| ke-gavna | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| ke-ma'ar | 2 | 1 | 2 | 0 | 3 | italicise: transliterated word |
| kedumah | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| kelipot | 1 | 1 | 1 | 0 | 2 | italicise: transliterated word |
| kelulah | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| keri'ah | 1 | 1 | 1 | 0 | 2 | italicise: transliterated word |
| keruv | 1 | 1 | 1 | 0 | 2 | italicise: transliterated word |
| keter | 2 | 7 | 2 | 0 | 9 | italicise: transliterated word |
| ketz | 1 | 7 | 1 | 0 | 8 | italicise: transliterated word |
| ketzavot | 1 | 1 | 1 | 0 | 2 | italicise: transliterated word |
| kevasim | 1 | 3 | 1 | 0 | 4 | italicise: transliterated word |
| kibbutz | 1 | 5 | 1 | 0 | 6 | italicise: transliterated word |
| kiruv | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| kisei | 1 | 1 | 1 | 0 | 2 | italicise: transliterated word |
| kivshono | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| ko'ach | 1 | 18 | 1 | 0 | 19 | italicise: transliterated word |
| koach | 3 | 9 | 3 | 0 | 12 | italicise: transliterated word |
| kofer | 4 | 0 | 4 | 0 | 4 | italicise: transliterated word |
| koferim | 2 | 0 | 2 | 0 | 2 | italicise: transliterated word |
| koh | 4 | 21 | 4 | 0 | 25 | italicise: transliterated word |
| kol | 9 | 40 | 9 | 0 | 49 | italicise: transliterated word |
| kolel | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| kometz | 3 | 7 | 3 | 0 | 10 | italicise: transliterated word |
| korban | 1 | 6 | 1 | 0 | 7 | italicise: transliterated word |
| kotarim | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| kuntres | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| lah | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| laylah | 13 | 8 | 13 | 0 | 21 | italicise: transliterated word |
| le-okmei | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| leil | 7 | 6 | 7 | 0 | 13 | italicise: transliterated word |
| lekha | 4 | 9 | 4 | 0 | 13 | italicise: transliterated word |
| lev | 1 | 15 | 1 | 0 | 16 | italicise: transliterated word |
| li-mzimah | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| lilin | 1 | 1 | 1 | 0 | 2 | italicise: transliterated word |
| lo | 2 | 2 | 1 | 1 | 3 | italicise at 7:1:5; 31:4:5 is English "lo" |
| loyah | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| lulav | 2 | 11 | 2 | 0 | 13 | italicise — for review |
| ma'arakhah | 1 | 4 | 1 | 0 | 5 | italicise: transliterated word |
| ma'arav | 3 | 4 | 3 | 0 | 7 | italicise: transliterated word |
| maggid | 6 | 5 | 6 | 0 | 11 | italicise: transliterated word |
| mah | 18 | 58 | 18 | 0 | 76 | italicise: transliterated word |
| mahut | 2 | 1 | 2 | 0 | 3 | italicise: transliterated word |
| makaf | 1 | 7 | 1 | 0 | 8 | italicise: transliterated word |
| makhneset | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| makhri'in | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| makor | 1 | 1 | 1 | 0 | 2 | italicise: transliterated word |
| mamlakhah | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| mar'eh | 1 | 6 | 1 | 0 | 7 | italicise: transliterated word |
| marei | 2 | 0 | 2 | 0 | 2 | italicise: transliterated word |
| mashpi'a | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| maskil | 1 | 12 | 1 | 0 | 13 | italicise: transliterated word |
| mayin | 2 | 0 | 2 | 0 | 2 | italicise: transliterated word |
| mazal | 31 | 12 | 31 | 0 | 43 | italicise: transliterated word |
| me'orav | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| me'orot | 1 | 8 | 1 | 0 | 9 | italicise: transliterated word |
| me-ayin | 2 | 1 | 2 | 0 | 3 | italicise: transliterated word |
| mefarash | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| mehahu | 3 | 0 | 3 | 0 | 3 | italicise: transliterated word |
| mekatzetz | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| mekhono | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| melekh | 3 | 10 | 3 | 0 | 13 | italicise: transliterated word |
| mesapperim | 1 | 7 | 1 | 0 | 8 | italicise: transliterated word |
| meshuppa | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| mezonei | 2 | 0 | 2 | 0 | 2 | italicise: transliterated word |
| Mi | 3 | 96 | 2 | 0 | 98 | italicise at 8:4:7 (as the 92 existing italic Mi) |
| middat | 1 | 2 | 1 | 0 | 3 | italicise: transliterated word |
| middot | 2 | 1 | 2 | 0 | 3 | italicise: transliterated word |
| midrashim | 5 | 0 | 5 | 0 | 5 | italicise (lowercase, as mishnah) — for review |
| milah | 1 | 18 | 1 | 0 | 19 | italicise: transliterated word |
| millah | 3 | 0 | 3 | 0 | 3 | italicise: transliterated word |
| min | 1 | 2 | 1 | 0 | 3 | italicise: transliterated word |
| mipnei | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| mishtaveh | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| mispar | 3 | 2 | 3 | 0 | 5 | italicise: transliterated word |
| mit'arev | 1 | 1 | 1 | 0 | 2 | italicise: transliterated word |
| mitbarkhan | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| mizrach | 1 | 2 | 1 | 0 | 3 | italicise: transliterated word |
| mocha | 4 | 0 | 4 | 0 | 4 | italicise: transliterated word |
| molid | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| mosif | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| mufla | 1 | 6 | 1 | 0 | 7 | italicise: transliterated word |
| muskal | 1 | 1 | 1 | 0 | 2 | italicise: transliterated word |
| na'ar | 6 | 17 | 6 | 0 | 23 | italicise: transliterated word |
| na'arah | 4 | 7 | 4 | 0 | 11 | italicise: transliterated word |
| nafik | 2 | 0 | 2 | 0 | 2 | italicise: transliterated word |
| nafkin | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| nafshit | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| nagid | 2 | 0 | 2 | 0 | 2 | italicise: transliterated word |
| naycha | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| ne'eman | 3 | 4 | 3 | 0 | 7 | italicise: transliterated word |
| nefashot | 1 | 1 | 1 | 0 | 2 | italicise: transliterated word |
| nefesh | 6 | 25 | 6 | 0 | 31 | italicise: transliterated word |
| nekudah | 2 | 0 | 2 | 0 | 2 | italicise: transliterated word |
| nesekh | 2 | 0 | 2 | 0 | 2 | italicise: transliterated word |
| neshamah | 7 | 36 | 7 | 0 | 43 | italicise: transliterated word |
| nesher | 1 | 1 | 1 | 0 | 2 | italicise: transliterated word |
| netzach | 3 | 5 | 3 | 0 | 8 | italicise: transliterated word |
| netzachim | 5 | 1 | 5 | 0 | 6 | italicise: transliterated word |
| nicho'ach | 1 | 5 | 1 | 0 | 6 | italicise: transliterated word |
| nishmata | 1 | 1 | 1 | 0 | 2 | italicise: transliterated word |
| nitzuach | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| notzar | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| nozlim | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| nukva | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| nukvin | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| ofan | 1 | 16 | 1 | 0 | 17 | italicise: transliterated word |
| olam | 3 | 48 | 3 | 0 | 51 | italicise: transliterated word |
| oleh | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| ophanim | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| ot | 1 | 11 | 1 | 0 | 12 | italicise: transliterated word |
| otrim | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| pa'arei | 1 | 2 | 1 | 0 | 3 | italicise: transliterated word |
| parsa | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| patach | 32 | 21 | 32 | 0 | 53 | italicise: transliterated word |
| pazer | 1 | 4 | 1 | 0 | 5 | italicise: transliterated word |
| pe'orot | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| pele | 2 | 11 | 2 | 0 | 13 | italicise: transliterated word |
| pesek | 1 | 3 | 1 | 0 | 4 | italicise: transliterated word |
| purkana | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| rachamim | 3 | 3 | 3 | 0 | 6 | italicise: transliterated word |
| raka | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| raki'a | 3 | 1 | 3 | 0 | 4 | italicise: transliterated word |
| ratzo | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| re'ach | 1 | 7 | 1 | 0 | 8 | italicise: transliterated word |
| refesh | 3 | 0 | 3 | 0 | 3 | italicise: transliterated word |
| reshit | 43 | 16 | 43 | 0 | 59 | italicise: transliterated word |
| reshut | 1 | 5 | 1 | 0 | 6 | italicise: transliterated word |
| revi'ah | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| revia | 1 | 4 | 1 | 0 | 5 | italicise: transliterated word |
| rinah | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| rom | 1 | 2 | 1 | 0 | 3 | italicise: transliterated word |
| rosh | 7 | 19 | 7 | 0 | 26 | italicise: transliterated word |
| ruach | 7 | 11 | 7 | 0 | 18 | italicise: transliterated word |
| salka | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| sappir | 1 | 1 | 1 | 0 | 2 | italicise: transliterated word |
| sechel | 2 | 0 | 2 | 0 | 2 | italicise: transliterated word |
| sefar | 1 | 17 | 1 | 0 | 18 | italicise: transliterated word |
| Segol | 2 | 0 | 2 | 0 | 2 | italicise: transliterated word |
| segol | 25 | 31 | 25 | 0 | 56 | italicise: transliterated word |
| segolta | 14 | 17 | 15 | 0 | 32 | italicise: transliterated word |
| sekhel | 1 | 36 | 1 | 0 | 37 | italicise: transliterated word |
| shal | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| shale'ach | 4 | 0 | 4 | 0 | 4 | italicise: transliterated word |
| shalem | 2 | 8 | 2 | 0 | 10 | italicise: transliterated word |
| shalom | 1 | 13 | 1 | 0 | 14 | italicise: transliterated word |
| shalshelet | 3 | 6 | 3 | 0 | 9 | italicise: transliterated word |
| shamayim | 5 | 32 | 5 | 0 | 37 | italicise: transliterated word |
| shatuach | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| she'er | 1 | 4 | 1 | 0 | 5 | italicise: transliterated word |
| shechakim | 1 | 6 | 1 | 0 | 7 | italicise: transliterated word |
| shefatayim | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| shel | 3 | 2 | 3 | 0 | 5 | italicise: transliterated word |
| shelemah | 1 | 1 | 1 | 0 | 2 | italicise: transliterated word |
| shem | 2 | 19 | 2 | 0 | 21 | italicise: transliterated word |
| shemen | 1 | 5 | 1 | 0 | 6 | italicise: transliterated word |
| shesh | 4 | 15 | 4 | 0 | 19 | italicise: transliterated word |
| shetach | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| Sheva | 9 | 1 | 3 | 6 | 4 | name in Bat Sheva / Be'er Sheva; vowel name italicised at 19:4:2, 19:4:4, 20:1:10 |
| sheva | 38 | 29 | 38 | 0 | 67 | italicise: transliterated word |
| sheva-patach | 1 | 1 | 1 | 0 | 2 | italicise: transliterated word |
| shimurim | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| shiruta | 1 | 1 | 1 | 0 | 2 | italicise: transliterated word |
| shokhenot | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| shurek | 2 | 3 | 2 | 0 | 5 | italicise: transliterated word |
| Shurek | 2 | 0 | 2 | 0 | 2 | italicise: transliterated word |
| Shuruk | 2 | 1 | 2 | 0 | 3 | italicise: transliterated word |
| shuruk | 11 | 37 | 11 | 0 | 48 | italicise: transliterated word |
| sibbah | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| sifra | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| sippur | 2 | 17 | 2 | 0 | 19 | italicise: transliterated word |
| sof | 3 | 12 | 3 | 0 | 15 | italicise: transliterated word |
| stima'ah | 3 | 0 | 3 | 0 | 3 | italicise: transliterated word |
| tal | 5 | 11 | 5 | 0 | 16 | italicise: transliterated word |
| tam | 1 | 26 | 1 | 0 | 27 | italicise: transliterated word |
| te'amim | 1 | 1 | 1 | 0 | 2 | italicise: transliterated word |
| tefillin | 15 | 26 | 19 | 0 | 45 | italicise (majority already italic; not counted as naturalised) — for review |
| telisha | 1 | 4 | 1 | 0 | 5 | italicise: transliterated word |
| temurah | 1 | 7 | 1 | 0 | 8 | italicise: transliterated word |
| teru'ah | 1 | 14 | 1 | 0 | 15 | italicise: transliterated word |
| teshalach | 4 | 0 | 4 | 0 | 4 | italicise: transliterated word |
| teshuvah | 3 | 25 | 3 | 0 | 28 | italicise: transliterated word |
| tevah | 2 | 5 | 2 | 0 | 7 | italicise: transliterated word |
| tevunah | 3 | 2 | 3 | 0 | 5 | italicise: transliterated word |
| tiferet | 4 | 7 | 4 | 0 | 11 | italicise: transliterated word |
| tikkun | 36 | 47 | 36 | 0 | 83 | italicise: term (lexicon: "tikkun, transliterated") |
| tikkunim | 2 | 18 | 2 | 0 | 20 | italicise: transliterated word |
| tikkunohi | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| tirtza | 1 | 4 | 1 | 0 | 5 | italicise: transliterated word |
| tishgeh | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| tit | 2 | 1 | 2 | 0 | 3 | italicise: transliterated word |
| tiv'it | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| tofsisa | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| tohu | 6 | 12 | 6 | 0 | 18 | italicise: transliterated word |
| tokh | 3 | 4 | 3 | 0 | 7 | italicise: transliterated word |
| tor | 1 | 4 | 1 | 0 | 5 | italicise: transliterated word |
| tuchot | 1 | 3 | 1 | 0 | 4 | italicise: transliterated word |
| tzachtzachot | 2 | 8 | 2 | 0 | 10 | italicise: generic term (5:4:1 "the term tzachtzachot") |
| tzaddik | 3 | 6 | 3 | 0 | 9 | italicise: transliterated word |
| tzedek | 3 | 10 | 3 | 0 | 13 | italicise: transliterated word |
| tzeirei | 18 | 31 | 18 | 0 | 49 | italicise: transliterated word |
| tzere | 2 | 0 | 2 | 0 | 2 | italicise: transliterated word |
| tzeva'ot | 1 | 4 | 1 | 0 | 5 | italicise: transliterated word |
| tzimtzum | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| tzinor | 2 | 0 | 2 | 0 | 2 | italicise: transliterated word |
| tzinorekha | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| tzippor | 1 | 8 | 1 | 0 | 9 | italicise: transliterated word |
| tziruf | 1 | 3 | 1 | 0 | 4 | italicise: transliterated word |
| tzirufam | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| tzitzit | 6 | 3 | 6 | 0 | 9 | italicise — for review |
| tziyur | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| tzurit | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| u-mayim | 1 | 1 | 1 | 0 | 2 | italicise: transliterated word |
| u-vrit | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| va-shov | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| va-vohu | 1 | 4 | 1 | 0 | 5 | italicise: transliterated word |
| va-yavo | 2 | 2 | 2 | 0 | 4 | italicise: transliterated word |
| va-yet | 2 | 1 | 2 | 0 | 3 | italicise: transliterated word |
| va-yissa | 2 | 2 | 2 | 0 | 4 | italicise: transliterated word |
| va-yit'atzev | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| vayavo | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| vayet | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| vayissa | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| ve-ad | 1 | 1 | 1 | 0 | 2 | italicise: transliterated word |
| ve-afik | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| ve-kamatz | 1 | 4 | 1 | 0 | 5 | italicise: transliterated word |
| ve-loyot | 1 | 1 | 1 | 0 | 2 | italicise: transliterated word |
| ve-nachta | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| ve-nafik | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| ve-nashal | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| ve-yihyeh | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| ve-yored | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| yachid | 1 | 1 | 1 | 0 | 2 | italicise: transliterated word |
| yada | 3 | 1 | 3 | 0 | 4 | italicise: transliterated word |
| yadeikha | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| yein | 2 | 0 | 2 | 0 | 2 | italicise: transliterated word |
| yerach | 1 | 3 | 1 | 0 | 4 | italicise: transliterated word |
| yeri'ot | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| yesh | 8 | 16 | 8 | 0 | 24 | italicise: transliterated word |
| yesod | 4 | 3 | 4 | 0 | 7 | italicise: transliterated word |
| yetzirah | 1 | 4 | 1 | 0 | 5 | italicise: the word "formation" (3:1:5) |
| yichud | 2 | 2 | 2 | 0 | 4 | italicise: transliterated word |
| yitztarfu | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| yizal | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| yod | 2 | 1 | 2 | 0 | 3 | italicise: transliterated word |
| yodeikha | 1 | 0 | 1 | 0 | 1 | italicise: transliterated word |
| yom | 1 | 8 | 1 | 0 | 9 | italicise: transliterated word |
| yomo | 1 | 4 | 1 | 0 | 5 | italicise: transliterated word |
| yonah | 1 | 2 | 1 | 0 | 3 | italicise: transliterated word |
| yosif | 1 | 3 | 1 | 0 | 4 | italicise: transliterated word |
| zakef | 2 | 7 | 2 | 0 | 9 | italicise: transliterated word |
| zaken | 1 | 4 | 1 | 0 | 5 | italicise: transliterated word |
| zarka | 1 | 11 | 1 | 0 | 12 | italicise: transliterated word |
| zekhut | 1 | 6 | 1 | 0 | 7 | italicise: transliterated word |
| zevul | 2 | 10 | 2 | 0 | 12 | italicise: transliterated word |
| A | 170 | 0 | 0 | 161 | 0 | keep roman: English word |
| a | 7011 | 4 | 0 | 7007 | 4 | keep roman: English word (homograph) |
| Abarim | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| ABYA | 83 | 0 | 0 | 83 | 0 | keep roman: letter string / acronym |
| Acha | 5 | 0 | 0 | 5 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Acharei | 49 | 0 | 0 | 49 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Achas | 20 | 4 | 0 | 24 | 0 | keep roman: cipher name (Achas Beta) |
| Achra | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Adam | 164 | 1 | 0 | 165 | 0 | keep roman: English word |
| Adarhaniel | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| ADei | 1 | 0 | 0 | 1 | 0 | keep roman: letter string / acronym |
| Adiria | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Adiriyah | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Adnut | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Adonai | 170 | 6 | 0 | 174 | 1 | keep roman: divine name / name |
| Adonut | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| afar | 9 | 6 | 0 | 9 | 6 | keep roman: English word (homograph) |
| aforementioned | 71 | 0 | 0 | 71 | 0 | keep roman: English word or abbreviation |
| Afrira | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Aga'el | 1 | 1 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Agirison | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Agla | 4 | 1 | 0 | 5 | 0 | keep roman: English word |
| Ahadiriah | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Ahaduria | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Ahah | 1 | 0 | 0 | 0 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Akhtariel | 3 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Akhteriel | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Akiva | 14 | 0 | 0 | 14 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Albam | 21 | 1 | 0 | 22 | 0 | keep roman: cipher name |
| Aled | 1 | 1 | 0 | 1 | 1 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Alef | 372 | 5 | 0 | 376 | 1 | keep roman: letter name |
| Alef-Dalet | 4 | 0 | 0 | 4 | 0 | keep roman: letter name |
| Alef-Tet | 1 | 0 | 0 | 1 | 0 | keep roman: letter name |
| Alef-Vav | 2 | 0 | 0 | 2 | 0 | keep roman: letter name |
| Alef-Vav-Resh | 1 | 0 | 0 | 1 | 0 | keep roman: letter name |
| Alkabetz | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| although | 417 | 1 | 0 | 417 | 1 | keep roman: English word (homograph) |
| am | 107 | 1 | 0 | 106 | 1 | keep roman: English word (homograph) |
| amen | 2 | 3 | 0 | 2 | 3 | keep roman: loanword |
| AMeSh | 4 | 0 | 0 | 3 | 0 | keep roman: letter string / acronym |
| Ami'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Amidah | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Amon | 9 | 5 | 0 | 8 | 5 | keep roman: title ("the wondrous and covered Amon"); 5 italic left — unsure |
| Amora'im | 6 | 2 | 0 | 5 | 2 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| an | 745 | 1 | 0 | 745 | 1 | keep roman: English word (homograph) |
| Anah | 4 | 0 | 0 | 4 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| and | 32056 | 3 | 0 | 32039 | 3 | keep roman: English word (homograph) |
| and-Da'at | 2 | 0 | 0 | 2 | 0 | keep roman: part of a name |
| Angaryon | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Anokhi | 1 | 12 | 0 | 0 | 12 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Anpin | 79 | 1 | 0 | 79 | 0 | keep roman: divine name / name |
| appears | 280 | 1 | 0 | 280 | 1 | keep roman: English word |
| Arakhin | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Araritha | 8 | 0 | 0 | 8 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Aravot | 9 | 9 | 0 | 8 | 9 | keep roman: name of a firmament; 9 italic occurrences left as they are — unsure |
| Arba | 6 | 1 | 0 | 5 | 1 | keep roman: English word |
| Arikh | 20 | 1 | 0 | 21 | 0 | keep roman: divine name / name |
| Aririya | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Arpani'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| as | 5894 | 1 | 0 | 5893 | 1 | keep roman: English word (homograph) |
| Asasniah | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Asher | 3 | 3 | 0 | 2 | 3 | keep roman: English word |
| Ashkenazi | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Ashmedai | 10 | 0 | 0 | 10 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Asiriah | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Asirta | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Asis | 15 | 4 | 0 | 19 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Asiyah | 127 | 1 | 0 | 128 | 0 | keep roman: world name |
| Asiyah-within-Atzilut | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Asiyah-within-Beriah | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Askarah | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Astiria | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| at | 2269 | 4 | 0 | 2268 | 4 | keep roman: English word (homograph) |
| Atbach | 14 | 0 | 0 | 14 | 0 | keep roman: cipher name |
| Atbash | 27 | 9 | 0 | 36 | 0 | keep roman: cipher name; 9 italic set roman |
| Atika | 14 | 0 | 0 | 14 | 0 | keep roman: divine name / name |
| Attah | 1 | 20 | 0 | 0 | 20 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Aturi'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Atzeret | 1 | 1 | 0 | 1 | 1 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Atzilut | 148 | 1 | 0 | 149 | 0 | keep roman: world name |
| Atzilut-within-Beriah | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Atzilut-within-Yetzirah | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Av | 6 | 1 | 0 | 6 | 1 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Aven | 1 | 1 | 0 | 0 | 1 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Avgad | 24 | 9 | 0 | 33 | 0 | keep roman: cipher name; 9 italic set roman |
| Avgitatz | 4 | 2 | 0 | 6 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Avodah | 8 | 0 | 0 | 8 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Avot | 13 | 0 | 0 | 13 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Ayak | 16 | 1 | 0 | 17 | 0 | keep roman: cipher name |
| Ayin | 46 | 24 | 0 | 69 | 1 | keep roman: title of Keter ("Nothing") and letter name; 23 italic standalone occurrences set roman |
| Aza'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Azariah | 4 | 0 | 0 | 4 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Azbugah | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Azriel's | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Azuzi'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Azuziah | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| B | 31 | 1 | 0 | 32 | 0 | keep roman: English word |
| Ba'ariron | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Ba'arni'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Bachya | 7 | 0 | 0 | 7 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Bakhar | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| bar | 22 | 4 | 0 | 22 | 4 | keep roman: in personal names |
| Baraita | 5 | 0 | 0 | 4 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Barki'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Bashan | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| bat | 1 | 23 | 0 | 0 | 24 | keep roman: English word (homograph) |
| Bat | 5 | 3 | 0 | 5 | 3 | keep roman: English word |
| Bath-rabbim | 5 | 0 | 0 | 5 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Bath-sheba | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Bathsheba | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Batra | 10 | 0 | 0 | 10 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Bava | 16 | 0 | 0 | 16 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| be | 4529 | 1 | 0 | 4527 | 1 | keep roman: English word (homograph) |
| Be'er | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Be'er-lahai-roi | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Bechukotai | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Beersheba | 7 | 0 | 0 | 7 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| begot | 21 | 0 | 0 | 21 | 0 | keep roman: English word or abbreviation |
| Beha'alotekha | 12 | 0 | 0 | 12 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Beit | 6 | 1 | 0 | 7 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Beli'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Bemukhsaz | 3 | 1 | 0 | 4 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Ben | 1 | 0 | 0 | 1 | 0 | keep roman: English word |
| Benei | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Berakhah | 1 | 1 | 0 | 1 | 1 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Berakhi'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Berakhot | 30 | 0 | 0 | 30 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Bereshit | 102 | 12 | 0 | 101 | 12 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Beriah | 226 | 1 | 0 | 227 | 0 | keep roman: world name |
| Berit | 1 | 3 | 0 | 4 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Beshalach | 15 | 0 | 0 | 15 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Bet-Yod-Tet | 2 | 0 | 0 | 2 | 0 | keep roman: letter name |
| Beta | 20 | 4 | 0 | 24 | 0 | keep roman: cipher name (Achas Beta) |
| Betzah | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Betzalel | 5 | 0 | 0 | 5 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Bikkurim | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Binah | 2673 | 3 | 0 | 2673 | 2 | keep roman: name of a sefirah / sefirah title |
| Binah's | 4 | 0 | 0 | 4 | 0 | keep roman: name of a sefirah / sefirah title |
| Binah-within-Binah | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Binah-within-Chokhmah | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Bo'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| body | 546 | 1 | 0 | 546 | 1 | keep roman: English word (homograph) |
| bore | 20 | 3 | 0 | 20 | 3 | keep roman: English word (homograph) |
| Botzina | 19 | 1 | 0 | 20 | 0 | keep roman: name (Botzina de-Kardinuta) |
| brackets | 1 | 1 | 0 | 1 | 1 | keep roman: English word |
| cf | 17 | 0 | 0 | 17 | 0 | keep roman: English word or abbreviation |
| ch | 29 | 1 | 0 | 29 | 1 | keep roman: abbreviation "ch." |
| Ch | 12 | 1 | 0 | 13 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| ChaBaD | 1 | 0 | 0 | 1 | 0 | keep roman: letter string / acronym |
| Chadash | 141 | 0 | 0 | 141 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| ChaGaT | 5 | 0 | 0 | 5 | 0 | keep roman: letter string / acronym |
| Chagigah | 14 | 0 | 0 | 14 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Chai | 17 | 11 | 0 | 20 | 8 | keep roman: English word |
| Chamai | 10 | 0 | 0 | 10 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| ChaN | 2 | 0 | 0 | 2 | 0 | keep roman: letter string / acronym |
| Chanah | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Chaniel | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Chanina | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Chanukah | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| chapter | 819 | 5 | 0 | 819 | 5 | keep roman: English word (homograph) |
| chapters | 188 | 2 | 0 | 188 | 2 | keep roman: English word |
| Chasadim | 8 | 0 | 0 | 8 | 0 | keep roman: as Gevurot — unsure |
| Chasdiel | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Chashmal | 8 | 0 | 0 | 7 | 0 | keep roman: name of a grade (1:7:2) — unsure |
| Chashmalim | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Chatulariron | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Chayat | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Chayei | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Chayim | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Chayyat | 9 | 0 | 0 | 9 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Chayyat's | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Chayyei | 7 | 0 | 0 | 7 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Chayyim | 2 | 2 | 0 | 3 | 1 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Chayyot | 4 | 0 | 0 | 4 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Chaza'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Chazchazit | 4 | 1 | 0 | 4 | 1 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Chazchaziyot | 1 | 1 | 0 | 0 | 1 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Chazriel | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Chebar | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Chesed | 1556 | 2 | 0 | 1555 | 1 | keep roman: name of a sefirah / sefirah title |
| Chesed's | 2 | 0 | 0 | 2 | 0 | keep roman: name of a sefirah / sefirah title |
| Chesed-Gevurah-Tiferet | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Chesed-Netzach | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Chesed-within-Chesed | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Chet | 30 | 1 | 0 | 31 | 0 | keep roman: letter name |
| Chet-Tet-Heh | 1 | 0 | 0 | 1 | 0 | keep roman: letter name |
| Chiya | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Chiyya | 19 | 0 | 0 | 19 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Chizkiyah | 10 | 0 | 0 | 10 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Chizkuni's | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Chokhmah | 2214 | 3 | 0 | 2216 | 0 | keep roman: name of a sefirah / sefirah title |
| Chokhmah's | 2 | 0 | 0 | 2 | 0 | keep roman: name of a sefirah / sefirah title |
| Chokhmah-Chesed-Netzach | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Chokhmah-within-Chokhmah | 4 | 0 | 0 | 4 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Chokhmah-within-Gevurah | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Chokhmah-within-Keter | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Chokhmahs | 3 | 0 | 0 | 3 | 0 | keep roman: name of a sefirah / sefirah title |
| chosen | 12 | 4 | 0 | 12 | 4 | keep roman: English word (homograph) |
| Chr | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Chron | 10 | 0 | 0 | 10 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Chukkat | 11 | 0 | 0 | 11 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Chullin | 7 | 0 | 0 | 7 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| count | 164 | 2 | 0 | 164 | 2 | keep roman: English word (homograph) |
| Da'at | 254 | 0 | 0 | 253 | 0 | keep roman: name of a sefirah / sefirah title |
| Dalet | 92 | 4 | 0 | 93 | 3 | keep roman: letter name |
| Dalet-Vav | 10 | 0 | 0 | 10 | 0 | keep roman: letter name |
| Dani'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| de-Atikin | 1 | 0 | 0 | 1 | 0 | keep roman: part of a name |
| de-Kardinuta | 18 | 1 | 0 | 19 | 0 | keep roman: name |
| Deut | 103 | 0 | 0 | 103 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| di-Tzeni'uta | 1 | 1 | 0 | 2 | 0 | keep roman: part of a name |
| Diblaim | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Din | 144 | 1 | 0 | 144 | 1 | keep roman: sefirah title |
| Dinia | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| dlib | 1 | 0 | 0 | 1 | 0 | keep roman: English word or abbreviation |
| Dokhyam | 1 | 0 | 0 | 0 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Dumah | 2 | 1 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Each | 4 | 1 | 0 | 4 | 1 | keep roman: English word |
| Echad | 1 | 3 | 0 | 1 | 3 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| ed | 1 | 4 | 0 | 1 | 4 | keep roman: English word (homograph) |
| Eden | 249 | 3 | 0 | 248 | 3 | keep roman: English word |
| edition | 2 | 1 | 0 | 2 | 1 | keep roman: English word (homograph) |
| Edom | 5 | 0 | 0 | 5 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Ehyeh | 153 | 10 | 0 | 163 | 0 | keep roman: divine name / name |
| Ein | 398 | 0 | 0 | 397 | 0 | keep roman: divine name / name |
| Einayim | 11 | 4 | 0 | 15 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| El | 154 | 61 | 0 | 188 | 27 | keep roman: divine name / name |
| Elazar's | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Eli | 3 | 4 | 0 | 2 | 4 | keep roman: English word |
| Elim | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Elisheva | 5 | 0 | 0 | 4 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Eloah | 7 | 6 | 0 | 12 | 0 | keep roman: divine name / name |
| Elohim | 294 | 38 | 0 | 323 | 9 | keep roman: divine name / name |
| Elyon | 14 | 4 | 0 | 18 | 0 | keep roman: divine name / name |
| Enoch-Metatron | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| entry | 381 | 2 | 0 | 381 | 2 | keep roman: English word (homograph) |
| ephah | 3 | 2 | 0 | 3 | 2 | keep roman: English (biblical measure) |
| Erelim | 6 | 0 | 0 | 6 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Eruvin | 5 | 0 | 0 | 5 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Et | 1 | 3 | 0 | 0 | 3 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Etanim | 1 | 0 | 0 | 0 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| etc | 1668 | 0 | 0 | 1668 | 0 | keep roman: English word or abbreviation |
| even | 604 | 7 | 0 | 603 | 8 | keep roman: English word (homograph) |
| ever | 60 | 4 | 0 | 60 | 4 | keep roman: English word (homograph) |
| evil | 249 | 1 | 0 | 249 | 1 | keep roman: English word (homograph) |
| Exod | 181 | 0 | 0 | 181 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Ezrahite | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Farchi | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Feet | 1 | 0 | 0 | 0 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| feet | 49 | 0 | 0 | 49 | 0 | keep roman: English word or abbreviation |
| firstborn | 22 | 0 | 0 | 22 | 0 | keep roman: English word or abbreviation |
| fol | 1342 | 0 | 0 | 1342 | 0 | keep roman: English word or abbreviation |
| for | 7407 | 1 | 0 | 7406 | 1 | keep roman: English word (homograph) |
| fortiori | 4 | 2 | 0 | 4 | 2 | keep as is: Latin (a fortiori) |
| from | 8311 | 1 | 0 | 8310 | 1 | keep roman: English word (homograph) |
| fulfil | 14 | 0 | 0 | 14 | 0 | keep roman: English word or abbreviation |
| Ga'ash | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Ga'iel | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Gadi'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| GaH | 2 | 0 | 0 | 2 | 0 | keep roman: letter string / acronym |
| Galgal | 1 | 2 | 0 | 1 | 2 | keep roman: English word |
| Gallim | 3 | 1 | 0 | 3 | 1 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Gamgima | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Gamguma | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Gaonim | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Gavri'el | 1 | 1 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Gedudiel | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Gedulah | 366 | 0 | 0 | 365 | 0 | keep roman: name of a sefirah / sefirah title |
| Gedulah-Gevurah | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Gedulah-Gevurah-Tiferet | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Gerizim | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Gerud'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Gevurah | 1430 | 1 | 0 | 1430 | 0 | keep roman: name of a sefirah / sefirah title |
| Gevurah's | 2 | 0 | 0 | 2 | 0 | keep roman: name of a sefirah / sefirah title |
| Gevurah-Hod | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Gevuri'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Gevurot | 8 | 0 | 0 | 8 | 0 | keep roman: capitalised as a collective title (8:2:2) — unsure |
| Gezerah | 1 | 0 | 0 | 0 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Gezuriah | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Gibbor | 2 | 1 | 0 | 2 | 1 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Gikatilla | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Gimel | 40 | 1 | 0 | 41 | 0 | keep roman: letter name |
| Gimel-Dalet | 2 | 0 | 0 | 2 | 0 | keep roman: letter name |
| Gimel-Yod-Dalet | 1 | 0 | 0 | 1 | 0 | keep roman: letter name |
| Go'iel | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Ha'azinu | 10 | 0 | 0 | 10 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| ha-Akedah | 1 | 0 | 0 | 1 | 0 | keep roman: part of a name |
| ha-Bahir | 43 | 0 | 0 | 43 | 0 | keep roman: part of a name |
| ha-Chokhmah | 7 | 3 | 0 | 10 | 0 | keep roman: part of a name |
| ha-El | 1 | 5 | 0 | 1 | 5 | keep roman: part of a name |
| ha-Elohut | 1 | 0 | 0 | 1 | 0 | keep roman: part of a name |
| ha-Emunot | 5 | 0 | 0 | 5 | 0 | keep roman: part of a name |
| ha-Iyyun | 2 | 0 | 0 | 2 | 0 | keep roman: part of a name |
| ha-Kanah | 11 | 0 | 0 | 11 | 0 | keep roman: part of a name |
| ha-Kanah's | 1 | 0 | 0 | 1 | 0 | keep roman: part of a name |
| ha-Kavod | 1 | 1 | 0 | 2 | 0 | keep roman: part of a name |
| ha-Ma'arekhet | 1 | 0 | 0 | 1 | 0 | keep roman: part of a name |
| ha-Mada | 1 | 0 | 0 | 1 | 0 | keep roman: part of a name |
| ha-Madda | 1 | 0 | 0 | 1 | 0 | keep roman: part of a name |
| ha-Mitzvot | 3 | 0 | 0 | 3 | 0 | keep roman: part of a name |
| ha-Ne'lam | 1 | 0 | 0 | 1 | 0 | keep roman: part of a name |
| ha-Nikkud | 5 | 0 | 0 | 5 | 0 | keep roman: part of a name |
| ha-Orah | 28 | 1 | 0 | 29 | 0 | keep roman: part of a name |
| ha-Ramatah | 1 | 0 | 0 | 1 | 0 | keep roman: part of a name |
| ha-Rimmon | 7 | 0 | 0 | 7 | 0 | keep roman: part of a name |
| ha-Rishon | 1 | 0 | 0 | 1 | 0 | keep roman: part of a name |
| ha-Shem | 21 | 2 | 0 | 23 | 0 | keep roman: part of a name |
| ha-Tikkunim | 4 | 0 | 0 | 4 | 0 | keep roman: part of a name |
| ha-Tzaddik | 2 | 0 | 0 | 2 | 0 | keep roman: part of a name |
| ha-Tzinorot | 1 | 0 | 0 | 1 | 0 | keep roman: part of a name |
| ha-Yichud | 1 | 1 | 0 | 2 | 0 | keep roman: part of a name |
| ha-Zohar | 1 | 0 | 0 | 1 | 0 | keep roman: part of a name |
| Haggadah | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Hagigah | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Hai | 13 | 0 | 0 | 13 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| HaKanah | 6 | 0 | 0 | 6 | 0 | keep roman: letter string / acronym |
| Halakhah | 1 | 0 | 0 | 0 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Hallel | 2 | 1 | 0 | 1 | 1 | keep roman: English word |
| Halleluyah | 4 | 0 | 0 | 3 | 0 | keep roman: loanword (hallelujah) |
| Hamnuna | 6 | 0 | 0 | 6 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Hamotzi | 1 | 1 | 0 | 1 | 1 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Hannah | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| has | 1211 | 4 | 0 | 1211 | 4 | keep roman: English word |
| Hashanah | 10 | 0 | 0 | 10 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Hatkafta | 1 | 0 | 0 | 0 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| HaTzaddik | 3 | 0 | 0 | 3 | 0 | keep roman: letter string / acronym |
| Heh | 730 | 3 | 0 | 730 | 3 | keep roman: letter name |
| Heh-Samekh | 3 | 0 | 0 | 3 | 0 | keep roman: letter name |
| Heh-Yod | 34 | 0 | 0 | 34 | 0 | keep roman: letter name |
| Heikhal | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Heikhalot | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| here | 318 | 1 | 0 | 318 | 1 | keep roman: English word (homograph) |
| Hezekiah | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Hilkhot | 4 | 0 | 0 | 4 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| him | 2068 | 1 | 0 | 2067 | 1 | keep roman: English word (homograph) |
| Hod | 753 | 1 | 0 | 753 | 0 | keep roman: name of a sefirah / sefirah title |
| Hosea | 8 | 0 | 0 | 8 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Hoshana | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| hyle | 2 | 1 | 0 | 2 | 1 | keep roman: Greek philosophical term, in English use |
| idol-worshippers | 3 | 0 | 0 | 3 | 0 | keep roman: English word or abbreviation |
| Idra | 51 | 0 | 0 | 51 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Ila'ah | 5 | 0 | 0 | 5 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Ila'i | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Imma | 88 | 0 | 0 | 88 | 0 | keep roman: divine name / name |
| In | 243 | 1 | 0 | 243 | 1 | keep roman: English word |
| in | 21333 | 2 | 0 | 21329 | 2 | keep roman: English word (homograph) |
| inah | 2 | 0 | 0 | 2 | 0 | skip: partial word "B[inah]" |
| Inya | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| is | 34489 | 2 | 0 | 34486 | 2 | keep roman: English word (homograph) |
| Isa | 198 | 0 | 0 | 198 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Ishim | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| it | 14178 | 1 | 0 | 14176 | 1 | keep roman: English word (homograph) |
| Itkafta | 1 | 0 | 0 | 0 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Jachin | 9 | 0 | 0 | 8 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Jeshurun | 2 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Kabbalah | 32 | 0 | 0 | 32 | 0 | keep roman: loanword |
| KaChaB | 3 | 0 | 0 | 3 | 0 | keep roman: letter string / acronym |
| Kadesh | 5 | 0 | 0 | 5 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Kadisha | 11 | 0 | 0 | 11 | 0 | keep roman: divine name / name |
| Kadmon | 1 | 1 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Kaf | 62 | 1 | 0 | 63 | 0 | keep roman: letter name |
| Kaf-Dalet | 2 | 0 | 0 | 2 | 0 | keep roman: letter name |
| Kaf-Heh | 1 | 0 | 0 | 1 | 0 | keep roman: letter name |
| Kaf-Vav | 6 | 0 | 0 | 6 | 0 | keep roman: letter name |
| Kafan | 2 | 1 | 0 | 2 | 1 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Kaftziel | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Kalah | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Kallah | 1 | 0 | 0 | 1 | 0 | keep roman: English word |
| Kamma | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Kanah | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Kar'iel | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Karshiel | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Karshiha'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Karspiha'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Karvi'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Kaspi'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Katatriha'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Katritia | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Katzpiel | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Kavtzi'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Kavtziel | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Kedoshim | 10 | 1 | 0 | 10 | 1 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Kedumiah | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Kedushah | 6 | 1 | 0 | 6 | 1 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Kedushi'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Kedushiel | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| KeFeReT | 2 | 0 | 0 | 2 | 0 | keep roman: letter string / acronym |
| Keruvi'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Kesiriah | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Keter | 1620 | 2 | 0 | 1621 | 0 | keep roman: name of a sefirah / sefirah title |
| Keter's | 2 | 0 | 0 | 2 | 0 | keep roman: name of a sefirah / sefirah title |
| Keter-Chokhmah-Binah | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Keter-within-Binah | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Keter-within-Chokhmah | 4 | 0 | 0 | 4 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Keter-within-Gevurah | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Keter-within-Keter-within-Binah | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Keter-within-Malkhut-within-Binah | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Ketubbot | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Ketubot | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Kevar | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| ki | 4 | 3 | 0 | 4 | 3 | italicise, except in "Ve-haya ki yevi'akha" (passage name) |
| Kinneret | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Kiriath-arba | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Kiryat | 6 | 1 | 0 | 5 | 1 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Kivshi'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Knesset | 27 | 1 | 0 | 27 | 1 | keep roman: in the title Knesset Yisrael (Malkhut) |
| Kodshi | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Kof-Resh | 1 | 0 | 0 | 1 | 0 | keep roman: letter name |
| Kof-Vav-Peh | 1 | 0 | 0 | 1 | 0 | keep roman: letter name |
| Koh | 3 | 3 | 0 | 2 | 3 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Kokhaviel | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Kokhvi'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Komah | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Korach | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Korach's | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Koretz | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Kruma | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Kumi'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Kuzu | 6 | 2 | 0 | 8 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Lahavi'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Lailah | 1 | 1 | 0 | 1 | 1 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Laish | 3 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Laishah | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Lakunya | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Lamed-Mem-Dalet | 1 | 0 | 0 | 1 | 0 | keep roman: letter name |
| Lecha | 8 | 0 | 0 | 8 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Lekh | 30 | 0 | 0 | 30 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| letter | 351 | 3 | 0 | 351 | 3 | keep roman: English word (homograph) |
| Lev | 94 | 2 | 0 | 94 | 2 | keep roman: English word |
| Levi | 11 | 1 | 0 | 10 | 1 | keep roman: English word |
| León | 173 | 0 | 0 | 173 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| li-Shlomo | 1 | 0 | 0 | 1 | 0 | keep roman: part of a name |
| list | 3 | 1 | 0 | 3 | 1 | keep roman: English word (homograph) |
| lists | 1 | 1 | 0 | 1 | 1 | keep roman: English word |
| lovingkindness | 34 | 0 | 0 | 34 | 0 | keep roman: English word or abbreviation |
| lovingkindnesses | 1 | 0 | 0 | 1 | 0 | keep roman: English word or abbreviation |
| M | 26 | 1 | 0 | 27 | 0 | keep roman: English word |
| Ma'arakhot | 2 | 1 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Ma'arekhet | 12 | 0 | 0 | 12 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Ma'aseh | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Ma'ayan | 7 | 4 | 0 | 11 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Ma'on | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Maacah | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Machalat | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Machpelah | 4 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Mada | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Mah | 6 | 24 | 0 | 6 | 24 | keep roman where a name (Mah [45], the filled Name); italic word uses left |
| Makhon | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Mal'akhim | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Malachi | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| male | 579 | 1 | 0 | 578 | 1 | keep roman: English word (homograph) |
| Mali'el | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Malkhi'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Malkhiel | 4 | 0 | 0 | 4 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Malkhut | 2749 | 0 | 0 | 2748 | 0 | keep roman: name of a sefirah / sefirah title |
| Malkhut's | 7 | 0 | 0 | 7 | 0 | keep roman: name of a sefirah / sefirah title |
| Malkhut-within-Chokhmah | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Malkhut-within-Keter | 4 | 0 | 0 | 4 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Malkhuyot | 1 | 1 | 0 | 1 | 1 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| MaNTzPaKh | 1 | 9 | 0 | 10 | 0 | keep roman: letter string / acronym |
| Marcheshvan | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Masasraniah | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| masc | 1 | 0 | 0 | 1 | 0 | keep roman: English word or abbreviation |
| Masei | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Masorah | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| matches | 1 | 1 | 0 | 1 | 1 | keep roman: English word |
| Matronita | 1 | 1 | 0 | 1 | 1 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| matzah | 17 | 2 | 0 | 16 | 2 | keep roman: loanword |
| Mazal | 1 | 0 | 0 | 0 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Me'erat | 1 | 1 | 0 | 0 | 1 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Me'irat | 11 | 4 | 0 | 15 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Megillah | 6 | 0 | 0 | 6 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Meheimna | 199 | 1 | 0 | 200 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Mehemna | 23 | 4 | 0 | 27 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Melchizedek | 6 | 0 | 0 | 5 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Melekh | 1 | 3 | 0 | 2 | 2 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Mem-Tet | 3 | 0 | 0 | 3 | 0 | keep roman: letter name |
| Mem-Tzadi | 1 | 0 | 0 | 1 | 0 | keep roman: letter name |
| Menachem | 37 | 0 | 0 | 37 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Menachot | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| menorah | 8 | 2 | 0 | 8 | 2 | keep roman: loanword |
| Menuchah | 1 | 3 | 0 | 4 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Merkavah | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Meshichiel | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Meshulchael | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Metatron | 161 | 0 | 0 | 160 | 0 | keep roman: divine name / name |
| Metatron's | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Metzi'a | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Metzia | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Metzora | 6 | 0 | 0 | 6 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Midian | 3 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Midrashim | 1 | 0 | 0 | 1 | 0 | keep roman: name of the literature |
| Miketz | 18 | 0 | 0 | 18 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Mikhtam | 1 | 0 | 0 | 0 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Minchat | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Mishkan | 17 | 0 | 0 | 17 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Mishnayot | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Mishpatim | 46 | 0 | 0 | 46 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Mistarim | 14 | 0 | 0 | 14 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Mo'ed | 4 | 0 | 0 | 4 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Molkho | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Mordechai | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Moriah | 5 | 0 | 0 | 5 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Moshe | 174 | 1 | 0 | 174 | 1 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| N | 51 | 2 | 0 | 53 | 0 | keep roman: English word |
| Naamah | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Nachashiel | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Nachli'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Nachmani | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Nachmanides | 6 | 0 | 0 | 6 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Nachshon | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Nagdi'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Nah | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Nashri'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Nashriel | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Ne'erav | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Nechashikhon | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Nechashiron | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Nechunya | 32 | 0 | 0 | 32 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Nechushtiron | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Negev | 6 | 1 | 0 | 5 | 1 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Neshimiron | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Nesira | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Netzach | 725 | 4 | 0 | 724 | 4 | keep roman: name of a sefirah / sefirah title |
| Netzach's | 3 | 0 | 0 | 3 | 0 | keep roman: name of a sefirah / sefirah title |
| Netzach-Hod-Yesod | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Netzach-Hod-Yesod-Malkhut | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Netzachs | 10 | 0 | 0 | 10 | 0 | keep roman: name of a sefirah / sefirah title |
| Ni'atziriel | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Niddah | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Nitzavim | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Nitzchirirun | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Noach | 43 | 1 | 0 | 43 | 1 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| nose | 32 | 2 | 0 | 32 | 2 | keep roman: English word (homograph) |
| Nukva | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Num | 85 | 0 | 0 | 85 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| numbered | 2 | 1 | 0 | 1 | 1 | keep roman: English word |
| Nun | 102 | 1 | 0 | 103 | 0 | keep roman: letter name |
| Nun-Dalet | 1 | 0 | 0 | 1 | 0 | keep roman: letter name |
| Nuri'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Ochim | 1 | 0 | 0 | 0 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| of | 32179 | 4 | 0 | 32080 | 4 | keep roman: English word (homograph) |
| Ofannim | 10 | 0 | 0 | 10 | 0 | keep roman: angel class (name); lowercase ofannim already italic |
| okhmah | 2 | 0 | 0 | 2 | 0 | skip: partial word "Ch[okhmah]" |
| Olamim | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| omer | 2 | 6 | 0 | 2 | 6 | keep roman: English (biblical measure, "an omer") |
| one | 3871 | 1 | 0 | 3871 | 1 | keep roman: English word (homograph) |
| Or | 131 | 11 | 0 | 140 | 1 | keep roman: English word |
| or | 741 | 51 | 0 | 738 | 53 | keep roman: English word (homograph) |
| Orach | 1 | 0 | 0 | 1 | 0 | keep roman: English word |
| Orah | 4 | 1 | 0 | 5 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| OSheN | 1 | 0 | 0 | 1 | 0 | keep roman: letter string / acronym |
| Otzar | 1 | 1 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| over | 1070 | 2 | 0 | 1070 | 2 | keep roman: English word (homograph) |
| Pachad | 7 | 7 | 0 | 7 | 7 | keep roman: name of a sefirah / sefirah title |
| pan | 36 | 2 | 0 | 34 | 2 | keep roman: English word (homograph) |
| parashat | 23 | 0 | 0 | 23 | 0 | keep roman: citation word joined to a parashah name ("parashat Acharei") |
| Parashat | 685 | 0 | 0 | 685 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Pardes | 2 | 2 | 0 | 4 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| passes | 27 | 1 | 0 | 26 | 1 | keep roman: English word |
| Pe'ah | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Peah | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Peh | 30 | 1 | 0 | 30 | 1 | keep roman: letter name |
| Peh-Tzadi | 1 | 0 | 0 | 1 | 0 | keep roman: letter name |
| Pekudei | 33 | 0 | 0 | 33 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Pelach | 9 | 0 | 0 | 9 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Peli'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Penu'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| per | 1 | 1 | 0 | 1 | 1 | keep roman: English word (homograph) |
| Peretz | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Pesachim | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Petachiel | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Petachon | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Petut | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Pikkudin | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Pinchas | 127 | 0 | 0 | 127 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Pirkei | 9 | 0 | 0 | 9 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| printed | 6 | 1 | 0 | 6 | 1 | keep roman: English word (homograph) |
| printing | 2 | 1 | 0 | 2 | 1 | keep roman: English word (homograph) |
| Purim | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Q | 11 | 1 | 0 | 12 | 0 | keep roman: English word |
| Ra'avad | 5 | 0 | 0 | 5 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Ra'avad's | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Ra'aya | 222 | 5 | 0 | 227 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Rabbah | 30 | 0 | 0 | 30 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Rachamim | 73 | 1 | 0 | 73 | 1 | keep roman: sefirah title (Chesed, Din, Rachamim) |
| Rachel | 23 | 1 | 0 | 22 | 1 | keep roman: English word |
| Rachmi'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Rachmiel | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Raki'a | 3 | 0 | 0 | 3 | 0 | keep roman: firmament name |
| ram | 5 | 4 | 0 | 5 | 4 | keep roman: English word (homograph) |
| Ramah | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Ramban | 4 | 0 | 0 | 4 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Ramban's | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Rashbi | 994 | 0 | 0 | 994 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Rashbi's | 10 | 0 | 0 | 10 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Rashi | 9 | 0 | 0 | 9 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Rashi's | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Rav | 51 | 1 | 0 | 51 | 1 | keep roman: title in names |
| Rava | 4 | 0 | 0 | 4 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Ravchi'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Raziel | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Re'eh | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Rechumai | 6 | 0 | 0 | 6 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Rephaim | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Resh | 44 | 1 | 0 | 45 | 0 | keep roman: letter name |
| Rimmonim | 8 | 5 | 0 | 13 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Rimonim | 8 | 1 | 0 | 9 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Rosh | 10 | 2 | 0 | 10 | 2 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| rsl | 1 | 0 | 0 | 1 | 0 | keep roman: English word or abbreviation |
| ru | 1 | 0 | 0 | 1 | 0 | keep roman: English word or abbreviation |
| run | 13 | 1 | 0 | 13 | 1 | keep roman: English word (homograph) |
| s | 8 | 1 | 0 | 9 | 1 | keep roman: English word (homograph) |
| Sa'adiel | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Sabi'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Safra | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Safsirita | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Sagsaga'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| sandal | 5 | 1 | 0 | 5 | 1 | keep roman: English word |
| Sanegoriah | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Sangadiel | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Sangiyah | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Sansaniah | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Sansinia | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Sanugiria | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Sarah | 16 | 1 | 0 | 15 | 1 | keep roman: English word |
| Sarsarim | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Sarsuria | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Sartia | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Sartiha'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Sastoria | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Satan | 7 | 2 | 0 | 9 | 0 | keep roman: name/loanword |
| Satutriyah | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Sava | 10 | 1 | 0 | 10 | 1 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Se'iriel | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Sefaria's | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Sefer | 227 | 32 | 0 | 259 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| sefirah | 288 | 1 | 0 | 288 | 1 | keep roman: as sefirot — for review |
| sefirot | 1801 | 0 | 0 | 1801 | 0 | keep roman: naturalised term (recommended; Scholem and Matt write it roman) — for review |
| sefirot's | 1 | 0 | 0 | 1 | 0 | keep roman: as sefirot |
| segolta's | 1 | 0 | 0 | 0 | 0 | italicise: possessive, counted under segolta (<em>segolta</em>'s) |
| Senigia | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Senunia | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Sforta | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Sh | 14 | 2 | 0 | 16 | 0 | keep roman: English word |
| Sha'ar | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Sha'arei | 3 | 10 | 0 | 13 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Sha'atnez | 1 | 0 | 0 | 0 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Shabbat | 17 | 8 | 0 | 17 | 8 | keep roman: name of the day (as Sabbath) |
| Shabbatot | 1 | 0 | 0 | 1 | 0 | keep roman: plural of Shabbat (name of the day) |
| Shaddai | 63 | 11 | 0 | 69 | 5 | keep roman: divine name / name |
| Shalgi'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Shalhaviron | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Shammai | 7 | 0 | 0 | 7 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| shamoa | 5 | 0 | 0 | 5 | 0 | keep roman: in the passage name "Ve-haya im shamoa" |
| Shamshiel | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| shavah | 1 | 3 | 0 | 0 | 3 | in the Gate 23 title "Gezerah shavah" (titles not touched) |
| Shavu'ot | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Shavuot | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Sheba | 10 | 0 | 0 | 10 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Shechakim | 3 | 0 | 0 | 3 | 0 | keep roman: firmament name |
| Shekalim | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| shekel | 26 | 1 | 0 | 24 | 1 | keep roman: English (biblical measure) |
| Shekhaniel | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Shekhinah | 535 | 2 | 0 | 536 | 0 | keep roman: name of a sefirah / sefirah title |
| Shelach | 21 | 0 | 0 | 21 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Shelomoh | 1 | 4 | 0 | 1 | 4 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Shem | 32 | 0 | 0 | 32 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Shema | 24 | 4 | 0 | 24 | 4 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Shema'iel | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Shema'iha'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Shemini | 14 | 2 | 0 | 14 | 2 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Shemot | 21 | 0 | 0 | 21 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Sherira | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Shevat | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Shevu'ot | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Shevuot | 4 | 0 | 0 | 4 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Shi'ur | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Shichrinon | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Shifri'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Shihor | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Shimon | 63 | 0 | 0 | 63 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Shimon's | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Shimshi'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Shin-Dalet | 1 | 1 | 0 | 2 | 0 | keep roman: letter name |
| Shinar | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Shlomo | 7 | 0 | 0 | 7 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Shmuel | 7 | 0 | 0 | 7 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Shod | 3 | 1 | 0 | 3 | 1 | keep roman: English word |
| shofar | 33 | 8 | 0 | 33 | 8 | keep roman: loanword (in common English use) |
| Shofar | 1 | 1 | 0 | 0 | 1 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| shofar-blowing | 1 | 0 | 0 | 1 | 0 | keep roman: English word or abbreviation |
| Shofarot | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Shofetim | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| showbread | 3 | 0 | 0 | 2 | 0 | keep roman: English word or abbreviation |
| Shushan | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Sifra | 1 | 1 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Sifrei | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Sikhsikha | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Sira | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Sita'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Sitnah | 1 | 0 | 0 | 0 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Sitra | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Sitrei | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Sitriah | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Skafortia | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Sktupa | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| so | 3326 | 1 | 0 | 3325 | 1 | keep roman: English word (homograph) |
| Sof | 397 | 1 | 0 | 396 | 1 | keep roman: divine name / name |
| Sof's | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Sotah | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| stated | 21 | 1 | 0 | 21 | 1 | keep roman: English word (homograph) |
| states | 1 | 1 | 0 | 1 | 1 | keep roman: English word |
| Statoria | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Sukkah | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Sukkot | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| supplied | 1 | 1 | 0 | 1 | 1 | keep roman: English word |
| Suri'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Suriah | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| T | 20 | 1 | 0 | 21 | 0 | keep roman: English word |
| Ta'amei | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Ta'anit | 5 | 0 | 0 | 5 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Tafihotza | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Tafsarinia | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Tahara | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Tahari'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Tahash | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| tallit | 9 | 2 | 0 | 8 | 2 | keep roman: loanword (also roman in the Gate 23 title "The white tallit") |
| Tanchuma | 4 | 0 | 0 | 4 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Tanna | 7 | 0 | 0 | 7 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Tanna'im | 4 | 0 | 0 | 4 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Tarshish | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Taskifa | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Tav | 72 | 2 | 0 | 73 | 1 | keep roman: letter name |
| Tavri'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Tazria | 9 | 0 | 0 | 9 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Te'omiel | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Teitzei | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Teli | 20 | 2 | 0 | 20 | 2 | keep roman: name (the Dragon); 2 italic left — unsure |
| Teru | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Terumah | 81 | 0 | 0 | 81 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Terumi'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Teshuvah | 9 | 4 | 0 | 9 | 4 | keep roman: name of a sefirah / sefirah title |
| Tet | 46 | 0 | 0 | 46 | 0 | keep roman: letter name |
| Tet-Lamed | 1 | 0 | 0 | 1 | 0 | keep roman: letter name |
| Tetzaveh | 5 | 0 | 0 | 5 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Tetze | 23 | 0 | 0 | 23 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Tevel | 6 | 1 | 0 | 6 | 1 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Tevet | 5 | 0 | 0 | 5 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Tevunah | 15 | 6 | 0 | 15 | 6 | keep roman: name of a sefirah / sefirah title |
| that | 15706 | 2 | 0 | 15704 | 2 | keep roman: English word (homograph) |
| The | 1261 | 2 | 0 | 1150 | 2 | keep roman: English word |
| the | 70373 | 9 | 0 | 70319 | 9 | keep roman: English word (homograph) |
| this | 8081 | 1 | 0 | 8081 | 1 | keep roman: English word (homograph) |
| through | 888 | 1 | 0 | 888 | 1 | keep roman: English word (homograph) |
| Thummim | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Tiferet | 2470 | 2 | 0 | 2470 | 1 | keep roman: name of a sefirah / sefirah title |
| Tiferet's | 8 | 0 | 0 | 8 | 0 | keep roman: name of a sefirah / sefirah title |
| Tiferet-Yesod-Malkhut | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Tifti'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Tikkun | 325 | 0 | 0 | 325 | 0 | keep roman: name of a section of the Tikkunei Zohar ("Tikkun 13") |
| Tikkunei | 107 | 1 | 0 | 108 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Tikkunim | 666 | 0 | 0 | 666 | 0 | keep roman: book (Tikkunei Zohar) |
| Timnah | 1 | 0 | 0 | 0 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Tisa | 4 | 0 | 0 | 4 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Tishbite | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Tishrei | 5 | 0 | 0 | 5 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Tissa | 6 | 0 | 0 | 6 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| titles | 115 | 1 | 0 | 115 | 1 | keep roman: English word |
| to | 13646 | 2 | 0 | 13645 | 2 | keep roman: English word (homograph) |
| Toledot | 15 | 0 | 0 | 15 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Torah | 519 | 6 | 0 | 519 | 3 | keep roman: loanword |
| Tosafot | 4 | 0 | 0 | 4 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Tosefta | 5 | 0 | 0 | 5 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Tov | 28 | 0 | 0 | 28 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Tov's | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Tufi'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Tumi'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Tumiel | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Tumiha'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| twenty-seven | 3 | 1 | 0 | 3 | 1 | keep roman: English word |
| twenty-three | 1 | 1 | 0 | 1 | 1 | keep roman: English word |
| twenty-two | 70 | 1 | 0 | 70 | 1 | keep roman: English word |
| Tz | 29 | 0 | 0 | 29 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Tzachtzachot | 53 | 0 | 0 | 53 | 0 | keep roman: name of the three hidden lights and of Gate 11 (capitalised use); lowercase generic use italicised — unsure |
| Tzaddik | 23 | 7 | 0 | 23 | 7 | keep roman: name of a sefirah / sefirah title |
| Tzaddik-Yesod-Olam | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Tzadi | 38 | 0 | 0 | 38 | 0 | keep roman: letter name |
| Tzadi-Bet | 1 | 1 | 0 | 2 | 0 | keep roman: letter name |
| Tzadki'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Tzadkiel | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Tzaftzaniah | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Tzar'ita | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Tzav | 14 | 0 | 0 | 14 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Tzedek | 19 | 16 | 0 | 28 | 7 | keep roman: name of a sefirah / sefirah title |
| Tzefoni | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Tzefuni'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Tzelel | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Tzeva'ot | 72 | 5 | 0 | 77 | 0 | keep roman: divine name / name |
| Tzinorot | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Tzitziah | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Tzuri'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Urim | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Usha | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Uza | 4 | 0 | 0 | 4 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| v | 1 | 1 | 0 | 1 | 1 | keep roman: English word (homograph) |
| Va'ani'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Va'ed | 1 | 0 | 0 | 0 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Va'era | 7 | 0 | 0 | 7 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Va'etchanan | 7 | 0 | 0 | 7 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Va-era | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Va-etchanan | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Va-yakhel | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Va-yechi | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Va-yiggash | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Va-yikra | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Va-yishlach | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Va-yishma | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Vakhri'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Vav | 541 | 1 | 0 | 541 | 1 | keep roman: letter name |
| Vav-Alef-Vav | 18 | 0 | 0 | 18 | 0 | keep roman: letter name |
| Vav-Dalet | 9 | 0 | 0 | 9 | 0 | keep roman: letter name |
| Vav-Heh-tablets | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Vav-Mem-Vav | 1 | 0 | 0 | 1 | 0 | keep roman: letter name |
| Vav-Yod | 4 | 0 | 0 | 4 | 0 | keep roman: letter name |
| Vavi'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Vavs | 88 | 0 | 0 | 88 | 0 | keep roman: letter name |
| Vayakhel | 6 | 0 | 0 | 6 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Vayechi | 47 | 0 | 0 | 47 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Vayera | 19 | 0 | 0 | 19 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Vayeshev | 5 | 0 | 0 | 5 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Vayetze | 44 | 0 | 0 | 44 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Vayetzei | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Vayigash | 8 | 0 | 0 | 8 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Vayikra | 64 | 0 | 0 | 64 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Vayishlach | 10 | 0 | 0 | 10 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| ve-AD | 1 | 0 | 0 | 1 | 0 | keep roman: part of a name |
| Ve-haya | 9 | 0 | 0 | 9 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Vehu | 1 | 1 | 0 | 1 | 1 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Velili'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Vilon | 6 | 0 | 0 | 5 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| watchmen | 1 | 0 | 0 | 1 | 0 | keep roman: English word or abbreviation |
| with | 3876 | 1 | 0 | 3876 | 1 | keep roman: English word (homograph) |
| worshippers | 2 | 0 | 0 | 2 | 0 | keep roman: English word or abbreviation |
| Y | 202 | 2 | 0 | 204 | 0 | keep roman: English word |
| Ya'akov | 1 | 9 | 0 | 7 | 3 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Yachin | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Yah | 83 | 7 | 0 | 86 | 4 | keep roman: divine name / name |
| Yakar | 35 | 7 | 0 | 42 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Yalfi'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Yazniah | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Yehudah | 49 | 1 | 0 | 50 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Yehudi'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Yehudiah | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Yeisa | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Yeli | 1 | 1 | 0 | 1 | 1 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Yeli'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Yeri'ah | 1 | 2 | 0 | 1 | 2 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Yero'i'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Yesod's | 6 | 0 | 0 | 6 | 0 | keep roman: name of a sefirah / sefirah title |
| Yesodei | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Yetzirah | 259 | 1 | 0 | 260 | 0 | keep roman: world name / Sefer Yetzirah |
| Yevamot | 8 | 0 | 0 | 8 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| yevi'akha | 4 | 0 | 0 | 4 | 0 | keep roman: in the passage name "Ve-haya ki yevi'akha" |
| YHVH | 802 | 7 | 0 | 794 | 7 | keep roman: letter string / acronym |
| YHVH's | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| YHVH-Alef | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Yishmael | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Yisra'el | 1 | 10 | 0 | 1 | 10 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Yisrael | 30 | 1 | 0 | 30 | 1 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Yitzchak | 6 | 3 | 0 | 6 | 3 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Yitzetziah | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Yochai | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Yochanan | 5 | 0 | 0 | 5 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Yod | 864 | 2 | 0 | 866 | 0 | keep roman: letter name |
| Yod-Dalet | 1 | 0 | 0 | 1 | 0 | keep roman: letter name |
| Yod-Heh | 38 | 0 | 0 | 38 | 0 | keep roman: letter name |
| Yod-Vav-Dalet | 18 | 0 | 0 | 18 | 0 | keep roman: letter name |
| Yods | 101 | 0 | 0 | 101 | 0 | keep roman: letter name |
| Yofi'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Yoma | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Yose's | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Yosef | 14 | 2 | 0 | 15 | 1 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Yossi's | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Yotzer | 3 | 1 | 0 | 3 | 1 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Za'afiel | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Za'amiel | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Za'ani'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Zarah | 8 | 0 | 0 | 8 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Zarua | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Zayin | 36 | 1 | 0 | 37 | 0 | keep roman: letter name |
| Zayin-Heh | 1 | 0 | 0 | 1 | 0 | keep roman: letter name |
| Ze'eir | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Ze'ir | 14 | 0 | 0 | 13 | 0 | keep roman: divine name / name |
| Zech | 23 | 0 | 0 | 23 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Zechariah | 5 | 0 | 0 | 5 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Zeir | 45 | 0 | 0 | 45 | 0 | keep roman: divine name / name |
| Zeira | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Zekhari'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Zekhut-El | 4 | 0 | 0 | 4 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Zekhuta'el | 3 | 0 | 0 | 3 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Zekuni'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Zerach | 1 | 0 | 0 | 0 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Zerah | 6 | 0 | 0 | 6 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Zevachim | 2 | 0 | 0 | 2 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Zevul | 3 | 2 | 0 | 2 | 2 | keep roman: firmament name |
| Zipporah | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Zohar | 1099 | 2 | 0 | 1100 | 1 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Zohar's | 1 | 1 | 0 | 1 | 1 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Zutri'el | 1 | 0 | 0 | 1 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |
| Ṭ | 20 | 1 | 0 | 21 | 0 | keep roman: name (person, place, angel, book, parashah, tractate, prayer, festival or title) |

## Already italic only (no action), lower-case single-word forms: 2166

mishnah 93, ofannim 37, adam 27, kodesh 27, sefer 26, ru'ach 25, ha-Temunah 23, kavod 21, chashmal 20, el 19, ehyeh 18, shamor 18, zakhor 18, zot 18, kedem 17, tov 17, yam 17, yomam 17, al 16, gallim 16, zeh 16, dar 15, hi 15, mayim 15, rav 15, shir 15, eretz 14, meisharim 14, nahar 14, sukkah 14, yad 14, beit 13, elleh 13, emet 13, heikhal 13, socheret 13, tikkunin 13, va-yehi 13, hoy 12, keren 12, mitzvah 12, peh 12, tzedakah 12, ga'ya 11, kesher 11, olah 11, be'er 10, etzem 10, nogah 10, re'uta 10, teki'ah 10, ye'or 10, aryeh 9, av 9, az 9, bara 9, chayyim 9, hadar 9, kerach 9, levanah 9, mi 9, mishpat 9, nachal 9, rafeh 9, ratzon 9, shemitot 9, te'udah 9, tekhelet 9, yare'ach 9, be-heitivo 8, chefetz 8, emunah 8, etz 8, ha-yam 8, haggadah 8, kad 8, li 8, metzuchtzach 8, motnayim 8, omen 8, oneg 8, pe'er 8, shelamim 8, shevarim 8, tehillah 8, yashar 8, ach 7, appayim 7, be'erah 7, chasidah 7, chittah 7, chokekei 7, deror 7, dod 7, erekh 7, eser 7, gal 7, gan 7, gedulah 7, ha-etzem 7, ha-motzi 7, ishah 7, ishim 7, keri 7, makom 7, me'od 7, oseh 7, oy 7, pasek 7, pekidah 7, sason 7, tannin 7, tzach 7, yamim 7, af 6, akev 6, alai 6, attah 6, chasadim 6, chazon 6, chei 6, chet 6, devarim 6, etnach 6, gomel 6, ha-olam 6, hahu 6, hevel 6, ibbur 6, kedushah 6, lechem 6, lemor 6, malkhut 6, me'ah 6, mishnayot 6, ner 6, nof 6, notarikon 6, pasuk 6, petach 6, rabbim 6, rechem 6, shemitah 6, sod 6, tiyyomet 6, tzur 6, va-ed 6, ve-et 6, yefeh 6, zekhirah 6, zeret 6, zug 6, achat 5, afarsemon 5, arafel 5, ashan 5, asherah 5, atzeret 5, berakhah 5, chakukei 5, chalatzayim 5, chammah 5, chavit 5, cherut 5, chevel 5, chotam 5, dakh 5, dalah 5, darga 5, dor 5, du 5, elohim 5, gam 5, gematriot 5, ger 5, gerishin 5, ha-aretz 5, ha-kodesh 5, ha-sappir 5, kaf 5, karov 5, kastira 5, kayyam 5, kelayot 5, keshet 5, ketev 5, kursaya 5, la-menatze'ach 5, lashon 5, mazon 5, metzavveh 5, mikveh 5, mishneh 5, nafsho 5, nega 5, negbah 5, nehar 5, nitzav 5, ofer 5, oz 5, peri'ah 5, sak 5, sar 5, sela 5, shanah 5, shar 5, shemittah 5, shoshanah 5, tappu'ach 5, temimah 5, teva 5, tzava 5, tze'akah 5, va-ani 5, va-yagged 5, yarum 5, yenuka 5, yetiv 5, yotzer 5, adon 4, alluf 4, ammah 4, ashishot 4, aven 4, avon 4, be-Tziyyon 4, bor 4, chag 4, challah 4, chashak 4, chavalah 4, cherev 4, chom 4, chozeh 4, chuppah 4, chut 4, dayyan 4, edah 4, eitan 4, gulgolet 4, ha-elohim 4, ha-gadol 4, ha-hu 4, ha-kore 4, ha-olamim 4, ha-omer 4, ha-yom 4, istomkha 4, itra 4, kaneh 4, katit 4, ketoret 4, kevar 4, kivshan 4, livnat 4, livyatan 4, ma'arikh 4, ma'on 4, machazeh 4, mal 4, mamzer 4, mappik 4, matteh 4, me-al 4, melakhah 4, melukhah 4, menuchah 4, meshummar 4, mezuzah 4, mo'ed 4, musaf 4, o 4, pi 4, pitchei 4, porot 4, ra'ash 4, ra'ava 4, rashei 4, re'iyah 4, rechovot 4, revi'a 4, rokhel 4, sechorah 4, sefatayim 4, sha'ar 4, shachar 4, sheminit 4, shemirah 4, shevu'ah 4, shnei 4, tachash 4, taharah 4, tamim 4, te'omim 4, tefillah 4, teki'ot 4, tel 4, terumah 4, tircha 4, tola'at 4, tzafon 4, tzela 4, tzevi 4, va-yyitzer 4, vay 4, yayin 4, yemallel 4, zakhar 4, achar 3, acharit 3, achlamah 3, ahah 3, akedah 3, akh 3, alef 3, ammud 3, anokhi 3, appiryon 3, aretz 3, arugah 3, ashmoret 3, asor 3, asur 3, atad 3, atzilut 3, aval 3, avot 3, ayyeh 3, ba-esh 3, banim 3, basar 3, be-oshri 3, be-zot 3, beriah 3, chamudot 3, chash 3, chasid 3, chatat 3, chavatzelet 3, chaver 3, chayyah 3, chekker 3, chirek 3, chofshi 3, chorin 3, chukkim 3, chukkot 3, chumra 3, delet 3, derekh 3, dimyon 3, dinur 3, divrati 3, eddadem 3, ednah 3, ei 3, eifoh 3, ein 3, einayim 3, esev 3, eyaluti 3, gedolah 3, gei 3, geva'ot 3, gid 3, ha-chayyim 3, ha-mayim 3, ha-melekh 3, ha-oseh 3, ha-panim 3, ha-shachar 3, hallel 3, hem 3, heveh 3, hoyah 3, illem 3, issaron 3, kappot 3, karet 3, kelulotayikh 3, kerabim 3, keresh 3, kippurim 3, kisse 3, kosher 3, kula 3, lahav 3, layish 3, lefanai 3, lehim 3, leshem 3, levonah 3, ma'aseh 3, ma'or 3, machashavah 3, madda 3, maggidim 3, malkhei 3, maneh 3, mar'ot 3, mashkon 3, mattarah 3, matzevah 3, mefo'ar 3, mehupakh 3, merkavah 3, milui 3, minchah 3, mishkan 3, mor 3, mori 3, moshzar 3, mot 3, nadiv 3, nagov 3, negev 3, nes 3, netivot 3, nima 3, nitzanim 3, no'am 3, nora 3, oni 3, onim 3, oto 3, ov 3, pargod 3, parokhet 3, pekudah 3, peri 3, peshutah 3, rachum 3, re'u 3, re'utin 3, reikam 3, rokhev 3, rov 3, sadai 3, sadeh 3, safah 3, se'orah 3, sefarim 3, seivah 3, semukhim 3, shai 3, shalhevetyah 3, shayish 3, she'elah 3, shelamav 3, shelim 3, shemesh 3, shever 3, shevo 3, shi'ur 3, shim'ah 3, shokhen 3, shor 3, shoter 3, si'ach 3, sirkha 3, ta'amei 3, ta'avah 3, tav 3, tehillot 3, tevot 3, tif'eret 3, tochanot 3, torah 3, tosefta 3, tovah 3, tovim 3, trei 3, tuv 3, tzaddikim 3, tzelem 3, tzerikha 3, tzeror 3, tzitz 3, tzohorayim 3, ud 3, va'ed 3, va-ya'avor 3, va-ye'tar 3, va-yedabber 3, va-yomer 3, ve-zot 3, yakar 3, yashud 3, yehi 3, yemim 3, yippale 3, yoshev 3, yoteret 3, ze'akah 3, adanekha 2, adeha 2, aderet 2, adir 2, adnei 2, adonai 2, afelah 2, aggan 2, agudah 2, ahavah 2, ahavat 2, alah 2, ammitz 2, anaf 2, anan 2, anavim 2, anpei 2, appo 2, ari 2, arita 2, avkat 2, ayelet 2, ayom 2, ayyah 2, ayyal 2, ba-kol 2, ba-mar'ah 2, baheret 2, bam 2, be'a 2, be-hibar'am 2, be-kadmin 2, be-raglai 2, be-tukfa 2, be-tzachtzachot 2, be-yom 2, bekhorah 2, berakim 2, berit 2, beten 2, bi-neginotai 2, bo 2, chadrei 2, chakham 2, chalal 2, chalav 2, chalitzah 2, chasdei 2, chashmalah 2, chashmalim 2, chashot 2, chashukeihem 2, chatzot 2, chavush 2, chayto 2, chayyot 2, chazir 2, chemdah 2, chidah 2, chitzim 2, chomesh 2, dakkah 2, dal 2, dallim 2, dam 2, dat 2, de-ra'avin 2, demamah 2, derakhim 2, dever 2, di-khetiv 2, dina 2, dirah 2, dodim 2, dokhyam 2, edoti 2, ef'eh 2, efatah 2, eifah 2, eifo 2, eikhah 2, eilei 2, eimatah 2, elah 2, elil 2, eloah 2, emesh 2, eshel 2, eved 2, gad 2, galgallim 2, galut 2, gamur 2, garmeh 2, gavoha 2, gemul 2, geviyyah 2, gevul 2, gezerah 2, gomelet 2, ha-chefetz 2, ha-chuppah 2, ha-da 2, ha-devarim 2, ha-esh 2, ha-gibbor 2, ha-kadmoni 2, ha-kippurim 2, ha-lavan 2, ha-lulav 2, ha-mar'eh 2, ha-mikdash 2, ha-netivot 2, ha-shani 2, ha-teva 2, ha-yamim 2, ha-yashar 2, hadas 2, hamu 2, haskalah 2, hatkafta 2, havalim 2, ho 2, hora'ah 2, hukam 2, imru 2, ir 2, ishruni 2, it'atar 2, itkafta 2, itrohi 2, ittrah 2, ivvah 2, k 2, kabbir 2, kaddah 2, kadmoniyyot 2, kapporet 2, karkafta 2, katar 2, kavush 2, kedumim 2, kefitzat 2, kehah 2, kenafayim 2, kerabai 2, keruvim 2, kesef 2, keshot 2, kh 2, kitura 2, kodashim 2, kof 2, kohen 2, kokhav 2, komah 2, kos 2, kotel 2, lahat 2, laishah 2, lat 2, le-Tziyyon 2, le-olam 2, leilya 2, leshon 2, livneh 2, ma'akhal 2, machsof 2, makh 2, makhon 2, mal'akh 2, malon 2, mashchit 2, mashkan 2, mashlim 2, mavet 2, me'at 2, me'erah 2, me'onah 2, medorin 2, mekhaleh 2, mekhusseh 2, menagen 2, meshach 2, metzarim 2, mevin 2, meyuchad 2, mezeg 2, migdal 2, mikhtam 2, millifnei 2, mishchat 2, mit'atra 2, mitchabberan 2, mitnotzetz 2, mittah 2, mitva'adim 2, mizmor 2, mosdei 2, motzi 2, murgash 2, mutba 2, na'ah 2, na'eh 2, nahir 2, namal 2, natil 2, naveh 2, nechoshet 2, neder 2, nehora 2, nemalah 2, neshikah 2, nevi'ei 2, nishrash 2, nissa 2, nistar 2, nitzchi 2, nivdal 2, notzer 2, nozelim 2, nur 2, ochim 2, ofel 2, orah 2, orlah 2, osher 2, pakod 2, panim 2, parah 2, parnas 2, partzufin 2, pekudim 2, pekudin 2, pel'ot 2, pela'ot 2, peleg 2, perat 2, perush 2, peter 2, pifiyyot 2, poked 2, rachaman 2, raglayim 2, rak 2, raz 2, re'im 2, rehatim 2, rek 2, rekhev 2, reshumot 2, riv 2, romach 2, rova 2, rova'at 2, samekh 2, saraf 2, se'ahs 2, se'arah 2, sefat 2, sefirat 2, segulah 2, selah 2, selichah 2, semukhah 2, serafim 2, sh 2, shabbatot 2, shacharut 2, sham 2, shamaymah 2, shanim 2, shav'ah 2, she'arim 2, shefa 2, sheker 2, shemi 2, shemo 2, sheniyah 2, sheva-kamatz 2, shevi'it 2, shevi'iyot 2, shirah 2, shittah 2, shofet 2, sholet 2, shoresh 2, shorrekh 2, shoshanim 2, shushan 2, sibbolet 2, simchah 2, sitnah 2, somekh 2, sorek 2, suf 2, tabbur 2, taga 2, tagel 2, tahor 2, takhlit 2, tamar 2, tanna'im 2, tappuchim 2, techinnah 2, techol 2, teiku 2, temunah 2, temunat 2, tene 2, terei 2, tevinem 2, tevir 2, tippah 2, tonu 2, treats 2, tzalmavet 2, tzayyar 2, tzel 2, tzeviyah 2, tzivyonot 2, tzorekh 2, u-ketanah 2, u-khevodi 2, u-vekhen 2, uzzo 2, va-YHVH 2, va-ehyeh 2, va-yachreku 2, va-yikar 2, va-yikkar 2, va-yikra 2, va-yitzer 2, ve-af 2, ve-alamot 2, ve-attah 2, ve-diglo 2, ve-hitvita 2, ve-lo 2, ve-noda 2, ve-shillam 2, ven 2, yabbashah 2, yadayim 2, yakhin 2, yamin 2, yarketei 2, yedabber 2, yekarah 2, yeladim 2, yelalah 2, yemei 2, yeshenah 2, yeshu'ah 2, yeterah 2, yidd'oni 2, yif'al 2, yif'ol 2, yilaveh 2, yir'ah 2, yiten 2, yo'etz 2, yovel 2, yovla 2, yutan 2, zahav 2, zekhurekha 2, zekhuta 2, zerichah 2, zikhri 2, a'allefkha 1, abir 1, acharai 1, achaz 1, achdut 1, acher 1, achidat 1, achim 1, achiv 1, achizah 1, achor 1, adenah 1, admoni 1, adrikhal 1, afikei 1, afisat 1, afiyah 1, afrah 1, afsayim 1, afsei 1, agaf 1, agam 1, agorat 1, agoret 1, agrah 1, aguddah 1, aguddato 1, agullah 1, ahavim 1, ahevukha 1, akarah 1, akeret 1, akhtari'el 1, akhzav 1, akud 1, alakhson 1, alefin 1, alei 1, alem 1, alfa-betot 1, allon 1, allufenu 1, almah 1, almanah 1, amadti 1, amar 1, amarti 1, amei 1, amirah 1, ammudei 1, amora'im 1, amunah 1, anachah 1, anachnu 1, anakh 1, anavah 1, anil 1, aniyah 1, anna 1, anpin 1, apiryin 1, apiryon 1, ar 1, ar'a 1, aravot 1, arba 1, arev 1, armenot 1, armon 1, arokh 1, arur 1, arvei 1, arvit 1, arzei 1, asam 1, asar 1, ashir 1, ashurav 1, asiriyyot 1, ason 1, aspaklariot 1, atar 1, atarot 1, atzei 1, atzivu 1, atzmo 1, atzmuto 1, avad 1, avah 1, avak 1, avanim 1, avarim 1, avaz 1, avel 1, aviv 1, avnei 1, avo 1, avodat 1, avraham 1, ayeh 1, ayummah 1, ayyavo 1, ayyet 1, ayyissa 1, azal 1, azelu 1, azkaratah 1, azul 1, ba'alah 1, ba-aretz 1, ba-mar'eh 1, ba-mufla 1, ba-shoshanim 1, ba-yom 1, bahir 1, baki 1, bamot 1, bamotei 1, barad 1, barai 1, barzel 1, batei 1, bazza 1, be'ulat 1, be-Avraham 1, be-al 1, be-aliyato 1, be-av 1, be-emor 1, be-evrato 1, be-gidulam 1, be-guf 1, be-hadar 1, be-heh 1, be-ibbo 1, be-ittah 1, be-khol 1, be-shagam 1, be-techillatan 1, be-vatei 1, beged 1, bein 1, beitzah 1, bekhor 1, belilo 1, benei 1, beno 1, benot 1, berekhot 1, beri'ot 1, berichim 1, besamim 1, besaro 1, bi-gevulam 1, bi-mechokek 1, bikkurim 1, bin-Yah 1, birkat 1, bnei 1, bo'az 1, bochan 1, boded 1, boker 1, borah 1, chadarim 1, chadash 1, chakikah 1, chakirah 1, chalah 1, challamish 1, chalom 1, chalon 1, chaluka 1, chalushah 1, cham 1, chamishah 1, chamor 1, channun 1, chanokh 1, chanun 1, charavah 1, charba 1, charon 1, chatan 1, chatimah 1, chatirah 1, chatzi 1, chatzivah 1, chatzotzerot 1, chatzrot 1, chayyei 1, chazakah 1, chazchaziyot 1, chazzan 1, chefetzo 1, chekh 1, chelem 1, chemdat 1, cherpot 1, chevyon 1, chezva 1, chinam 1, chisuda 1, chittat 1, chivvar 1, chiyyut 1, chizzayon 1, chodsheikhem 1, chokhmat 1, chomah 1, chomer 1, choshekh 1, choshkim 1, chotem 1, chotkhin 1, chovah 1, chovel 1, chover 1, chozer 1, chukkah 1, chukkotai 1, chulya 1, contains 1, da'atah 1, dalet 1, dalit 1, dallah 1, dallat 1, dallu 1, dalut 1, darah 1, darakh 1, dardar 1, david 1, de-Abba 1, de-Matronita 1, de-Savin 1, de-Savtin 1, de-ach 1, de-dalayei 1, de-itrin 1, de-leit 1, de-rabbanan 1, de-sharuta 1, de-yit'atar 1, de-yovla 1, dema'ot 1, demut 1, devaro 1, devash 1, deyo 1, di 1, di-shemaya 1, dictionary-like 1, dimdumei 1, dimyoni 1, dino 1, discrepancy 1, domem 1, dorshei 1, dover 1, echezu 1, efod 1, efroach 1, eg'al 1, egel 1, eglah 1, eglei 1, egoz 1, eikh 1, eimah 1, eino 1, einot 1, eitanim 1, ekev 1, elei 1, elekha 1, eli 1, elilim 1, elisheva 1, eloheinu 1, elyon 1, emunat 1, enkat 1, er'elim 1, eres 1, erez 1, eshed 1, eshkolot 1, etanim 1, etzah 1, etzba'ot 1, etzel 1, etzev 1, evrah 1, eyalot 1, ezer 1, ezor 1, ezov 1, ezrach 1, f 1, fele 1, ga'ah 1, ga'oh 1, ga'on 1, gabbeihem 1, gag 1, gallav 1, galmi 1, gamal 1, ganuz 1, gappin 1, gavai 1, gavvai 1, gazit 1, ge'ulah 1, ge'ut 1, gefen 1, gehinnom 1, gelem 1, gemilut 1, gemulo 1, gerashim 1, gerish 1, gerushin 1, gev 1, gevar 1, gevi'ah 1, gevirah 1, gevulei 1, gevurato 1, gevurotav 1, gevurotekha 1, gilluyav 1, gimel 1, giv'ah 1, giv'at 1, go'eh 1, go'esh 1, govah 1, gozer 1, gu 1, gullot 1, ha-Atzeret 1, ha-Gevurah 1, ha-Heikhalot 1, ha-Makom 1, ha-Sekhel 1, ha-acharon 1, ha-achdut 1, ha-adon 1, ha-banim 1, ha-bayit 1, ha-borah 1, ha-bore 1, ha-chadashim 1, ha-chasidim 1, ha-chayyah 1, ha-chekker 1, ha-cherev 1, ha-chitzoniyot 1, ha-choteh 1, ha-chovel 1, ha-derekh 1, ha-edut 1, ha-elyonim 1, ha-emet 1, ha-emtza'i 1, ha-emunah 1, ha-gazit 1, ha-gedolim 1, ha-gelimah 1, ha-geviyyah 1, ha-harah 1, ha-hergesh 1, ha-hin 1, ha-hoda'ot 1, ha-illot 1, ha-kadosh 1, ha-kashah 1, ha-kaved 1, ha-kavod 1, ha-keneset 1, ha-kisse 1, ha-kodashim 1, ha-kol 1, ha-kolot 1, ha-koteret 1, ha-la-YHVH 1, ha-levi'im 1, ha-levonah 1, ha-mafte'chot 1, ha-mazon 1, ha-me'irim 1, ha-mechudash 1, ha-meforash 1, ha-melakhim 1, ha-melammed 1, ha-menagen 1, ha-merkavah 1, ha-mevukash 1, ha-meyuchas 1, ha-midah 1, ha-middah 1, ha-minchah 1, ha-mishkan 1, ha-mishneh 1, ha-mishpat 1, ha-mithapekhet 1, ha-mor 1, ha-nasheh 1, ha-netinat 1, ha-nifla'ot 1, ha-nora 1, ha-nose 1, ha-ofim 1, ha-olah 1, ha-orah 1, ha-pe'ulot 1, ha-pekudim 1, ha-ra'ayon 1, ha-rabbim 1, ha-rachaman 1, ha-ratzim 1, ha-ratzon 1, ha-roshah 1, ha-ruchaniyot 1, ha-se'arah 1, ha-sefer 1, ha-shabbat 1, ha-shamaymah 1, ha-shedrah 1, ha-shefa 1, ha-shekel 1, ha-shetiyah 1, ha-shishi 1, ha-sibbot 1, ha-tannin 1, ha-tanninim 1, ha-toheh 1, ha-tor 1, ha-tov 1, ha-tzeva'ot 1, ha-tzove'ot 1, ha-va'ad 1, ha-yakod 1, ha-yamin 1, ha-yaven 1, ha-ye'or 1, ha-yesh 1, ha-yeshu'ah 1, ha-yippale 1, ha-yonah 1, ha-yosher 1, ha-yoteret 1, ha-zeh 1, hachillam 1, hachillota 1, hadom 1, haggidah 1, hakshivah 1, halleluyah 1, har 1, harei 1, harim 1, harisah 1, hashka'ah 1, haskel 1, hatchalah 1, havarah 1, havya 1, hayetah 1, he'emarta 1, he'emirkha 1, he-anan 1, hei 1, hiddur 1, hidrokan 1, hillul 1, himlikh 1, hineni 1, hirhur 1, hishamer 1, hit'orerut 1, hitbodedut 1, hitkafta 1, hoda'ot 1, hodkha 1, hodu 1, holekhet 1, hoshi'ah 1, ibbei 1, ichlu 1, idun 1, iggul 1, ik 1, ikkar 1, ila'ah 1, ilanot 1, illat 1, immot 1, immur 1, imra 1, imrat 1, index 1, ishsheruni 1, ishtekach 1, ispaklarya 1, issaronim 1, it'ar 1, it'atrat 1, it'atru 1, itparshan 1, itpatchat 1, itraha 1, itrin 1, itti 1, ittim 1, itturei 1, itzavon 1, ivchat 1, iver 1, ka 1, kadim 1, kadkod 1, kadmoni 1, kafatz 1, kafut 1, kakh 1, kal 1, kallat 1, kallot 1, kamat 1, kamutz 1, kankan 1, kanna 1, kanus 1, kapot 1, kappayim 1, kappi 1, karan 1, kardetei 1, karka 1, karsullayim 1, karti 1, kash 1, kashat 1, kastrohon 1, katav 1, katef 1, kavanah 1, kaved 1, kavu'a 1, kavvanah 1, kayitz 1, ke-mar'eh 1, ke-mi-kodem 1, ke-nagen 1, kedeirah 1, kedoshim 1, kefulah 1, kefulot 1, keivah 1, kela 1, kelali 1, kelalut 1, kelappei 1, kelot 1, ken 1, keneh 1, kenufya 1, kerem 1, kerivut 1, kerovim 1, kes 1, keseh 1, kesseh 1, ketav 1, ketubbah 1, ketzef 1, keves 1, kevushah 1, khol 1, kiddeshanu 1, kilayon 1, kinnor 1, kinnui 1, kinnuyim 1, kiryat 1, kitrug 1, kiyyor 1, klei 1, knesset 1, kocho 1, kofetzim 1, kohanim 1, kolah 1, kolot 1, konah 1, kor 1, kor'enu 1, kotlei 1, kotnot 1, kotz 1, kova 1, kovshot 1, kubbutz 1, kudsha 1, kulmus 1, kummetu 1, kuppah 1, kurkevan 1, kushya 1, la 1, la'asot 1, la-alafim 1, la-binah 1, la-chofshi 1, la-kol 1, la-rik 1, la-rov 1, lach 1, lahavot 1, lailah 1, lappidim 1, lavan 1, le 1, le'ah 1, le-alul 1, le-atkana 1, le-chodashav 1, le-dodi 1, le-ein 1, le-emor 1, le-hachaziro 1, le-hatem 1, le-hazkir 1, le-heitiv 1, le-ittakkana 1, le-itti 1, le-marbeh 1, le-meisharim 1, le-shabber 1, le-vat 1, le-vayit 1, leih 1, lenatze'ach 1, letuta 1, levalel 1, levanon 1, levayah 1, levenah 1, levushim 1, li-Shelomo 1, limmud 1, limmudei 1, lishkat 1, listing 1, lizrok 1, loven 1, luchot 1, ma'adanei 1, ma'alah 1, ma'amakim 1, ma'amar 1, ma'amarot 1, ma'amid 1, ma'ariv 1, ma'aser 1, ma'ayan 1, ma'aynei 1, mabbu'a 1, machashavot 1, machatzit 1, machavo 1, mada 1, madon 1, mag 1, magen 1, makel 1, makhpelah 1, makhri'a 1, makhtir 1, makif 1, makifin 1, makkelot 1, mal'akhim 1, malakh 1, malkam 1, malkhuta 1, mamashuto 1, mamlekhet 1, mamtakkim 1, mamzerim 1, mamzerut 1, manhig 1, mar 1, mar'ah 1, marah 1, mashkenet 1, mashkof 1, mashpa'at 1, maskit 1, maspik 1, mastinot 1, mastir 1, mat'im 1, matheh 1, matok 1, mattan 1, mattanah 1, mayimesh 1, mazhir 1, mazil 1, me'ashrin 1, me'ateret 1, me'atrin 1, me'erat 1, me'ilim 1, me'ir 1, me'orei 1, me'ubbeh 1, me'ubberet 1, me'uleh 1, me'urav 1, me-az 1, me-el 1, me-esh 1, me-illah 1, me-olam 1, mechalleleha 1, mechittah 1, mefa'er 1, mefulamot 1, mefullam 1, mefullamot 1, megallah 1, megaresh 1, mei 1, meitiv 1, mekhalah 1, mekhin 1, mekomot 1, mekuddash 1, melach 1, melilot 1, melo 1, melupim 1, memallelot 1, menaheret 1, meriri 1, meruba'at 1, mesakekhet 1, mesakhsekh 1, mesarekhet 1, meshadded 1, meshakkelet 1, meshakkenet 1, meshallachat 1, meshallem 1, meshichat 1, mesos 1, metaher 1, metatron 1, metzar 1, metzulot 1, meyasher 1, mezuzot 1, mi-esh 1, mi-kedem 1, mi-kol 1, mi-me'ah 1, mi-sitra 1, mi-tokh 1, mi-yam 1, middotav 1, midyanim 1, mif'al 1, mikdash 1, mikneh 1, mikra'ei 1, milifnei 1, mimkha 1, mimmeni 1, mirkevet 1, misgeret 1, mishbetzot 1, mishkal 1, mishor 1, mishpato 1, mishtallemet 1, mit'arvim 1, mit'atrim 1, mit'atter 1, mit'hapekh 1, mitbasmim 1, mitchatef 1, mitchatta 1, mitdammim 1, mitgaddelim 1, mitkarvim 1, mitkasseh 1, mitkonenet 1, mitpa'arim 1, mitpashtot 1, mitpater 1, mizbe'ach 1, mo'ach 1, mo'adim 1, mo'ilim 1, mochin 1, moddedot 1, mored 1, moshel 1, moshi'a 1, mu'ad 1, mugsham 1, mushpa'at 1, mutzakot 1, mutzal 1, na'al 1, na'ul 1, na'utz 1, nachalah 1, nachash 1, nachat 1, nafshin 1, natu'a 1, navon 1, ne'arot 1, ne'evad 1, ne'lam 1, ne'lamim 1, ne'ulah 1, ne'urayekhi 1, nechmad 1, nedivim 1, nefilah 1, nehiru 1, nekam 1, neki 1, nekudot 1, nerd 1, neshamot 1, neshimah 1, nesirah 1, netachim 1, netorah 1, netzichah 1, nevu'ah 1, niddah 1, nifla 1, niflegah 1, niggun 1, ninam 1, nirdi 1, nis'ar 1, nis'arah 1, nishmat 1, nishmatin 1, nissim 1, nisyoni 1, nitratztah 1, nitzachon 1, nizreket 1, nofelet 1, nokemet 1, nozel 1, nukvei 1, nunei 1, ofanei 1, ogen 1, ohel 1, okhel 1, olamim 1, olamot 1, omek 1, omenet 1, omits 1, ona'ah 1, oniyyah 1, orach 1, orei 1, orev 1, osif 1, otiyot 1, otzar 1, otzeret 1, otzmah 1, oyev 1, ozen 1, pakad 1, pakadti 1, pala 1, pannag 1, passim 1, pe'ah 1, pede'ehu 1, pekudei 1, pelagav 1, peli 1, peli'ot 1, penei 1, perachim 1, perakim 1, periah 1, peru'ah 1, perusah 1, pesha 1, peshitah 1, peshutot 1, petichah 1, piggul 1, pinnah 1, pisat 1, pitchi 1, pittuchei 1, piyyot 1, pizzar 1, po'al 1, po'elet 1, poh 1, ponim 1, porat 1, pore'ach 1, poreset 1, posek 1, ra'ah 1, ra'ayonim 1, rabba 1, rabbeta 1, rabbot 1, rachok 1, raglai 1, rakhav 1, ramah 1, rannenu 1, rashi 1, ratz 1, ratzita 1, ravrevei 1, re'amim 1, rechavah 1, regalim 1, rehitei 1, reish 1, resh 1, resha 1, reshimah 1, reshimu 1, retzeh 1, revi'it 1, revut 1, revuta 1, ribbu'a 1, rimmonim 1, rinnah 1, rishon 1, ro'eh 1, rochav 1, rogez 1, ronnu 1, roveh 1, rovetzet 1, rubbo 1, rucha 1, rum 1, sa'ar 1, sa'ir 1, sal 1, samukh 1, sanegoria 1, sanhedrei 1, sarekhin 1, sarim 1, sarsur 1, sasson 1, sava 1, saviv 1, se'irim 1, se'or 1, se'udah 1, sechor 1, seder 1, segullah 1, seh 1, sela'im 1, setirah 1, sevakhot 1, sevara 1, sha'atnez 1, shabber 1, shachat 1, shachut 1, shadai 1, shadayim 1, shaked 1, shakhen 1, shalhevet 1, shalhevet-yah 1, shani 1, sharak 1, sharku 1, sharon 1, shatul 1, shavua 1, she'agah 1, she'ar 1, she'iyah 1, she-ba-shamayim 1, she-dai 1, she-darah 1, she-yavo 1, shechikah 1, shefer 1, shekedim 1, shekhinah 1, shekhinat 1, shekhulah 1, shekidah 1, shelachayikh 1, shelamo 1, sheleg 1, sheluchim 1, shema 1, shema'ta 1, shemanim 1, shemarim 1, shemi'ah 1, shemittin 1, shemot 1, shen 1, sheshet 1, sheva-segol 1, shevah 1, shevatim 1, shevi'i 1, shevilim 1, shevilin 1, shevitah 1, shibbolet 1, shidrat 1, shikhechah 1, shiktot 1, shimah 1, shimmur 1, shinnayikh 1, shinnuy 1, shit 1, shittim 1, shiv'ah 1, shiv'at 1, sho'ev 1, shochakim 1, shochet 1, shoded 1, shokayim 1, shoked 1, shomeret 1, shoreret 1, shu'alim 1, shulchan 1, shurot 1, sibbat 1, sihara 1, simanei 1, siyata 1, siyu'a 1, smol 1, sofan 1, sofei 1, solet 1, sone 1, sotah 1, starting 1, sukkat 1, sukkatah 1, sullam 1, sumak 1, t 1, ta 1, ta'anug 1, ta'avod 1, taba'at 1, tach 1, tachtit 1, tachton 1, tagin 1, takif 1, talmud 1, taltalim 1, talya 1, tamei 1, tamut 1, tanin 1, tanya 1, tar 1, tar'a 1, tarshish 1, tashuv 1, tavi 1, tavshilin 1, te'agenah 1, teKi'ah 1, teRu'ah 1, techum 1, tefach 1, tefillat 1, tehom 1, tehomot 1, teivin 1, tekufah 1, telag 1, teli 1, temarim 1, temidi 1, temurat 1, tero'em 1, tesagsegi 1, teshabber 1, teshi 1, teta'u 1, tevu'ah 1, tichyeh 1, tigra 1, tikvat 1, tillei 1, tillim 1, tinok 1, tit'alam 1, todah 1, tohar 1, tokhei 1, torach 1, tz 1, tzachot 1, tzadkah 1, tzafanta 1, tzafun 1, tzanterot 1, tzarim 1, tzavvar 1, tzayar 1, tzechok 1, tzefunekha 1, tzemer 1, tzeva 1, tzichtzuchei 1, tzikei 1, tzilelei 1, tzivvanu 1, tzor 1, tzurat 1, u-mah 1, u-mekor 1, u-meragag 1, u-middat 1, u-nechat 1, u-tekufato 1, u-ve-kastrotehon 1, u-ve-mishor 1, u-ve-tirotam 1, u-veit 1, u-veretato 1, ugah 1, va'ad 1, va-Hu 1, va-chom 1, va-choref 1, va-khoh 1, va-nachalmah 1, va-tagged 1, va-tekhel 1, va-terev 1, va-ye'anchu 1, va-yechal 1, va-yekhal 1, va-yekhullu 1, va-yigmol 1, va-yisgor 1, va-yishkod 1, va-yit'abber 1, va-yit'anchu 1, va-yosha 1, vah 1, vahu 1, vai 1, vam 1, vater 1, vav 1, vavei 1, vavim 1, vayachtor 1, vaye'ater 1, vayekhullu 1, ve-El 1, ve-Elohai 1, ve-achorayim 1, ve-afadta 1, ve-asor 1, ve-at 1, ve-atah 1, ve-atzalti 1, ve-chagotem 1, ve-chamid 1, ve-chattu 1, ve-dilugo 1, ve-din 1, ve-ha-luchot 1, ve-ha-nasu 1, ve-ha-rafah 1, ve-ha-tzedakot 1, ve-hadarta 1, ve-hakimoti 1, ve-haskel 1, ve-he-anan 1, ve-hoka 1, ve-itzavon 1, ve-khaf 1, ve-khanno 1, ve-nach 1, ve-naharu 1, ve-nechat 1, ve-oto 1, ve-she-eino 1, ve-sheni 1, ve-te'teti'ha 1, ve-ya'ametz 1, ve-yare'ach 1, ve-yareta 1, ve-yashar 1, ve-yichad 1, ve-yichas 1, ve-yir'ah 1, ve-yom 1, veshet 1, vilon 1, vo 1, ya'anenu 1, ya'avar 1, ya'er 1, yadekha 1, yadkhah 1, yadot 1, yafli 1, yarutzu 1, yashav 1, yatzarti 1, yedi'ah 1, yefu'al 1, yehu 1, yerachim 1, yerekhayim 1, yeri'ah 1, yeshenei 1, yeshivah 1, yeshu'ot 1, yesoda 1, yetzer 1, yevarekhekha 1, yi'uda 1, yif'el 1, yifkod 1, yig'eh 1, yipale 1, yippared 1, yisa 1, yit'arvu 1, yitkonan 1, yivra 1, yizbeleni 1, yod'ei 1, yodu 1, yonati 1, yonek 1, yoshvin 1, yovlin 1, yudin 1, yuval 1, za'af 1, za'am 1, zadon 1, zakharekha 1, zar 1, zarua 1, zavit 1, zayin 1, zayit 1, ze'ir 1, ze'ira 1, zeitim 1, zekenim 1, zekifah 1, zemanim 1, zerach 1, zero'ot 1, zimna 1, zivug 1, zohar 1, zore'ach 1, zuhama 1, zutrei 1
