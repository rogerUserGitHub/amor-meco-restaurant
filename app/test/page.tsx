'use client';

import { useTheme } from '../../hooks/useTheme';
import { Sun, Moon } from 'lucide-react';

export default function TestPage() {
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-primary dark:text-primary">
            CSS Test Page
          </h1>
          <button
            onClick={toggleTheme}
            className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            title="Toggle theme"
          >
            {mounted && theme === 'light' ? (
              <Moon size={20} />
            ) : (
              <Sun size={20} />
            )}
          </button>
        </div>

        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="text-2xl font-semibold mb-4">Card Component</h2>
            <p className="text-gray-600 dark:text-gray-300">
              This should have a white background and shadow.
            </p>
          </div>

          <div className="space-x-4">
            <button className="btn-primary">Primary Button</button>
            <button className="btn-secondary">Secondary Button</button>
          </div>

          <div className="bg-gradient-gold p-6 rounded-lg">
            <h3 className="text-white text-xl font-semibold">
              Gradient Background
            </h3>
            <p className="text-white/90">
              This should have a gold gradient background.
            </p>
          </div>

          <div>
            <h4 className="text-gradient text-2xl font-bold">Gradient Text</h4>
            <p className="dark:text-gray-300">
              This text should have a gradient color.
            </p>
          </div>

          <div className="floating-animation p-4 bg-blue-100 dark:bg-blue-900 rounded">
            <p className="dark:text-gray-300">
              This should have a floating animation.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-2 dark:text-white">
              Theme Test
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Current theme:{' '}
              <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                {theme}
              </span>
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              This section should change colors when you toggle the theme.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
