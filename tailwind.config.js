/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          900: '#0B1A0B',
          800: '#142614',
          700: '#1E331E',
          600: '#2D4A2D',
          500: '#4A7C59',
          400: '#6B9E7C',
          300: '#8FBC9F',
        },
        amber: {
          gold: '#C9A96E',
          light: '#E8D5B5',
          dark: '#8B7355',
        },
        cream: '#F5F0E6',
        bark: '#1C1410',
      },
      fontFamily: {
        heading: ["'Playfair Display'", 'serif'],
        body: ["'DM Sans'", 'sans-serif'],
        accent: ["'Cinzel'", 'serif'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
        'spore-drift': 'sporeDrift 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4', filter: 'blur(40px)' },
          '50%': { opacity: '0.8', filter: 'blur(60px)' },
        },
        sporeDrift: {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': {
            transform: 'translate(var(--drift-x), -100vh) scale(0.5)',
            opacity: '0',
          },
        },
      },
    },
  },
  plugins: [],
};
