'use client';

import { useState } from 'react';
import { useLanguage } from './LanguageProvider';
import { useCookiePreferences } from '../hooks/useCookiePreferences';
import { motion } from 'framer-motion';
import { Cookie, Settings, Check, X } from 'lucide-react';

export default function CookieSettings() {
  const { t } = useLanguage();
  const { preferences, updatePreferences } = useCookiePreferences();
  const [showSettings, setShowSettings] = useState(false);
  const [localPreferences, setLocalPreferences] = useState(preferences);

  const handlePreferenceChange = (type: keyof typeof preferences) => {
    if (!localPreferences) return;
    if (type === 'essential') return; // Essential cannot be disabled

    setLocalPreferences((prev) => ({
      ...prev!,
      [type]: !prev![type],
    }));
  };

  const handleSave = () => {
    if (localPreferences) {
      updatePreferences(localPreferences);
      setShowSettings(false);
    }
  };

  const handleReset = () => {
    setLocalPreferences(preferences);
  };

  if (!preferences) return null;

  return (
    <>
      {/* Settings Button */}
      <button
        onClick={() => setShowSettings(true)}
        className="fixed bottom-4 right-4 z-40 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        title={t('cookies.settings')}
      >
        <Settings size={20} className="text-primary" />
      </button>

      {/* Settings Modal */}
      {showSettings && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
          onClick={() => setShowSettings(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Cookie className="text-primary" size={24} />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {t('cookies.settingsTitle')}
                  </h2>
                </div>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                {/* Essential Cookies */}
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {t('cookies.essential.title')}
                    </h3>
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

                {/* Analytics Cookies */}
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {t('cookies.analytics.title')}
                    </h3>
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

                {/* Preference Cookies */}
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {t('cookies.preferences.title')}
                    </h3>
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

              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {t('cookies.cancel')}
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-light transition-colors"
                >
                  {t('cookies.save')}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
