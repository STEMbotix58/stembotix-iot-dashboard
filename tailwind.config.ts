import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        surface: "var(--color-surface)",
      },

      borderRadius: {
        lg: "var(--radius-lg)",
      },

      boxShadow: {
        card: "var(--shadow-card)",
      },
    },
  },

  plugins: [],
};

export default config;
