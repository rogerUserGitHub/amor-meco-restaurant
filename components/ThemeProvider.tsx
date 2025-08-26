'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useCookiePreferences } from '../hooks/useCookiePreferences';

type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);
  const { preferences, isLoaded } = useCookiePreferences();

  // Initialize theme only once when component mounts and cookie preferences are loaded
  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      return;
    }

    if (isLoaded && preferences) {
      // Only load saved theme if preferences cookies are allowed
      if (preferences.preferences) {
        const savedTheme = localStorage.getItem('theme') as Theme;
        if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
          setTheme(savedTheme);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          setTheme('dark');
        }
      } else {
        // Fallback to system preference if no cookie consent
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          setTheme('dark');
        }
      }
    }
  }, [mounted, isLoaded, preferences]);

  // Apply theme to DOM and save to localStorage
  useEffect(() => {
    if (mounted && preferences) {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(theme);

      // Only save to localStorage if preferences cookies are allowed
      if (preferences.preferences) {
        localStorage.setItem('theme', theme);
      }
    }
  }, [theme, mounted, preferences]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  if (!mounted) {
    return <div className="light">{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
