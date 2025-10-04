"use client";
import * as React from "react";
import { COLORS, RADIUS, SHADOW, FONT_STACK } from "../lib/ui/tokens";
import { hoverLift, MOTION_OK } from "../lib/ui/motion";

const QUOTES = [
 "Pequenos momentos criam grandes memórias.",
 "Você está indo muito bem. Respire e siga.",
 "A presença vale mais do que a perfeição.",
 "Hoje, escolha leveza. Uma coisa de cada vez.",
 "Seu amor guia o ritmo. Tá tudo bem.",
 "Cuidar de você também é cuidar da família.",
 "Comece pelo simples. Funciona.",
 "Você não precisa dar conta de tudo hoje.",
];

function dailyIndex(d=new Date()){
  const seed=d.toISOString().slice(0,10);
  let h=0; for(let i=0;i<seed.length;i++){ h=(h*31+seed.charCodeAt(i))>>>0; }
  return h % QUOTES.length;
}

export default function MessageOfTheDay(){
  const [idx,setIdx]=React.useState(dailyIndex());
  const [lift, setLift] = React.useState(false);
  function shuffle(){
    const next=(idx+1+Math.floor(Math.random()*(QUOTES.length-1)))%QUOTES.length;
    setIdx(next);
  }
  return (
    <div
      onMouseEnter={() => MOTION_OK && setLift(true)}
      onMouseLeave={() => setLift(false)}
      style={{
        ...hoverLift,
        transform: lift ? "translateY(-1px)" : "translateY(0)",
        boxShadow: lift ? "0 12px 32px rgba(47,58,86,0.12)" : "0 8px 28px rgba(47,58,86,0.08)",
        background:COLORS.white,
        borderRadius:20,
        padding:16,
        display:"grid",
        gap:10,
        fontFamily:FONT_STACK
      }}>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <span aria-hidden style={{
          color:COLORS.primary,fontSize:28,lineHeight:"20px",marginTop:-6
        }}>“</span>
        <strong style={{color:COLORS.secondary}}>Mensagem do dia</strong>
      </div>
      <p style={{margin:0,color:COLORS.secondary,opacity:0.9}}>{QUOTES[idx]}</p>
      <div>
        <button onClick={shuffle} style={{
          background:COLORS.primary,
          color:COLORS.white,
          border:0,
          padding:"10px 14px",
          borderRadius:999,
          cursor:"pointer",
          fontWeight:600
        }}>Nova mensagem</button>
      </div>
    </div>
  );
}
