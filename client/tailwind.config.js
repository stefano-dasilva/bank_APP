/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#2b2d42",
        light: "#8d99ae",
        darkgreen: "#008134",
      },
    },
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
      roboto: ["Roboto", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
      karla: ["Karla", "sans-serif"],
    },
  },
  plugins: [],
};

