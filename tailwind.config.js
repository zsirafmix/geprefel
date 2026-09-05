/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontSize: {
        'senior-sm': ['1.125rem', { lineHeight: '1.75rem' }],   // 18px
        'senior-base': ['1.375rem', { lineHeight: '2.1rem' }],  // 22px
        'senior-lg': ['1.625rem', { lineHeight: '2.35rem' }],   // 26px
        'senior-xl': ['2rem', { lineHeight: '2.6rem' }],        // 32px
        'senior-2xl': ['2.5rem', { lineHeight: '3rem' }],       // 40px
        'senior-3xl': ['3rem', { lineHeight: '3.5rem' }],       // 48px
      },
      colors: {
        brand: {
          bg: '#FAF7F2',       // Warm comforting paper background
          card: '#FFFFFF',
          text: '#1E293B',     // High contrast slate navy
          muted: '#475569',    // Highly readable secondary text
          blue: '#1D4ED8',     // Deep royal blue
          blueHover: '#1E40AF',
          green: '#15803D',    // Deep friendly emerald green
          greenLight: '#DCFCE7',
          amber: '#B45309',    // Warm clear amber
          amberLight: '#FEF3C7',
          border: '#CBD5E1',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-gentle': 'bounce 2s infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      }
    },
  },
  plugins: [],
}
