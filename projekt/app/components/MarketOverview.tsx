'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Category = 'alle' | 'krypto' | 'aktien' | 'devisen';

const FILTER_STORAGE_KEY = 'market-overview-filter';

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

type ViewState = {
  markets: typeof markets;
  activeFilter: Category;
};

function getVisibleMarkets(viewState: ViewState) {
  return viewState.markets.filter(
    (market) =>
      viewState.activeFilter === 'alle' ||
      market.category === viewState.activeFilter,
  );
}

function isCategory(value: unknown): value is Category {
  return filters.some((filter) => filter.value === value);
}

export default function MarketOverview() {
  const [state, setState] = useState<ViewState>({
    markets,
    activeFilter: 'alle',
  });

  useEffect(() => {
    let timeoutId: number | undefined;

    try {
      const storedFilter = window.localStorage.getItem(FILTER_STORAGE_KEY);

      if (storedFilter === null) return;

      const parsedFilter: unknown = JSON.parse(storedFilter);

      if (isCategory(parsedFilter)) {
        timeoutId = window.setTimeout(() => {
          setState((currentState) => ({
            ...currentState,
            activeFilter: parsedFilter,
          }));
        }, 0);
      } else {
        console.warn('Ungültiger gespeicherter Marktfilter wird ignoriert.');
      }
    } catch {
      console.warn('Gespeicherter Marktfilter konnte nicht gelesen werden.');
    }

    return () => {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  const visibleMarkets = getVisibleMarkets(state);

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
            aria-pressed={state.activeFilter === filter.value}
            onClick={() => {
              setState((currentState) => ({
                ...currentState,
                activeFilter: filter.value,
              }));
              window.localStorage.setItem(
                FILTER_STORAGE_KEY,
                JSON.stringify(filter.value),
              );
            }}>
            {filter.label}
          </button>
        ))}
      </div>

      <p aria-live="polite">
        Angezeigt: {visibleMarkets.length} von {state.markets.length} Märkten
      </p>

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
