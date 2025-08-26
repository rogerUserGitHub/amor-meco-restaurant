'use client';

import { useLanguage } from './LanguageProvider';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Restaurant interior with warm lighting',
    title: 'Cozy Atmosphere',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Delicious Portuguese dish',
    title: 'Traditional Cuisine',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Wine selection and dining experience',
    title: 'Fine Dining',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Chef preparing signature dish',
    title: 'Culinary Excellence',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Outdoor dining terrace',
    title: 'Al Fresco Dining',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Special events and celebrations',
    title: 'Special Events',
  },
];

export default function Gallery() {
  const { t } = useLanguage();

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
          {t('gallery.title')}
        </motion.h2>
      </div>

      {/* Gallery Carousel */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect="fade"
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          speed={800}
          className="gallery-swiper"
        >
          {galleryImages.map((image) => (
            <SwiperSlide key={image.id}>
              <div className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-2xl md:text-3xl font-quiverleaf font-bold mb-2">
                    {image.title}
                  </h3>
                  <p className="text-gray-200 text-sm md:text-base">
                    {image.alt}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button className="swiper-button-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 group">
          <ChevronLeft
            size={24}
            className="text-primary group-hover:scale-110 transition-transform duration-200"
          />
        </button>

        <button className="swiper-button-next absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 group">
          <ChevronRight
            size={24}
            className="text-primary group-hover:scale-110 transition-transform duration-200"
          />
        </button>
      </motion.div>

      <style jsx global>{`
        .gallery-swiper .swiper-pagination-bullet {
          background: #607124;
          opacity: 0.5;
        }

        .gallery-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          background: #607124;
        }

        .gallery-swiper .swiper-pagination {
          bottom: 20px;
        }

        @media (max-width: 768px) {
          .gallery-swiper .swiper-button-prev,
          .gallery-swiper .swiper-button-next {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
