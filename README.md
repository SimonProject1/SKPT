# SK PLT Tools 2.0.0.0

Vollständiger Clean-Design-Safepoint auf Basis des erfolgreich getesteten Funktionsstands 1.9.9.1.

## Ziel

Beim Wechsel von einer Unterseite zur Startseite wird das aktuelle Design unmittelbar aus dem ausgelieferten HTML und CSS dargestellt. Der Service Worker verändert keine HTML- oder JavaScript-Antworten. Die finale Header-, Footer-, Versions-, Kachel- und Integrationsstruktur ist vollständig in den regulären Seitenstand überführt.

## Inhalt

- vollständige Website mit 12 HTML-Seiten
- alle Rechner, Wissensseiten, Favoriten, Filter, Sortierung und Navigationsbaum
- PWA-Manifest, Icons und versionierter Offline-Cache
- editierbare PDF-Vorlage der Wissensdatenbank
- Migrationshinweise für bestehende 1.9.8.5-Installationen
- automatischer statischer Release-Test unter `tools/validate_release.py`
- Testbericht und Safepoint-Kennzeichnung für 2.0.0.0

## Installation

1. Vorhandenen Webroot vollständig sichern.
2. Den **gesamten Inhalt des Ordners `SK-PLT-Tools-V2.0.0.0`** in den Webroot hochladen und vorhandene Dateien ersetzen; keine Einzeldateien als Teilpatch installieren.
3. `service-worker.js` muss im gleichen Webroot wie `index.html` liegen.
4. Website einmal mit Netzwerkverbindung öffnen und anschließend neu laden, damit der Service Worker 2.0.0.0 und der Cache `sk-plt-tools-v2.0.0.0-clean` aktiviert werden.
5. Die Prüfschritte aus `TESTBERICHT-UND-ABNAHME.md` durchführen.

## Architektur 2.0.0.0

- `index.html` und alle Unterseiten enthalten die finale Header-/Footer-Struktur und die korrekte Versionsangabe bereits im Quelltext.
- `assets/design.css` enthält die verbindlichen Header-, Footer- und Kachelregeln.
- Die Startseite enthält alle acht sichtbaren Kacheln sowie Filter- und Sortierbereich bereits im HTML.
- `service-worker.js` ist nur für versionierten Cache und Offline-Fallback zuständig; er verändert keine Antworten.
- JavaScript bleibt ausschließlich für Funktionen wie Rechner, Filter, Sortierung, Favoriten und Navigationsbaum zuständig.

## Kompatibilität beim Update von 1.9.8.5

Ein noch aktiver Service Worker 1.9.8.5 kann beim ersten Aufruf frühere Patchdateien anfordern. Deshalb enthält das Paket weiterhin kleine, wirkungslose Kompatibilitätsdateien mit den alten Namen. Dadurch kann der alte Worker die neue Seite nicht erneut umbauen. `assets/app.js` setzt die sichtbare Release-Version auf 2.0.0.0 und registriert danach den Clean-Service-Worker.

Nach erfolgreicher Aktivierung von 2.0.0.0 werden alte Cache-Namen automatisch gelöscht. Die Kompatibilitätsdateien bleiben als Bestandteil der unveränderten, erfolgreich getesteten Infrastruktur des Stands 1.9.9.1 erhalten.

## Safepoint

Version 2.0.0.0 kennzeichnet den erfolgreich getesteten vollständigen Clean-Design-Stand 1.9.9.1 als produktionsfähigen Safepoint. Gegenüber 1.9.9.1 wurden ausschließlich die erforderlichen Versionsangaben, der Service-Worker-Cache-Name, die Release Notes, die Upload-Anleitung und die Safepoint-Kennzeichnung angepasst. Funktionen, Inhalte, Design und Infrastruktur sind unverändert.

## Lokaler Test

```bash
python tools/validate_release.py
node tools/functional-smoke-test.js
python -m http.server 8080
```

Danach `http://localhost:8080/` im Browser öffnen.

Version 2.0.0.0 · Entwickelt von Simon Kiesler
