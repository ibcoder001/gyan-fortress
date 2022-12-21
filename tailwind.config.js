/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-expletus)', ...defaultTheme.fontFamily.sans],
        body: ['var(--font-questrial)', ...defaultTheme.fontFamily.sans],
        code: ['var(--font-ibm)', ...defaultTheme.fontFamily.mono],
        logo: ['var(--font-expletus)', ...defaultTheme.fontFamily.sans],
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
            lineHeight: '1.75rem',
          },
        ],
        paragraph: [
          ...defaultTheme.fontSize['lg'],
          {
            lineHeight: '1.75rem',
          },
        ],
        code: [
          ...defaultTheme.fontSize['lg'],
          {
            lineHeight: '1.5rem',
          },
        ],
        menu: [
          ...defaultTheme.fontSize['base'],
          {
            lineHeight: '1.25rem',
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
    },
  },
  plugins: [],
};
