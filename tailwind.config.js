import tokens from './src/styles/tokens.json';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: tokens.colors,
      borderRadius: tokens.borderRadius,
      boxShadow: tokens.boxShadow,
      fontFamily: {
        heading: ['Fredoka', 'sans-serif'],
        body: ['Quicksand', 'sans-serif'],
      },
      minWidth: {
        'hit': '56px',
      },
      minHeight: {
        'hit': '56px',
      }
    },
  },
  plugins: [],
}
