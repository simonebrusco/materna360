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
  ],
  theme: {
    extend: {
      colors: {
        brand: {
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
        }
      }
    },
  },
  plugins: [],
};
