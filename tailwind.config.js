const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      current: 'currentColor',
      transparent: 'transparent',
      white: 'var(--color-white)',
      'very-light-gray': 'var(--color-very-light-gray)',
      'dark-gray': 'var(--color-very-light-gray)',
      'dark-blue': 'var(--color-dark-blue)',
      'very-dark-blue': 'var(--color-very-dark-blue)',
    },
    fontSize: {
      base: '14px',
      lg: '16px',
      xl: '18px',
      '2xl': '20px',
      '3xl': '32px',
    },
    fontWeight: {
      normal: 300,
      bold: 600,
      'extra-bold': 800,
    },
    maxWidth: {
      desktop: '1440px',
    },
    screens: {
      mobile: { max: '375px' },
      // desktop: { max: '1440px' }
    },
    extend: {
      fontFamily: {
        sans: ['Nunito Sans', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
