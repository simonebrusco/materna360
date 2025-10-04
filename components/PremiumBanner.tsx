"use client";
import * as React from "react";
import { COLORS, RADIUS, FONT_STACK } from "../lib/ui/tokens";

export default function PremiumBanner(){
  return (
    <div style={{
      borderRadius:20,padding:18,color:"#fff",
      background:`linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`,
      fontFamily:FONT_STACK,boxShadow:"0 8px 28px rgba(47,58,86,0.08)"
    }}>
      <div style={{display:"grid",gap:6}}>
        <strong style={{fontSize:16}}>Materna360+ 💎</strong>
        <span style={{opacity:.95}}>IA avançada, conteúdos exclusivos e mentoria com desconto. Sua evolução emocional e familiar.</span>
        <div><button style={{marginTop:8,background:"#fff",color:COLORS.secondary,border:0,padding:"10px 14px",borderRadius:999,fontWeight:600,cursor:"pointer"}}>Ver benefícios</button></div>
      </div>
    </div>
  );
}
