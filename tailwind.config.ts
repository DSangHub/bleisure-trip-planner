import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0f1419",
        panel: "#1a2332",
        panel2: "#243044",
        line: "#2f3f57",
        mist: "#94a3b8",
        sky: "#38bdf8",
        violet: "#818cf8",
        biz: "#f59e0b",
        fun: "#34d399",
        solar: "#fbbf24",
      },
      boxShadow: {
        glow: "0 18px 50px rgba(0, 0, 0, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
