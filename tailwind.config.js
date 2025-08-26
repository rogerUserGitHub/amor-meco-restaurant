/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#607124',
        secondary: '#8B4513',
        accent: '#D4AF37',
        gold: 'hsl(41 85% 65%)',
        'gold-dark': 'hsl(41 75% 55%)',
        'primary-light': '#7A8A2E',
        'primary-dark': '#4D5A1D',
        'text-dark': '#2D1B1B',
        'text-light': '#F5F5F5',
        'bg-light': '#FAFAFA',
        'bg-dark': '#1A1A1A',
      },
      fontFamily: {
        quiverleaf: ['Quiverleaf CF', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'hero-pattern': "url('/images/hero-bg.jpg')",
        'menu-pattern': "url('/images/menu-bg.jpg')",
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
