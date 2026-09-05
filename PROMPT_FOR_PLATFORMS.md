# 📋 Optimalizált Prompt (Lovable / Bolt.new / Replit / v0 számára)

Ha szeretnéd ezt a projektet egyetlen tömör, AI-kódoló platformokra optimalizált prompttal reprodukálni vagy továbbfejleszteni, másold ki az alábbi blokkot:

```markdown
Készíts egy React 18 + Tailwind CSS + TypeScript alapú, kifejezetten idős (65-85 év közötti), életükben először számítógépet használó embereknek szánt interaktív magyar oktató weboldalt („Gépre fel!”), ami GitHub Pages-en is működik (relatív base: './').

FŐ UX KÖVETELMÉNYEK:
- 22-26px alapszöveg, 32-44px címek, meleg pasztell háttér (#FAF7F2), nagy kontrasztú sötétkék szöveg (#1E293B).
- Óriási, min. 64px magas gombok, egyértelmű érintési és kattintási felület.
- Egy képernyőn csak egy egyszerű instrukció.
- Minden lépésnél „🔊 Meghallgatom” gomb (Web Speech API hu-HU felolvasás lassú, nyugodt tempóban) és „❓ SEGÍTSÉG” gomb (ami pulzáló arany kerettel és nyíllal kiemeli a kattintandó elemet a képernyőn).
- Siker esetén azonnali kellemes Web Audio hang és „✅ Nagyon jó!” megerősítés.
- Hibázásnál soha ne legyen piros hibaüzenet, csak nyugtató visszajelzés: „Semmi gond, próbáld meg még egyszer.”
- Fejlécben: Kezdőlap, Betűméret növelő (Normál / Nagy / Óriási), Magas Kontraszt mód kapcsoló, Hangnémító.
- LocalStorage alapú automatikus haladásmentés (nincs kötelező regisztráció).

OLDALAK ÉS INTERAKTÍV MODULOK:
1. Kezdőlap: „Üdvözöllek!”, nagy „KEZDJÜK EL” / „FOLYTATOM” gomb, emberi nyelvezetű haladás összegzés („Már 2 leckét teljesítettél”), leckék listája zárolási és kész jelzésekkel.
2. 1. Lecke - Ismerkedés a géppel: Nagy kártyák a monitor, egér, billentyűzet és bekapcsológomb bemutatására, interaktív bekapcsolással.
3. 2. Lecke - Egér használata:
   - Mozgasd az egeret a körre (hover)
   - Kattints egyszer a körre
   - Kattints kétszer gyorsan (dupla kattintás, türelmes időzítéssel)
   - Kattints a piros almára (választás 3 gyümölcs közül)
   - Kattints a kutyusra
   - Nyisd meg a fényképek mappát dupla kattintással!
4. 3. Lecke - Billentyűzet:
   - Írd be a keresztneved
   - Nyomd meg az Entert
   - Szóköz gyakorlása („Jó napot”)
   - Javítás Backspace-szel („kávvé” -> „kávé”)
   - Nagybetű írása Shift gombbal („A”)
   - Írd le: „Ma szép idő van.”
   - Tartalmaz egy kattintható vizuális magyar segédbillentyűzetet is, amely világít a lenyomandó gombon!
5. 4. Lecke - Virtuális számítógép:
   - Szimulált Asztal kék háttérrel, tálcával, órával és ikonokkal (📁 Képek, 🌐 Internet, 📝 Jegyzet).
   - Feladat: nyisd meg a Képek mappát, a Jegyzetet, majd az Internetet!
6. 5. Lecke - Internet használata:
   - Szimulált biztonságos böngésző címsorral, Vissza gombbal, Bezárás gombbal.
   - Írd be a keresőbe: „időjárás”, nyomd meg a Keresést!
   - Kattints az Almás pite recept linkre!
   - Lépj vissza a Vissza (←) gombbal!
   - Zárd be a böngészőt a piros X gombbal!
7. 6. Lecke - Biztonsági modul:
   - Szimulált helyzetek: nyeremény popup („Ön nyert 1 000 000 Ft-ot! Kattintson MOST!”) -> Választás: „Rákattintok” vs „Nem kattintok rá”.
   - Banki PIN kód kérés és idegen program letöltés szituációk.
   - 5 legfontosabb aranyszabály kártya.
8. Gyakorló sarok:
   - Egérvadászat (véletlenszerűen mozgó gyümölcsök/ikonok elkapása)
   - Mappanyitogató (dupla kattintás gyakorlás meglepetés képekért)
   - Gépelő sarok (szép magyar szavak gyakorlása)
   - Szabad internetes kereső
9. Haladás oldal:
   - Digitális tanúsítvány csillagokkal, leckék státusza, újrakezdés megerősítéssel.
10. Modulvégi sikerablak:
   - Konfetti animáció (canvas-confetti), „🎉 Gratulálok!”, „GYAKORLOK MÉG” és „KÖVETKEZŐ LECKE” gombok.
```
