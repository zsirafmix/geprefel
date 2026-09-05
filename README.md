# 🖥️ Gépre fel! – Idősbarát Számítógépes Tanuló Weboldal

Modern, nagyon egyszerűen kezelhető, magyar nyelvű interaktív oktató weboldal olyan idős emberek számára, akik életükben először használnak számítógépet.

A weboldal célja nem a száraz elmélet, hanem a **lépésről lépésre történő, biztonságos és játékos gyakorlás** (20% magyarázat, 80% interaktív gyakorlat).

---

## 🌟 Fő Funkciók és Idősbarát UX

* **Nagyméretű tipográfia és elemek**: Minimum 20–26 px-es alapszöveg, nagy, könnyen kattintható (64–80 px magas) gombok.
* **Akadálymentesítés**:
  * 🔠 **Betűméret váltó**: Normál (20px) / Nagy (24px) / Óriási (28px).
  * 🌓 **Magas kontraszt mód**: Gyengénlátók számára azonnali fekete-fehér-sárga kontrasztos nézet.
  * 🔊 **Hangos felolvasás (Meghallgatom)**: Beépített böngésző Web Speech API magyar (`hu-HU`) hanggal, lassú, nyugodt tempóban.
  * ❓ **Vizuális segítség (SEGÍTSÉG)**: Pulzáló aranyszínű körrel és nyíllal azonnal megmutatja a kattintandó elemet.
* **Biztonságérzet és pozitív megerősítés**:
  * Nincs ijesztő piros hibaüzenet, helyette nyugodt üzenet: *„Semmi gond, próbáld meg még egyszer.”*
  * Sikeres lépésnél: *„✅ Nagyon jó!”* és finom, kellemes hangjelzés (Web Audio szintetizátor).
* **Nulla kötelező regisztráció**: A tanuló haladását a böngésző helyi memóriája (`LocalStorage`) automatikusan megjegyzi.
* **100% GitHub Pages kompatibilis**: Nincs szükség szerverre, adatbázisra vagy fizetős hosztolásra.

---

## 📚 Tanulási Modulok

1. **🖥️ Ismerkedés a számítógéppel**: Monitor, egér, billentyűzet, bekapcsológomb megismerése és kipróbálása.
2. **🖱️ Egér használata**: Egér mozgatása (hover), egy kattintás, dupla kattintás türelmes időzítéssel, tárgyválasztás (alma, kutyus), mappanyitás.
3. **⌨️ Billentyűzet és gépelés**: Keresztnév beírása, Enter, Szóköz, hibajavítás Backspace-szel, nagybetű Shift-tel, mondatírás + képernyő-segédbillentyűzet.
4. **💻 Virtuális számítógép**: Szimulált Asztal és mappák (Képek, Internet, Jegyzet, Start menü, Óra).
5. **🌐 Internet használata**: Biztonságos virtuális böngésző, időjárás keresése, receptek megnyitása, visszalépés (← Vissza nyíl), ablak bezárása.
6. **🛡️ Biztonság a számítógépen**: Csaló nyereményüzenetek felismerése, bankkártya PIN védelem, idegen letöltések elkerülése, aranyszabályok.
7. **🎯 Gyakorló sarok**: Kötetlen mini-játékok (Egérvadászat, Dupla kattintásos kincskereső, Gépelőterem, Szabad böngészés).
8. **⭐ Haladás és Oklevél**: Csillagok, teljesített leckék áttekintése, digitális tanúsítvány.

---

## 🚀 Telepítés és Helyi Futtatás

```bash
# 1. Függőségek letöltése
npm install

# 2. Fejlesztői szerver indítása
npm run dev

# 3. Produkciós csomag készítése
npm run build
```

---

## 🌐 Publikálás GitHub Pages-re

A repó tartalmaz egy előre beállított **GitHub Actions** automatizációt (`.github/workflows/deploy.yml`).

A weboldal a következő címen lesz elérhető:
👉 **https://zsirafmix.github.io/geprefel/**

### Beállítás 1 perc alatt:
1. A GitHub felületén nyisd meg a repository-t:
   **https://github.com/zsirafmix/geprefel**
2. Kattints fent a **Settings** (Beállítások) fülre.
3. A bal oldali menüben válaszd a **Pages** menüpontot.
4. A **Build and deployment** rész alatt a **Source** legördülő menüben válaszd a **GitHub Actions** lehetőséget.
5. Kész! A GitHub Actions workflow azonnal lefut és közzéteszi az oldalt!
