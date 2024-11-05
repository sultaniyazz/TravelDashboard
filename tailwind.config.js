/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        PermanentMarker: '"Permanent Marker", cursive',
        Montserrat: '"Montserrat", sans-serif',
      },
    },
  },
  plugins: [],
};
