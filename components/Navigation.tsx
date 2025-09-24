'use client';

import { useState, useEffect, useCallback } from 'react';
import { Menu, X, Sun, Moon, Globe, Utensils, Phone } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from './LanguageProvider';

// Define Language type for type safety
type Language = 'pt' | 'nl' | 'en' | 'es' | 'fr' | 'de';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
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

  // Hash-based routing scroll listener
  useEffect(() => {
    if (!isHomePage) return;

    const sections = ['menu', 'reservations', 'events', 'gallery', 'about', 'reviews', 'contact'];
    
    const updateHashOnScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for navigation height
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
          const newHash = `#${section}`;
          if (window.location.hash !== newHash) {
            window.history.replaceState(null, '', newHash);
          }
          break;
        }
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateHashOnScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    return () => window.removeEventListener('scroll', throttledScrollHandler);
  }, [isHomePage]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.language-picker')) {
        setIsLanguageMenuOpen(false);
      }
    };

    if (isLanguageMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isLanguageMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.mobile-menu')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleNavigation = useCallback(
    (section: string) => {
      if (isHomePage) {
        // If we're on the home page, scroll to the section and update URL
        const element = document.getElementById(section);
        if (element) {
          const navHeight = 80;
          const elementPosition = element.offsetTop - navHeight;
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth',
          });
          // Update the URL hash
          window.history.pushState(null, '', `#${section}`);
        }
      } else {
        // If we're on another page, navigate to home page with hash
        router.push(`/#${section}`);
      }
      setIsOpen(false); // Close mobile menu
    },
    [isHomePage, router]
  );

  const getLanguageFlag = (lang: string) => {
    const flags = {
      pt: '🇵🇹',
      nl: '🇳🇱',
      en: '🇬🇧',
      es: '🇪🇸',
      fr: '🇫🇷',
      de: '🇩🇪',
    };
    return flags[lang as keyof typeof flags] || '🇵🇹';
  };

  // Language switching for hash-based routing (client-side only)
  const switchLanguage = (newLanguage: string) => {
    // Simply update the language state - no URL navigation needed
    setLanguage(newLanguage as Language)
    setIsLanguageMenuOpen(false) // Close the language menu
  }

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
            {/* Logo Image */}
            <img
              src="/images/logo-large.jpg"
              alt="Amor Meco Restaurant Logo - Restaurante de cozinha portuguesa em Aldeia do Meco, Setúbal"
              width="40"
              height="40"
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover"
            />
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
                  onClick={() => switchLanguage('pt')}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                    language === 'pt'
                      ? 'text-gold font-medium'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {languageMounted ? t('language.pt') : 'Português'}
                </button>
                <button
                  onClick={() => switchLanguage('nl')}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                    language === 'nl'
                      ? 'text-gold font-medium'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {languageMounted ? t('language.nl') : 'Nederlands'}
                </button>
                <button
                  onClick={() => switchLanguage('en')}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                    language === 'en'
                      ? 'text-gold font-medium'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {languageMounted ? t('language.en') : 'English'}
                </button>
                <button
                  onClick={() => switchLanguage('es')}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                    language === 'es'
                      ? 'text-gold font-medium'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {languageMounted ? t('language.es') : 'Español'}
                </button>
                <button
                  onClick={() => switchLanguage('fr')}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                    language === 'fr'
                      ? 'text-gold font-medium'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {languageMounted ? t('language.fr') : 'Français'}
                </button>
                <button
                  onClick={() => switchLanguage('de')}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                    language === 'de'
                      ? 'text-gold font-medium'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {languageMounted ? t('language.de') : 'Deutsch'}
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

          {/* Mobile Actions */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-gold dark:hover:text-gold transition-colors duration-200"
              title={t('nav.theme')}
            >
              {themeMounted && theme === 'light' ? (
                <Moon size={20} />
              ) : (
                <Sun size={20} />
              )}
            </button>

            {/* Mobile Language Picker */}
            <div className="relative language-picker">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-gold dark:hover:text-gold transition-colors duration-200"
                title={t('nav.language')}
              >
                <span className="text-lg">{getLanguageFlag(language)}</span>
              </button>

              {/* Language Dropdown */}
              {isLanguageMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-40 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => {
                      switchLanguage('pt');
                      setIsLanguageMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                      language === 'pt'
                        ? 'bg-gold/10 text-gold'
                        : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    <span className="text-lg">🇵🇹</span>
                    <span className="text-sm font-medium">Português</span>
                  </button>
                  <button
                    onClick={() => {
                      switchLanguage('nl');
                      setIsLanguageMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                      language === 'nl'
                        ? 'bg-gold/10 text-gold'
                        : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    <span className="text-lg">🇳🇱</span>
                    <span className="text-sm font-medium">Nederlands</span>
                  </button>
                  <button
                    onClick={() => {
                      switchLanguage('en');
                      setIsLanguageMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                      language === 'en'
                        ? 'bg-gold/10 text-gold'
                        : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    <span className="text-lg">🇬🇧</span>
                    <span className="text-sm font-medium">English</span>
                  </button>
                  <button
                    onClick={() => {
                      switchLanguage('es');
                      setIsLanguageMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                      language === 'es'
                        ? 'bg-gold/10 text-gold'
                        : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    <span className="text-lg">🇪🇸</span>
                    <span className="text-sm font-medium">Español</span>
                  </button>
                  <button
                    onClick={() => {
                      switchLanguage('fr');
                      setIsLanguageMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                      language === 'fr'
                        ? 'bg-gold/10 text-gold'
                        : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    <span className="text-lg">🇫🇷</span>
                    <span className="text-sm font-medium">Français</span>
                  </button>
                  <button
                    onClick={() => {
                      switchLanguage('de');
                      setIsLanguageMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                      language === 'de'
                        ? 'bg-gold/10 text-gold'
                        : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    <span className="text-lg">🇩🇪</span>
                    <span className="text-sm font-medium">Deutsch</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-gold dark:hover:text-gold transition-colors duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mobile-menu">
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
