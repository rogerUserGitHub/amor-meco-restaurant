'use client';

import { useLanguage } from '../../components/LanguageProvider';
import { motion } from 'framer-motion';
import {
  Shield,
  Eye,
  Cookie,
  Users,
  Lock,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

export default function PrivacyPage() {
  const { t } = useLanguage();

  const currentYear = new Date().getFullYear();

  return (
    <div className="container-custom py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Shield size={32} className="text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-quiverleaf font-bold text-primary mb-4">
            {t('privacy.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('privacy.subtitle')}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            {t('privacy.lastUpdated')}: {currentYear}
          </p>
        </div>

        {/* Policy Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Who We Are */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Users size={24} className="text-primary" />
              <h2 className="text-2xl font-quiverleaf font-bold text-primary">
                1. {t('privacy.whoWeAre')}
              </h2>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('privacy.whoWeAreContent')}
              </p>
            </div>
          </motion.section>

          {/* Data Collection */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Eye size={24} className="text-primary" />
              <h2 className="text-2xl font-quiverleaf font-bold text-primary">
                2. {t('privacy.dataCollection')}
              </h2>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {t('privacy.dataCollectionIntro')}
              </p>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>{t('privacy.contactDetails')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>{t('privacy.usageData')}</span>
                </li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mt-4 font-medium">
                {t('privacy.noDataSale')}
              </p>
            </div>
          </motion.section>

          {/* Data Usage */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Lock size={24} className="text-primary" />
              <h2 className="text-2xl font-quiverleaf font-bold text-primary">
                3. {t('privacy.dataUsage')}
              </h2>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {t('privacy.dataUsageIntro')}
              </p>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>{t('privacy.handleReservations')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>{t('privacy.sendConfirmations')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>{t('privacy.legalCompliance')}</span>
                </li>
              </ul>
            </div>
          </motion.section>

          {/* Cookies */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Cookie size={24} className="text-primary" />
              <h2 className="text-2xl font-quiverleaf font-bold text-primary">
                4. {t('privacy.cookies')}
              </h2>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {t('privacy.cookiesIntro')}
              </p>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>{t('privacy.essentialCookies')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>{t('privacy.preferenceCookies')}</span>
                </li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mt-4">
                {t('privacy.cookieManagement')}
              </p>
            </div>
          </motion.section>

          {/* Data Sharing */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-quiverleaf font-bold text-primary mb-4">
              5. {t('privacy.dataSharing')}
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {t('privacy.dataSharingIntro')}
              </p>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>{t('privacy.reservationSystem')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>{t('privacy.analyticsTools')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>{t('privacy.hostingProviders')}</span>
                </li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mt-4">
                {t('privacy.gdprCompliance')}
              </p>
            </div>
          </motion.section>

          {/* Your Rights */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-quiverleaf font-bold text-primary mb-4">
              6. {t('privacy.yourRights')}
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {t('privacy.yourRightsIntro')}
              </p>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>{t('privacy.accessData')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>{t('privacy.correctData')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>{t('privacy.deleteData')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>{t('privacy.restrictProcessing')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span>{t('privacy.withdrawConsent')}</span>
                </li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mt-4">
                {t('privacy.contactForRights')}
              </p>
            </div>
          </motion.section>

          {/* Data Retention */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-quiverleaf font-bold text-primary mb-4">
              7. {t('privacy.dataRetention')}
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300">
                {t('privacy.dataRetentionContent')}
              </p>
            </div>
          </motion.section>

          {/* Contact */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 border border-primary/20"
          >
            <h2 className="text-2xl font-quiverleaf font-bold text-primary mb-6">
              8. {t('privacy.contact')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {t('privacy.contactIntro')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <MapPin size={20} className="text-primary" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Amor Meco Restaurant
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    R. Praia Moinho de Baixo 1, 2970-074, Portugal
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-primary" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {t('privacy.phone')}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    +XXXXXXXXX
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-primary" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {t('privacy.email')}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    info@amormeco.pt
                  </p>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </motion.div>
    </div>
  );
}
