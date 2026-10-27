import type { Metadata } from "next";
import TradingFilter from "../components/TradingFilter";

export const metadata: Metadata = {
  title: "Tradingdaten",
};

export default function TradingDataPage() {
  return (
    <main>
      <h1>Tradingdaten</h1>
      <TradingFilter />
    </main>
  );
}
