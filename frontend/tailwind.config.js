import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    path.join(__dirname, "index.html"),
    path.join(__dirname, "src/**/*.{js,ts,jsx,tsx}"),
    "./frontend/index.html",
    "./frontend/src/**/*.{js,ts,jsx,tsx}",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        luxury: {
          50: '#fbf8f2',
          100: '#f5efe0',
          200: '#ebdcc1',
          300: '#ddc297',
          400: '#cfa66d',
          500: '#b88947',
          600: '#9b6e37',
          700: '#7c542e',
          800: '#64442a',
          900: '#523824',
          950: '#2c1c11',
        },
        navy: {
          850: '#0e1626',
          900: '#090d16',
          950: '#05080f',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
