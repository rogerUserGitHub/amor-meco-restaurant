'use client';

import { useLanguage } from './LanguageProvider';
import { motion } from 'framer-motion';
import { Download, Globe, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Menu() {
  const { t } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState('pt'); // Portuguese as default
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const languages = [
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  ];

  const handleDownloadMenu = (lang: string) => {
    // Placeholder PDF URLs for each language
    const pdfUrls = {
      pt: '/pdfs/menu-portugues.pdf',
      nl: '/pdfs/menu-nederlands.pdf',
      en: '/pdfs/menu-english.pdf',
      es: '/pdfs/menu-espanol.pdf',
      fr: '/pdfs/menu-francais.pdf',
      de: '/pdfs/menu-deutsch.pdf',
    };

    const url = pdfUrls[lang as keyof typeof pdfUrls] || pdfUrls.pt;
    window.open(url, '_blank');
  };

  const selectedLang = languages.find((lang) => lang.code === selectedLanguage);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.pdf-menu-dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isDropdownOpen]);

  return (
    <div className="container-custom">
      <div className="text-center mb-16">
        <motion.h2
          className="text-4xl md:text-5xl font-quiverleaf font-bold text-primary mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {t('menu.title')}
        </motion.h2>

        <motion.p
          className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {t('menu.subtitle')}
        </motion.p>
      </div>

      {/* Cuisine Description Card */}
      <motion.div
        className="max-w-4xl mx-auto mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <div className="card overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Placeholder Image */}
            <div className="relative h-64 lg:h-full overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🍽️</div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">
                    {t('menu.photoPlaceholder')}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                    {t('menu.portugueseCuisine')}
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <h3 className="text-2xl lg:text-3xl font-quiverleaf font-bold text-gradient-gold mb-4">
                {t('menu.authenticCuisine')}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                {t('menu.description')}
              </p>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-200 font-medium">
                    {t('menu.freshSeafood')}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-200 font-medium">
                    {t('menu.traditionalMeat')}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-200 font-medium">
                    {t('menu.homemadeIceCream')}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-200 font-medium">
                    {t('menu.portugueseWines')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Language Selection and Download Buttons */}
      <motion.div
        id="menu-download"
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Colored Container */}
        <div className="bg-gradient-to-r from-gold/10 to-gold-dark/10 border border-gold/20 rounded-xl p-2 max-w-4xl mx-auto">
          {/* Download Icon */}
          <div className="flex justify-center mb-2">
            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
              <Download size={32} className="text-gold" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            {t('menu.download')}
          </h3>

          {/* Buttons Container */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Language Dropdown */}
            <div className="relative pdf-menu-dropdown">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-3 px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:border-gold dark:hover:border-gold transition-all duration-200 min-w-[200px] shadow-sm"
              >
                <span className="text-xl">{selectedLang?.flag}</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {selectedLang?.name}
                </span>
                <ChevronDown
                  size={20}
                  className={`text-gray-500 transition-transform duration-200 ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLanguage(lang.code);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-6 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                        selectedLanguage === lang.code
                          ? 'bg-gold/10 text-gold'
                          : 'text-gray-900 dark:text-white'
                      }`}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Download Button */}
            <button
              onClick={() => handleDownloadMenu(selectedLanguage)}
              className="btn-primary text-lg px-8 py-3 flex items-center space-x-2 group shadow-sm"
            >
              <Download size={20} className="group-hover:animate-bounce" />
              <span>{t('menu.downloadPdf')}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
