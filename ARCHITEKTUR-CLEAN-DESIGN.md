# Clean-Design-Architektur 1.9.9.1

## Ursache des sichtbaren alten Designs in 1.9.8.5

Der Stand 1.9.8.5 lieferte zunächst ältere HTML-Strukturen und ältere Versionsangaben aus. Der Service Worker las Navigationsantworten als Text ein, entfernte und ergänzte Stylesheets/Skripte und ersetzte Versionswerte. Danach änderten mehrere JavaScript-Dateien Header, Footer, Logo, Kacheln und Startseiteninhalte erneut im DOM. Beim Zurückwechseln von einer Unterseite zur Startseite konnte deshalb der ursprüngliche Zustand kurz gerendert werden, bevor die Patchkette abgeschlossen war.

## Lösung in 1.9.9.1

- finale Headerstruktur direkt in jeder HTML-Datei
- Version direkt unter dem Logo in jeder HTML-Datei
- einheitlicher Footer direkt in jeder HTML-Datei
- finale Startseitenkacheln einschließlich VDE- und Spannungsfall-Werkzeug direkt in `index.html`
- entfernte Service-Kachel nicht mehr im DOM oder Suchindex
- Filter- und Sortieroberfläche direkt in `index.html`
- verbindliche Gestaltung in `assets/styles.css` und `assets/design.css`
- JavaScript nur für echte Interaktionen und Berechnungen
- Service Worker ohne Response-Rewriting; nur Precache, Network-first für Navigation und Cache-Fallback

## Bewusst beibehaltene Kompatibilität

Die alten Patch-Dateinamen liegen als wirkungslose No-op-Dateien bei. Sie werden von 1.9.9.1 selbst nicht referenziert. Ihr einziger Zweck ist, den einmaligen Übergang zu stabilisieren, solange ein Browser noch vom Service Worker 1.9.8.5 kontrolliert wird.
