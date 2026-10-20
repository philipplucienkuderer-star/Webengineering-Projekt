
console.log("app.js läuft");

//================ Footer ==================
const jahr = document.querySelector("#jahr");
if (jahr) jahr.textContent = new Date().getFullYear();

//================ Dark Mode ==================
//---------------- Variablen ----------------
const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector(".theme-toggle__icon");

const THEME_KEY = "theme-preference";
const moonSvg =
  '<svg viewBox="0 0 24 24" role="img" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79z"></path></svg>';
const sunSvg =
  '<svg viewBox="0 0 24 24" role="img" aria-hidden="true"><circle cx="12" cy="12" r="4.5"></circle><rect x="11" y="1" width="2" height="5" rx="1"></rect><rect x="11" y="1" width="2" height="5" rx="1" transform="rotate(45 12 12)"></rect><rect x="11" y="1" width="2" height="5" rx="1" transform="rotate(90 12 12)"></rect><rect x="11" y="1" width="2" height="5" rx="1" transform="rotate(135 12 12)"></rect><rect x="11" y="1" width="2" height="5" rx="1" transform="rotate(180 12 12)"></rect><rect x="11" y="1" width="2" height="5" rx="1" transform="rotate(225 12 12)"></rect><rect x="11" y="1" width="2" height="5" rx="1" transform="rotate(270 12 12)"></rect><rect x="11" y="1" width="2" height="5" rx="1" transform="rotate(315 12 12)"></rect></svg>';

//---------------- Funktionen ----------------
function getPreferredTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);

  if (!themeToggle || !themeIcon) return;

  const isDark = theme === "dark";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Zu Light Mode wechseln" : "Zu Dark Mode wechseln",
  );
  themeIcon.innerHTML = isDark ? sunSvg : moonSvg;
}

//---------------- Anweisungen ----------------
if (themeToggle && themeIcon) {
  applyTheme(getPreferredTheme());

  themeToggle.addEventListener("click", () => {
    const currentTheme =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "dark"
        : "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, nextTheme);
    applyTheme(nextTheme);
  });
}

//================ Märkte Filter ==================
//---------------- Variablen ----------------
const filterButtons = document.querySelectorAll("[data-filter]");
const marktKarten = document.querySelectorAll("[data-kategorie]");
const marktAnzahl = document.querySelector("#markt-anzahl");

//---------------- Funktionen ----------------
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

//---------------- Anweisungen ----------------
if (marktKarten.length > 0) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => filterMaerkte(button.dataset.filter));
  });
  filterMaerkte("alle");
}

//================ Tradingdaten-Formular ==================
//---------------- Variablen ----------------
const filterForm = document.querySelector("#filter-form");
const kursdaten = document.querySelector("#kursdaten");
const startdatum = document.querySelector("#startdatum");
const enddatum = document.querySelector("#enddatum");
const kerzengroesse = document.querySelector("#kerzengroesse");
const filterAnwenden = document.querySelector("#filter-anwenden");

//---------------- Funktionen ----------------
function updateKursdatenPlatzhalter() {
  if (!kursdaten) return;

  const start =
    startdatum && startdatum.value ? startdatum.value : "(kein Startdatum)";
  const ende = enddatum && enddatum.value ? enddatum.value : "(kein Enddatum)";
  const kerze =
    kerzengroesse && kerzengroesse.value
      ? kerzengroesse.value
      : "(keine Kerzengröße)";

  if (
    startdatum?.value &&
    enddatum?.value &&
    startdatum.value > enddatum.value
  ) {
    kursdaten.textContent = "Fehler: Startdatum liegt nach dem Enddatum.";
    return;
  }

  kursdaten.textContent = `Filter: ${start} bis ${ende} - Kerze: ${kerze}`;
}

//---------------- Anweisungen ----------------
if (filterForm && kursdaten) {
  filterForm.addEventListener("change", updateKursdatenPlatzhalter);
  filterAnwenden?.addEventListener("click", updateKursdatenPlatzhalter);
}

