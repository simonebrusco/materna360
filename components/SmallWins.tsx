"use client";
import { useEffect, useState } from "react";
export default function SmallWins(){
  const [msg,setMsg]=useState<string|null>(null);
  useEffect(()=>{
    const h=(e:any)=>{
      const type=e.detail?.type;
      const map: Record<string,string> = {
        mood:"Você registrou como se sente 🌿",
        planner:"Anotação salva no Planner ✨",
        task:"Pronto! Tarefa concluída 💪",
      };
      setMsg(map[type]||"Feito! Ótimo passo 💗");
      setTimeout(()=>setMsg(null),2200);
    };
    window.addEventListener("m360:win", h as any);
    return ()=>window.removeEventListener("m360:win", h as any);
  },[]);
  if(!msg) return null;
  return <div className="toast">{msg}</div>;
}
