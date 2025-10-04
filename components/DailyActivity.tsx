"use client";
import * as React from "react";
import { COLORS, RADIUS, SHADOW, FONT_STACK } from "../lib/ui/tokens";
import { hoverLift, MOTION_OK } from "../lib/ui/motion";

export default function DailyActivity() {
  const [activity, setActivity] = React.useState("Brincadeira com música e movimento.");
  const [lift, setLift] = React.useState(false);
  
  function refreshActivity() {
    const options = [
      "Leitura divertida de 5 minutos com expressões.",
      "Brincadeira de ritmo e palma com a criança.",
      "Desenho livre com tema 'Minha família'.",
      "Caminhada curta observando o céu.",
      "Pausa para abraço e conversa tranquila.",
    ];
    const next = options[Math.floor(Math.random() * options.length)];
    setActivity(next);
  }

  return (
    <div
      onMouseEnter={() => MOTION_OK && setLift(true)}
      onMouseLeave={() => setLift(false)}
      style={{
        ...hoverLift,
        transform: lift ? "translateY(-1px)" : "translateY(0)",
        boxShadow: lift ? "0 12px 32px rgba(47,58,86,0.12)" : "0 8px 28px rgba(47,58,86,0.08)",
        background: COLORS.support,
        borderRadius: 20,
        padding: 16,
        display: "grid",
        gap: 12,
        fontFamily: FONT_STACK,
      }}
    >
      <strong style={{ color: COLORS.secondary }}>Atividade do dia</strong>
      <p style={{ margin: 0, color: COLORS.secondary }}>{activity}</p>

      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={refreshActivity}
          style={{
            background: COLORS.primary,
            color: COLORS.white,
            border: 0,
            padding: "10px 14px",
            borderRadius: 999,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Nova sugestão
        </button>
        <button
          style={{
            background: COLORS.white,
            color: COLORS.secondary,
            border: `1px solid ${COLORS.secondary}`,
            padding: "10px 14px",
            borderRadius: 999,
            cursor: "pointer",
          }}
        >
          Salvar no Planner
        </button>
      </div>
    </div>
  );
}
