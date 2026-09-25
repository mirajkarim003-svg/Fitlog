import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#0a0a0b",
        surface: "#141416",
        surface2: "#1c1c1f",
        line: "#28282c",
        accent: "#ccff00",
        muted: "#9a9aa3",
        ink: "#f5f5f7",
      },
      fontFamily: {
        display: ["var(--font-oswald)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      maxWidth: {
        content: "1240px",
      },
    },
  },
  plugins: [],
};

export default config;
