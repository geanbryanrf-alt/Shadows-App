import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "var(--bg-base)",
        card: "var(--bg-card)",
        "card-hover": "var(--bg-card-hover)",
        "border-subtle": "var(--border-subtle)",
        "border-mid": "var(--border-mid)",
        yellow: "var(--yellow)",
        "yellow-dim": "var(--yellow-dim)",
        cyan: "var(--cyan)",
        "cyan-dim": "var(--cyan-dim)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        green: "var(--green)",
        "green-dim": "var(--green-dim)",
        red: "var(--red)",
        "red-dim": "var(--red-dim)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"], // Para títulos elaborados (ex: SHADOWS)
      },
    },
  },
  plugins: [],
};
export default config;
