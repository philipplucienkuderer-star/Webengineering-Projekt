import type { Metadata } from "next";
import Footer from "./components/Footer";
import SiteHeader from "./components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Projektname",
    template: "%s – Projektname",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" data-theme="light" suppressHydrationWarning>
      <body>
        <SiteHeader />
        {children}
        <Footer />
      </body>
    </html>
  );
}
