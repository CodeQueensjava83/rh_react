/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeSlide: [
          { opacity: "0", transform: "translateY(20px)" },
          { opacity: "1", transform: "translateY(0)" }
        ],
      },
      animation: {
        fadeSlide: "fadeSlide 0.7s ease-out forwards",
      },
    },
  },
  plugins: [],
};
