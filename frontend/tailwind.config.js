/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{html,ts}', // Adjust as needed for your project structure
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          1: 'var(--primary-color-1)',
          2: 'var(--primary-color-2)',
          3: 'var(--primary-color-3)',
          4: 'var(--primary-color-4)',
          5: 'var(--primary-color-5)',
          6: 'var(--primary-color-6)',
          7: 'var(--primary-color-7)',
          8: 'var(--primary-color-8)',
          9: 'var(--primary-color-9)',
          10: 'var(--primary-color-10)',
        },
        secondary: {
          1: 'var(--secondary-color-1)',
          2: 'var(--secondary-color-2)',
          3: 'var(--secondary-color-3)',
          4: 'var(--secondary-color-4)',
          5: 'var(--secondary-color-5)',
          6: 'var(--secondary-color-6)',
          7: 'var(--secondary-color-7)',
          8: 'var(--secondary-color-8)',
          9: 'var(--secondary-color-9)',
          10: 'var(--secondary-color-10)',
        },
        error: 'var(--error-color)',
        'error-bg': 'var(--error-bg-color)',
        favorite: 'var(--favorite)'
      },
    },
  },
  plugins: [],
};

