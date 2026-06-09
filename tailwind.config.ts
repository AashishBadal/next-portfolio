import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#050505",
          soft: "#0A0A0B",
          raised: "#101012",
        },
        bone: {
          DEFAULT: "#F8F8F8",
          muted: "#D8D8D6",
        },
        silver: "#C7C7C9",
        charcoal: "#1A1A1C",
        smoke: "#7A7A7E",
        steel: "#5A6470",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Fluid editorial scale
        "display-2xl": ["clamp(3.5rem, 12vw, 11rem)", { lineHeight: "0.92", letterSpacing: "-0.04em" }],
        "display-xl": ["clamp(2.75rem, 8vw, 7rem)", { lineHeight: "0.95", letterSpacing: "-0.035em" }],
        "display-lg": ["clamp(2.25rem, 5.5vw, 4.5rem)", { lineHeight: "1.0", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(1.75rem, 3.5vw, 3rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
      },
      letterSpacing: {
        tightest: "-0.045em",
        editorial: "-0.03em",
      },
      maxWidth: {
        shell: "1480px",
        prose: "62ch",
      },
      transitionTimingFunction: {
        // Custom expressive easing curves
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-quint": "cubic-bezier(0.22, 1, 0.36, 1)",
        "in-out-quint": "cubic-bezier(0.83, 0, 0.17, 1)",
      },
      keyframes: {
        "scroll-hint": {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "30%": { opacity: "1" },
          "100%": { transform: "translateY(220%)", opacity: "0" },
        },
      },
      animation: {
        "scroll-hint": "scroll-hint 2.2s cubic-bezier(0.16,1,0.3,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
