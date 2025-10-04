"use client";
import * as React from "react";
import { COLORS, RADIUS, FONT_STACK, SHADOW } from "../lib/ui/tokens";
import { hoverLift, MOTION_OK } from "../lib/ui/motion";

export default function PremiumBanner(){
  const [lift, setLift] = React.useState(false);
  return (
    <div
      onMouseEnter={() => MOTION_OK && setLift(true)}
      onMouseLeave={() => setLift(false)}
      style={{
        ...hoverLift,
        transform: lift ? "translateY(-1px)" : "translateY(0)",
        boxShadow: lift ? "0 12px 32px rgba(47,58,86,0.12)" : "0 8px 28px rgba(47,58,86,0.08)",
        borderRadius:20, padding:18, color:COLORS.white,
        background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`,
        fontFamily: FONT_STACK
      }}>
      <div style={{display:"grid", gap:6}}>
        <strong style={{fontSize:16}}>Materna360+ 💎</strong>
        <span style={{opacity:.95}}>
          IA avançada, conteúdos exclusivos e mentoria com desconto. Sua evolução emocional e familiar em um só toque.
        </span>
        <div>
          <button style={{
            marginTop:8, background:"#fff", color:COLORS.secondary, border:0,
            padding:"10px 14px", borderRadius:999, cursor:"pointer", fontWeight:600
          }}>Ver benefícios</button>
        </div>
      </div>
    </div>
  );
}
