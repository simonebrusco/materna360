module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  safelist: [
    // Arbitrary values used in Quad Cards / buttons / transitions
    "shadow-[0_8px_30px_rgba(0,0,0,0.06)]",
    "grid-rows-[0fr]",
    "grid-rows-[1fr]",
    "transition-[grid-template-rows,opacity,margin]",
    "bg-white/85",
    "drop-shadow-[0_1px_1px_rgba(0,0,0,0.12)]",
  ],
  plugins: [],
};
