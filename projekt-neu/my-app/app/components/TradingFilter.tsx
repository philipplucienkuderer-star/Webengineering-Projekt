"use client";

import { FormEvent, useRef, useState } from "react";

const INITIAL_RESULT = "Hier werden später Kursdaten angezeigt.";

export default function TradingFilter() {
  const formRef = useRef<HTMLFormElement>(null);
  const [result, setResult] = useState(INITIAL_RESULT);

  function updateResult() {
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const start = String(formData.get("startdatum") || "");
    const end = String(formData.get("enddatum") || "");
    const candleSize = String(formData.get("kerzengroesse") || "");

    if (start && end && start > end) {
      setResult("Fehler: Startdatum liegt nach dem Enddatum.");
      return;
    }

    setResult(
      `Filter: ${start || "(kein Startdatum)"} bis ${end || "(kein Enddatum)"} - Kerze: ${candleSize || "(keine Kerzengröße)"}`,
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updateResult();
  }

  return (
    <>
      <section aria-labelledby="filter-titel">
        <h2 id="filter-titel">Filter</h2>

        <form
          ref={formRef}
          className="filter-form"
          onChange={updateResult}
          onSubmit={handleSubmit}
        >
          <div className="filter-field">
            <label htmlFor="startdatum">Startdatum</label>
            <input id="startdatum" name="startdatum" type="date" />
          </div>

          <div className="filter-field">
            <label htmlFor="enddatum">Enddatum</label>
            <input id="enddatum" name="enddatum" type="date" />
          </div>

          <div className="filter-field">
            <label htmlFor="kerzengroesse">Kerzengröße</label>
            <select id="kerzengroesse" name="kerzengroesse" defaultValue="1m">
              <option value="1m">1 Minute</option>
              <option value="5m">5 Minuten</option>
              <option value="1h">1 Stunde</option>
              <option value="1d">1 Tag</option>
            </select>
          </div>

          <div className="filter-field">
            <label htmlFor="asset">Asset</label>
            <select id="asset" name="asset" defaultValue="ETH/USD">
              <option value="BCT/USD">BTC/USD</option>
              <option value="ETH/USD">ETH/USD</option>
            </select>
          </div>

          <button id="filter-anwenden" type="submit">
            Anwenden
          </button>
        </form>
      </section>

      <section aria-labelledby="kursdaten-titel">
        <h2 id="kursdaten-titel">Kursdaten</h2>
        <div role="status" aria-live="polite" className="kursdaten">
          {result}
        </div>
      </section>
    </>
  );
}
