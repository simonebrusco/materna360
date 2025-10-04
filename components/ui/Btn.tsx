"use client";
import * as React from "react";
import { COLORS } from "../../lib/ui/tokens";
import { EASE, DURATION, MOTION_OK } from "../../lib/ui/motion";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export default function Btn({ variant = "primary", style, ...rest }: Props){
  const base: React.CSSProperties = {
    borderRadius: 999,
    padding: "10px 14px",
    fontWeight: 600,
    cursor: "pointer",
    transition: `transform ${DURATION} ${EASE}, opacity ${DURATION} ${EASE}`,
    transform: "translateY(0)",
    border: 0,
  };
  const map: Record<string, React.CSSProperties> = {
    primary: { background: COLORS.primary, color: COLORS.white },
    secondary: { background: COLORS.white, color: COLORS.secondary, border: `1px solid ${COLORS.secondary}` },
    ghost: { background: "transparent", color: COLORS.secondary, border: `1px solid ${COLORS.light}` },
  };
  return (
    <button
      {...rest}
      style={{ ...base, ...map[variant], ...style }}
      onMouseEnter={(e)=>{ if(MOTION_OK) (e.currentTarget.style.transform="translateY(-1px)"); }}
      onMouseLeave={(e)=>{ (e.currentTarget.style.transform="translateY(0)"); }}
    />
  );
}
