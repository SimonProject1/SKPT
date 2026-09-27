# Testcheckliste und Abnahme – SK PLT Tools 2.0.1.0

## Automatisierte Prüfung

Aus dem Projektordner ausführen:

```bash
python tools/validate_release.py
node tools/functional-smoke-test.js
```

Die automatisierte Prüfung kontrolliert unter anderem:

- 13 erwartete HTML-Seiten
- genau einen statischen Header und Footer je Seite
- Version 2.0.1.0 in HTML, Skripten, Manifest und Service Worker
- acht unveränderte Startseiten-Werkzeugkacheln
- vollständige lokale Referenzen und JavaScript-Syntax
- zehn Werkstoffdatensätze mit Pflichtfeldern, Quellen und gültigen Gruppen
- Suchtreffer `14404` → `1.4404`
- Mehrfachtreffer `316L` → mindestens `1.4404`, `1.4409` und `1.4435`
- Gruppenfilter `316L` + Stahlguss → `1.4409`
- Vergleiche `316 gegen 316L` und `1.4404 gegen 1.4408`
- Offline-Precache der neuen Werkstoffseite und zentralen Datendatei
- unveränderte Hashes der drei Vorlagendateien unter `wissensdatenbank/vorlagen/`
- bestehende Rechner-Sollwerte

## Browser-Abnahme

| Nr. | Prüfung | Soll | PC | iPhone |
|---:|---|---|:---:|:---:|
| 1 | Startseite direkt öffnen | Finales Clean Design ohne sichtbaren Umbau | ☐ | ☐ |
| 2 | Unterseite öffnen und „Startseite“ wählen | Kein altes Layout, Logo oder Versionsplatzhalter | ☐ | ☐ |
| 3 | Seite hart neu laden | Version 2.0.1.0 unter Logo und im Footer | ☐ | ☐ |
| 4 | Favorit setzen/entfernen | Sternstatus und Zähler bleiben korrekt | ☐ | ☐ |
| 5 | Navigationsbaum öffnen | „Werkstoff-Nachschlagewerk“ unter Wissensdatenbank vorhanden und erreichbar | ☐ | ☐ |
| 6 | Wissensdatenbank öffnen | Neue Wissenskachel sichtbar, suchbar und als Favorit speicherbar | ☐ | ☐ |
| 7 | Startseitensuche `316L` | Wissensbeitrag erscheint; Öffnen übernimmt `316L` in die Werkstoffsuche | ☐ | ☐ |
| 8 | Werkstoffsuche `1.4404` und `14404` | Beide Schreibweisen liefern 1.4404 | ☐ | ☐ |
| 9 | Werkstoffsuche `316L` | Mehrere Treffer: 1.4404, 1.4409/CF3M und 1.4435 | ☐ | ☐ |
| 10 | Werkstoffsuche `CF8M` | 1.4408/GX5CrNiMo19-11-2; Stahlguss klar markiert | ☐ | ☐ |
| 11 | Werkstoffsuche `Alloy 59` | 2.4605/N06059 | ☐ | ☐ |
| 12 | Gruppenfilter | Austenitischer Edelstahl, Stahlguss und Nickelbasislegierung filtern korrekt | ☐ | ☐ |
| 13 | Ergebnis-Karten | Nummer, Kurzname, internationale Bezeichnungen, UNS, Gruppe, Erzeugnisform, Erklärung, Verwandte, Abgrenzung, Quellen und Sicherheitshinweis vorhanden | ☐ | ☐ |
| 14 | Vergleich `316 gegen 316L` | 1.4401 und 1.4404 mit Kernunterschieden gegenübergestellt | ☐ | ☐ |
| 15 | Vergleich `1.4404 gegen 1.4408` | Walz-/Knetwerkstoff gegenüber Stahlguss klar abgegrenzt | ☐ | ☐ |
| 16 | Externe Quellenlinks | Öffnen in neuem Tab; keine Navigation der Anwendung geht verloren | ☐ | ☐ |
| 17 | Offline-Test nach Online-Aufruf | Startseite, Werkstoffseite, CSS/JS/JSON und bestehende Kernseiten laden aus Cache | ☐ | ☐ |
| 18 | PDF-Vorlage herunterladen | Datei funktioniert und ist gegenüber 2.0.0.0 unverändert | ☐ | ☐ |
| 19 | Responsive Darstellung | Suche, Filter, Karten und Vergleich auf schmalem Bildschirm vollständig bedienbar | ☐ | ☐ |
| 20 | Bestehende Rechner | Alle bisherigen Sollwerte unverändert | ☐ | ☐ |

## Rechner-Sollwerte

- Analogsignal: 0…100 auf 4…20 mA, Eingabe 50 → **12,000 mA / 50,0 %**.
- P+F: X1=0, Y1=4, X2=100, Y2=20 → **K=0,160000; Nullpunkt=4,000000**.
- Pt100: 0 °C → **100,000 Ω**.
- Einheiten: 1 bar → **1.000,000 mbar**.
- Spannungsfall: Drehstrom, 400 V, 16 A, 35 m, 2,5 mm² Cu, cos φ 1,00, Grenzwert 6 % → **6,93 V; 1,73 %; Lastspannung 393,07 V; Reserve +17,07 V**.

Prüfer: ____________________  Datum: ____________________  Ergebnis: ☐ bestanden ☐ nicht bestanden
