import React, { useEffect, useState } from "react";
import { safeGet, isBrowser } from "@/lib/utils/safeStorage";

export default function ChecklistTodaySummary(){
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(3);
  const [loaded, setLoaded] = useState(false);
  useEffect(()=>{
    try{
      if(!isBrowser) return;
      const today = new Date().toISOString().slice(0,10);
      const parsed = safeGet(`m360:microtasks:${today}`, null);
      if(parsed){
        const c = Number(!!parsed?.water) + Number(!!parsed?.stretch) + Number(!!parsed?.play);
        setCount(c); setTotal(3);
      }
    }catch{}
    setLoaded(true);
  },[]);
  const pct = Math.round((count/Math.max(1,total))*100);
  return (
    <article className="block" aria-label="Checklist do dia">
      <h3>Checklist do dia</h3>
      {!loaded ? (
        <div className="motd-skeleton" style={{width:'50%'}} />
      ) : (
        <p className="small">{count} de {total} concluídos · {pct}%</p>
      )}
      <div style={{marginTop:8}}>
        <a className="btn btn-primary" href="/planner?tab=casa">Abrir</a>
        <a className="btn btn-ghost" href="/planner?tab=casa" style={{marginLeft:8}}>Ver mais</a>
      </div>
    </article>
  );
}
