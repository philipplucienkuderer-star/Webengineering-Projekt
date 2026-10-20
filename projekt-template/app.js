// Ab Termin 6 wird das hier interessant.
// Bis dahin reicht ein Lebenszeichen, damit ihr seht, dass die Datei geladen wird.

const jahr = document.querySelector("#jahr");
if (jahr) jahr.textContent = new Date().getFullYear();

console.log("app.js läuft");

const filterForm = document.querySelector("#filter-form");
const kursdaten = document.querySelector("#kursdaten");
const startdatum = document.querySelector("#startdatum");
const enddatum = document.querySelector("#enddatum");
const kerzengroesse = document.querySelector("#kerzengroesse");
const filterAnwenden = document.querySelector("#filter-anwenden");

function updateKursdatenPlatzhalter() {
  if (!kursdaten) return;

  const start = startdatum && startdatum.value ? startdatum.value : "(kein Startdatum)";
  const ende = enddatum && enddatum.value ? enddatum.value : "(kein Enddatum)";
  const kerze = kerzengroesse && kerzengroesse.value ? kerzengroesse.value : "(keine Kerzengröße)";

  if (startdatum?.value && enddatum?.value && startdatum.value > enddatum.value) {
    kursdaten.textContent = "Fehler: Startdatum liegt nach dem Enddatum.";
    return;
  }

  kursdaten.textContent = `Filter: ${start} bis ${ende} - Kerze: ${kerze}`;
}

if (filterForm && kursdaten) {
  filterForm.addEventListener("change", updateKursdatenPlatzhalter);
  filterAnwenden?.addEventListener("click", updateKursdatenPlatzhalter);
}

// Startseite: Märkte nach Kategorie filtern.
// Die data-Attribute dienen als Haken für JS, die Klassen nur fürs Aussehen.
const filterButtons = document.querySelectorAll("[data-filter]");
const marktKarten = document.querySelectorAll("[data-kategorie]");
const marktAnzahl = document.querySelector("#markt-anzahl");

function filterMaerkte(kategorie) {
  let sichtbar = 0;

  marktKarten.forEach((karte) => {
    const passt = kategorie === "alle" || karte.dataset.kategorie === kategorie;
    karte.hidden = !passt;
    if (passt) sichtbar++;
  });

  filterButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.filter === kategorie));
  });

  if (marktAnzahl) {
    marktAnzahl.textContent = `${sichtbar} von ${marktKarten.length} Märkten`;
  }
}

if (marktKarten.length > 0) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => filterMaerkte(button.dataset.filter));
  });
  filterMaerkte("alle");
}
