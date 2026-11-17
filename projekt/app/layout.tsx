import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import Script from 'next/script';
import Footer from './components/Footer';
import SiteHeader from './components/SiteHeader';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Projektname',
    template: '%s – Projektname',
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="de"
      data-theme="light"
      suppressHydrationWarning>
      <Script
        src="/app.js"
        strategy="afterInteractive"
      />
      <body>
        <AppRouterCacheProvider>
          <SiteHeader />
          {children}
          <Footer />
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
