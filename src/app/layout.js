import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { cookies } from 'next/headers';
import StoreInitializer from '@/components/layout/StoreInitializer';

export default function RootLayout({ children }) {

  const locale =  'en' ; // Default locale

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#ff6b35" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1a103d" media="(prefers-color-scheme: dark)" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const stored = localStorage.getItem('theme-storage');
                  if (stored) {
                    const { state } = JSON.parse(stored);
                    const theme = state.theme || 'acid';
                    const darkThemes = ['synthwave', 'halloween', 'forest', 'black', 'luxury', 'dracula', 'night', 'coffee', 'business'];
                    const isDark = darkThemes.includes(theme);
                    
                    document.documentElement.setAttribute('data-theme', theme);
                    document.documentElement.className = isDark ? 'dark' : 'light';
                  } else {
                    // Fallback to default theme
                    document.documentElement.setAttribute('data-theme', 'acid');
                    document.documentElement.className = 'light';
                  }
                } catch (e) {
                  // Fallback to default theme on error
                  document.documentElement.setAttribute('data-theme', 'acid');
                  document.documentElement.className = 'light';
                }
              })();
            `,
          }}
        />
      </head>
      <body className="w-full min-w-0 overflow-x-hidden">
          <NextIntlClientProvider>
            <StoreInitializer>
              <div className="w-full min-w-0 overflow-x-hidden">
                {children}
              </div>
            </StoreInitializer>
          </NextIntlClientProvider>
      </body>
    </html>
  );
}

// Metadata
export const metadata = {
  title: 'Artware Club',
  description: 'Join the Artware Club - Where Art Meets Algorithm',
  icons: {
    icon: '/A.ico',
    shortcut: '/A.ico',
    apple: '/A.png',
  },
};