'use client';

import { Button } from '@mui/material';
import { useEffect, useSyncExternalStore } from 'react';

type Theme = 'light' | 'dark';

const THEME_KEY = 'theme-preference';
const THEME_CHANGE_EVENT = 'theme-change';

function subscribeToTheme(callback: () => void) {
  window.addEventListener(THEME_CHANGE_EVENT, callback);
  return () => window.removeEventListener(THEME_CHANGE_EVENT, callback);
}

function getThemeSnapshot(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

function getServerThemeSnapshot(): Theme {
  return 'light';
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-hidden="true">
      <circle
        cx="12"
        cy="12"
        r="4.5"
      />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <rect
          key={angle}
          x="11"
          y="1"
          width="2"
          height="5"
          rx="1"
          transform={`rotate(${angle} 12 12)`}
        />
      ))}
    </svg>
  );
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const preferredTheme =
      savedTheme === 'light' || savedTheme === 'dark' ? savedTheme
      : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark'
      : 'light';

    document.documentElement.dataset.theme = preferredTheme;
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }, []);

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }

  const isDark = theme === 'dark';

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={isDark ? 'Zu Light Mode wechseln' : 'Zu Dark Mode wechseln'}
      aria-pressed={isDark}
      onClick={toggleTheme}>
      <span
        className="theme-toggle__icon"
        aria-hidden="true">
        {isDark ?
          <SunIcon />
        : <MoonIcon />}
      </span>
    </button>
  );
}
