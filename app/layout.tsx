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
import CookieBanner from '@/components/CookieBanner';
import Analytics from '@/components/Analytics';
import CookieSettings from '@/components/CookieSettings';

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
  telephone: '+351 XXXXXXX',
  email: 'info@amormeco.pt',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'R. Praia Moinho de Baixo 1',
    postalCode: '2970-074',
    addressCountry: 'PT',
    addressLocality: 'Portugal',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 38.12345678901234,
    longitude: -9.123456789012345,
  },
  openingHours: [
    'Mo:Closed',
    'Tu-Sa:12:00-15:00,18:00-23:00',
    'Su:12:00-15:00,18:00-22:00',
  ],
  servesCuisine: ['Portuguese', 'Mediterranean'],
  priceRange: '€€',
  acceptsReservations: true,
  hasMenu: 'https://amormeco.pt/menu',
  image: [
    'https://amormeco.pt/images/restaurant-exterior.jpg',
    'https://amormeco.pt/images/restaurant-interior.jpg',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '127',
  },
  sameAs: [
    'https://www.facebook.com/amormeco',
    'https://www.instagram.com/amormeco',
    'https://twitter.com/amormeco',
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
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta
          name="theme-color"
          content="#607124"
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
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <LanguageProvider>
            <ErrorBoundary>
              <Suspense fallback={<Loading />}>
                <div className="min-h-screen flex flex-col">
                  <Navigation />
                  <main className="flex-grow">{children}</main>
                  <Footer />
                  <ScrollToTop />
                  <CookieBanner />
                  <Analytics />
                  <CookieSettings />
                </div>
              </Suspense>
            </ErrorBoundary>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
