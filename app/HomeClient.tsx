'use client';

import { useEffect } from 'react';
import Hero from '@/components/Hero';
import Menu from '@/components/Menu';
import Gallery from '@/components/Gallery';
import EventBooking from '@/components/EventBooking';
import Reservations from '@/components/Reservations';
import Contact from '@/components/Contact';
import About from '@/components/About';
import Reviews from '@/components/Reviews';

export default function HomeClient() {
  useEffect(() => {
    // Handle hash-based routing on page load
    const handleHashRouting = () => {
      const hash = window.location.hash.substring(1); // Remove the #
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          // Wait for the page to fully load before scrolling
          setTimeout(() => {
            const navHeight = 80; // Navigation bar height
            const elementPosition = element.offsetTop - navHeight;
            window.scrollTo({
              top: elementPosition,
              behavior: 'smooth',
            });
          }, 100);
        }
      }
    };

    // Handle initial load
    handleHashRouting();

    // Handle hash changes (when user navigates with browser back/forward)
    const handleHashChange = () => {
      handleHashRouting();
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="relative">
      {/* Hero Section */}
      <Hero />

      {/* Menu Section */}
      <section id="menu" className="section-padding bg-white dark:bg-gray-900">
        <Menu />
      </section>

      {/* Reservations Section */}
      <section
        id="reservations"
        className="section-padding bg-gray-50 dark:bg-gray-800"
      >
        <Reservations />
      </section>

      {/* Event Booking Section */}
      <section
        id="events"
        className="section-padding bg-white dark:bg-gray-900"
      >
        <EventBooking />
      </section>

      {/* Gallery Section */}
      <section
        id="gallery"
        className="section-padding bg-gray-50 dark:bg-gray-800"
      >
        <Gallery />
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-white dark:bg-gray-900">
        <About />
      </section>

      {/* Reviews Section */}
      <section
        id="reviews"
        className="section-padding bg-gray-50 dark:bg-gray-800"
      >
        <Reviews />
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="section-padding bg-white dark:bg-gray-900"
      >
        <Contact />
      </section>
    </div>
  );
}
