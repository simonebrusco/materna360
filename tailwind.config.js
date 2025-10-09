/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "shadow-[0_8px_30px_rgba(0,0,0,0.06)]",
    "grid-rows-[0fr]",
    "grid-rows-[1fr]",
    "transition-[grid-template-rows,opacity,margin]",
    "bg-white/85",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
