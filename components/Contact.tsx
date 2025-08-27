'use client';

import { useLanguage } from './LanguageProvider';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Instagram,
  Facebook,
} from 'lucide-react';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { createContactFormSchema, ContactFormData } from '../lib/validations';
import { extractValidationErrors, FormErrors } from '../lib/validationUtils';
import toast from 'react-hot-toast';

export default function Contact() {
  const { t } = useLanguage();

  // Create validation schema with translated messages
  const contactFormSchema = createContactFormSchema(t);

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationTimeout, setValidationTimeout] =
    useState<NodeJS.Timeout | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (validationTimeout) {
        clearTimeout(validationTimeout);
      }
    };
  }, [validationTimeout]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Additional security: Sanitize and validate input before processing
      const sanitizedData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone?.trim() || '',
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      };

      // Validate form data with enhanced security
      const validatedData = await contactFormSchema.validate(sanitizedData, {
        abortEarly: false,
        strict: true,
      });

      // Additional security checks
      if (validatedData.message.length > 1000) {
        throw new Error('Message is too long');
      }

      // Dynamically import Supabase function to avoid SSR issues
      const { submitContactForm } = await import('../lib/supabase');

      // Submit to Supabase Edge Function
      const result = await submitContactForm({
        ...validatedData,
      });

      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });

      // Show success toast
      toast.success(
        t('contact.successMessage') || 'Message sent successfully!'
      );
    } catch (error: any) {
      // Check if it's a validation error
      if (error?.name === 'ValidationError' || error?.errors) {
        const newErrors = extractValidationErrors(error);
        setErrors(newErrors);
        toast.error(
          t('contact.errorMessage') || 'Please check the form and try again.'
        );
      } else {
        // Handle submission errors
        console.error('Form submission error:', error);
        toast.error(
          t('contact.submissionError') ||
            'Failed to send message. Please try again later.'
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;
      const newFormData = {
        ...formData,
        [name]: value,
      };

      setFormData(newFormData);

      // Clear previous timeout
      if (validationTimeout) {
        clearTimeout(validationTimeout);
      }

      // Set new timeout for validation (debounced)
      const timeout = setTimeout(async () => {
        try {
          // Skip validation for empty phone field
          if (name === 'phone' && (!value || value.trim() === '')) {
            setErrors((prev) => ({
              ...prev,
              [name]: '',
            }));
            return;
          }

          // Validate only the current field
          await contactFormSchema.validateAt(name, newFormData);

          // Clear error if validation passes
          setErrors((prev) => ({
            ...prev,
            [name]: '',
          }));
        } catch (validationError) {
          // Set error for the current field
          if (validationError instanceof Error) {
            setErrors((prev) => ({
              ...prev,
              [name]: validationError.message,
            }));
          }
        }
      }, 500); // Increased delay to 500ms for better performance

      setValidationTimeout(timeout);
    },
    [formData, validationTimeout, contactFormSchema]
  );

  const openingHours = useMemo(
    () => [
      { day: 'Monday', hours: 'Closed' },
      { day: 'Tuesday - Friday', hours: '12:00 - 15:00, 18:00 - 23:00' },
      { day: 'Saturday', hours: '12:00 - 15:00, 18:00 - 23:00' },
      { day: 'Sunday', hours: '12:00 - 15:00, 18:00 - 22:00' },
    ],
    []
  );

  // Google Maps embed URL for the actual address
  const googleMapsUrl = useMemo(
    () =>
      'https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=R.+Praia+Moinho+de+Baixo+1,+2970-074,+Portugal',
    []
  );

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
          {t('contact.title')}
        </motion.h2>

        <motion.p
          className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {t('contact.subtitle')}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 className="text-2xl font-quiverleaf font-bold text-primary mb-6">
              {t('contact.sendUsMessage')}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('contact.name')}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  maxLength={50}
                  pattern="[a-zA-ZÀ-ÿ\s\-']+"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                    errors.name
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder={t('contact.namePlaceholder')}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('contact.email')}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  maxLength={254}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                    errors.email
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder={t('contact.emailPlaceholder')}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('contact.phone')}{' '}
                  <span className="text-gray-500 text-xs">
                    ({t('contact.optional')})
                  </span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={25}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                    errors.phone
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder={t('contact.phonePlaceholder')}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('contact.subject')}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  maxLength={100}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                    errors.subject
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder={t('contact.subjectPlaceholder')}
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('contact.message')}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  maxLength={1000}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none ${
                    errors.message
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder={t('contact.messagePlaceholder')}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn-primary w-full flex items-center justify-center space-x-2 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Send size={18} />
                <span>
                  {isSubmitting
                    ? t('contact.sending')
                    : t('contact.sendMessage')}
                </span>
              </button>
            </form>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col h-full"
        >
          {/* Contact Details */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 flex-1">
            <h3 className="text-2xl font-quiverleaf font-bold text-primary mb-6">
              {t('contact.getInTouch')}
            </h3>

            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <MapPin className="text-primary mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {t('contact.address')}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    R. Praia Moinho de Baixo 1
                    <br />
                    2970-074, Portugal
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="text-primary mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {t('contact.phone')}
                  </h4>
                  <a
                    href="tel:+351XXXXXXX"
                    className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-200"
                  >
                    +351 XXXXXXX
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="text-primary mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {t('contact.email')}
                  </h4>
                  <a
                    href="mailto:info@amormeco.pt"
                    className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-200"
                  >
                    info@amormeco.pt
                  </a>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2 mb-4">
                  <Clock className="text-primary" size={20} />
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {t('contact.openingHours')}
                  </h4>
                </div>
                <div className="space-y-2">
                  {openingHours.map((schedule, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="font-medium text-gray-900 dark:text-white">
                        {schedule.day}
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-2">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
              {t('contact.followUs')}
            </h4>
            <ul className="social-wrapper">
              <li className="icon facebook">
                <span className="tooltip">{t('contact.facebook')}</span>
                <a
                  href="https://facebook.com/amormeco"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    viewBox="0 0 320 512"
                    height="1.2em"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                  </svg>
                </a>
              </li>
              <li className="icon instagram">
                <span className="tooltip">{t('contact.instagram')}</span>
                <a
                  href="https://instagram.com/amormeco"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1.2em"
                    fill="currentColor"
                    className="bi bi-instagram"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Google Maps */}
      <motion.div
        className="mt-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-quiverleaf font-bold text-primary mb-6">
            {t('contact.findUs')}
          </h3>
          <div className="relative h-96 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3110.1234567890123!2d-9.123456789012345!3d38.12345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1e123456789012%3A0x1234567890123456!2sR.%20Praia%20Moinho%20de%20Baixo%201%2C%202970-074%20Portugal!5e0!3m2!1sen!2spt!4v1234567890123"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Amor Meco Restaurant Location"
            ></iframe>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
