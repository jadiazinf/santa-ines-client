/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#73B72B",
        secondary: "#B5DC11",
        dimBlue: "#007AAE",
        dimYellow: "#F9B21C",
        dimWhite: "#FAFAFA",
        textTitle: '#6f6f6f',
        textInput: '#007aae',
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      mm:"0px",
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
