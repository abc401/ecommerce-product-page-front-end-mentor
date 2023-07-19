import defaultTheme from "tailwindcss/defaultTheme";
import defaultConfig from "tailwindcss/defaultConfig";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Kumbh Sans", defaultTheme.fontFamily.sans],
    },
    colors: (theme) => ({
      ...theme.colors,
      accent: {
        500: "hsl(26, 100%, 55%)",
        100: "hsl(25, 100%, 94%)",
      },
      neutral: {
        800: "hsl(220, 13%, 13%)",
        500: "hsl(219, 9%, 45%)",
        200: "hsl(220, 14%, 75%)",
        100: "hsl(223, 64%, 98%)",
      },
    }),
    extend: {
      fontSize: {
        "4.5xl": ["2.75rem", 1],
      },
      screens: {
        xs: "490px",
        sm: "710px",
        md: "796px",
        lg: "866px",
      },
    },
  },
  plugins: [],
};
