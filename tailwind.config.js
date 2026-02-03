/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'midnight-bg': '#0a0b14',
        'midnight-card': 'rgba(20, 22, 40, 0.4)',
        'midnight-border': 'rgba(168, 85, 247, 0.15)',
        'midnight-text-primary': '#ffffff',
        'midnight-text-secondary': '#8b8fb9',
        'midnight-accent': '#a855f7',
        'midnight-glow': 'rgba(168, 85, 247, 0.2)',
        'midnight-teal': '#2dd4bf',
      },
      fontFamily: {
        'pretendard': ['Pretendard Variable', 'sans-serif'],
      },
      borderRadius: {
        'default': '10px',
      }
    },
  },
  plugins: [],
}
