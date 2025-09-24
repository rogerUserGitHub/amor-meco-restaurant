'use client';

import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Globe, Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from './LanguageProvider';

export default function Footer() {
  const [mounted, setMounted] = useState(false);

  // Use the custom theme hook
  const { theme, toggleTheme, mounted: themeMounted } = useTheme();

  // Use the custom language hook
  const { language, setLanguage, t, mounted: languageMounted } = useLanguage();

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    setMounted(true);
  }, []);

  const languages = [
    { code: 'pt', name: 'Português' },
    { code: 'nl', name: 'Nederlands' },
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Logo & Tagline */}
          <div className="lg:col-span-3">
            <div className="flex items-center space-x-3 mb-4">
              {/* Logo */}
              <img
                src="/images/logo-large.jpg"
                alt="Amor Meco Restaurant Logo - Restaurante de cozinha portuguesa autêntica em Aldeia do Meco, Setúbal"
                width="60"
                height="60"
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover"
              />
              <h3 className="text-2xl font-quiverleaf font-bold text-gradient-gold">
                Amor Meco
              </h3>
            </div>
            <p className="text-gray-300 mb-6">{t('footer.tagline')}</p>
            <div className="flex space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                title="Toggle theme"
              >
                {themeMounted && theme === 'light' ? (
                  <Moon size={18} />
                ) : (
                  <Sun size={18} />
                )}
              </button>
              <div className="relative group">
                <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-1">
                  <Globe size={18} />
                  <span className="text-sm">
                    {languages.find((l) => l.code === language)?.name}
                  </span>
                </button>
                <div className="absolute bottom-full left-0 mb-2 w-40 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() =>
                        setLanguage(
                          lang.code as 'pt' | 'nl' | 'en' | 'es' | 'fr' | 'de'
                        )
                      }
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors duration-200 ${
                        language === lang.code
                          ? 'text-gold font-medium'
                          : 'text-gray-300'
                      }`}
                    >
                      {languageMounted ? t(`language.${lang.code}`) : lang.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-semibold mb-4 text-gold">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#menu"
                  className="text-gray-300 hover:text-gold transition-colors duration-200"
                >
                  {t('nav.menu')}
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="text-gray-300 hover:text-gold transition-colors duration-200"
                >
                  {t('nav.gallery')}
                </a>
              </li>
              <li>
                <a
                  href="#events"
                  className="text-gray-300 hover:text-gold transition-colors duration-200"
                >
                  {t('nav.events')}
                </a>
              </li>
              <li>
                <a
                  href="#reservations"
                  className="text-gray-300 hover:text-gold transition-colors duration-200"
                >
                  {t('nav.reservations')}
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-300 hover:text-gold transition-colors duration-200"
                >
                  {t('nav.about')}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-300 hover:text-gold transition-colors duration-200"
                >
                  {t('nav.contact')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="text-lg font-semibold mb-4 text-gold">
              {t('footer.contactInfo')}
            </h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">
                    R. Praia Moinho de Baixo 1, 2970-074 Portugal
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-gold flex-shrink-0" />
                <a
                  href="tel:+351123456789"
                  className="text-gray-300 hover:text-gold transition-colors duration-200 text-sm"
                >
                  +351 123 456 789
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-gold flex-shrink-0" />
                <a
                  href="mailto:info@amormeco.pt"
                  className="text-gray-300 hover:text-gold transition-colors duration-200 text-sm"
                >
                  info@amormeco.pt
                </a>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="lg:col-span-4">
            <h4 className="text-lg font-semibold mb-4 text-gold">
              {t('footer.openingHours')}
            </h4>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <span className="text-gray-300 text-sm mb-1 sm:mb-0">
                  {t('footer.monday')} - {t('footer.tuesday')}
                </span>
                <span className="text-gray-300 text-sm">
                  {t('footer.closed')}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <span className="text-gray-300 text-sm mb-1 sm:mb-0">
                  {t('footer.wednesday')} - {t('footer.saturday')}
                </span>
                <span className="text-gray-300 text-sm">12:00 - 15:00, 18:00 - 23:00</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <span className="text-gray-300 text-sm mb-1 sm:mb-0">
                  {t('footer.sunday')}
                </span>
                <span className="text-gray-300 text-sm">12:00 - 15:00, 18:00 - 22:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 px-20">
            <p className="text-gray-400 text-sm">
              {t('footer.copyright').replace('{year}', currentYear.toString())}
            </p>
            <div className="flex flex-col items-end space-y-2">
              <a
                href="/privacy"
                className="text-gray-400 hover:text-gold transition-colors duration-200 text-sm"
              >
                {t('footer.privacy')}
              </a>
              <span className="text-gray-500 text-xs">
                designed by{' '}
                <a
                  href="https://dirkx.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gold transition-colors duration-200"
                >
                  @rogerdirkx
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
