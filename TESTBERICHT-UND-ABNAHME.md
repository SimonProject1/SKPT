# Testbericht und Abnahme – SK PLT Tools 2.0.0.0

## Automatisiert prüfbarer Stand

- 12 HTML-Seiten vorhanden.
- Jede Seite besitzt genau einen statischen, normalisierten Header und Footer.
- Version 2.0.0.0 steht direkt im HTML unter dem Logo und im Footer.
- Startseite enthält acht sichtbare Werkzeugkacheln ohne Servicewerte-Kachel.
- Filter und Sortierung stehen direkt im HTML und werden nicht erst durch einen Patch erzeugt.
- Alle lokalen `href`-/`src`-Referenzen sind im Paket vorhanden.
- JavaScript-Syntax aller Dateien wird mit `node --check` geprüft.
- Funktionale Smoke-Tests für Analogsignal-, P+F-, Pt100-, Einheiten- und Spannungsfall-Rechner verwenden die unten dokumentierten Sollwerte.
- Alle vom Service Worker vorzuhaltenden URLs müssen über einen lokalen HTTP-Server mit Status 200 erreichbar sein.
- Der Service Worker enthält keine Funktionen zum Umschreiben von HTML oder JavaScript.

Automatischer Wiederholungstest:

```bash
python tools/validate_release.py
node tools/functional-smoke-test.js
```

## Browser-Abnahme

| Nr. | Prüfung | Soll | PC | iPhone |
|---:|---|---|:---:|:---:|
| 1 | Startseite direkt öffnen | Finales Design ohne sichtbaren Umbau | ☐ | ☐ |
| 2 | Unterseite öffnen und „Startseite“ wählen | Kein altes Layout/Logo/Versionsplatzhalter sichtbar | ☐ | ☐ |
| 3 | Vorgang mindestens fünfmal wiederholen | Kein Flackern oder Layoutsprung | ☐ | ☐ |
| 4 | Seite hart neu laden | Version 2.0.0.0 unter Logo und im Footer | ☐ | ☐ |
| 5 | Favorit setzen/entfernen | Sternstatus und Zähler bleiben korrekt | ☐ | ☐ |
| 6 | Navigationsbaum öffnen/schließen | Alle Ziele erreichbar; aktive Seite markiert | ☐ | ☐ |
| 7 | Startseitenfilter und Suche | Kacheln und Wissensbeiträge korrekt gefiltert | ☐ | ☐ |
| 8 | Sortierung | Standard, Kategorie A–Z/Z–A und Titel A–Z/Z–A korrekt | ☐ | ☐ |
| 9 | Wissensdatenbank | Air Torque, Siemens und PDF-Vorlage erreichbar | ☐ | ☐ |
| 10 | Offline-Test nach einem Online-Aufruf | Startseite und Kernseiten laden aus Cache | ☐ | ☐ |

## Rechner-Sollwerte für den Funktionstest

- Analogsignal: 0…100 auf 4…20 mA, Eingabe 50 → **12,000 mA / 50,0 %**.
- P+F: X1=0, Y1=4, X2=100, Y2=20 → **K=0,160000; Nullpunkt=4,000000**.
- Pt100: 0 °C → **100,000 Ω**.
- Einheiten: 1 bar → **1.000,000 mbar**.
- Spannungsfall: Drehstrom, 400 V, 16 A, 35 m, 2,5 mm² Cu, cos φ 1,00, Grenzwert 6 % → **6,93 V; 1,73 %; Lastspannung 393,07 V; Reserve +17,07 V**.

## Safepoint-Kennzeichnung 2.0.0.0

Version 2.0.0.0 kennzeichnet den erfolgreich getesteten vollständigen Clean-Design-Stand 1.9.9.1 als Safepoint. Gegenüber 1.9.9.1 sind ausschließlich Versionsangaben, Service-Worker-Cache-Name, Release Notes, Upload-Anleitung und Safepoint-Kennzeichnung geändert; Funktionen, Inhalte, Design und Infrastruktur bleiben unverändert.

Prüfer: ____________________  Datum: ____________________  Ergebnis: ☐ bestanden ☐ nicht bestanden
