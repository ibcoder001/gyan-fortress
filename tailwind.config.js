/** @type {import("tailwindcss").Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: colors.stone[900],
        light: colors.white,
        googledark: "#4285F4",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwind-heropatterns")({
      variants: [],
      patterns: ["glamorous"],
      colors: {
        default: "#000000",
      },
      opacity: {
        default: "0.05",
      },
    }),
  ],
};
