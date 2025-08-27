import { useState, useEffect, useCallback } from 'react';

type Language = 'pt' | 'nl' | 'en' | 'es';

// Translation data
const translations = {
  pt: {
    'nav.menu': 'Menu',
    'nav.gallery': 'Galeria',
    'nav.reservations': 'Reservas',
    'nav.events': 'Eventos',
    'nav.contact': 'Contacto',
    'nav.about': 'Sobre',
    'language.pt': 'Português',
    'language.nl': 'Nederlands',
    'language.en': 'English',
    'language.es': 'Español',
  },
  nl: {
    'nav.menu': 'Menu',
    'nav.gallery': 'Galerij',
    'nav.reservations': 'Reserveringen',
    'nav.events': 'Evenementen',
    'nav.contact': 'Contact',
    'nav.about': 'Over Ons',
    'language.pt': 'Português',
    'language.nl': 'Nederlands',
    'language.en': 'English',
    'language.es': 'Español',
  },
  en: {
    'nav.menu': 'Menu',
    'nav.gallery': 'Gallery',
    'nav.reservations': 'Reservations',
    'nav.events': 'Events',
    'nav.contact': 'Contact',
    'nav.about': 'About',
    'language.pt': 'Português',
    'language.nl': 'Nederlands',
    'language.en': 'English',
    'language.es': 'Español',
  },
  es: {
    'nav.menu': 'Menú',
    'nav.gallery': 'Galería',
    'nav.reservations': 'Reservas',
    'nav.events': 'Eventos',
    'nav.contact': 'Contacto',
    'nav.about': 'Sobre Nosotros',
    'language.pt': 'Português',
    'language.nl': 'Nederlands',
    'language.en': 'English',
    'language.es': 'Español',
  },
};

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>('pt');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get language from localStorage or default to 'pt'
    const savedLanguage = localStorage.getItem('language') || 'pt';
    setLanguageState(savedLanguage as Language);
  }, []);

  useEffect(() => {
    if (mounted) {
      // Save to localStorage
      localStorage.setItem('language', language);
    }
  }, [language, mounted]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const t = useCallback(
    (key: string): string => {
      const currentTranslations = translations[language];
      if (!currentTranslations) {
        console.warn(`No translations found for language: ${language}`);
        return key;
      }

      const translation = (currentTranslations as Record<string, string>)[key];
      if (!translation) {
        console.warn(
          `Translation key not found: ${key} for language: ${language}`
        );
        return key;
      }

      return translation;
    },
    [language]
  );

  return { language, setLanguage, t, mounted };
}
