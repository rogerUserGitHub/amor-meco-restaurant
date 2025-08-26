'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from './LanguageProvider';
import { useTheme } from './ThemeProvider';
import { Menu, X, Sun, Moon, Globe, Utensils, Phone } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRouter, usePathname } from 'next/navigation';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === '/';

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

  const navItems = [
    { section: 'menu', label: t('nav.menu') },
    { section: 'gallery', label: t('nav.gallery') },
    { section: 'events', label: t('nav.events') },
    { section: 'reservations', label: t('nav.reservations') },
    { section: 'about', label: t('nav.about') },
    { section: 'contact', label: t('nav.contact') },
  ];

  const languages = [
    { code: 'pt', name: 'Português' },
    { code: 'nl', name: 'Nederlands' },
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
  ];

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
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => handleNavigation(item.section)}
                className="text-gray-700 dark:text-gray-300 hover:text-gold dark:hover:text-gold transition-colors duration-200 font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-gold dark:hover:text-gold transition-colors duration-200">
                <Globe size={18} />
                <span className="text-sm font-medium">
                  {languages.find((l) => l.code === currentLanguage)?.name}
                </span>
              </button>
              <div className="absolute top-full right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguageFn(lang.code as any)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                      currentLanguage === lang.code
                        ? 'text-gold font-medium'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleThemeFn}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-gold dark:hover:text-gold transition-colors duration-200"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
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
              {navItems.map((item) => (
                <button
                  key={item.section}
                  onClick={() => handleNavigation(item.section)}
                  className="block text-gray-700 dark:text-gray-300 hover:text-gold dark:hover:text-gold transition-colors duration-200 font-medium w-full text-left"
                >
                  {item.label}
                </button>
              ))}

              {/* Mobile Actions */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
                {/* Language Switcher */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Language:
                  </span>
                  <select
                    value={currentLanguage}
                    onChange={(e) => setLanguageFn(e.target.value as any)}
                    className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Theme Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Theme:
                  </span>
                  <button
                    onClick={toggleThemeFn}
                    className="p-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-200"
                  >
                    {currentTheme === 'light' ? (
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
