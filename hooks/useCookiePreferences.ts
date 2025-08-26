import { useState, useEffect, useCallback, useMemo } from 'react';

export type CookiePreferences = {
  essential: boolean;
  analytics: boolean;
  preferences: boolean;
};

export function useCookiePreferences() {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(
    null
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadPreferences = () => {
      try {
        const stored = localStorage.getItem('cookieConsent');
        if (stored) {
          const parsed = JSON.parse(stored) as CookiePreferences;
          setPreferences(parsed);
        } else {
          // Default preferences when no consent given
          setPreferences({
            essential: true,
            analytics: false,
            preferences: false,
          });
        }
      } catch (error) {
        console.error('Error loading cookie preferences:', error);
        // Fallback to default preferences
        setPreferences({
          essential: true,
          analytics: false,
          preferences: false,
        });
      }
      setIsLoaded(true);
    };

    loadPreferences();
  }, []);

  const updatePreferences = useCallback((newPreferences: CookiePreferences) => {
    setPreferences(newPreferences);
    localStorage.setItem('cookieConsent', JSON.stringify(newPreferences));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
  }, []);

  const hasConsent = useCallback(
    (type: keyof CookiePreferences): boolean => {
      if (!preferences) return false;
      return preferences[type];
    },
    [preferences]
  );

  const canUseAnalytics = useCallback((): boolean => {
    return hasConsent('analytics');
  }, [hasConsent]);

  const canUsePreferences = useCallback((): boolean => {
    return hasConsent('preferences');
  }, [hasConsent]);

  const canUseEssential = useCallback((): boolean => {
    return hasConsent('essential');
  }, [hasConsent]);

  // Memoize the return object to prevent unnecessary re-renders
  const result = useMemo(
    () => ({
      preferences,
      isLoaded,
      updatePreferences,
      hasConsent,
      canUseAnalytics,
      canUsePreferences,
      canUseEssential,
    }),
    [
      preferences,
      isLoaded,
      updatePreferences,
      hasConsent,
      canUseAnalytics,
      canUsePreferences,
      canUseEssential,
    ]
  );

  return result;
}
