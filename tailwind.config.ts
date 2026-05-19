/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This covers all subfolders in src
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      // Preserving custom black for that deep "Vantablack" agency feel
      colors: {
        black: "#050505",
      },
      // 1. ADD THE LASER SCANNER VECTOR TRACKS
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(540px)' }, // Matches the exact card layout height
        }
      },
      // 2. TRANSLATE TO ANIMATION UTILITY
      animation: {
        scan: 'scan 2.5s linear infinite',
      },
    },
  },
  plugins: [],
}