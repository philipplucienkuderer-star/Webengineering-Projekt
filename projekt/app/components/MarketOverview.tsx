'use client';

import Link from 'next/link';
import { useState } from 'react';

type Category = 'alle' | 'krypto' | 'aktien' | 'devisen';

const filters: { value: Category; label: string }[] = [
  { value: 'alle', label: 'Alle' },
  { value: 'krypto', label: 'Krypto' },
  { value: 'aktien', label: 'Aktien' },
  { value: 'devisen', label: 'Devisen' },
];

const markets: {
  name: string;
  category: Exclude<Category, 'alle'>;
  badge: string;
  description: string;
  linkLabel: string;
}[] = [
  {
    name: 'Bitcoin',
    category: 'krypto',
    badge: 'Krypto',
    description: 'Größte Kryptowährung nach Marktkapitalisierung.',
    linkLabel: 'Kursdaten BTC/USD',
  },
  {
    name: 'Ethereum',
    category: 'krypto',
    badge: 'Krypto',
    description: 'Plattform für Smart Contracts und zweitgrößte Kryptowährung.',
    linkLabel: 'Kursdaten ETH/USD',
  },
  {
    name: 'Apple',
    category: 'aktien',
    badge: 'Aktie',
    description: 'US-Technologiekonzern, gelistet an der NASDAQ.',
    linkLabel: 'Kursdaten AAPL',
  },
  {
    name: 'Tesla',
    category: 'aktien',
    badge: 'Aktie',
    description:
      'US Autounternehmen neuerdings angeblich auch flugzeughersteller',
    linkLabel: 'Kursdaten TSLA',
  },
  {
    name: 'Euro / US-Dollar',
    category: 'devisen',
    badge: 'Devisen',
    description: 'Das meistgehandelte Währungspaar der Welt.',
    linkLabel: 'Kursdaten EUR/USD',
  },
  {
    name: 'Pfund / US-Dollar',
    category: 'devisen',
    badge: 'Devisen',
    description: 'Britisches Pfund gegen US-Dollar.',
    linkLabel: 'Kursdaten GBP/USD',
  },
];

export default function MarketOverview() {
  const [activeFilter, setActiveFilter] = useState<Category>('alle');
  const visibleMarkets = markets.filter(
    (market) => activeFilter === 'alle' || market.category === activeFilter,
  );

  return (
    <>
      <div
        className="filter-leiste"
        role="group"
        aria-label="Nach Kategorie filtern">
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            className="filter-chip"
            aria-pressed={activeFilter === filter.value}
            onClick={() => setActiveFilter(filter.value)}>
            {filter.label}
          </button>
        ))}
      </div>

      <ul className="markt-grid">
        {visibleMarkets.map((market) => (
          <li
            className="markt-karte"
            data-kategorie={market.category}
            key={market.name}>
            <div className="markt-karte__kopf">
              <h3>{market.name}</h3>
              <span className="markt-karte__badge">{market.badge}</span>
            </div>
            <p>{market.description}</p>
            <Link
              className="markt-karte__link"
              href="/tradingdaten">
              {market.linkLabel}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
