'use client';

import { useLanguage } from './LanguageProvider';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';

export default function Hero() {
  const { t } = useLanguage();

  const scrollToMenu = () => {
    const menuDownloadSection = document.getElementById('menu-download');
    if (menuDownloadSection) {
      const navHeight = 80; // Approximate height of the navigation bar
      const elementPosition = menuDownloadSection.offsetTop - navHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat parallax"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-quiverleaf font-bold mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gold">
            {t('hero.subtitle')}
          </p>
          <p className="text-lg md:text-xl mb-12 text-gray-200 max-w-2xl mx-auto">
            {t('hero.description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center space-x-2"
              onClick={() => {
                const element = document.getElementById('reservations');
                if (element) {
                  const navHeight = 80;
                  const elementPosition = element.offsetTop - navHeight;
                  window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth',
                  });
                }
              }}
            >
              <span>{t('hero.reserve')}</span>
              <ArrowRight size={20} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary text-white border-white hover:bg-white hover:text-gray-900 flex items-center space-x-2"
              onClick={scrollToMenu}
            >
              <span>{t('hero.viewMenu')}</span>
              <ChevronDown size={20} />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown size={24} className="text-white" />
      </motion.div>
    </section>
  );
}
