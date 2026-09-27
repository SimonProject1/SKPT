# Clean-Design-Architektur 2.0.1.0

## Unveränderte Grundlage

Version 2.0.1.0 baut auf dem Clean-Design-Safepoint 2.0.0.0 auf. Dessen Grundprinzipien bleiben unverändert:

- finale Headerstruktur direkt in jeder HTML-Datei
- Version direkt unter dem Logo in jeder HTML-Datei
- einheitlicher Footer direkt in jeder HTML-Datei
- finale Startseitenkacheln sowie Filter- und Sortieroberfläche direkt in `index.html`
- verbindliche Gestaltung in `assets/styles.css` und `assets/design.css`
- JavaScript nur für echte Interaktionen und Berechnungen
- Service Worker ohne Response-Rewriting; nur Precache, Network-first für Navigation und Cache-Fallback
- alte Patch-Dateinamen ausschließlich als wirkungslose No-op-Kompatibilitätsdateien

## Erweiterung in 2.0.1.0

Das Werkstoff-Nachschlagewerk ist als reguläre Wissensseite ergänzt. Es verändert weder Shell noch Renderpfad:

- statisches Seitenziel `wissensdatenbank/werkstoff-nachschlagewerk/index.html`
- Darstellung in `assets/materials.css`
- Interaktion in `assets/materials.js`
- zentrale Fachdaten, Filtergruppen, Quellen und Vergleiche in `assets/materials.json`
- Einbindung über bestehende Startseitensuche, Wissenskacheln, Favoritenlogik und Navigationsbaum
- Aufnahme der neuen statischen Ressourcen in den vorhandenen Service-Worker-Precache

Die Daten bleiben vom Layout und von der Suchlogik getrennt. Neue Werkstoffe können dadurch in der JSON-Datei ergänzt werden, ohne die Seitenstruktur umzubauen.

## Sicherheitsprinzip

Jede gerenderte Werkstoffkarte und jeder Vergleich zeigt denselben Hinweis: Das Nachschlagewerk dient nur der Orientierung. Eine Freigabe erfordert die Prüfung von Norm, Zeugnis, Erzeugnisform, Zustand, Abmessung, Temperatur, Druck und Medium durch eine fachkundige Stelle. Das System erteilt keine automatische Werkstofffreigabe und keine pauschale Medienbeständigkeitsbewertung.
