/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        "fade-in-home_title_1": "fadeIn 1s ease-in",
        "fade-in-home_title_2": "fadeIn 1s ease-in 2s forwards",
        "fade-in-home_title_3": "fadeIn 1s ease-in 4s forwards",
        "fade-in-hn_card": "fadeIn 2s ease-in 4.5s forwards",
        "fade-in-codepen_card": "fadeIn 2s ease-in 5.5s forwards",
      },
    },
  },
  plugins: [],
};
