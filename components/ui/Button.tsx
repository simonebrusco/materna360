"use client";

import * as React from "react";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "md";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

const base = [
  "inline-flex items-center justify-center",
  "rounded-xl md:rounded-2xl",
  "transition-colors duration-200 ease-out-soft",
  "focus:outline-none focus-visible:outline-2 focus-visible:outline-[color:var(--brand-coral)] focus-visible:outline-offset-2",
  "disabled:opacity-50 disabled:pointer-events-none",
  "min-h-11 min-w-11 select-none",
].join(" ");

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    "bg-[color:var(--brand-coral)] text-white",
    "hover:opacity-95 active:opacity-90",
    "shadow-sm hover:shadow-cta",
  ].join(" "),
  secondary: [
    "bg-transparent",
    "border border-[color:var(--brand-coral)]",
    "text-[color:var(--brand-navy)]",
    "hover:bg-[color:var(--brand-coral)]/5 active:bg-[color:var(--brand-coral)]/10",
  ].join(" "),
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-11 px-4 text-sm",
  md: "h-11 md:h-12 px-5 text-sm md:text-base",
};

export default function Button({ variant = "primary", size = "md", className = "", ...props }: Props) {
  return (
    <button className={[base, variantClasses[variant], sizeClasses[size], className].filter(Boolean).join(" ")} {...props} />
  );
}
