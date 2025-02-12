const plugin = require("tailwindcss/plugin")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.mdx",
    "./registry/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-mono)"],
        x: ["var(--font-x)"],
      },
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
      },
      animation: {
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
        "spin-around": "spin-around calc(var(--speed) * 2) infinite linear",
        slide: "slide var(--speed) ease-in-out infinite alternate",
        reveal: "reveal 0.7s ease-in-out",
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        disappear: "disappear 2s ease-out forwards",
        "slide-up-fade": "slideUpFade 500ms ease 200ms 1 normal forwards",
        cloud: "cloud 120s linear infinite",
        marker: "marker 4s ease-out infinite",
        plane: "plane 30s linear infinite",
        "plane-shadow": "plane-shadow 30s linear infinite",
        "line-shadow": "line-shadow 15s linear infinite",
      },
      keyframes: ({ theme }) => ({
        "slide-up-fade": {
          "0%": {
            opacity: "0",
            transform: "translate(-50%, -50%) translateY(80px)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(-50%, -50%) translateY(0)",
          },
        },
        disappear: {
          "90%": {
            opacity: 1,
          },
          to: {
            opacity: 0,
          },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
        reveal: {
          "0%": {
            opacity: 0,
            filter: "brightness(1) blur(15px)",
            scale: "1.0125",
          },
          "10%": { opacity: 1, filter: "brightness(1.25) blur(10px)" },
          "100%": { opacity: 1, filter: "brightness(1) blur(0)", scale: "1" },
        },
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
        "line-shadow": {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(100%)",
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
        cloud: {
          "0%": {
            transform: "translate(-350px, -350px)",
          },
          "25%": {
            transform: "translate(350px, 350px)",
          },
          "50%": {
            transform: "translate(600px, -350px)",
          },
          "75%": {
            transform: "translate(-400px, 350px)",
          },
          "100%": {
            transform: "translate(-350px, -350px)",
          },
        },
        marker: {
          "0%": {
            transform: "translate(-50%, -50%) scale(1)",
            opacity: "1",
          },
          "35%": {
            transform: "translate(-50%, -50%) scale(6)",
            opacity: "0",
          },
          "100%": {
            transform: "translate(-50%, -50%) scale(6)",
            opacity: "0",
          },
        },
        plane: {
          "0%": {
            transform: "translate(50px, 350px) rotate(30deg)",
          },
          "40%": {
            transform: "translate(300px, -60px) rotate(30deg)",
          },
          "100%": {
            transform: "translate(300px, -60px) rotate(30deg)",
          },
        },
        "plane-shadow": {
          "0%": {
            transform: "translate(50px, 410px) rotate(30deg)",
          },
          "40%": {
            transform: "translate(300px, -20px) rotate(30deg)",
          },
          "100%": {
            transform: "translate(300px, -20px) rotate(30deg)",
          },
        },
      }),
      gridTemplateRows: {
        "max-1": "repeat(1, minmax(0, max-content))",
      },
      height: {
        "dynamic-screen": "100dvh",
      },
      minHeight: {
        "dynamic-screen": "100dvh",
      },
      maxHeight: {
        "dynamic-screen": "100dvh",
      },
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
        marker: "0px 3px 7.5px rgba(0, 0, 0, 0.25)",
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
            "spacing.60"
          )}) min(${theme("screens.sm")},100%) minmax(auto,${theme(
            "spacing.60"
          )}) 1fr`,
        },
        ".layout-craft": {
          "grid-template-columns": `1fr minmax(auto,${theme(
            "spacing.80"
          )}) min(${theme("screens.md")},100%) minmax(auto,${theme(
            "spacing.80"
          )}) 1fr`,
        },
      });
    }),
    require("@tailwindcss/forms"),
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
