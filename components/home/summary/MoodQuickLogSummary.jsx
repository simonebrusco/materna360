import React, { useEffect, useState } from "react";

ai_main_d2bddf17272b
import { safeGet, hasWindow } from "../../../lib/utils/safeStorage";

import { safeGet, isBrowser } from "@/lib/utils/safeStorage";
main

export default function MoodQuickLogSummary(){
  const [count, setCount] = useState(0);
  const [loaded, setLoaded] = useState(false);
  useEffect(()=>{
    try{

ai_main_d2bddf17272b
      if(!hasWindow) return;
      const raw = safeGet('m360:moods');
      if(raw){
        try{ const parsed = JSON.parse(raw); setCount(Array.isArray(parsed)? parsed.length : 0); }catch{}
      }

      if(!isBrowser) return;
      const parsed = safeGet('m360:moods', []);
      setCount(Array.isArray(parsed)? parsed.length : 0);
main
    }catch{}
    setLoaded(true);
  },[]);
  return (
    <article className="block" aria-label="Humor e Emoções">
      <h3>Humor e Emoções</h3>
      {!loaded ? (<div className="motd-skeleton" style={{width:'50%'}} />) : (<p className="small">Registros: {count}</p>)}
      <div style={{marginTop:8}}>
        <a className="btn btn-primary" href="/eu360?view=humor">Abrir</a>
        <a className="btn btn-ghost" href="/eu360?view=humor" style={{marginLeft:8}}>Ver mais</a>
      </div>
    </article>
  );
}
