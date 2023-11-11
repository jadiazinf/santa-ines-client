/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
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
        danger: '#ff0000',
        danger_blur: '#FDD0DF',
        warning: '#ffae00',
        success: '#3a5dee',
        table_hover: '#F7F7F8',
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
      smm:"890px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
