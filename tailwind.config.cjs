/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "bg-white","rounded-2xl","shadow-sm","ring-1","ring-gray-200",
    "p-4","p-6","space-y-4","space-y-6",
    "text-gray-900","text-gray-600","text-sm","text-base","text-lg",
    // brand safelist
    "bg-brand-600","hover:bg-brand-500","text-brand-700","ring-brand-200",
    "bg-accent-50","text-accent-700",
    // coral palette used in UI
    "bg-coral","hover:bg-coral-hover","active:bg-coral-active","text-coral","border-coral","bg-coral-light","text-grayMid",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1rem",
        md: "1rem",
        lg: "1.25rem",
        xl: "1.5rem",
      },
      screens: {
        sm: "100%",
        md: "640px",
        lg: "864px",
        xl: "1120px",
      },
    },
    screens: {
      sm: "360px",
      md: "600px",
      lg: "900px",
      xl: "1280px",
    },
    extend: {
      boxShadow: {
        card: "0 10px 24px rgba(47,58,86,0.06), 0 2px 6px rgba(249,201,183,0.18)",
        cta: "0 8px 16px rgba(255,111,97,0.24)",
      },
      colors: {
        // Design system tokens via CSS variables
        brand: {
          navy: "var(--brand-navy)",
          coral: "var(--brand-coral)",
          50:  "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          300: "#FDBA74",
          400: "#FB923C",
          500: "#F97316",  // warm orange
          600: "#EA580C",
          700: "#C2410C",
          800: "#9A3412",
          900: "#7C2D12"
        },
        accent: {
          peach: "var(--accent-peach)",
          50:  "#F5F3FF",
          100: "#EDE9FE",
          200: "#DDD6FE",
          300: "#C4B5FD",
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",  // purple
          700: "#6D28D9",
          800: "#5B21B6",
          900: "#4C1D95"
        },
        surface: {
          bg: "var(--bg)",
          soft: "var(--bg-soft)",
        },
        ink: {
          DEFAULT: "var(--text)",
          muted: "var(--text-muted)",
        },
        border: "var(--border)",
        coral: {
          DEFAULT: "#FF6F61",
          hover: "#FF786B",
          active: "#E85D51",
          light: "#FF8C7F",
        },
        neutral: "#AD8567",
        lavender: "#7A6FF0",
        charcoal: "#4B4B4B",
        grayMid: "#6B6B6B",
        offwhite: "#FAFAF8",
        mint: "#6EC5A3",
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },
      transitionTimingFunction: {
        "out-soft": "cubic-bezier(0.2, 0, 0, 1)",
      },
      transitionDuration: {
        200: "200ms",
        250: "250ms",
        300: "300ms",
      },
    },
  },
  plugins: [],
};
