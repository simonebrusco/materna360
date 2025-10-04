"use client";
import * as React from "react";
import { COLORS, RADIUS, SHADOW, FONT_STACK } from "../lib/ui/tokens";

export default function WellbeingBlock(){
  const [minutes,setMinutes]=React.useState(0);
  return (
    <div style={{background:COLORS.white,borderRadius:20,boxShadow:"0 8px 28px rgba(47,58,86,0.08)",padding:16,display:"grid",gap:12,fontFamily:FONT_STACK}}>
      <h3 style={{margin:0,color:COLORS.secondary,fontWeight:600,fontSize:16,letterSpacing:".2px"}}>Seu momento hoje</h3>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        <button onClick={()=>setMinutes(m=>m+2)} style={{background:COLORS.primary,color:COLORS.white,border:0,padding:"10px 14px",borderRadius:999,fontWeight:600,cursor:"pointer"}}>Respirar (2 min)</button>
        <button style={{background:COLORS.white,color:COLORS.secondary,border:`1px solid ${COLORS.secondary}`,padding:"10px 14px",borderRadius:999,cursor:"pointer"}}>Áudio relaxante</button>
        <button style={{background:COLORS.white,color:COLORS.secondary,border:`1px solid ${COLORS.secondary}`,padding:"10px 14px",borderRadius:999,cursor:"pointer"}}>Diário de gratidão</button>
      </div>
      <p style={{margin:0,color:COLORS.secondary,opacity:.9}}>Você se cuidou <b>{minutes} min</b> hoje. Continue 💗</p>
    </div>
  );
}
