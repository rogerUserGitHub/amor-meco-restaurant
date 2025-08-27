'use client';

import { useState, useEffect, useCallback } from 'react';
import { Menu, X, Sun, Moon, Globe, Utensils, Phone } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from './LanguageProvider';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // Use the custom theme hook
  const { theme, toggleTheme, mounted: themeMounted } = useTheme();

  // Use the custom language hook
  const { language, setLanguage, t, mounted: languageMounted } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = useCallback(
    (section: string) => {
      if (isHomePage) {
        // If we're on the home page, scroll to the section
        const element = document.getElementById(section);
        if (element) {
          const navHeight = 80;
          const elementPosition = element.offsetTop - navHeight;
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth',
          });
        }
      } else {
        // If we're on another page, navigate to home page with hash
        router.push(`/#${section}`);
      }
      setIsOpen(false); // Close mobile menu
    },
    [isHomePage, router]
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg'
          : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'
      }`}
    >
      <div className="container-custom px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            {/* Placeholder Logo */}
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg lg:text-xl">
                AM
              </span>
            </div>
            <a
              href="#"
              className="text-2xl lg:text-3xl font-quiverleaf text-gradient-gold font-bold"
            >
              Amor Meco
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => handleNavigation('menu')}
              className="text-gray-700 dark:text-gray-300 hover:text-gold dark:hover:text-gold transition-colors duration-200 font-medium"
            >
              {languageMounted ? t('nav.menu') : 'Menu'}
            </button>
            <button
              onClick={() => handleNavigation('reservations')}
              className="text-gray-700 dark:text-gray-300 hover:text-gold dark:hover:text-gold transition-colors duration-200 font-medium"
            >
              {languageMounted ? t('nav.reservations') : 'Reservas'}
            </button>
            <button
              onClick={() => handleNavigation('events')}
              className="text-gray-700 dark:text-gray-300 hover:text-gold dark:hover:text-gold transition-colors duration-200 font-medium"
            >
              {languageMounted ? t('nav.events') : 'Eventos'}
            </button>
            <button
              onClick={() => handleNavigation('gallery')}
              className="text-gray-700 dark:text-gray-300 hover:text-gold dark:hover:text-gold transition-colors duration-200 font-medium"
            >
              {languageMounted ? t('nav.gallery') : 'Galeria'}
            </button>
            <button
              onClick={() => handleNavigation('about')}
              className="text-gray-700 dark:text-gray-300 hover:text-gold dark:hover:text-gold transition-colors duration-200 font-medium"
            >
              {languageMounted ? t('nav.about') : 'Sobre'}
            </button>
            <button
              onClick={() => handleNavigation('contact')}
              className="text-gray-700 dark:text-gray-300 hover:text-gold dark:hover:text-gold transition-colors duration-200 font-medium"
            >
              {languageMounted ? t('nav.contact') : 'Contacto'}
            </button>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-gold dark:hover:text-gold transition-colors duration-200">
                <Globe size={18} />
                <span className="text-sm font-medium">
                  {languageMounted ? t(`language.${language}`) : 'Português'}
                </span>
              </button>
              <div className="absolute top-full right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <button
                  onClick={() => setLanguage('pt')}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                    language === 'pt'
                      ? 'text-gold font-medium'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {languageMounted ? t('language.pt') : 'Português'}
                </button>
                <button
                  onClick={() => setLanguage('nl')}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                    language === 'nl'
                      ? 'text-gold font-medium'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {languageMounted ? t('language.nl') : 'Nederlands'}
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                    language === 'en'
                      ? 'text-gold font-medium'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {languageMounted ? t('language.en') : 'English'}
                </button>
                <button
                  onClick={() => setLanguage('es')}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                    language === 'es'
                      ? 'text-gold font-medium'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {languageMounted ? t('language.es') : 'Español'}
                </button>
              </div>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-gold dark:hover:text-gold transition-colors duration-200"
            >
              {themeMounted && theme === 'light' ? (
                <Moon size={18} />
              ) : (
                <Sun size={18} />
              )}
            </button>

            {/* Reservations Button */}
            <button
              onClick={() => handleNavigation('reservations')}
              className="btn-reservations flex items-center space-x-2"
            >
              <Utensils size={16} />
              <span>{t('nav.reservations')}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-gold dark:hover:text-gold transition-colors duration-200"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="px-4 py-6 space-y-4">
              <button
                onClick={() => handleNavigation('menu')}
                className="block text-gray-700 dark:text-gray-300 hover:text-gold dark:hover:text-gold transition-colors duration-200 font-medium w-full text-left"
              >
                {languageMounted ? t('nav.menu') : 'Menu'}
              </button>
              <button
                onClick={() => handleNavigation('reservations')}
                className="block text-gray-700 dark:text-gray-300 hover:text-gold dark:hover:text-gold transition-colors duration-200 font-medium w-full text-left"
              >
                {languageMounted ? t('nav.reservations') : 'Reservas'}
              </button>
              <button
                onClick={() => handleNavigation('events')}
                className="block text-gray-700 dark:text-gray-300 hover:text-gold dark:hover:text-gold transition-colors duration-200 font-medium w-full text-left"
              >
                {languageMounted ? t('nav.events') : 'Eventos'}
              </button>
              <button
                onClick={() => handleNavigation('gallery')}
                className="block text-gray-700 dark:text-gray-300 hover:text-gold dark:hover:text-gold transition-colors duration-200 font-medium w-full text-left"
              >
                {languageMounted ? t('nav.gallery') : 'Galeria'}
              </button>
              <button
                onClick={() => handleNavigation('about')}
                className="block text-gray-700 dark:text-gray-300 hover:text-gold dark:hover:text-gold transition-colors duration-200 font-medium w-full text-left"
              >
                {languageMounted ? t('nav.about') : 'Sobre'}
              </button>
              <button
                onClick={() => handleNavigation('contact')}
                className="block text-gray-700 dark:text-gray-300 hover:text-gold dark:hover:text-gold transition-colors duration-200 font-medium w-full text-left"
              >
                {languageMounted ? t('nav.contact') : 'Contacto'}
              </button>

              {/* Mobile Actions */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
                {/* Language Switcher */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {t('nav.language')}:
                  </span>
                  <select
                    value={language}
                    onChange={(e) =>
                      setLanguage(e.target.value as 'pt' | 'nl' | 'en' | 'es')
                    }
                    className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    <option value="pt">Português</option>
                    <option value="nl">Nederlands</option>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                  </select>
                </div>

                {/* Theme Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {t('nav.theme')}:
                  </span>
                  <button
                    onClick={toggleTheme}
                    className="p-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-200"
                  >
                    {themeMounted && theme === 'light' ? (
                      <Moon size={18} />
                    ) : (
                      <Sun size={18} />
                    )}
                  </button>
                </div>

                {/* Reservations Button */}
                <button
                  onClick={() => handleNavigation('reservations')}
                  className="btn-primary w-full flex items-center justify-center space-x-2"
                >
                  <Utensils size={16} />
                  <span>{t('nav.reservations')}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
