/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    fontFamily: {
      inter: 'Inter, sans-serif',
      satoshi: 'satoshi, sans-serif'
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
