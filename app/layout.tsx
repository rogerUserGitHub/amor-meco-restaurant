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
import { faqSchema } from '@/lib/schema';

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
  title: 'Restaurante Amor Meco em Aldeia do Meco | Cozinha Portuguesa Autêntica',
  description:
    'Experience authentic Portuguese cuisine with international flavors at Amor Meco Restaurant in Aldeia do Meco, Setúbal. Traditional recipes, warm atmosphere, and unforgettable dining moments.',
  keywords:
    'restaurante Aldeia do Meco, restaurante Sesimbra, cozinha portuguesa Setúbal, Amor Meco, restaurante Setúbal, jantar Aldeia do Meco, reservas, eventos, cozinha autêntica portuguesa',
  authors: [{ name: 'Amor Meco Restaurant' }],
  creator: 'Amor Meco Restaurant',
  publisher: 'Amor Meco Restaurant',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://amormeco.pt'),
  openGraph: {
    title: 'Restaurante Amor Meco em Aldeia do Meco | Cozinha Portuguesa Autêntica',
    description:
      'Experience authentic Portuguese cuisine with international flavors at Amor Meco Restaurant in Aldeia do Meco, Setúbal.',
    url: 'https://amormeco.pt',
    siteName: 'Amor Meco Restaurant',
    images: [
      {
        url: '/images/logo-large.jpg',
        width: 1200,
        height: 630,
        alt: 'Restaurante Amor Meco em Aldeia do Meco - Cozinha Portuguesa Autêntica',
      },
    ],
    locale: 'pt_PT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Restaurante Amor Meco em Aldeia do Meco | Cozinha Portuguesa Autêntica',
    description:
      'Experience authentic Portuguese cuisine with international flavors at Amor Meco Restaurant in Aldeia do Meco, Setúbal.',
    images: ['/images/logo-large.jpg'],
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

// Restaurant Schema.org structured data with Local Business markup
const restaurantSchema = {
  '@context': 'https://schema.org',
  '@type': ['Restaurant', 'LocalBusiness', 'FoodEstablishment'],
  name: 'Amor Meco Restaurant',
  description:
    'Experience authentic Portuguese cuisine with international flavors at Amor Meco Restaurant in Aldeia do Meco, Setúbal. Traditional recipes, warm atmosphere, and unforgettable dining moments.',
  url: 'https://amormeco.pt',
  telephone: '+351123456789',
  email: 'info@amormeco.pt',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'R. Praia Moinho de Baixo 1',
    addressLocality: 'Aldeia do Meco',
    addressRegion: 'Setúbal',
    postalCode: '2970-074',
    addressCountry: 'PT',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 38.4400,
    longitude: -9.1000,
  },
  areaServed: [
    {
      '@type': 'City',
      name: 'Aldeia do Meco'
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Setúbal'
    },
    {
      '@type': 'City',
      name: 'Sesimbra'
    }
  ],
  openingHours: ['We-Sa:12:00-15:00,18:00-23:00', 'Su:12:00-15:00,18:00-22:00'],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '12:00',
      closes: '15:00'
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '18:00',
      closes: '23:00'
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday'],
      opens: '12:00',
      closes: '15:00'
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday'],
      opens: '18:00',
      closes: '22:00'
    }
  ],
  servesCuisine: ['Portuguese', 'Mediterranean', 'International'],
  priceRange: '€€',
  acceptsReservations: true,
  paymentAccepted: ['Cash', 'Credit Card'],
  currenciesAccepted: 'EUR',
  hasMenu: 'https://amormeco.pt/#menu',
  menu: 'https://amormeco.pt/#menu',
  image: 'https://amormeco.pt/images/logo-large.jpg',
  logo: 'https://amormeco.pt/images/logo-large.jpg',
  hasMap: 'https://www.google.com/maps/place/R.+Praia+Moinho+de+Baixo+1,+2970-074+Portugal',
  sameAs: [
    'http://facebook.com/profile.php?id=61579636772354',
    'https://www.instagram.com/amor.meco'
  ]
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
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-iphone-60x60.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-ipad-76x76.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-iphone-retina-120x120.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-ipad-retina-152x152.png" />
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
        
        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
        
        {/* Breadcrumb Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://amormeco.pt"
                }
              ]
            }),
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
                {/* <CookieBanner />
                <Analytics />
                <CookieSettings /> */}
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
