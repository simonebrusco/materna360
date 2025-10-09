"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

type CircleActionProps = {
  icon: ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
  badgeCount?: number;
  isPrimary?: boolean;
  index?: number;
};

export default function CircleAction({
  icon,
  label,
  href,
  onClick,
  ariaLabel,
  badgeCount,
  isPrimary,
  index = 0,
}: CircleActionProps) {
  const core = (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.22, delay: 0.04 * index }}
      className={[
        "m360-ripple m360-focus relative flex h-16 w-16 items-center justify-center rounded-full",
        isPrimary
          ? "bg-[#FF6F61] text-white shadow-md"
          : "bg-white text-[#2F3A56] border border-[#2F3A56]/20 shadow-sm",
      ].join(" ")}
      onClick={onClick}
      aria-label={ariaLabel ?? label}
      role={href ? "link" : "button"}
    >
      {icon}
      {typeof badgeCount === "number" && badgeCount > 0 && (
        <span
          className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-[#6C4AB6] text-white text-[10px] font-semibold flex items-center justify-center"
          aria-label={`${badgeCount} new`}
        >
          {badgeCount}
        </span>
      )}
    </motion.div>
  );

  return (
    <div className="inline-flex flex-col items-center gap-1">
      {href ? (
        <Link href={href} aria-label={ariaLabel ?? label} className="inline-block">
          {core}
        </Link>
      ) : (
        core
      )}
      <span className="text-[12px] leading-none mt-1 text-[#2F3A56]">{label}</span>
    </div>
  );
}
