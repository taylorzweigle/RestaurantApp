/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        128: "32rem",
      },
      width: {
        128: "32rem",
        192: "48rem",
        256: "64rem",
      },
      height: {
        162: "40.5rem",
        192: "48rem",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
