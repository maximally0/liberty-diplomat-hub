import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/pages/**/*.{ts,tsx}", "./client/components/**/*.{ts,tsx}", "./client/app/**/*.{ts,tsx}", "./client/src/**/*.{ts,tsx}", "./client/index.html"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
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
        playful: {
          purple: "#A78BFA",
          pink: "#F472B6",
          blue: "#60A5FA",
          cyan: "#22D3EE",
          yellow: "#FCD34D",
          orange: "#FB923C",
          lime: "#84CC16",
          lavender: "#DDD6FE",
          peach: "#FED7AA",
          mint: "#A7F3D0",
          sky: "#BAE6FD",
          rose: "#FECDD3",
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "float": {
          "0%, 100%": {
            transform: "translateY(0px) translateX(0px) rotate(0deg)",
          },
          "33%": {
            transform: "translateY(-20px) translateX(10px) rotate(5deg)",
          },
          "66%": {
            transform: "translateY(-10px) translateX(-10px) rotate(-5deg)",
          },
        },
        "float-slow": {
          "0%, 100%": {
            transform: "translateY(0px) translateX(0px)",
          },
          "50%": {
            transform: "translateY(-30px) translateX(15px)",
          },
        },
        "blob": {
          "0%, 100%": {
            transform: "translate(0, 0) scale(1)",
          },
          "25%": {
            transform: "translate(20px, -20px) scale(1.1)",
          },
          "50%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "75%": {
            transform: "translate(20px, 20px) scale(1.05)",
          },
        },
        "bounce-soft": {
          "0%, 100%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(-10%)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        "wiggle": {
          "0%, 100%": {
            transform: "rotate(-3deg)",
          },
          "50%": {
            transform: "rotate(3deg)",
          },
        },
        "scale-bounce": {
          "0%, 100%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.05)",
          },
        },
        "gradient-x": {
          "0%, 100%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
        },
        "gradient-y": {
          "0%, 100%": {
            backgroundPosition: "50% 0%",
          },
          "50%": {
            backgroundPosition: "50% 100%",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "blob": "blob 7s ease-in-out infinite",
        "bounce-soft": "bounce-soft 2s infinite",
        "wiggle": "wiggle 1s ease-in-out infinite",
        "scale-bounce": "scale-bounce 2s ease-in-out infinite",
        "gradient-x": "gradient-x 3s ease infinite",
        "gradient-y": "gradient-y 3s ease infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
