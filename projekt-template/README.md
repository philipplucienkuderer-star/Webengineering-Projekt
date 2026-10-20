# Projektname

Ein bis zwei Sätze: Was kann die App, und für wen?

**Live:** https://<euer-name>.github.io/<repo>/
**Team:** Vorname Nachname, Vorname Nachname

## Was die App kann

- Funktion 1
- Funktion 2
- Funktion 3

## Datenquelle

Welche API, welche Felder, wie oft aktualisiert? Link zur Doku.

## Lokal starten

In VS Code mit Live Server öffnen – oder:

```bash
npx serve .
```

### Styling mit Tailwind CSS

Das Styling läuft über [Tailwind CSS v4](https://tailwindcss.com/docs) mit der Standalone-CLI (kein Node nötig).

- `style.css` ist die **Quelle**: Hier stehen die Farben und Schriften (`@theme`). Diese Datei bearbeitet ihr.
- `build/style.css` wird **erzeugt** und von den HTML-Seiten eingebunden. Nicht von Hand ändern, aber committen, damit GitHub Pages ohne Build funktioniert.

Einmalig die CLI herunterladen (ca. 110 MB, steht in `.gitignore`):

```bash
curl -Lo tailwindcss.exe https://github.com/tailwindlabs/tailwindcss/releases/download/v4.3.3/tailwindcss-windows-x64.exe
```

Beim Entwickeln im Hintergrund laufen lassen. Bei jeder Änderung an HTML oder `style.css` wird neu gebaut:

```bash
./tailwindcss.exe -i style.css -o build/style.css --minify --watch
```

## Technik

Womit gebaut und warum. Eine Zeile pro Entscheidung reicht, aber es soll eine Entscheidung sein, keine Aufzählung von Buzzwords.

## KI-Log

Ehrlich ausfüllen, das zählt zur Bewertung.

| Werkzeug | Wofür benutzt |
| --- | --- |
| z. B. Copilot | z. B. Formular-Validierung erklären lassen |

**Ein Fall, in dem KI geholfen hat:** Was habt ihr gefragt, was kam zurück, was habt ihr geändert?

**Ein Fall, in dem KI falsch lag:** Woran habt ihr es gemerkt, wie habt ihr es gelöst?
