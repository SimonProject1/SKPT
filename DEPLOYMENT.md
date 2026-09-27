# Deployment 1.9.9.1

## Vorbereitungen

- Webroot der aktuell veröffentlichten Version 1.9.8.5 vollständig sichern.
- Prüfen, dass das Zielsystem statische HTML-, CSS-, JavaScript-, JSON-, PNG-, PDF- und Webmanifest-Dateien unverändert ausliefert.

## Rollout

1. **Gesamtpaket hochladen:** Alle Dateien und Ordner aus `SK-PLT-Tools-V1.9.9.1` in den Webroot kopieren und vorhandene Dateien ersetzen.
2. **Nicht als Teilpatch installieren:** Die Lösung setzt die vollständigen HTML-Seiten voraus.
3. **Alte Versionsdateien entfernen:** Sonstige `assets/version-*.js` aus früheren Releases löschen. Die mitgelieferte `version-1.9.8.5.js` ist nur ein absichtlicher No-op für die einmalige Migration.
4. **Service Worker aktualisieren:** `service-worker.js` muss im gleichen Webroot wie `index.html` liegen.
5. **Erster Online-Aufruf:** Anwendung mit Netzwerkverbindung öffnen, anschließend einmal neu laden. Dadurch wird Cache `sk-plt-tools-v1.9.9.1-clean` aktiviert und alte Cache-Namen werden entfernt.
6. **Abnahme:** `TESTBERICHT-UND-ABNAHME.md` vollständig durchführen.

## Rückfall

Bei einem Abbruch des Tests den gesicherten Webroot 1.9.8.5 vollständig wiederherstellen und im Browser Website-Daten/Service Worker für die Site löschen oder eine harte Aktualisierung durchführen.

## Übergang zu 2.0.0.0

Erst nach vollständig bestandener PC-/iPhone-/Offline-Abnahme:

1. Paket 1.9.9.1 duplizieren.
2. Versionsnummern in HTML, `assets/app.js`, `assets/navigation-tree.json`, `manifest.webmanifest`, Dokumentation und `service-worker.js` auf 2.0.0.0 setzen.
3. Cache-Namen auf `sk-plt-tools-v2.0.0.0-clean` ändern.
4. Die alten 1.9.8.5-Kompatibilitätsdateien entfernen, sofern kein Zielgerät mehr direkt von 1.9.8.5 aktualisiert wird.
5. Den vollständigen Test erneut ausführen und erst danach 2.0.0.0 als Safepoint archivieren.
