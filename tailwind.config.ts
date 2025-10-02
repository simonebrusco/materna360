import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "bg-white", "rounded-2xl", "shadow-sm", "ring-1", "ring-gray-200",
    "p-4", "p-6", "space-y-4", "space-y-6",
    "text-gray-900", "text-gray-600", "text-sm", "text-base", "text-lg",
    "max-w-2xl", "mx-auto", "px-4", "sm:px-6",
    "sticky", "top-0", "backdrop-blur"
  ],
  theme: { extend: {} },
  plugins: [],
}

export default config
