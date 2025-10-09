"use client";

import type React from "react";

type Props = {
  label: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  badgeCount?: number;
  variant?: "primary" | "secondary";
  ariaLabel?: string;
  className?: string;
};

export default function RoundActionButton({
  label,
  icon,
  href,
  onClick,
  badgeCount,
  variant = "secondary",
  ariaLabel,
  className = "",
}: Props) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-4 h-10 text-sm font-medium bg-pink-50 hover:bg-pink-100 text-pink-700 ring-1 ring-pink-200 hover:ring-pink-300 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400";
  const iconWrap = "w-5 h-5 inline-flex items-center justify-center";

  const Inner = (
    <span className={`${base} ${className}`}>
      {badgeCount ? (
        <span className="sr-only">{badgeCount}</span>
      ) : null}
      <span className={iconWrap} aria-hidden>{icon}</span>
      <span>{label}</span>
    </span>
  );

  if (href) {
    return (
      <a href={href} aria-label={ariaLabel || label} className="active:scale-[.98] transition-transform">
        {Inner}
      </a>
    ) as any;
  }

  return (
    <button type="button" onClick={onClick} aria-label={ariaLabel || label} className="active:scale-[.98] transition-transform">
      {Inner}
    </button>
  );
}
