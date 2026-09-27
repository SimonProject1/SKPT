# Deployment 2.0.0.0

## Vorbereitungen

- Webroot der aktuell veröffentlichten Version vollständig sichern.
- Prüfen, dass das Zielsystem statische HTML-, CSS-, JavaScript-, JSON-, PNG-, PDF-, DOCX- und Webmanifest-Dateien unverändert ausliefert.

## Upload und Rollout

1. **Gesamtpaket entpacken:** Das Downloadpaket `SK-PLT-Tools-V2.0.0.0.zip` vollständig entpacken.
2. **Gesamtpaket hochladen:** Alle Dateien und Ordner aus `SK-PLT-Tools-V2.0.0.0` in den Webroot kopieren und vorhandene Dateien ersetzen.
3. **Nicht als Teilpatch installieren:** Keine einzelnen Dateien herauslösen; die Lösung setzt den vollständigen, gemeinsam getesteten Seitenstand voraus.
4. **Alte Versionsdateien behandeln:** Sonstige `assets/version-*.js` aus früheren Releases löschen. Die mitgelieferte `assets/version-1.9.8.5.js` ist ein absichtlicher No-op für die einmalige Migration und bleibt Bestandteil dieses Pakets.
5. **Service Worker platzieren:** `service-worker.js` muss im gleichen Webroot wie `index.html` liegen.
6. **Erster Online-Aufruf:** Anwendung mit Netzwerkverbindung öffnen und anschließend einmal neu laden. Dadurch wird Cache `sk-plt-tools-v2.0.0.0-clean` aktiviert; alte Cache-Namen werden entfernt.
7. **Abnahme:** `TESTBERICHT-UND-ABNAHME.md` vollständig durchführen.
8. **Integrität:** Bei Bedarf die Dateien gegen `SHA256SUMS.txt` prüfen.

## Rückfall

Bei einem Abbruch der Abnahme den zuvor gesicherten Webroot vollständig wiederherstellen und im Browser die Website-Daten beziehungsweise den Service Worker für die Site löschen oder eine harte Aktualisierung durchführen.

## Safepoint-Kennzeichnung

Das Paket `SK-PLT-Tools-V2.0.0.0.zip` ist der Clean-Design-Safepoint 2.0.0.0. Es übernimmt Funktionen, Inhalte, Design und Infrastruktur des erfolgreich getesteten vollständigen Stands 1.9.9.1 unverändert. Geändert wurden ausschließlich die erforderlichen Versionsangaben, der Service-Worker-Cache-Name, die Release Notes, diese Upload-Anleitung und die Safepoint-Kennzeichnung.
