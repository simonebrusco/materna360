"use client";
import * as React from "react";
import { COLORS, FONT_STACK, RADIUS, SHADOW } from "../lib/ui/tokens";

const MOODS = [
  { emoji: "😞", label: "Cansada" },
  { emoji: "😐", label: "Neutra" },
  { emoji: "🙂", label: "Tranquila" },
  { emoji: "😊", label: "Feliz" },
  { emoji: "🤩", label: "Radiante" },
];

export default function MoodCheck() {
  const [selected, setSelected] = React.useState<number | null>(null);
  const [message, setMessage] = React.useState<string>("");

  function handleSelect(i: number) {
    setSelected(i);
    const msg = [
      "Tudo bem. Que tal uma pausa leve agora?",
      "Um passo de cada vez, você está indo bem.",
      "Lembre-se de cuidar de você também 💛",
      "Lindo ver você se sentindo bem hoje 💗",
      "Você está iluminada! Continue assim ✨",
    ][i];
    setMessage(msg);
  }

  return (
    <div
      style={{
        background: COLORS.white,
        borderRadius: RADIUS,
        boxShadow: SHADOW,
        padding: 16,
        display: "grid",
        gap: 12,
        fontFamily: FONT_STACK,
      }}
    >
      <strong style={{ color: COLORS.secondary }}>
        Como você está se sentindo hoje?
      </strong>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {MOODS.map((m, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            style={{
              background: selected === i ? COLORS.support : COLORS.light,
              border: "none",
              borderRadius: 12,
              padding: "10px 12px",
              fontSize: 20,
              cursor: "pointer",
              transition: "0.3s",
            }}
            aria-label={m.label}
            title={m.label}
          >
            {m.emoji}
          </button>
        ))}
      </div>

      {message && (
        <p style={{ margin: 0, color: COLORS.secondary, opacity: 0.9 }}>
          {message}
        </p>
      )}
    </div>
  );
}
