'use client';

import { useLanguage } from './LanguageProvider';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Phone, Mail } from 'lucide-react';

export default function Reservations() {
  const { t } = useLanguage();

  return (
    <div className="container-custom">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column - Image & Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative mb-8">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Área de jantar do restaurante Amor Meco em Aldeia do Meco"
              className="w-full h-96 object-cover rounded-2xl"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-quiverleaf font-bold text-primary mb-6">
            {t('reservations.title')}
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {t('reservations.subtitle')}
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Calendar className="mr-3 text-primary" size={20} />
              <span>{t('reservations.available')}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Clock className="mr-3 text-primary" size={20} />
              <span>{t('reservations.hours')}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Users className="mr-3 text-primary" size={20} />
              <span>{t('reservations.groups')}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:+351XXXXXXX"
              className="flex items-center justify-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-light transition-colors duration-200"
            >
              <Phone size={18} />
              <span>{t('reservations.callToReserve')}</span>
            </a>
            <a
              href="mailto:reservations@amormeco.pt"
              className="flex items-center justify-center space-x-2 border-2 border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors duration-200"
            >
              <Mail size={18} />
              <span>{t('reservations.emailUs')}</span>
            </a>
          </div>
        </motion.div>

        {/* Right Column - Booking Widget */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-quiverleaf font-bold text-primary mb-6 text-center">
              {t('reservations.bookYourTable')}
            </h3>

            {/* GuestPlan Widget Placeholder */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('reservations.date')}
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('reservations.time')}
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option>12:00</option>
                    <option>12:30</option>
                    <option>13:00</option>
                    <option>13:30</option>
                    <option>14:00</option>
                    <option>14:30</option>
                    <option>18:00</option>
                    <option>18:30</option>
                    <option>19:00</option>
                    <option>19:30</option>
                    <option>20:00</option>
                    <option>20:30</option>
                    <option>21:00</option>
                    <option>21:30</option>
                    <option>22:00</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('reservations.guests')}
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num}>
                        {num}{' '}
                        {num === 1
                          ? t('reservations.guest')
                          : t('reservations.guests')}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('reservations.specialRequests')}
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option>{t('reservations.none')}</option>
                    <option>{t('reservations.windowSeat')}</option>
                    <option>{t('reservations.quietArea')}</option>
                    <option>{t('reservations.highChair')}</option>
                    <option>{t('reservations.wheelchairAccessible')}</option>
                    <option>{t('reservations.anniversary')}</option>
                    <option>{t('reservations.birthday')}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('reservations.name')}
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder={t('reservations.namePlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('reservations.email')}
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder={t('reservations.emailPlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('reservations.phone')}
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder={t('reservations.phonePlaceholder')}
                />
              </div>

              <button className="w-full btn-primary text-lg py-4">
                {t('reservations.confirmReservation')}
              </button>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
              <p>{t('reservations.heldFor')}</p>
              <p>{t('reservations.cancellations')}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
