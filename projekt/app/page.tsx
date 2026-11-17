import type { Metadata } from "next";
import MarketOverview from "./components/MarketOverview";

export const metadata: Metadata = {
  title: { absolute: "Projektname – kurze Beschreibung" },
  description: "Ein Satz, der erklärt, was diese Seite kann.",
};

export default function Home() {
  return (
    <main className="page-content">
      <h1>Tradingdaten Downloadcenter</h1>

      <section
        className="market-section"
        aria-labelledby="maerkte-titel">
        <h2 id="maerkte-titel">Verfügbare Märkte</h2>
        <MarketOverview />
      </section>
    </main>
  );
}
