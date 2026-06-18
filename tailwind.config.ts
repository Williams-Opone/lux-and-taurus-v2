/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Luxury Modern Sans-Serif Typographic System
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        black: "#060606", 
        charcoal: "#0F0F11", 
        // Elegant Muted Emerald
        emerald: {
          400: "#00E5A3",
          500: "#00C48C", 
          600: "#009E70",
        },
        // ✨ THE MISSING LUXURY GOLD PIPELINE
        gold: {
          400: "#F1D271",
          500: "#D4AF37", // Warm Metallic Gold
          600: "#AA8826",
        },
        // Premium Off-White and Slate Contours
        ghost: {
          white: "#F5F5F5",
          gray: "#9A9A9A",
        }
      },
    },
  },
  plugins: [],
}