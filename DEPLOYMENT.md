# Upload-Anleitung – SK PLT Tools 2.0.1.0

## Vorbereitungen

- Aktuell veröffentlichten Webroot vollständig sichern.
- Prüfen, dass das Zielsystem statische HTML-, CSS-, JavaScript-, JSON-, PNG-, PDF-, DOCX- und Webmanifest-Dateien unverändert ausliefert.
- Nicht nur Einzeldateien ersetzen: Version 2.0.1.0 ist als vollständiger, gemeinsam geprüfter Projektstand vorgesehen.

## Upload und Rollout

1. Das Downloadpaket `SK-PLT-Tools-V2.0.1.0.zip` vollständig entpacken.
2. Alle Dateien und Ordner **aus dem Ordner `SK-PLT-Tools-V2.0.1.0`** in den Webroot kopieren und vorhandene Dateien ersetzen.
3. Prüfen, dass insbesondere `assets/materials.json`, `assets/materials.js`, `assets/materials.css` und `wissensdatenbank/werkstoff-nachschlagewerk/index.html` übertragen wurden.
4. Sonstige `assets/version-*.js` aus älteren Releases löschen. Die mitgelieferte `assets/version-1.9.8.5.js` ist ein absichtlicher No-op für die Migration und bleibt Bestandteil dieses Pakets.
5. `service-worker.js` muss im gleichen Webroot wie `index.html` liegen.
6. Die Anwendung einmal mit Netzwerkverbindung öffnen und anschließend neu laden. Dadurch wird der Cache `sk-plt-tools-v2.0.1.0-clean` aktiviert; ältere Cache-Namen werden entfernt.
7. Im Browser kontrollieren, dass unter dem Logo und im Footer „Version 2.0.1.0“ angezeigt wird.
8. Die vollständige Checkliste in `TESTBERICHT-UND-ABNAHME.md` durchführen.
9. Bei Bedarf die Paketintegrität mit `SHA256SUMS.txt` prüfen.

## Wichtiger Hinweis zur Wissensdatenbank-PDF

Die Dateien unter `wissensdatenbank/vorlagen/` wurden nicht inhaltlich verändert. Insbesondere die editierbare PDF bleibt unverändert, weil sie keine Versionsnummer trägt und ihre Vorlage in diesem Release nicht geändert wird.

## Rückfall

Bei einem Abbruch der Abnahme den zuvor gesicherten Webroot vollständig wiederherstellen. Anschließend Website-Daten beziehungsweise Service Worker der Site löschen oder eine harte Aktualisierung durchführen.

## Architekturhinweis

Die Clean-Design-Infrastruktur bleibt unverändert: finale Header-, Footer- und Kachelstrukturen stehen direkt im HTML; der Service Worker schreibt keine Antworten um. Für 2.0.1.0 wurden ausschließlich die neue Wissensfunktion, ihre Daten-/Darstellungsdateien, die vorgesehenen Integrationspunkte, Versionsangaben und Release-Dokumente ergänzt beziehungsweise aktualisiert.
