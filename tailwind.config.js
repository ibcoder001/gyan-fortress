/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Expletus Sans', ...defaultTheme.fontFamily.sans],
        logo: ['Expletus Sans', ...defaultTheme.fontFamily.sans],
        body: ['Questrial', ...defaultTheme.fontFamily.serif],
        code: ['IBM Plex Mono', ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        title: [
          ...defaultTheme.fontSize['8xl'],
          {
            lineHeight: 1,
          },
        ],
        subtitle: [
          ...defaultTheme.fontSize['4xl'],
          {
            lineHeight: 1,
          },
        ],
        heading: [
          ...defaultTheme.fontSize['6xl'],
          {
            lineHeight: 1,
          },
        ],
        subheading: [
          ...defaultTheme.fontSize['3xl'],
          {
            lineHeight: '2.25rem',
          },
        ],
        logo: [
          ...defaultTheme.fontSize['2xl'],
          {
            lineHeight: '2rem',
          },
        ],
        formText: [
          ...defaultTheme.fontSize['xl'],
          {
            lineHeight: '1.75rem',
          },
        ],
        paragraph: [
          ...defaultTheme.fontSize['xl'],
          {
            lineHeight: '1.75rem',
          },
        ],
        code: [
          ...defaultTheme.fontSize['lg'],
          {
            lineHeight: '1.75rem',
          },
        ],
        menu: [
          ...defaultTheme.fontSize['base'],
          {
            lineHeight: '1.25rem',
          },
        ],
        'mobile-menu': [
          ...defaultTheme.fontSize['2xl'],
          {
            lineHeight: '1.75rem',
          },
        ],
        'btn-sm': [
          ...defaultTheme.fontSize['xl'],
          {
            lineHeight: '1.75rem',
          },
        ],
        'btn-md': [
          ...defaultTheme.fontSize['2xl'],
          {
            lineHeight: '2rem',
          },
        ],
        'btn-lg': [
          ...defaultTheme.fontSize['3xl'],
          {
            lineHeight: '2.25rem',
          },
        ],
      },
      colors: {
        dark: colors.stone[900],
        light: colors.stone[100],
        shadow: colors.stone[300],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
