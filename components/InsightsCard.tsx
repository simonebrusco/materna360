"use client";
import * as React from "react";
import { COLORS, RADIUS, SHADOW, FONT_STACK } from "../lib/ui/tokens";

export default function InsightsCard(){
  const minutes=40, acts=3;
  return (
    <div style={{background:COLORS.white,borderRadius:20,boxShadow:"0 8px 28px rgba(47,58,86,0.08)",padding:16,display:"grid",gap:8,fontFamily:FONT_STACK}}>
      <h3 style={{margin:0,color:COLORS.secondary,fontWeight:600,fontSize:16,letterSpacing:".2px"}}>Seu resumo da semana</h3>
      <p style={{margin:0,color:COLORS.secondary,opacity:.9}}>Você dedicou <b>{minutes} minutos</b> a você e fez <b>{acts}</b> atividades com seu(s) filho(s). Isso é amor em ação 💕</p>
      <div style={{height:8,background:COLORS.light,borderRadius:999,overflow:"hidden"}}>
        <div style={{width:`${Math.min(acts/7*100,100)}%`,height:"100%",background:COLORS.primary}}/>
      </div>
    </div>
  );
}
