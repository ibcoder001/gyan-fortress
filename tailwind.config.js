/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  important: true,
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Libre Caslon Text', ...defaultTheme.fontFamily.sans],
        body: ['Montserrat', ...defaultTheme.fontFamily.serif],
      },
      colors: {
        // dark: '#0D1713',
        dark: colors.stone[900],
        light: '#F2EBE3',
        // highlight: '#E1C7A2',
        highlight: '#DAAA63',
        // light: colors.rose[100],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
