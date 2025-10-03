"use client";

import * as React from "react";

type ButtonVariants = "primary" | "secondary" | "ghost" | "outline";
type ButtonSizes = "sm" | "md";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariants;
  size?: ButtonSizes;
  className?: string;
};

const base =
  "inline-flex items-center justify-center rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-coral)]/40 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variantClasses: Record<ButtonVariants, string> = {
  primary: "bg-[#FF6F61] text-white hover:bg-[#FF786B] active:bg-[#E85D51]",
  secondary: "bg-white text-gray-700 ring-1 ring-gray-300 hover:bg-gray-50",
  ghost: "bg-transparent text-gray-700 hover:bg-gray-50",
  outline: "bg-transparent text-gray-800 ring-1 ring-gray-300 hover:bg-gray-50",
};

const sizeClasses: Record<ButtonSizes, string> = {
  sm: "text-sm px-3 py-1.5",
  md: "text-sm sm:text-base px-4 py-2",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: Props) {
  return (
    <button
      className={[base, variantClasses[variant], sizeClasses[size], className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
