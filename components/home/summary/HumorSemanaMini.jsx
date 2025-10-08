import React, { useEffect, useState } from "react";

ai_main_d2bddf17272b
import { safeGet, hasWindow } from "../../../lib/utils/safeStorage";

import { safeGet, isBrowser } from "@/lib/utils/safeStorage";
main

export default function HumorSemanaMini(){
  const [avg, setAvg] = useState(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(()=>{
    try{

ai_main_d2bddf17272b
      if(!hasWindow) return;
      const raw = safeGet('m360:moods');
      if(raw){
        try{
          const arr = JSON.parse(raw);
          if(Array.isArray(arr) && arr.length){
            const last7 = arr.slice(-7);
            const m = last7.reduce((s,a)=> s + (Number(a?.mood)||0), 0) / last7.length;
            setAvg(Math.round(m*10)/10);
          }
        }catch{}

      if(!isBrowser) return;
      const arr = safeGet('m360:moods', []);
      if(Array.isArray(arr) && arr.length){
        const last7 = arr.slice(-7);
        const m = last7.reduce((s,a)=> s + (Number(a?.mood)||0), 0) / last7.length;
        setAvg(Math.round(m*10)/10);
main
      }
    }catch{}
    setLoaded(true);
  },[]);
  return (
    <article className="block" aria-label="Humor da Semana">
      <h3>Humor da Semana</h3>
      {!loaded ? (<div className="motd-skeleton" style={{width:'40%'}} />) : (<p className="small">Média: {avg ?? '—'}</p>)}
      <div style={{marginTop:8}}>
        <a className="btn btn-primary" href="/eu360?view=humor">Abrir</a>
        <a className="btn btn-ghost" href="/eu360?view=humor" style={{marginLeft:8}}>Ver mais</a>
      </div>
    </article>
  );
}
