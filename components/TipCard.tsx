"use client";
import * as React from "react";
import { COLORS, RADIUS, SHADOW, FONT_STACK } from "../lib/ui/tokens";

export default function TipCard(){
  return (
    <div style={{background:COLORS.white,borderRadius:20,boxShadow:"0 8px 28px rgba(47,58,86,0.08)",padding:16,display:"grid",gap:8,fontFamily:FONT_STACK}}>
      <h3 style={{margin:0,color:COLORS.secondary,fontWeight:600,fontSize:16,letterSpacing:".2px"}}>Dica rápida de hoje</h3>
      <p style={{margin:0,color:COLORS.secondary,opacity:.9}}>“Antes de corrigir, conecte: valide o sentimento e só depois oriente.”</p>
      <button style={{background:COLORS.primary,color:COLORS.white,border:0,padding:"10px 14px",borderRadius:999,fontWeight:600,cursor:"pointer"}}>Ver dica completa</button>
    </div>
  );
}
