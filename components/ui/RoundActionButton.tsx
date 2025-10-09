"use client";
import React from "react";

type Props = {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  href?: string;
  badgeCount?: number;
  variant?: "primary" | "secondary"; // NEW
  ariaLabel?: string;
};
export default function RoundActionButton({
  label, icon, onClick, href, badgeCount, variant = "secondary", ariaLabel
}: Props) {
  const base =
    "group relative flex flex-col items-center gap-2 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6C4AB6] transition";
  const circle =
    "relative grid place-items-center w-[64px] h-[64px] rounded-full shadow-md";
  const circlePrimary =
    "bg-[#FF005E] text-white border border-transparent";
  const circleSecondary =
    "bg-white text-[#2F3A56] border border-black/10";
  const labelCls = "text-[12px] leading-[14px] text-[#2F3A56]";

  const ButtonBody = (
    <div className={base}>
      <span className={`${circle} ${variant === "primary" ? circlePrimary : circleSecondary}`}>
        {badgeCount ? (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#FF005E] text-white text-[10px] leading-[18px] text-center">
            {badgeCount}
          </span>
        ) : null}
        <span className="text-[22px]">{icon}</span>
      </span>
      <span className={labelCls}>{label}</span>
    </div>
  );

  if (href) {
    return (
      <a href={href} aria-label={ariaLabel || label} className="active:scale-[.98]">
        {ButtonBody}
      </a>
    ) as any;
  }
  return (
    <button type="button" aria-label={ariaLabel || label} onClick={onClick} className="active:scale-[.98]">
      {ButtonBody}
    </button>
  );
}
