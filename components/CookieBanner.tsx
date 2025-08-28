'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from './LanguageProvider';
import {
  useCookiePreferences,
  type CookiePreferences,
} from '../hooks/useCookiePreferences';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Settings, Check } from 'lucide-react';

export default function CookieBanner() {
  const { t } = useLanguage();
  const { preferences, isLoaded, updatePreferences } = useCookiePreferences();
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [localPreferences, setLocalPreferences] =
    useState<CookiePreferences | null>(null);

  useEffect(() => {
    if (isLoaded) {
      const hasConsent = localStorage.getItem('cookieConsent');
      if (!hasConsent) {
        setIsVisible(true);
      }
    }
  }, [isLoaded]);

  useEffect(() => {
    if (preferences) {
      setLocalPreferences(preferences);
    }
  }, [preferences]);

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      preferences: true,
    };
    updatePreferences(allAccepted);
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const onlyEssential = {
      essential: true,
      analytics: false,
      preferences: false,
    };
    updatePreferences(onlyEssential);
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    if (localPreferences) {
      updatePreferences(localPreferences);
      setIsVisible(false);
      setShowSettings(false);
    }
  };

  const handlePreferenceChange = (type: 'analytics' | 'preferences') => {
    if (!localPreferences) return;

    setLocalPreferences((prev: CookiePreferences | null) => ({
      ...prev!,
      [type]: !prev![type],
    }));
  };

  if (!isLoaded || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg"
      >
        <div className="container-custom py-4">
          {!showSettings ? (
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <Cookie className="text-primary mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {t('cookies.title')}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {t('cookies.description')}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <button
                  onClick={() => setShowSettings(true)}
                  className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <Settings size={16} />
                  {t('cookies.settings')}
                </button>
                <button
                  onClick={handleRejectAll}
                  className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <X size={16} />
                  {t('cookies.reject')}
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-light transition-colors"
                >
                  <Check size={16} />
                  {t('cookies.accept')}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {t('cookies.settingsTitle')}
                </h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {t('cookies.essential.title')}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {t('cookies.essential.description')}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={localPreferences?.essential}
                      disabled
                      className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
                    />
                    <span className="ml-2 text-xs text-gray-500">
                      {t('cookies.always')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {t('cookies.analytics.title')}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {t('cookies.analytics.description')}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={localPreferences?.analytics}
                    onChange={() => handlePreferenceChange('analytics')}
                    className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {t('cookies.preferences.title')}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {t('cookies.preferences.description')}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={localPreferences?.preferences}
                    onChange={() => handlePreferenceChange('preferences')}
                    className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {t('cookies.cancel')}
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-light transition-colors"
                >
                  {t('cookies.save')}
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
