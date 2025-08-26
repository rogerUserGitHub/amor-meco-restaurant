'use client';

import { useLanguage } from './LanguageProvider';
import { motion } from 'framer-motion';
import { Heart, Award, Users, ChefHat } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: 'Chef Maria Santos',
    role: 'Head Chef',
    bio: 'With over 20 years of culinary experience, Chef Maria brings traditional Portuguese flavors to life with a modern twist. Her passion for authentic ingredients and innovative techniques has made Amor Meco a culinary destination.',
    image:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    name: 'João Silva',
    role: 'Restaurant Manager',
    bio: 'João ensures every guest experiences the warm hospitality that Portugal is known for. His attention to detail and commitment to excellence creates memorable dining experiences.',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    name: 'Ana Costa',
    role: 'Sommelier',
    bio: 'Ana curates our exceptional wine selection, featuring the finest Portuguese wines and international selections. Her expertise enhances every dining experience with perfect pairings.',
    image:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
];

const values = [
  {
    icon: Heart,
    title: 'Passion for Food',
    description:
      'Every dish is crafted with love and respect for traditional Portuguese cuisine.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description:
      'We strive for excellence in every aspect of our service and culinary offerings.',
  },
  {
    icon: Users,
    title: 'Community',
    description:
      'Building lasting relationships with our guests and local community.',
  },
  {
    icon: ChefHat,
    title: 'Innovation',
    description:
      'Blending traditional techniques with modern culinary innovation.',
  },
];

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="container-custom">
      {/* Story Section */}
      <div className="text-center mb-16">
        <motion.h2
          className="text-4xl md:text-5xl font-quiverleaf font-bold text-primary mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {t('about.title')}
        </motion.h2>

        <motion.p
          className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {t('about.subtitle')}
        </motion.p>
      </div>

      {/* Story Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Amor Meco restaurant interior"
            className="w-full h-96 object-cover rounded-2xl"
            loading="lazy"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-quiverleaf font-bold text-primary mb-6">
            Our Story
          </h3>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Founded in 2010, Amor Meco began as a dream to bring authentic
              Portuguese cuisine to the heart of the city. What started as a
              small family restaurant has grown into a beloved culinary
              destination, known for its warm hospitality and exceptional food.
            </p>
            <p>
              Our name "Amor Meco" reflects our philosophy - "Amor" meaning
              love, and "Meco" representing our connection to the sea and
              traditional Portuguese heritage. Every dish tells a story of our
              rich culinary traditions.
            </p>
            <p>
              Today, we continue to honor our roots while embracing innovation,
              creating memorable dining experiences that celebrate the best of
              Portuguese culture and cuisine.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Philosophy Section */}
      <motion.div
        className="mt-20 bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 md:p-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="text-center max-w-4xl mx-auto">
          <h3 className="text-3xl font-quiverleaf font-bold text-primary mb-6">
            Our Philosophy
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            At Amor Meco, we believe that great food is more than just
            taste—it's an experience that brings people together. Our philosophy
            centers around three core principles: authenticity, quality, and
            hospitality.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Authenticity
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                We stay true to traditional Portuguese recipes and cooking
                methods, preserving the authentic flavors that have been passed
                down through generations.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Quality
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                We source only the finest ingredients, working with local
                producers and selecting premium products to ensure exceptional
                quality in every dish.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Hospitality
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                We treat every guest like family, creating a warm and welcoming
                atmosphere where memories are made and traditions are
                celebrated.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
