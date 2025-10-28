import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import StoreInitializer from '@/components/layout/StoreInitializer';

export default function RootLayout({ children }) {
  const locale = 'en';

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* Critical Theme Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const stored = localStorage.getItem('theme-storage');
                  const theme = stored ? JSON.parse(stored).state?.theme : 'acid';
                  document.documentElement.setAttribute('data-theme', theme || 'acid');
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'acid');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="w-full min-w-0 overflow-x-hidden bg-base-100 text-base-content">
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