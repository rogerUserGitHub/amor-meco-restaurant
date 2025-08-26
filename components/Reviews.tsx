'use client';

import { useLanguage } from './LanguageProvider';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';

const reviews = [
  {
    id: 1,
    name: 'Maria Santos',
    rating: 5,
    text: 'Amazing Portuguese cuisine! The Bacalhau à Brás was absolutely delicious. The atmosphere is warm and welcoming, just like being in Portugal.',
    date: '2024-01-15',
    location: 'Lisbon, Portugal',
  },
  {
    id: 2,
    name: 'João Silva',
    rating: 5,
    text: 'Exceptional dining experience. The wine pairing suggestions were perfect, and the service was impeccable. Highly recommend!',
    date: '2024-01-10',
    location: 'Porto, Portugal',
  },
  {
    id: 3,
    name: 'Ana Costa',
    rating: 5,
    text: "The best Portuguese restaurant I've ever visited. Authentic flavors, beautiful presentation, and wonderful staff. A must-visit!",
    date: '2024-01-08',
    location: 'Amsterdam, Netherlands',
  },
  {
    id: 4,
    name: 'Carlos Mendes',
    rating: 5,
    text: 'Incredible food and atmosphere. The Francesinha was outstanding, and the live Fado music made the evening unforgettable.',
    date: '2024-01-05',
    location: 'London, UK',
  },
  {
    id: 5,
    name: 'Sofia Rodriguez',
    rating: 5,
    text: 'Perfect for our anniversary dinner. The staff went above and beyond to make our evening special. The Pastéis de Nata were divine!',
    date: '2024-01-03',
    location: 'Madrid, Spain',
  },
  {
    id: 6,
    name: 'Pedro Alves',
    rating: 5,
    text: 'Authentic Portuguese flavors with a modern twist. The Arroz de Marisco was spectacular. Great wine selection too!',
    date: '2023-12-28',
    location: 'Brussels, Belgium',
  },
];

export default function Reviews() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={`${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

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
          What Our Guests Say
        </motion.h2>

        <motion.p
          className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Discover why guests love dining at Amor Meco
        </motion.p>
      </div>

      {/* Reviews Carousel */}
      <motion.div
        className="relative max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden">
          {/* Quote Icon */}
          <div className="absolute top-6 right-6 text-primary/20">
            <Quote size={48} />
          </div>

          {/* Review Content */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              {renderStars(reviews[currentIndex].rating)}
            </div>

            <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed italic">
              "{reviews[currentIndex].text}"
            </blockquote>

            <div className="text-center">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {reviews[currentIndex].name}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {reviews[currentIndex].location}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                {new Date(reviews[currentIndex].date).toLocaleDateString()}
              </p>
            </div>
          </motion.div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary scale-125'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
