"use client";
import * as React from "react";
import { COLORS, RADIUS, SHADOW, FONT_STACK } from "../lib/ui/tokens";

export default function TipCard(){
  return (
    <div style={{
      background: COLORS.white, borderRadius:RADIUS, boxShadow:SHADOW,
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
