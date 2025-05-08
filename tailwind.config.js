/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#1E1E1E',
          dark: '#2B2D39',
        },
        typography: {
          primary: '#ffffff',
          secondary: '#FFFFFF',
        },
        neutral: {
          DEFAULT: '#F3F1EC',
          secondary: '#818B7B',
        },
        functional: {
          'green-light': '#0AE98A',
          'blue-medium': '#6AF0B7',
          'blue-dark': '#1C5264',
          'blue-deep': '#0A6684',
          'blue-light': '#68B0C8',
          coral: '#C25C5C',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
      },
      animation: {
        slideUp: 'slideUp 0.5s ease-out forwards',
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};