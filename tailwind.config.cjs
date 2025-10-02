/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx,mdx}",
    "./components/**/*.{ts,tsx,js,jsx,mdx}",
    "./src/**/*.{ts,tsx,js,jsx,mdx}"
  ],
  safelist: [
    "bg-white", "rounded-2xl", "shadow-sm", "ring-1", "ring-gray-200",
    "p-4", "p-6", "space-y-4", "space-y-6",
    "text-gray-900", "text-gray-600", "text-sm", "text-base", "text-lg"
  ],
  theme: { extend: {} },
  plugins: []
};
