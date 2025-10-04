"use client";
import { COLORS } from "../../lib/ui/tokens";
export default function Btn({ variant = "primary", style, ...rest }) {
  const base = {
    borderRadius: 999,
    padding: "10px 14px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "transform .25s cubic-bezier(.2,.7,.2,1)",
    transform: "translateY(0)",
    border: 0,
  };
  const map = {
    primary: { background: COLORS.primary, color: COLORS.white },
    secondary: {
      background: COLORS.white,
      color: COLORS.secondary,
      border: `1px solid ${COLORS.secondary}`,
    },
  };
  return (
    <button
      {...rest}
      style={{ ...base, ...map[variant], ...style }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    />
  );
}
