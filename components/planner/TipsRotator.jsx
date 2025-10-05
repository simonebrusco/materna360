"use client";
import React, { useEffect, useMemo, useState } from "react";

export default function TipsRotator({ tips = [] }){
  const items = Array.isArray(tips) && tips.length ? tips : [
    "Beba água e alongue-se 1 min.",
    "Três respirações profundas.",
    "Envie uma mensagem carinhosa pra você mesma.",
    "Caminhe 2 min e olhe o céu."
  ];
  const [idx, setIdx] = useState(0);

  useEffect(()=>{
    try {
      setIdx((prev)=> (prev + 1) % items.length);
    } catch {}
    // rotate on mount or when parent remounts via key
  }, [items.length]);

  const tip = useMemo(()=> items[idx % items.length], [items, idx]);

  return (
    <div className="card rec" style={{padding:"16px 18px", marginTop:10, display:"flex", alignItems:"center", gap:10}}>
      <span aria-hidden style={{width:8,height:8,borderRadius:999,background:"#FF005E",display:"inline-block"}} />
      <div style={{fontWeight:700, color:"#0D1B2A", marginBottom:0, opacity:.9}}>{tip}</div>
    </div>
  );
}
