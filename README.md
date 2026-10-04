# SK PLT Tools 2.1.0.0

Vollständiges, statisches und offline-fähiges Webprojekt für PLT-/MSR-Aufgaben. Version **2.1.0.0** ist die offizielle Release-Version des vollständig geprüften Vorgängerstands. Fachlogik, Direktlinks, responsive Darstellung sowie PWA- und Offline-Funktion bleiben erhalten.

## Enthaltene Module

- Rechner: Analogsignal, Siemens Rohwert, P+F, Pt100/Pt1000, Einheiten und Spannungsfall
- Dokumentation: Messstellen-Dokumentation
- Prüfung: Plausibilitätsprüfung VDE 0100-600
- Wissen: Wissensdatenbank mit fünf Beiträgen, Werkstoff-Nachschlagewerk und Beitragsvorlagen
- Gemeinsame Funktionen: Suche, Filter, Sortierung, Favoriten, Seitenbaum, responsive Darstellung, PWA und Offline-Cache
- Direkter Bestandslink: `servicewerte/` bleibt für bestehende Direktaufrufe erhalten, ist aber nicht auf der Startseite verlinkt

## Projektstruktur

- `assets/core.css`: gemeinsame seitenübergreifende Styles
- `assets/app.js`: Basisfunktionen, Favoriten, Suche, Sortierung und Navigation
- `assets/navigation-tree.json`: zentrale Inhaltsquelle des Navigationsbaums
- `shared/`: Vorlagen für Header, Footer, Bedienelemente und Seitenmetadaten
- `tools/sync_shared.py`: Synchronisierung gemeinsamer Seitenelemente
- `release-config.json`: zentrale Release-Konfiguration
- `tools/release.py`: Versions-, Manifest-, PWA-, Prüfsummen- und ZIP-Erstellung

Rechner- und Wissensmodule behalten ihre getrennten CSS-/JavaScript-Dateien, sofern sie eigene Fachlogik oder Darstellung benötigen.

## Lokaler Start

```bash
python -m http.server 4173
```

Danach `http://127.0.0.1:4173/` öffnen. Für PWA- und Service-Worker-Prüfungen ist HTTP(S) erforderlich; ein direkter `file://`-Aufruf reicht dafür nicht.

## Prüfungen

```bash
node tools/functional-smoke-test.js
python tools/validate_release.py
python tools/browser-smoke-test.py
```

Der Browser-Test erwartet einen lokalen Server auf Port 4173.

## Release bauen

```bash
python tools/release.py --version 2.1.0.0 --all
```

Der Befehl aktualisiert die technische Version, synchronisiert gemeinsame Seitenelemente und den Offline-Precache, erstellt `SHA256SUMS.txt` und schreibt das vollständige ZIP neben den Projektordner. Release-Versionen verwenden das Format `X.Y.Z.W`.

## Integrität

Im Projektordner:

```bash
sha256sum -c SHA256SUMS.txt
```

Weitere Details: `ARCHITEKTUR-CLEAN-DESIGN.md`, `DEPLOYMENT.md`, `RELEASE-NOTES.txt` und `TESTBERICHT-UND-ABNAHME.md`.
