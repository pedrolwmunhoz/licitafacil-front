import type { Config } from "tailwindcss";
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B1F17",
        leaf: "#1F6B4A",
        accent: "#E8A317",
        paper: "#F4F7F5",
        line: "#D5E0DA",
      },
      fontFamily: {
        display: ["\"Fraunces\"", "Georgia", "serif"],
        sans: ["\"DM Sans\"", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
