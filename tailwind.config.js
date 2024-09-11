const defaultTheme = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")
const plugin = require("tailwindcss/plugin")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./ui/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./content/posts/**/*.mdx",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-hubot)", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        gray: colors.stone,
        background: "hsl(var(--background))",
        primary: {
          50: "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fda4af",
          400: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48",
          700: "#be123c",
          800: "#9f1239",
          900: "#881337",
          950: "#4c0519",
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      animation: {
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
        "spin-around": "spin-around calc(var(--speed) * 2) infinite linear",
        slide: "slide var(--speed) ease-in-out infinite alternate",
      },
      keyframes:
        '({ theme }) => ({\n        "spin-around": {\n          "0%": {\n            transform: "translateZ(0) rotate(0)",\n          },\n          "15%, 35%": {\n            transform: "translateZ(0) rotate(90deg)",\n          },\n          "65%, 85%": {\n            transform: "translateZ(0) rotate(270deg)",\n          },\n          "100%": {\n            transform: "translateZ(0) rotate(360deg)",\n          },\n        },\n        slide: {\n          to: {\n            transform: "translate(calc(100cqw - 100%), 0)",\n          },\n        },\n        "border-beam": {\n          "100%": {\n            "offset-distance": "100%",\n          },\n        },\n        mutation: {\n          "0%": {\n            background: theme("colors.primary.200 / 3%"),\n          },\n          "10%": {\n            background: theme("colors.primary.200 / 15%"),\n            color: theme("colors.primary.200 / 75%"),\n          },\n          "100%": {\n            background: theme("colors.primary.200 / 0%"),\n          },\n        },\n        emoji: {\n          "0%": {\n            opacity: "0",\n            transform: "translateY(0) scale(0)",\n          },\n          "50%": {\n            opacity: "1",\n            transform: "translateY(-40px) scale(1)",\n          },\n          to: {\n            opacity: "0",\n            transform: "translateY(-60px) scale(1.4)",\n          },\n        },\n        loading: {\n          "0%": {\n            opacity: ".2",\n          },\n          "20%": {\n            opacity: "1",\n            transform: "translateX(1px)",\n          },\n          to: {\n            opacity: ".2",\n          },\n        },\n        shimmer: {\n          "100%": {\n            transform: "translateX(100%)",\n          },\n        },\n      })',
      keyframes: ({ theme }) => ({
        "spin-around": {
          "0%": {
            transform: "translateZ(0) rotate(0)",
          },
          "15%, 35%": {
            transform: "translateZ(0) rotate(90deg)",
          },
          "65%, 85%": {
            transform: "translateZ(0) rotate(270deg)",
          },
          "100%": {
            transform: "translateZ(0) rotate(360deg)",
          },
        },
        slide: {
          to: {
            transform: "translate(calc(100cqw - 100%), 0)",
          },
        },
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
        mutation: {
          "0%": {
            background: theme("colors.primary.200 / 3%"),
          },
          "10%": {
            background: theme("colors.primary.200 / 15%"),
            color: theme("colors.primary.200 / 75%"),
          },
          "100%": {
            background: theme("colors.primary.200 / 0%"),
          },
        },
        emoji: {
          "0%": {
            opacity: "0",
            transform: "translateY(0) scale(0)",
          },
          "50%": {
            opacity: "1",
            transform: "translateY(-40px) scale(1)",
          },
          to: {
            opacity: "0",
            transform: "translateY(-60px) scale(1.4)",
          },
        },
        loading: {
          "0%": {
            opacity: ".2",
          },
          "20%": {
            opacity: "1",
            transform: "translateX(1px)",
          },
          to: {
            opacity: ".2",
          },
        },
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
      }),
      boxShadow: ({ theme }) => ({
        // inspired by https://www.joshwcomeau.com/shadow-palette/
        "surface-glass": `
          inset 0.25px 1px 0 0 ${theme("colors.primary.200 / 3%")},
          0px 0.3px 0.3px rgba(3, 2, 2, 0.02),
          0px 2.2px 2.5px -0.4px rgba(3, 2, 2, 0.02),
          0px 4.3px 4.8px -0.8px rgba(3, 2, 2, 0.02),
          0px 7.5px 8.4px -1.2px rgba(3, 2, 2, 0.02),
          0px 12.8px 14.4px -1.7px rgba(3, 2, 2, 0.02),
          0px 21px 23.6px -2.1px rgba(3, 2, 2, 0.02),
          0px 33.2px 37.4px -2.5px rgba(3, 2, 2, 0.02)`,
        "surface-elevation-low": `
          inset 0.25px 1px 1px 0 ${theme("colors.primary.200 / 1.5%")}, 
          0.3px 0.5px 0.7px rgba(3, 2, 2, 0.2),
          0.4px 0.8px 1px -1.2px rgba(3, 2, 2, 0.2),
          1px 2px 2.5px -2.5px rgba(3, 2, 2, 0.2);`,
        "surface-elevation-medium": `
          inset 0.25px 1px 1px 0 ${theme("colors.primary.200 / 3%")},
          0.3px 0.5px 0.7px rgba(3, 2, 2, 0.1),
          0.8px 1.6px 2px -0.8px rgba(3, 2, 2, 0.1),
          2.1px 4.1px 5.2px -1.7px rgba(3, 2, 2, 0.1),
          5px 10px 12.6px -2.5px rgba(3, 2, 2, 0.1)`,
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        ".layout-sm": {
          "grid-template-columns": `1fr min(${theme("screens.sm")},100%) 1fr`,
        },
        ".layout-xl": {
          "grid-template-columns": `1fr minmax(auto,${theme(
            "spacing.60",
          )}) min(${theme("screens.sm")},100%) minmax(auto,${theme(
            "spacing.60",
          )}) 1fr`,
        },
      })
    }),
    require("@tailwindcss/forms"),
    require("tailwindcss-animate"),
  ],
}
