"use client";
import { COLORS, FONT_STACK, RADIUS, SHADOW } from "../lib/ui/tokens";
import Btn from "./ui/Btn";
export default function MessageOfTheDay() {
  return (
    <div
      style={{
        background: COLORS.white,
        borderRadius: RADIUS,
        boxShadow: SHADOW,
        padding: 16,
        display: "grid",
        gap: 8,
        fontFamily: FONT_STACK,
      }}
    >
      <strong style={{ color: COLORS.secondary }}>“Mensagem do dia”</strong>
      <p style={{ margin: 0, color: COLORS.secondary, opacity: 0.9 }}>
        Comece pelo simples. Funciona.
      </p>
      <div>
        <Btn>Nova mensagem</Btn>
      </div>
    </div>
  );
}
