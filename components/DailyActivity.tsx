"use client";
import * as React from "react";
import { COLORS, RADIUS, SHADOW, FONT_STACK } from "../lib/ui/tokens";

export default function DailyActivity() {
  const [activity, setActivity] = React.useState("Brincadeira com música e movimento.");
  
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
      style={{
        background: COLORS.support,
        borderRadius: RADIUS,
        boxShadow: SHADOW,
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
