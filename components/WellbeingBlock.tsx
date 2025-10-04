"use client";
import * as React from "react";
import { COLORS, RADIUS, SHADOW, FONT_STACK } from "../lib/ui/tokens";
import { hoverLift, MOTION_OK } from "../lib/ui/motion";

export default function WellbeingBlock(){
  const [minutes, setMinutes] = React.useState(0);
  const [lift, setLift] = React.useState(false);
  function add5(){ setMinutes(m => m + 5); }

  return (
    <div
      onMouseEnter={() => MOTION_OK && setLift(true)}
      onMouseLeave={() => setLift(false)}
      style={{
        ...hoverLift,
        transform: lift ? "translateY(-1px)" : "translateY(0)",
        boxShadow: lift ? "0 12px 32px rgba(47,58,86,0.12)" : "0 8px 28px rgba(47,58,86,0.08)",
        background: COLORS.white, borderRadius: 20,
        padding: 16, display:"grid", gap:12, fontFamily: FONT_STACK
      }}>
      <strong style={{color:COLORS.secondary}}>Seu momento hoje</strong>
      <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
        <button style={btnPrimary} onClick={add5}>Respirar (2 min)</button>
        <button style={btnSecondary}>Áudio relaxante</button>
        <button style={btnSecondary}>Diário de gratidão</button>
      </div>
      <p style={{margin:0, color:COLORS.secondary, opacity:.9}}>
        Você se cuidou <b>{minutes} min</b> hoje. Continue 💗
      </p>
    </div>
  );
}

const btnPrimary = {
  background: COLORS.primary, color: COLORS.white, border:0,
  padding:"10px 14px", borderRadius:999, cursor:"pointer", fontWeight:600
} as const;

const btnSecondary = {
  background: COLORS.white, color: COLORS.secondary,
  border: `1px solid ${COLORS.secondary}`, padding:"10px 14px",
  borderRadius:999, cursor:"pointer"
} as const;
