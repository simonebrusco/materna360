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
  // Base chip styles per spec
  const chipBase =
    "inline-flex items-center gap-2 rounded-full px-3 py-2 bg-white/70 backdrop-blur-sm shadow-sm hover:bg-white transition";
  const labelCls = "text-sm font-medium text-slate-800";

  const content = (
    <span className={`relative ${chipBase} ${className}`}>
      {badgeCount ? (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#FF005E] text-white text-[10px] leading-[18px] text-center">
          {badgeCount}
        </span>
      ) : null}
      <span className="shrink-0 text-[18px]">{icon}</span>
      <span className={labelCls}>{label}</span>
    </span>
  );

  if (href) {
    return (
      <a href={href} aria-label={ariaLabel || label} className="active:scale-[.98] transition-transform">
        {content}
      </a>
    ) as any;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel || label}
      className="active:scale-[.98] transition-transform"
    >
      {content}
    </button>
  );
}
