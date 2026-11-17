import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        paper: "#FFFFFF",
        mist: "#F4F4F0",
        line: "#E3E3DD",
        muted: "#6B6B63",
        volt: "#CDFF3D",
        success: {
          DEFAULT: "#067647",
          soft: "#ECFDF3",
        },
        error: {
          DEFAULT: "#D92D20",
          soft: "#FEF3F2",
        },
      },
      fontFamily: {
        display: ["var(--font-anton)", "Arial Narrow", "Arial", "sans-serif"],
        body: ["var(--font-inter)", "Arial", "sans-serif"],
      },
      fontSize: {
        "d-xl": ["72px", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "d-xl-m": ["44px", { lineHeight: "1", letterSpacing: "-0.02em" }],
        "d-l": ["56px", { lineHeight: "1" }],
        "d-l-m": ["36px", { lineHeight: "1" }],
        "d-m": ["40px", { lineHeight: "1.05", letterSpacing: "-0.01em" }],
        "d-m-m": ["30px", { lineHeight: "1.05", letterSpacing: "-0.01em" }],
        h2: ["32px", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "h2-m": ["24px", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        h3: ["24px", { lineHeight: "1.2" }],
        "h3-m": ["20px", { lineHeight: "1.2" }],
        body: ["16px", { lineHeight: "1.5" }],
        small: ["14px", { lineHeight: "1.5" }],
        caption: ["12px", { lineHeight: "1.4", letterSpacing: "0.04em" }],
        micro: ["10.5px", { lineHeight: "1", letterSpacing: "0.12em" }],
        meta: ["13px", { lineHeight: "1.5" }],
        step: ["13px", { lineHeight: "1", letterSpacing: "0.04em" }],
        price: ["20px", { lineHeight: "1.2" }],
        "price-m": ["18px", { lineHeight: "1.2" }],
        "card-price": ["15px", { lineHeight: "1.4" }],
        logo: ["26px", { lineHeight: "1", letterSpacing: "0.01em" }],
        "logo-m": ["20px", { lineHeight: "1", letterSpacing: "0.01em" }],
        btn: ["14px", { lineHeight: "1", letterSpacing: "0.04em" }],
      },
      maxWidth: {
        frame: "1440px",
        content: "1280px",
        form: "640px",
        prose: "520px",
        summary: "380px",
        sheet: "760px",
      },
      borderRadius: {
        none: "0",
        input: "6px",
        pill: "999px",
        sheet: "14px",
      },
      borderWidth: {
        3: "3px",
      },
      height: {
        18: "4.5rem",
        hero: "620px",
        "hero-m": "540px",
      },
      boxShadow: {
        sheet: "0 24px 64px rgba(10,10,10,0.18)",
      },
      aspectRatio: {
        product: "4 / 5",
        wide: "21 / 9",
        line: "96 / 120",
      },
      scale: {
        103: "1.03",
      },
    },
  },
  plugins: [],
};

export default config;
