/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      /*======== COLORS ========*/
      colors: {
        background  : "var(--background)",
        primary     : "var(--primary)",
      },
    },
  },
  plugins: [],
}
