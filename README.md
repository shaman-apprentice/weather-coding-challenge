# Coding Challenge

Die Applikation basiert auf Node.js und Express

- Express
- TypeScript
- SQLite

# Vorbereitung

- Datenbank erstellen

```
sqlite3 db/db.sqlite3 < db/db.sql
```

## Aufgaben

- Holen Sie einmal pro Stunde die Wetterdaten von München, Berlin und Frankfurt von https://openweathermap.org ab.
  Erzeugen Sie sich hierfür einen API-Key.
- Speichern Sie die Temperatur und Luftfeuchtigkeit in der Datenbanktabelle weather.
- Erzeugen Sie eine Schnittstelle, die Ihnen die Durchschnittswerte für Temperatur und Luftfeuchtigkeit zurückgibt

  - für einen einzelnen Tag
  - für jeden Tag eines Monats

  Die Schnittstelle soll JSON-Daten zurückliefern
  Die URLs:

  - https://\<Host>/weather?city=\<city>&day=2018-12-24
  - https://\<Host>/weather?city=\<city>&month=2018-12

  Werden ungültige Parameter übergeben, wird ein "400 Bad Request" zurückgeliefert
  Sind keine Daten vorhanden, wird eine leere Response zurückgeliefert

## Bonus

- Erzeugen Sie eine logs/access.log-Datei in der jede eingehende Anfrage protokolliert wird
- Sorgen Sie dafür dass die Applikation über HTTP2 ausgeliefert wird
- Tritt ein fehler auf, loggen Sie die Information in die Datei logs/error.log
