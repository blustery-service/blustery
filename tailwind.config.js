/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './packages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Public Sans', 'sans-serif'],
      },
      fontSize: {
        h1: '3.25rem',
        h2: '2.5rem',
        h3: '1.625rem',
        h4: '1.25rem',
        h5: '1.188rem',
        h6: '1.125rem',
      },
      colors: {
        primary: {
          DEFAULT: '#2065D1',
          light: '#76B0F1',
          dark: '#103996',
        },
        secondary: {
          DEFAULT: '#3366FF',
          light: '#84A9FF',
          dark: '#1939B7',
        },
        success: {
          DEFAULT: '#36B37E',
          light: '#86E8AB',
          dark: '#1B806A',
        },
        info: {
          DEFAULT: '#00B8D9',
          light: '#61F3F3',
          dark: '#006C9C',
        },
        warning: {
          DEFAULT: '#FFAB00',
          light: '#FFD666',
          dark: '#B76E00',
        },
        error: {
          DEFAULT: '#FF5630',
          light: '#FFAC82',
          dark: '#B71D18',
        },
        hover: '#919eab14',
        selected: '#919eab29',
        disabled: '#919eabcc',
        focus: '#919eab3d',
        'disabled-background': '#dfe3e8',
        'hover-opacity': 0.08,
        'disabled-opacity': 0.48,
      },
    },
  },
  plugins: [],
};
