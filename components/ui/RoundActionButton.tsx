"use client";
import React from "react";

type Props = {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  href?: string;
  badgeCount?: number;
  className?: string;
  ariaLabel?: string;
};

export default function RoundActionButton({
  label, icon, onClick, href, badgeCount, className = "", ariaLabel
}: Props) {
  const Btn = (
    <button
      type="button"
      aria-label={ariaLabel || label}
      onClick={onClick}
      className={`group relative flex flex-col items-center gap-2 select-none
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6C4AB6]
                  active:scale-[.98] transition-transform ${className}`}
    >
      <span className="relative grid place-items-center w-[64px] h-[64px] rounded-full
                       bg-white border border-black/10 shadow-md">
        {badgeCount ? (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full
                           bg-[#FF005E] text-white text-[10px] leading-[18px] text-center">
            {badgeCount}
          </span>
        ) : null}
        <span className="text-[22px]">{icon}</span>
      </span>
      <span className="text-[12px] leading-[14px] text-[#2F3A56]">{label}</span>
    </button>
  );
  if (href) {
    // simple client nav without importing next/link to keep this file generic
    return <a href={href} aria-label={ariaLabel || label}>{Btn}</a> as any;
  }
  return Btn;
}
