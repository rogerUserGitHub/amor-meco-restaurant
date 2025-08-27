'use client';

import { useLanguage } from './LanguageProvider';
import { motion } from 'framer-motion';
import { Calendar, Users, Music, Heart, ArrowRight } from 'lucide-react';

export default function EventBooking() {
  const { t } = useLanguage();

  const eventTypes = [
    {
      icon: <Users size={24} className="text-primary" />,
      title: t('events.privateDining.title'),
      description: t('events.privateDining.description'),
    },
    {
      icon: <Music size={24} className="text-primary" />,
      title: t('events.liveMusic.title'),
      description: t('events.liveMusic.description'),
    },
    {
      icon: <Heart size={24} className="text-primary" />,
      title: t('events.weddingReceptions.title'),
      description: t('events.weddingReceptions.description'),
    },
    {
      icon: <Calendar size={24} className="text-primary" />,
      title: t('events.corporateEvents.title'),
      description: t('events.corporateEvents.description'),
    },
  ];

  const handleBookNow = () => {
    // Navigate to reservations section
    const reservationsSection = document.getElementById('reservations');
    if (reservationsSection) {
      const navHeight = 80;
      const elementPosition = reservationsSection.offsetTop - navHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="container-custom py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.h2
          className="text-4xl md:text-5xl font-quiverleaf font-bold text-primary mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {t('events.title')}
        </motion.h2>

        <motion.p
          className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {t('events.subtitle')}
        </motion.p>
      </div>

      {/* Event Types */}
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {eventTypes.map((event, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">{event.icon}</div>
                <div>
                  <h3 className="text-xl font-quiverleaf font-bold text-primary mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <button
            onClick={handleBookNow}
            className="btn-primary text-lg px-8 py-4 flex items-center space-x-2 mx-auto group"
          >
            <span>{t('events.bookNow')}</span>
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
