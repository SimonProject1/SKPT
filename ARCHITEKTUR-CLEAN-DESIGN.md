# Architektur – SK PLT Tools 2.1.0.0

## Leitprinzipien

1. Fachfunktionen bleiben als eigenständige Rechner- bzw. Wissensmodule erhalten.
2. Seitenübergreifende Darstellung und Laufzeitlogik werden zentral gepflegt.
3. Jede HTML-Seite bleibt ein direkter, statischer Einstiegspunkt.
4. Navigation, PWA und Offline-Betrieb funktionieren ohne Build-Server im produktiven Webroot.
5. Entfernt werden nur nachweislich unreferenzierte oder vollständig übernommene Altdateien.

## Zentrale Laufzeitdateien

- `assets/core.css` enthält gemeinsame Styles für Grundlayout, Design, Favoriten, Suche/Filter, Sortierung und Seitenbaum.
- `assets/app.js` enthält Basisfunktionen, Service-Worker-Registrierung, Favoriten, Startseitensuche, Sortierung und Navigationsbaum.
- `assets/navigation-tree.json` ist die zentrale Inhaltsquelle für den Navigationsbaum.
- `assets/search-index.json` und `assets/materials.json` bleiben getrennte fachliche Datenquellen für Suche und Werkstoffe.

## Fachmodule

Eigene Dateien bleiben dort bestehen, wo sie fachliche Logik oder modulspezifische Darstellung kapseln:

- `assets/siemens-analogwert-rechner.{css,js}`
- `spannungsfall-rechner/calculator.{css,js}`
- `plausibilitaetspruefung-vde0100-600/checker.{css,js}`
- `assets/materials.{css,js,json}`
- Wissensbeitrags-Styles für Air Torque, Siemens Sitrans und Vacon

Damit bleiben Rechner und Wissensbeiträge klar getrennt, während globale Funktionen nicht mehrfach gepflegt werden.

## Gemeinsame Seitenelemente

`shared/header.html`, `shared/footer.html` und `shared/controls.html` sind die Vorlagen für die statisch ausgelieferten gemeinsamen Elemente. `shared/pages.json` enthält die seitenabhängigen Bezeichnungen und Rücksprungziele. `tools/sync_shared.py` synchronisiert die markierten Bereiche in allen 16 HTML-Seiten.

## PWA und Offline

- PWA-ID und Start-URL: `./?app=sk-plt-tools-2.1.0.0`
- Cache: `sk-plt-tools-v2.1.0.0`
- `tools/release.py` erzeugt den Precache-Bestand automatisch aus den auslieferbaren Webdateien und direkten Seitenrouten.
- Navigationen nutzen Network-first mit Cache-Fallback; statische Assets nutzen Cache-first.
- Ältere SK-PLT-Tools-Caches mit gleichem Präfix werden bei Aktivierung entfernt; andere Anwendungen und Caches bleiben unberührt.

## Projektbereinigung

Die bereits konsolidierte Struktur bleibt vollständig erhalten. Die aktive PDF-Beitragsvorlage und die DOCX-Quelldatei sind weiterhin Bestandteil des Projekts.

## Release-Automatisierung

`release-config.json` ist die zentrale Release-Konfiguration. `tools/release.py` aktualisiert Versionen in HTML, Manifest, App, Navigation und Service Worker, synchronisiert gemeinsame Seitenelemente, generiert die Offline-Liste, erstellt vollständige SHA-256-Prüfsummen und baut das komplette ZIP-Paket. Release-Versionen verwenden das Format `X.Y.Z.W`.
