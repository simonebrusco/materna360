"use client";
import { COLORS, FONT_STACK } from "../lib/ui/tokens";
export default function GreetingLine({ name = "Simone" }) {
  return (
    <div style={{ fontFamily: FONT_STACK }}>
      <h2 style={{ margin: 0, color: COLORS.secondary, fontSize: "clamp(18px,2.5vw,22px)" }}>
        Bom dia, {name} <span>💛</span>
      </h2>
      <p style={{ margin: "4px 0 0", color: COLORS.secondary, opacity: 0.8 }}>
        Como você está hoje?
      </p>
    </div>
  );
}
