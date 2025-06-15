import defaultTheme from 'tailwindcss/defaultTheme';


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // sangat penting agar Tailwind memproses file ini
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#66DDAA',
        'default-text': '#F1F5F9',
        'default-bg': '#1e293b',
        'default-bg-navbar': '#0F172A',
      },
      fontFamily: {
        sans: ['Chivo', ...defaultTheme.fontFamily.sans],
        'zilla-slab': ['Zilla Slab', 'Inter', 'Outfit', 'Poppins', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};