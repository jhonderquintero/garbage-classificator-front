const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      coolGray: colors.coolGray,
      blue: colors.blue,
      blueGray: colors.blueGray
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
