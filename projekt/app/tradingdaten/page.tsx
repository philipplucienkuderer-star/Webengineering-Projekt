import type { Metadata } from "next";
import TradingFilter from "../components/TradingFilter";

export const metadata: Metadata = {
  title: "Tradingdaten",
};

export default function TradingDataPage() {
  return (
    <main className="page-content download-page">
      <header className="download-hero">
        <h1>Tradingdaten herrunterladen</h1>
        <p>
          Wähle einen Markt, einen Zeitraum und die gewünschte Kerzengröße aus.
          Anschließend kannst du die Daten als CSV-Datei herunterladen.
        </p>
      </header>
      <TradingFilter />
    </main>
  );
}
