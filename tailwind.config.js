/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mainColor: "#47ccc8",
        mainDarker: "#29aeaa",
        mainLight: "rgba(71,204,200,.5)",
        secondaryColor: "#72d9d6",
        grayColor: "#EDF3F6",
        primaryColor: "#2d3663",
        primaryText: "rgba(45,54,99,.75)",
        primaryLight: "rgba(45,54,99,.1)",
        primaryDark: "#232a58",
        redColor: "#dc4545",
      },
    },
  },
  plugins: [],
};
