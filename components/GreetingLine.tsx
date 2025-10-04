"use client";
import * as React from "react";

type Props = { name?: string };

function timeOfDay(d=new Date()){
  const h=d.getHours();
  if(h<12) return "Bom dia";
  if(h<18) return "Boa tarde";
  return "Boa noite";
}
const MESSAGES=[
 "Pequenos momentos criam grandes memórias.",
 "Você está indo muito bem. Respire e siga.",
 "A presença vale mais do que a perfeição.",
 "Hoje, escolha leveza. Uma coisa de cada vez.",
 "Seu amor guia o ritmo. Tá tudo bem.",
 "Cuidar de você também é cuidar da família.",
 "Comece pelo simples. Funciona.",
 "Você não precisa dar conta de tudo hoje."
];
function dailyMessage(d=new Date()){
  const seed=d.toISOString().slice(0,10);
  let h=0; for(let i=0;i<seed.length;i++){ h=(h*31+seed.charCodeAt(i))>>>0; }
  return MESSAGES[h % MESSAGES.length];
}

import { COLORS } from "../lib/ui/tokens";

export default function GreetingLine({name}:Props){
  const [g,setG]=React.useState(""); const [m,setM]=React.useState("");
  React.useEffect(()=>{ setG(timeOfDay()); setM(dailyMessage()); },[]);
  return (
    <div style={{display:"grid",gap:8,color:COLORS.secondary}}>
      <h1 style={{margin:0,color:COLORS.secondary}}>{g}{name?`, ${name}`:""} 💛</h1>
      <p style={{margin:0,opacity:0.9,color:COLORS.secondary}}>{m}</p>
    </div>
  );
}
