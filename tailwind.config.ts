import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        navy: {
          50: "#f0f3f9",
          100: "#dce3f0",
          200: "#b8c7e1",
          300: "#8ba4cc",
          400: "#6483b8",
          500: "#4a6a9f",
          600: "#3a5480",
          700: "#2d4163",
          800: "#1e2d47",
          900: "#141e32",
        },
        teal: {
          50: "#f0faf8",
          100: "#d4f1eb",
          200: "#a8e3d7",
          300: "#74cebf",
          400: "#4db8a7",
          500: "#35998c",
          600: "#2a7a70",
          700: "#235e57",
          800: "#1c4841",
          900: "#15332e",
        },
        cream: {
          50: "#fefcf8",
          100: "#fdf8ef",
          200: "#faf0dc",
          300: "#f5e4c3",
          400: "#edd5a4",
          500: "#e2c385",
        },
        sage: {
          50: "#f4f7f4",
          100: "#e4ece4",
          200: "#c8d9c8",
          300: "#a3bfa3",
          400: "#7da37d",
          500: "#5f8a5f",
          600: "#4b6e4b",
        },
        coral: {
          400: "#f08c6e",
          500: "#e87356",
        },
        amber: {
          400: "#f0b96e",
          500: "#e8a54c",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
