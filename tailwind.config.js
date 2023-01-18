/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        md: '865px',
        lg: '1097px',
        xl: '1393px',
        '2xl': '1597px',
        '3xl': '1801px',
        '4xl': '2005px',
      },
      fontFamily: {
        sans: 'Montserrat',
      },
      colors: {
        green: {
          500: '#1DB954',
        },
        gray: {
          100: '#838383',
          300: '#282828',
          700: '#121212',
          900: '#191414',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp'), require('tailwind-scrollbar')],
};
