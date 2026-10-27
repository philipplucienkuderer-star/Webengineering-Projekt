'use client';

import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import { AppBar, Box, Button, Toolbar } from '@mui/material';

const links = [
  { href: '/', label: 'Start' },
  { href: '/tradingdaten', label: 'Tradingdaten' },
  { href: '/ueber', label: 'Über' },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <AppBar
      position="static"
      component="nav"
      aria-label="Hauptmenü">
      <Toolbar>
        <Box>
          {links.map(({ href, label }) => (
            <Button
              key={href}
              href={href}
              color="inherit"
              aria-current={pathname === href ? 'page' : undefined}
              sx={{
                fontWeight: pathname === href ? 700 : 400,
              }}>
              {label}
            </Button>
          ))}
        </Box>

        <Box sx={{ ml: 'auto' }}>
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
