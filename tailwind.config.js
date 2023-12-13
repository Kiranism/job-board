/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Poppins", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        primary: "#1597e4",
        fontdark: "#212121",
        fontwhite: "#FAFAFA",
        cardborder: "#E6E6E6",
        cardcolor: "#ffffff",
        placeholder: "#7a7a7a",
        error: "#d86161",
      },
    },
  },
  plugins: [],
};
