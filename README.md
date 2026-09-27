# SK PLT Tools 2.0.1.0

Vollständiges Release auf Basis des Clean-Design-Safepoints 2.0.0.0.

## Inhalt

- vollständige statische Website mit 13 HTML-Seiten
- bestehende Rechner, Dokumentation und Gerätewissen
- neues hersteller- und geräteunabhängiges Werkstoff-Nachschlagewerk
- zentrale, erweiterbare Werkstoffdatei `assets/materials.json`
- Startseitensuche, Wissensdatenbank, Favoriten und Navigationsbaum integriert
- PWA-Manifest, Icons und versionierter Offline-Cache
- unveränderte editierbare PDF-Vorlage der Wissensdatenbank
- statische Release-Prüfung und funktionale Smoke-Tests

## Werkstoff-Nachschlagewerk

Die Seite `wissensdatenbank/werkstoff-nachschlagewerk/` unterstützt:

- Suche nach Werkstoffnummer mit und ohne Punkt
- Suche nach Kurzname, AISI/ASTM-Bezeichnung, UNS und gebräuchlichen Namen
- Filter nach Werkstoffgruppen
- bewusste Mehrfachtreffer bei mehrdeutigen Angaben wie `316L`
- klare Abgrenzung zwischen Walz-/Knetwerkstoffen und Stahlguss
- Vergleiche `316 gegen 316L` und `1.4404 gegen 1.4408`
- Quellenlinks und identischen Sicherheitshinweis pro Datensatz

Die Inhalte dienen nur der Orientierung. Es erfolgt keine automatische Werkstofffreigabe, keine pauschale Medienbeständigkeitsbewertung und keine Zusage vollständiger Austauschbarkeit.

## Neue Werkstoffe ergänzen

1. `assets/materials.json` in UTF-8 öffnen.
2. Unter `materials` einen eindeutigen Datensatz mit allen Pflichtfeldern ergänzen.
3. Suchbegriffe mit und ohne Trennzeichen aufnehmen, wenn sie nicht bereits aus den sichtbaren Feldern ableitbar sind.
4. Verwandte Werkstoffe und klare Abgrenzungen hinterlegen.
5. Mindestens eine belastbare HTTPS-Quelle verlinken.
6. Falls erforderlich eine neue Gruppe unter `groups` oder einen Vergleich unter `comparisons` ergänzen.
7. Release-Prüfung und Smoke-Test ausführen.

## Installation

1. Vorhandenen Webroot vollständig sichern.
2. Den **gesamten Inhalt des Ordners `SK-PLT-Tools-V2.0.1.0`** in den Webroot hochladen und vorhandene Dateien ersetzen.
3. `service-worker.js` im gleichen Webroot wie `index.html` belassen.
4. Website einmal online öffnen und neu laden, damit Cache `sk-plt-tools-v2.0.1.0-clean` aktiviert wird.
5. `TESTBERICHT-UND-ABNAHME.md` durchführen.

## Clean Design und Infrastruktur

- Finale Header-, Footer-, Versions-, Kachel- und Integrationsstruktur liegt direkt in HTML/CSS.
- JavaScript wird nur für echte Interaktionen, Suche, Vergleiche, Rechner, Favoriten und Navigation verwendet.
- Der Service Worker übernimmt ausschließlich versionierten Cache, Network-first-Navigation und Offline-Fallback; kein Response-Rewriting.
- Bestehende No-op-Kompatibilitätsdateien bleiben unverändert im Paket.

## Lokaler Test

```bash
python tools/validate_release.py
node tools/functional-smoke-test.js
python -m http.server 8080
```

Danach `http://localhost:8080/` öffnen.

Version 2.0.1.0 · Entwickelt von Simon Kiesler
