/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0C1B2A",
        gold: "#C6A664",
        offwhite: "#F9F9F9",
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: "0 0 0 2px rgba(198,166,100,0.25), 0 10px 25px rgba(0,0,0,0.2)",
      },
    },
  },
  plugins: [],
};

