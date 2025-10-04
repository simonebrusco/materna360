"use client";
import * as React from "react";
import { COLORS, RADIUS, SHADOW, FONT_STACK } from "../lib/ui/tokens";

export default function WellbeingBlock(){
  const [minutes, setMinutes] = React.useState(0);
  function add5(){ setMinutes(m => m + 5); }

  return (
    <div style={{
      background: COLORS.white, borderRadius: RADIUS, boxShadow: SHADOW,
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
