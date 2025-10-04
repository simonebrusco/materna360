"use client";
import * as React from "react";
import { COLORS, RADIUS, SHADOW, FONT_STACK } from "../lib/ui/tokens";
import { hoverLift, MOTION_OK } from "../lib/ui/motion";

export default function TipCard(){
  const [lift, setLift] = React.useState(false);
  return (
    <div
      onMouseEnter={() => MOTION_OK && setLift(true)}
      onMouseLeave={() => setLift(false)}
      style={{
        ...hoverLift,
        transform: lift ? "translateY(-1px)" : "translateY(0)",
        boxShadow: lift ? "0 12px 32px rgba(47,58,86,0.12)" : "0 8px 28px rgba(47,58,86,0.08)",
        background: COLORS.white, borderRadius:20,
        padding:16, display:"grid", gap:8, fontFamily:FONT_STACK
      }}>
      <strong style={{color:COLORS.secondary}}>Dica rápida de hoje</strong>
      <p style={{margin:0, color:COLORS.secondary, opacity:.9}}>
        “Antes de corrigir, conecte: valide o sentimento e só depois oriente.”
      </p>
      <div style={{display:"flex", gap:8}}>
        <button style={{
          background: COLORS.primary, color: COLORS.white, border:0,
          padding:"10px 14px", borderRadius:999, cursor:"pointer", fontWeight:600
        }}>Ver dica completa</button>
      </div>
    </div>
  );
}
