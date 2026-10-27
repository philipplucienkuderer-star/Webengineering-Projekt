"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/", label: "Start" },
  { href: "/tradingdaten", label: "Tradingdaten" },
  { href: "/ueber", label: "Über" },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header>
      <nav aria-label="Hauptmenü">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={pathname === link.href ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}
        <ThemeToggle />
      </nav>
    </header>
  );
}
