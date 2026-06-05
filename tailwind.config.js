/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        ink: "#151515",
        coral: "#e45b46",
        moss: "#4f6f52",
      },
    },
  },
  plugins: [],
};
