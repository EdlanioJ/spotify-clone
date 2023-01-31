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
      animation: {
        'left-bobble': 'left-bobble 1200ms ease-in-out infinite',
        'right-bobble': 'right-bobble 1200ms ease-in-out infinite',
        'center-bobble': 'center-bobble 1200ms ease-in-out infinite',
      },
      keyframes: {
        'left-bobble': {
          '0%, 100%': {
            transform: 'translateX(0px) scale(1)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateX(-10px) scale(0.75)',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        'center-bobble': {
          '0%, 100%': {
            transform: 'scale(1)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'scale(0.75)',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        'right-bobble': {
          '0%, 100%': {
            transform: 'translateX(0px) scale(1)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateX(10px) scale(0.75)',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar'),
    require('./plugins/animationDelay'),
  ],
};
