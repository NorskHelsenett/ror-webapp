/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,ts,scss,css}'],
  darkMode: 'class',
  theme: {
    hljs: {
      theme: 'night-owl',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('tailwind-highlightjs')],
  safelist: [
    {
      pattern: /hljs+/,
    },
    {
      pattern: /bg-[\w-]+-[50-900]/,
    },
  ],
};
