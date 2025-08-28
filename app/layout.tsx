import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { LanguageProvider } from '@/components/LanguageProvider';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { Suspense } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import dynamic from 'next/dynamic';
import { Toaster } from 'react-hot-toast';

// Dynamic imports for better performance
const CookieBanner = dynamic(() => import('@/components/CookieBanner'), {
  ssr: false,
  loading: () => null,
});

const Analytics = dynamic(() => import('@/components/Analytics'), {
  ssr: false,
  loading: () => null,
});

const CookieSettings = dynamic(() => import('@/components/CookieSettings'), {
  ssr: false,
  loading: () => null,
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Amor Meco Restaurant | Fine Dining Experience',
  description:
    'Experience the finest Portuguese cuisine at Amor Meco Restaurant. Authentic flavors, warm atmosphere, and unforgettable dining moments.',
  keywords:
    'restaurant, Portuguese cuisine, local food, Amor Meco, Sesimbra, reservations, lunch, dinner, events',
  authors: [{ name: 'Amor Meco Restaurant' }],
  creator: 'Amor Meco Restaurant',
  publisher: 'Amor Meco Restaurant',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://amormeco.pt'),
  alternates: {
    canonical: 'https://amormeco.pt',
    languages: {
      pt: 'https://amormeco.pt/pt',
      nl: 'https://amormeco.pt/nl',
      en: 'https://amormeco.pt/en',
      es: 'https://amormeco.pt/es',
    },
  },
  openGraph: {
    title: 'Amor Meco Restaurant | Fine Dining Experience',
    description:
      'Experience the finest Portuguese cuisine at Amor Meco Restaurant.',
    url: 'https://amormeco.pt',
    siteName: 'Amor Meco Restaurant',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Amor Meco Restaurant',
      },
    ],
    locale: 'pt_PT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amor Meco Restaurant | Fine Dining Experience',
    description:
      'Experience the finest Portuguese cuisine at Amor Meco Restaurant.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

// Restaurant Schema.org structured data
const restaurantSchema = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Amor Meco Restaurant',
  description:
    'Experience the finest Portuguese cuisine at Amor Meco Restaurant. Authentic flavors, warm atmosphere, and unforgettable dining moments.',
  url: 'https://amormeco.pt',
  telephone: '+351123456789',
  email: 'info@amormeco.pt',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'R. Praia Moinho de Baixo 1',
    addressLocality: 'Sesimbra',
    postalCode: '2970-074',
    addressCountry: 'PT',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 38.4447,
    longitude: -9.1014,
  },
  openingHours: ['Mo:Closed', 'Tu-Fr:12:00-23:00', 'Sa-Su:12:00-23:00'],
  servesCuisine: ['Portuguese', 'Mediterranean'],
  priceRange: '€€',
  acceptsReservations: true,
  hasMenu: 'https://amormeco.pt/menu',
  image: 'https://amormeco.pt/images/restaurant.jpg',
  sameAs: [
    'http://facebook.com/profile.php?id=61579636772354',
    'https://www.instagram.com/amor.meco',
  ],
};

// Loading component
function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-300">Loading Amor Meco...</p>
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/logo-large.jpg" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/logo-large.jpg"
        />
        <link
          rel="icon"
          type="image/jpeg"
          sizes="32x32"
          href="/images/logo-large.jpg"
        />
        <link
          rel="icon"
          type="image/jpeg"
          sizes="16x16"
          href="/images/logo-large.jpg"
        />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Performance optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="dns-prefetch"
          href="https://tesxjtouiayyyeglqnmr.supabase.co"
        />

        <meta
          name="theme-color"
          content="#64702A"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#1A1A1A"
          media="(prefers-color-scheme: dark)"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(restaurantSchema),
          }}
        />

        {/* Theme initialization script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Clear any existing theme from localStorage
                  localStorage.removeItem('theme');
                  
                  // Always default to dark theme
                  document.documentElement.classList.remove('light', 'dark');
                  document.documentElement.classList.add('dark');
                } catch (e) {
                  console.log('Theme initialization failed:', e);
                  // Fallback to dark theme
                  document.documentElement.classList.remove('light', 'dark');
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <div className="min-h-screen flex flex-col">
          <ThemeProvider>
            <LanguageProvider>
              <ErrorBoundary>
                <Navigation />
                <Suspense fallback={<Loading />}>
                  <main className="flex-grow">{children}</main>
                </Suspense>
                <Footer />
                <ScrollToTop />
                <CookieBanner />
                <Analytics />
                <CookieSettings />
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      border: '1px solid var(--color-border)',
                    },
                    success: {
                      iconTheme: {
                        primary: '#10B981',
                        secondary: '#FFFFFF',
                      },
                    },
                    error: {
                      iconTheme: {
                        primary: '#EF4444',
                        secondary: '#FFFFFF',
                      },
                    },
                  }}
                />
              </ErrorBoundary>
            </LanguageProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
