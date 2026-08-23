/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        vibe: {
          dark: '#0a0a0f',
          card: '#12121a',
          cardHover: '#1a1a26',
          border: '#2a2a3c',
          cyan: '#00f0ff',
          magenta: '#ff007f',
          purple: '#a855f7',
          amber: '#f59e0b',
          emerald: '#10b981',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
