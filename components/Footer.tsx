'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from './LanguageProvider';
import { useTheme } from './ThemeProvider';
import { MapPin, Phone, Mail, Clock, Globe, Sun, Moon } from 'lucide-react';

export default function Footer() {
  const [mounted, setMounted] = useState(false);

  // Default values for SSR
  const [language, setLanguage] = useState('pt');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only use providers after mounting
  const languageContext = mounted ? useLanguage() : null;
  const themeContext = mounted ? useTheme() : null;

  const currentLanguage = mounted
    ? languageContext?.language || 'pt'
    : language;
  const currentTheme = mounted ? themeContext?.theme || 'light' : theme;
  const t = mounted
    ? languageContext?.t || ((key: string) => key)
    : (key: string) => key;
  const setLanguageFn = mounted
    ? languageContext?.setLanguage || setLanguage
    : setLanguage;
  const toggleThemeFn = mounted
    ? themeContext?.toggleTheme ||
      (() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light')))
    : () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const languages = [
    { code: 'pt', name: 'Português' },
    { code: 'nl', name: 'Nederlands' },
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Tagline */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              {/* Logo */}
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg lg:text-xl">
                  AM
                </span>
              </div>
              <h3 className="text-2xl font-quiverleaf font-bold text-gradient-gold">
                Amor Meco
              </h3>
            </div>
            <p className="text-gray-300 mb-6">{t('footer.tagline')}</p>
            <div className="flex space-x-4">
              <button
                onClick={toggleThemeFn}
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                title="Toggle theme"
              >
                {currentTheme === 'light' ? (
                  <Moon size={18} />
                ) : (
                  <Sun size={18} />
                )}
              </button>
              <div className="relative group">
                <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-1">
                  <Globe size={18} />
                  <span className="text-sm">
                    {languages.find((l) => l.code === currentLanguage)?.name}
                  </span>
                </button>
                <div className="absolute bottom-full left-0 mb-2 w-40 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguageFn(lang.code as any)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors duration-200 ${
                        currentLanguage === lang.code
                          ? 'text-gold font-medium'
                          : 'text-gray-300'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#menu"
                  className="text-gray-300 hover:text-gold transition-colors duration-200"
                >
                  Menu
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="text-gray-300 hover:text-gold transition-colors duration-200"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="#reservations"
                  className="text-gray-300 hover:text-gold transition-colors duration-200"
                >
                  Reservations
                </a>
              </li>
              <li>
                <a
                  href="#events"
                  className="text-gray-300 hover:text-gold transition-colors duration-200"
                >
                  Events
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-300 hover:text-gold transition-colors duration-200"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {t('footer.contactInfo')}
            </h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-primary mt-1" />
                <div>
                  <p className="text-gray-300 text-sm">
                    Rua das Flores, 123
                    <br />
                    1200-000 Lisbon, Portugal
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-primary" />
                <a
                  href="tel:+351XXXXXXX"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  +351 XXXXXXX
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-primary" />
                <a
                  href="mailto:info@amormeco.pt"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  info@amormeco.pt
                </a>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center">
              <Clock size={18} className="mr-2" />
              {t('footer.openingHours')}
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">{t('footer.monday')}</span>
                <span className="text-gray-400">{t('footer.closed')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">
                  {t('footer.tuesday')} - {t('footer.friday')}
                </span>
                <span className="text-gray-400">12:00 - 23:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">{t('footer.saturday')}</span>
                <span className="text-gray-400">12:00 - 23:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">{t('footer.sunday')}</span>
                <span className="text-gray-400">12:00 - 22:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              {t('footer.copyright').replace('{year}', currentYear.toString())}
            </div>
            <div className="flex space-x-6 text-sm">
              <a
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                {t('footer.privacy')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
