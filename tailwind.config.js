import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Kumbh Sans", defaultTheme.fontFamily.sans],
    },
    colors: {
      ...colors,
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
    },
  },
  plugins: [],
};
