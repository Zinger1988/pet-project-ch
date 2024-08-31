module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        body: "Nunito Sans, sans-serif",
        heading: "Poppins, asns-serif",
      },
      colors: {
        primary: {
          100: "#FFF7D7",
          200: "#FFF2BB",
          300: "#FFE885",
          400: "#FFE451",
          500: "#E5C74A",
          600: "#CCB244",
          700: "#B29C3D",
          800: "#998636",
          900: "#7F702E",
        },
      },
      lineHeight: {
        default: 1.5,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    function ({ addComponents, theme }) {
      const breakpoints = theme("screens");

      const components = {
        ".text-body-lg": {
          [`@media (max-width: ${breakpoints.lg})`]: {
            fontSize: "1rem",
          },
          [`@media (min-width: ${breakpoints.lg})`]: {
            fontSize: "1.25rem",
          },
        },
        ".text-body": {
          [`@media (max-width: ${breakpoints.lg})`]: {
            fontSize: ".875rem",
          },
          [`@media (min-width: ${breakpoints.lg})`]: {
            fontSize: "1rem",
          },
        },
        ".text-body-sm": {
          [`@media (max-width: ${breakpoints.lg})`]: {
            fontSize: ".75rem",
          },
          [`@media (min-width: ${breakpoints.lg})`]: {
            fontSize: ".875rem",
          },
        },
        ".text-body-xs": {
          [`@media (max-width: ${breakpoints.lg})`]: {
            fontSize: ".6875rem",
          },
          [`@media (min-width: ${breakpoints.lg})`]: {
            fontSize: ".75rem",
          },
        },
        ".text-h1": {
          [`@media (max-width: ${breakpoints.lg})`]: {
            fontSize: "2.078rem",
          },
          [`@media (min-width: ${breakpoints.lg})`]: {
            fontSize: "2.375rem",
          },
        },
        ".text-h2": {
          [`@media (max-width: ${breakpoints.lg})`]: {
            fontSize: "1.53rem",
          },
          [`@media (min-width: ${breakpoints.lg})`]: {
            fontSize: "1.75rem",
          },
        },
        ".text-h3": {
          [`@media (max-width: ${breakpoints.lg})`]: {
            fontSize: "1.148rem",
          },
          [`@media (min-width: ${breakpoints.lg})`]: {
            fontSize: "1.3125rem",
          },
        },
        ".text-h4": {
          [`@media (max-width: ${breakpoints.lg})`]: {
            fontSize: "1rem",
          },
          [`@media (min-width: ${breakpoints.lg})`]: {
            fontSize: "1.148rem",
          },
        },
      };

      addComponents(components);
    },
  ],
};
