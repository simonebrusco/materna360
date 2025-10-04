"use client";
import * as React from "react";
import { COLORS, RADIUS, SHADOW, FONT_STACK } from "../lib/ui/tokens";
import { hoverLift, MOTION_OK } from "../lib/ui/motion";

export default function InsightsCard(){
  // placeholders; depois conectamos com dados reais
  const minutes = 40; // autocuidado
  const acts = 3;     // atividades feitas
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
      <strong style={{color:COLORS.secondary}}>Seu resumo da semana</strong>
      <p style={{margin:0, color:COLORS.secondary, opacity:.9}}>
        Você dedicou <b>{minutes} minutos</b> a você e realizou <b>{acts}</b> atividades com seu(s) filho(s).
        Isso é amor em ação 💕
      </p>
      <div style={{height:8, background:COLORS.light, borderRadius:999, overflow:"hidden"}}>
        <div style={{width:`${Math.min((acts/7)*100,100)}%`, height:"100%", background:COLORS.primary}} />
      </div>
    </div>
  );
}
