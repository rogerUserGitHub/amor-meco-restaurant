import { useEffect } from 'react';
import Hero from '@/components/Hero';
import Menu from '@/components/Menu';
import Gallery from '@/components/Gallery';
import EventBooking from '@/components/EventBooking';
import Reservations from '@/components/Reservations';
import Contact from '@/components/Contact';
import About from '@/components/About';
import Reviews from '@/components/Reviews';
import { Metadata } from 'next';
import HomeClient from './HomeClient';

export default function Home() {
  return <HomeClient />;
}

export const metadata: Metadata = {
  title: 'Restaurante Amor Meco | Cozinha Portuguesa em Aldeia do Meco',
  description: 'Descubra a autêntica cozinha portuguesa no Amor Meco. Localizado em Aldeia do Meco, Setúbal. Reservas, eventos e experiências gastronómicas únicas.',
  keywords: 'restaurante Aldeia do Meco, cozinha portuguesa Setúbal, Amor Meco, reservas restaurante, eventos privados, jantar Sesimbra, restaurante Setúbal',
  authors: [{ name: 'Amor Meco Restaurant' }],
  creator: 'Amor Meco Restaurant',
  publisher: 'Amor Meco Restaurant',
  metadataBase: new URL('https://amormeco.pt'),
  openGraph: {
    title: 'Restaurante Amor Meco | Cozinha Portuguesa Autêntica',
    description: 'Experiência gastronómica única em Aldeia do Meco, Setúbal. Cozinha portuguesa tradicional com influências internacionais.',
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
    title: 'Restaurante Amor Meco | Cozinha Portuguesa Autêntica',
    description: 'Experiência gastronómica única em Aldeia do Meco, Setúbal',
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
  alternates: {
    canonical: 'https://amormeco.pt',
    languages: {
      'pt-PT': 'https://amormeco.pt',
      'en-US': 'https://amormeco.pt/en',
      'nl-NL': 'https://amormeco.pt/nl',
      'es-ES': 'https://amormeco.pt/es',
      'fr-FR': 'https://amormeco.pt/fr',
      'de-DE': 'https://amormeco.pt/de',
    },
  },
}
