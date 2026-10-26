import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Über",
};

export default function AboutPage() {
  return (
    <main>
      <h1>Über das Projekt</h1>
      <p>Hier kommen später Infos zum Projekt, Team und Datenquellen hin.</p>
    </main>
  );
}
