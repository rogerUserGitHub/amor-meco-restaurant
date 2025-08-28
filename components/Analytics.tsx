'use client';

import { useEffect } from 'react';
import { useCookiePreferences } from '../hooks/useCookiePreferences';

export default function Analytics() {
  const { preferences, isLoaded } = useCookiePreferences();

  useEffect(() => {
    if (!isLoaded || !preferences) return;

    if (preferences.analytics) {
      // Initialize analytics here
      // Example: Google Analytics
      // if (typeof window !== 'undefined' && window.gtag) {
      //   window.gtag('config', 'GA_MEASUREMENT_ID', {
      //     page_title: document.title,
      //     page_location: window.location.href,
      //   });
      // }
      // Example: Facebook Pixel
      // if (typeof window !== 'undefined' && window.fbq) {
      //   window.fbq('init', 'FB_PIXEL_ID');
      //   window.fbq('track', 'PageView');
      // }
    } else {
      console.log('Analytics disabled - respecting user privacy');
    }
  }, [isLoaded, preferences]);

  // Don't render anything visible
  return null;
}
