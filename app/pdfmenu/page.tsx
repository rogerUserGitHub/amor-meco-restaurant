'use client';

import { useState } from 'react';
import { Download, ArrowLeft, Globe } from 'lucide-react';
import Link from 'next/link';

const languages = [
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

export default function PDFMenuPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('pt');

  const handleDownload = () => {
    // In a real implementation, this would download the PDF in the selected language
    const filename = `amor-meco-menu-${selectedLanguage}.pdf`;

    // Simulate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-primary hover:text-primary-light transition-colors duration-200 mb-8"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>

          <h1 className="text-4xl md:text-5xl font-quiverleaf font-bold text-primary mb-4">
            Download Menu
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Choose your preferred language to download our menu
          </p>
        </div>

        {/* Language Selection */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-quiverleaf font-bold text-primary mb-6 flex items-center">
            <Globe className="mr-2" size={24} />
            Select Language
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLanguage(lang.code)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedLanguage === lang.code
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-gray-200 dark:border-gray-600 hover:border-primary/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="font-medium">{lang.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Download Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center">
            <div className="mb-6">
              <div className="w-24 h-32 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  PDF Preview
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Amor Meco Menu -{' '}
                {languages.find((l) => l.code === selectedLanguage)?.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Complete menu with prices and descriptions
              </p>
            </div>

            <button
              onClick={handleDownload}
              className="btn-primary text-lg px-8 py-4 flex items-center space-x-2 mx-auto group"
            >
              <Download size={20} className="group-hover:animate-bounce" />
              <span>Download Menu PDF</span>
            </button>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h3 className="text-xl font-quiverleaf font-bold text-primary mb-4 text-center">
            Mobile Access
          </h3>
          <div className="text-center">
            <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400 text-xs text-center">
                QR Code
                <br />
                for Mobile
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Scan this QR code with your mobile device to access the menu
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>
            Menu updated regularly. For the most current information, please
            visit our restaurant.
          </p>
          <p className="mt-2">
            Need help?{' '}
            <Link href="/#contact" className="text-primary hover:underline">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
