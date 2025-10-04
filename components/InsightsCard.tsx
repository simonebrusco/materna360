"use client";
import * as React from "react";
import { COLORS, RADIUS, SHADOW, FONT_STACK } from "../lib/ui/tokens";

export default function InsightsCard(){
  // placeholders; depois conectamos com dados reais
  const minutes = 40; // autocuidado
  const acts = 3;     // atividades feitas

  return (
    <div style={{
      background: COLORS.white, borderRadius:RADIUS, boxShadow:SHADOW,
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
