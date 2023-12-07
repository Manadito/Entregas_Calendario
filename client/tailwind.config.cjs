/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "200px",
        // => @media (min-width: 992px) { ... }
      },
    },
  },
  plugins: [],
};
