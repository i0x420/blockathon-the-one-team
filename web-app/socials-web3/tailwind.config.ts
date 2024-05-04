import type { Config } from "tailwindcss";

const lineClamp = require("@tailwindcss/line-clamp");
const scrollBarHide = require("tailwind-scrollbar-hide");
const headlessUI = require("@headlessui/tailwindcss");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      xxs: "0.625rem", // 10px
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", // 16px
      md: "1.25rem", // 20px
      lg: "1.5rem", // 24px
      xl: "2rem", // 32px
      xxl: "2.5rem", // 40px
      "3xl": "3rem", // 48px
      "4xl": "3.5rem", // 56px
    },
    container: {
      center: true,
      screens: {
        DEFAULT: "1612px",
      },
    },
    extend: {
      colors: {
        "brand-primary": "var(--brand-primary)",
        "brand-secondary": "var(--brand-secondary)",
        "brand-hover": "var(--brand-hover)",
        "brand-disabled": "var(--brand-disabled)",

        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-placeholder": "var(--text-placeholder)",
        "text-disabled": "var(--text-disabled)",
        "default-border": "var(--default-border)",

        "background-surface": "var(--background-surface)",
        "background-primary": "var(--background-primary)",
        "background-secondary": "var(--background-secondary)",
        "background-third": "var(--background-third)",
        "background-hover": "var(--background-hover)",

        "background-input": "var(--background-input)",
        "background-input-hover": "var(--background-input-hover)",
        "background-input-active": "var(--background-input-active)",

        "text-primary-dark-fixed": "var(--text-primary-dark-fixed)",

        "reverse-background-primary": "var(--reverse-background-primary)",
        "reverse-background-secondary": "var(--reverse-background-secondary)",
        "reverse-text-primary": "var(--reverse-text-primary)",

        "fixed-black": "var(--fixed-black)",
        "fixed-white": "var(--fixed-white)",
        red: "var(--red)",
        yellow: "var(--yellow)",
        green: "var(--green)",
        blue: "var(--blue)",

        "secondary-red": "var(--secondary-red)",
        "secondary-yellow": "var(--secondary-yellow)",
        "secondary-green": "var(--secondary-green)",
        "secondary-blue": "var(--secondary-blue)",
      },
      screens: {
        "desktop-lg": { max: "1600px" },
        desktop: { max: "1440px" },
        ipadpro: { max: "1366px" },
        ipad: { max: "1023px" },
        phone: { max: "767px" },
      },
      spacing: {
        header: "4rem",
      },
      keyframes: {
        growing: {
          "0%, 100%": { transform: "scale(0)", opacity: "0" },
          "50%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        growing: "growing 1s linear infinite",
      },
    },
    plugins: [lineClamp, scrollBarHide, headlessUI],
    darkMode: ["class", '[data-theme="dark"]'],
  },
};
export default config;
