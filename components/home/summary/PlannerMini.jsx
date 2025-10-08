import React, { useEffect, useState } from "react";
import { safeGet, hasWindow } from "../../../lib/utils/safeStorage";

export default function PlannerMini(){
  const [counts, setCounts] = useState({ home:0, kids:0, me:0 });
  const [loaded, setLoaded] = useState(false);
  useEffect(()=>{
    try{
      if(!hasWindow) return;
      const keys = ['home','kids','me'];
      const next = { home:0, kids:0, me:0 };
      keys.forEach(k=>{
        const raw = safeGet(`m360:planner.${k}`);
        if(raw){
          try{
            const parsed = JSON.parse(raw);
            next[k] = Array.isArray(parsed) ? parsed.length : (Array.isArray(parsed?.items) ? parsed.items.length : 0);
          }catch{}
        }
      });
      setCounts(next);
    }catch{}
    setLoaded(true);
  },[]);
  return (
    <article className="block" aria-label="Planner da Família">
      <h3>Planner da Família</h3>
      {!loaded ? (
        <div className="motd-skeleton" style={{width:'60%'}} />
      ) : (
        <p className="small">Casa: {counts.home} · Filhos: {counts.kids} · Eu: {counts.me}</p>
      )}
      <div style={{marginTop:8, display:'flex', gap:8, flexWrap:'wrap'}}>
        <a className="btn btn-primary" href="/planner?tab=casa">Abrir</a>
        <a className="btn btn-ghost" href="/planner?tab=kids">Ver mais</a>
      </div>
    </article>
  );
}
