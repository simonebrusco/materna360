"use client";
import * as React from "react";

type Props = { className?: string };

const SRC = process.env.NEXT_PUBLIC_BRAND_LOGO || ""; // optional URL for the official SVG later

export default function Brand({ className = "" }: Props) {
  if (SRC) {
    // If an official logo URL is provided later, render it and bail out.
    return (
      <img
        src={SRC}
        alt="Materna360"
        className={`block h-7 md:h-8 w-auto object-contain opacity-95 ${className}`}
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
    );
  }

  // Fallback: premium typed wordmark (no assets)
  return (
    <span
      className={`inline-flex items-baseline gap-1 leading-none select-none ${className}`}
      aria-label="Materna360"
    >
      <span
        className="font-display text-[20px] md:text-[22px] font-semibold tracking-[-0.01em]"
        style={{ color: "var(--brand-navy)" }}
      >
        Materna
      </span>
      <span
        className="inline-block h-[10px] w-[10px] rounded-full translate-y-[2px]"
        style={{ backgroundColor: "var(--brand-coral)" }}
        aria-hidden="true"
      />
      <span
        className="font-display text-[20px] md:text-[22px] font-semibold tracking-[-0.01em]"
        style={{ color: "var(--brand-navy)" }}
      >
        360
      </span>
    </span>
  );
}
