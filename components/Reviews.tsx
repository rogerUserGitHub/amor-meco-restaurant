'use client';

import { useLanguage } from './LanguageProvider';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Maria Silva',
    rating: 5,
    comment:
      'Experiência incrível! A comida estava deliciosa e o ambiente muito acolhedor. Definitivamente voltarei!',
    date: '2024-01-15',
  },
  {
    id: 2,
    name: 'João Santos',
    rating: 5,
    comment:
      'O melhor restaurante português que já visitei. Os sabores são autênticos e o serviço é excepcional.',
    date: '2024-01-10',
  },
  {
    id: 3,
    name: 'Ana Costa',
    rating: 5,
    comment:
      'Perfeito para uma noite especial. A comida, o vinho e a atmosfera criaram uma experiência memorável.',
    date: '2024-01-08',
  },
  {
    id: 4,
    name: 'Pedro Oliveira',
    rating: 5,
    comment:
      'Autenticidade portuguesa em cada prato. Os ingredientes são frescos e a apresentação é impecável.',
    date: '2024-01-05',
  },
  {
    id: 5,
    name: 'Sofia Martins',
    rating: 5,
    comment:
      'Serviço atencioso e comida deliciosa. Recomendo vivamente para quem procura a verdadeira cozinha portuguesa.',
    date: '2024-01-03',
  },
  {
    id: 6,
    name: 'Carlos Ferreira',
    rating: 5,
    comment:
      'Excelente experiência gastronómica. O menu é variado e todos os pratos que experimentei estavam perfeitos.',
    date: '2024-01-01',
  },
];

export default function Reviews() {
  const { t } = useLanguage();

  // Calculate average rating
  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <section className="section-padding bg-white dark:bg-gray-800">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-quiverleaf font-bold text-primary mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {t('reviews.title')}
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t('reviews.subtitle')}
          </motion.p>
        </div>

        {/* Reviews Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              className="card p-6 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Quote size={24} className="text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < review.rating
                            ? 'text-gold fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                    "{review.comment}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {review.name}
                      </h4>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">
                        {new Date(review.date).toLocaleDateString('pt-PT')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {t('reviews.joinSatisfiedCustomers')}
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('reservations');
              if (element) {
                const navHeight = 80;
                const elementPosition = element.offsetTop - navHeight;
                window.scrollTo({
                  top: elementPosition,
                  behavior: 'smooth',
                });
              }
            }}
            className="btn-primary"
          >
            {t('reviews.makeReservation')}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
