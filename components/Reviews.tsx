'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from './LanguageProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Calculate average rating
  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Auto-play functionality
  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 3500); // 3 seconds
  }, []);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  // Handle manual navigation
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
    setIsAutoPlaying(false);
    stopAutoPlay();
    // Restart auto-play after 1 seconds
    setTimeout(() => {
      setIsAutoPlaying(true);
      startAutoPlay();
    }, 1000);
  }, [startAutoPlay, stopAutoPlay]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    setIsAutoPlaying(false);
    stopAutoPlay();
    // Restart auto-play after 1 seconds
    setTimeout(() => {
      setIsAutoPlaying(true);
      startAutoPlay();
    }, 1000);
  }, [startAutoPlay, stopAutoPlay]);

  // Touch handlers for mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrevious();
    }
  };

  // Start auto-play on mount
  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [startAutoPlay, stopAutoPlay]);

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

        {/* Carousel Container */}
        <motion.div
          className="relative max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {/* Carousel */}
          <div
            ref={carouselRef}
            className="relative overflow-hidden rounded-2xl"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="card p-8 md:p-12"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <div className="flex items-start space-x-4 md:space-x-6">
                  <div className="flex-shrink-0">
                    <Quote size={28} className="text-primary md:text-3xl" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={`${
                            i < reviews[currentIndex].rating
                              ? 'text-gold fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg mb-6 leading-relaxed">
                      "{reviews[currentIndex].comment}"
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                          {reviews[currentIndex].name}
                        </h4>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          {new Date(
                            reviews[currentIndex].date
                          ).toLocaleDateString('pt-PT')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-2 md:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-10"
            aria-label="Previous review"
          >
            <ChevronLeft size={20} className="text-primary" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-2 md:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-10"
            aria-label="Next review"
          >
            <ChevronRight size={20} className="text-primary" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                  stopAutoPlay();
                  setTimeout(() => {
                    setIsAutoPlaying(true);
                    startAutoPlay();
                  }, 3000);
                }}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-primary scale-125'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
