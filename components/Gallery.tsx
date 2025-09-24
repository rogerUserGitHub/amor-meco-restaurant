'use client';

import { useLanguage } from './LanguageProvider';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function Gallery() {
  const { t } = useLanguage();

  const galleryImages = [
    {
      src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      alt: t('gallery.image1.alt'),
      title: t('gallery.image1.title'),
    },
    {
      src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      alt: t('gallery.image2.alt'),
      title: t('gallery.image2.title'),
    },
    {
      src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      alt: t('gallery.image3.alt'),
      title: t('gallery.image3.title'),
    },
    {
      src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      alt: t('gallery.image4.alt'),
      title: t('gallery.image4.title'),
    },
    {
      src: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      alt: t('gallery.image5.alt'),
      title: t('gallery.image5.title'),
    },
  ];

  return (
    <section
      id="gallery"
      className="section-padding bg-gray-50 dark:bg-gray-900"
    >
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

        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Swiper
            modules={[Pagination, Autoplay, EffectFade]}
            effect="fade"
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="gallery-swiper rounded-2xl overflow-hidden shadow-2xl"
          >
            {galleryImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-96 md:h-[500px] lg:h-[600px]">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width="1200"
                    height="600"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <h3 className="text-2xl md:text-3xl font-quiverleaf font-bold mb-2">
                      {image.title}
                    </h3>
                    <p className="text-lg opacity-90">
                      {t('gallery.discoverMagic')}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      <style jsx>{`
        .gallery-swiper .swiper-pagination-bullet {
          background: #64702a;
          opacity: 0.5;
        }
        .gallery-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          background: #64702a;
        }
      `}</style>
    </section>
  );
}
