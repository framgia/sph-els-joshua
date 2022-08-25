/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    fontFamily: {
      primary: 'Inter',
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        lg: '0',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1170px',
    },
    colors: {
      heading: '#1C0A0A',
      paragraph: '#584F49',
      stroke: {
        1: '#B0B4C0',
        2: '#CFCFCF',
        3: '#F4F5F7',
      },
      section: '#F5F6F9',
      shape: '#E8EEF0',
      white: '#FFFFFF',
      transparent: 'transparent',
    },
    extend: {
      boxShadow: {
        primary: '0px 18px 36px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/line-clamp')
  ],
}
