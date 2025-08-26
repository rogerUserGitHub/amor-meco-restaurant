import Hero from '@/components/Hero';
import Menu from '@/components/Menu';
import Gallery from '@/components/Gallery';
import EventBooking from '@/components/EventBooking';
import Reservations from '@/components/Reservations';
import Contact from '@/components/Contact';
import About from '@/components/About';
import Reviews from '@/components/Reviews';

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <Hero />

      {/* Menu Section */}
      <section id="menu" className="section-padding bg-white dark:bg-gray-900">
        <Menu />
      </section>

      {/* Gallery Section */}
      <section
        id="gallery"
        className="section-padding bg-gray-50 dark:bg-gray-800"
      >
        <Gallery />
      </section>

      {/* Event Booking Section */}
      <section
        id="events"
        className="section-padding bg-white dark:bg-gray-900"
      >
        <EventBooking />
      </section>

      {/* Reservations Section */}
      <section
        id="reservations"
        className="section-padding bg-gray-50 dark:bg-gray-800"
      >
        <Reservations />
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
