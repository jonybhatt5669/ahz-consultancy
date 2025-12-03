/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#0f172a', // Slate 900
          foreground: '#f8fafc', // Slate 50
        },
        secondary: {
          DEFAULT: '#f1f5f9', // Slate 100
          foreground: '#0f172a', // Slate 900
        },
        accent: {
          DEFAULT: '#3b82f6', // Blue 500
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#64748b', // Slate 500
          foreground: '#cbd5e1', // Slate 300
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
