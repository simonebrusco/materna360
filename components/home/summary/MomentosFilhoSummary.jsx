import React, { useEffect, useState } from "react";
import { safeGet, hasWindow } from "../../../lib/utils/safeStorage";

export default function MomentosFilhoSummary(){
  const [count, setCount] = useState(0);
  const [loaded, setLoaded] = useState(false);
  useEffect(()=>{
    try{
      if(!hasWindow) return;
      const raw = safeGet('m360:connections');
      if(raw){ try{ const arr = JSON.parse(raw); setCount(Array.isArray(arr)? arr.length : 0); }catch{} }
    }catch{}
    setLoaded(true);
  },[]);
  return (
    <article className="block" aria-label="Momentos com Meu Filho">
      <h3>Momentos com Meu Filho</h3>
      {!loaded ? (<div className="motd-skeleton" style={{width:'55%'}} />) : (<p className="small">Momentos: {count}</p>)}
      <div style={{marginTop:8}}>
        <a className="btn btn-primary" href="/planner?tab=kids">Abrir</a>
        <a className="btn btn-ghost" href="/eu360?view=momentos" style={{marginLeft:8}}>Ver mais</a>
      </div>
    </article>
  );
}
