"use client";
import * as React from "react";

type Props = { className?: string };

const REMOTE = process.env.NEXT_PUBLIC_BRAND_LOGO || ""; // optional remote URL
const LOCAL = "/Materna1000_300.svg"; // Builder asset from public/

export default function Brand({ className = "" }: Props) {
  const src = REMOTE || LOCAL;
  return (
    <img
      src={src}
      alt="Materna360"
      className={["block h-7 md:h-8 w-auto object-contain opacity-95", className].filter(Boolean).join(" ")}
      loading="eager"
      decoding="async"
      fetchPriority="high"
    />
  );
}
