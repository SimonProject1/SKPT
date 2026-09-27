# SK PLT Tools 1.9.9.1

Vollständiger Clean-Design-Release auf Basis des Funktionsstands 1.9.8.5.

## Ziel

Beim Wechsel von einer Unterseite zur Startseite wird das aktuelle Design unmittelbar aus dem ausgelieferten HTML und CSS dargestellt. Der Service Worker verändert keine HTML- oder JavaScript-Antworten mehr. Die bisher nachgelagerten Header-, Footer-, Versions-, Kachel- und Integrations-Patches sind in den regulären Seitenstand überführt.

## Inhalt

- vollständige Website mit 12 HTML-Seiten
- alle Rechner, Wissensseiten, Favoriten, Filter, Sortierung und Navigationsbaum
- PWA-Manifest, Icons und Offline-Cache
- editierbare PDF-Vorlage der Wissensdatenbank
- Migrationshinweise für bestehende 1.9.8.5-Installationen
- automatischer statischer Release-Test unter `tools/validate_release.py`
- Abnahmeplan für den späteren Safepoint 2.0.0.0

## Installation

1. Vorhandenen Webroot sichern.
2. Den **gesamten Inhalt dieses Ordners** in den Webroot hochladen; nicht nur einzelne Patchdateien kopieren.
3. Gelöschte/ersetzte Dateien wie im Abschnitt „Kompatibilität“ beschrieben behandeln.
4. Website einmal online öffnen und neu laden, damit der Service Worker 1.9.9.1 aktiv wird.
5. Die Prüfschritte aus `TESTBERICHT-UND-ABNAHME.md` durchführen.

## Architektur 1.9.9.1

- `index.html` und alle Unterseiten enthalten die finale Header-/Footer-Struktur und die korrekte Versionsangabe bereits im Quelltext.
- `assets/design.css` enthält die verbindlichen Header-, Footer- und Kachelregeln.
- Die Startseite enthält alle acht sichtbaren Kacheln sowie Filter- und Sortierbereich bereits im HTML.
- `service-worker.js` ist nur für versionierten Cache und Offline-Fallback zuständig; es verändert keine Antworten.
- JavaScript bleibt ausschließlich für Funktionen wie Rechner, Filter, Sortierung, Favoriten und Navigationsbaum zuständig.

## Kompatibilität beim Update von 1.9.8.5

Ein bereits aktiver Service Worker 1.9.8.5 versucht beim ersten Aufruf noch, frühere Patchdateien zu laden. Deshalb enthält das Paket bewusst kleine, wirkungslose Kompatibilitätsdateien mit den alten Namen. Dadurch kann der alte Worker die neue Seite nicht erneut umbauen. `assets/app.js` setzt die sichtbare Release-Version auf 1.9.9.1 und registriert danach den neuen Clean-Service-Worker.

Nach erfolgreicher Aktivierung von 1.9.9.1 werden alte Cache-Namen automatisch gelöscht. Die Kompatibilitätsdateien können für den späteren Safepoint 2.0.0.0 entfernt werden, sofern der Rollout von 1.9.9.1 auf allen Zielgeräten abgeschlossen ist.

## Lokaler Test

```bash
python tools/validate_release.py
node tools/functional-smoke-test.js
python -m http.server 8080
```

Danach `http://localhost:8080/` im Browser öffnen.

Version 1.9.9.1 · Entwickelt von Simon Kiesler
