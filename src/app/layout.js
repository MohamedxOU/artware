import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import StoreInitializer from '@/components/layout/StoreInitializer';
import { cookies } from 'next/headers';

export default async function RootLayout({ children }) {
  const locale = 'en';

  // Read the theme cookie set by next-themes (storageKey: 'theme-storage').
  // Setting data-theme on the HTML element server-side prevents a flash or mismatch
  // where the wrong theme is visible until the client hydrates.
  const cookieStore = cookies();
  const themeCookie = cookieStore.get('theme-storage');
  const theme = themeCookie?.value || 'acid';

  return (
    <html lang={locale} data-theme={theme} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="w-full min-w-0 overflow-x-hidden bg-base-100 text-base-content">
        <ThemeProvider>
          <NextIntlClientProvider>
            <StoreInitializer>
              <div className="w-full min-w-0 overflow-x-hidden">
                {children}
              </div>
            </StoreInitializer>
          </NextIntlClientProvider>
        </ThemeProvider>
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