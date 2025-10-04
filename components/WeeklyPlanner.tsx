"use client";
import * as React from "react";
import { COLORS, RADIUS, FONT_STACK, SHADOW } from "../lib/ui/tokens";

export default function WeeklyPlanner() {
  const [completed, setCompleted] = React.useState<boolean[]>([false, false, false, false, false, false, false]);
  const days = ["S", "T", "Q", "Q", "S", "S", "D"];

  function toggle(i: number) {
    const newList = [...completed];
    newList[i] = !newList[i];
    setCompleted(newList);
  }

  return (
    <div
      style={{
        background: COLORS.white,
        borderRadius: RADIUS,
        boxShadow: SHADOW,
        padding: 16,
        fontFamily: FONT_STACK,
      }}
    >
      <strong style={{ color: COLORS.secondary }}>Planner da semana</strong>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
        {days.map((d, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            style={{
              background: completed[i] ? COLORS.primary : COLORS.light,
              color: completed[i] ? COLORS.white : COLORS.secondary,
              border: "none",
              borderRadius: "50%",
              width: 36,
              height: 36,
              cursor: "pointer",
              fontWeight: 600,
            }}
            aria-pressed={completed[i]}
          >
            {d}
          </button>
        ))}
      </div>
      <p style={{ marginTop: 12, color: COLORS.accent }}>
        {completed.filter(Boolean).length}/7 dias concluídos 💖
      </p>
    </div>
  );
}
