import React, { useEffect, useState } from "react";
import { safeGet, isBrowser } from "@/lib/utils/safeStorage";

export default function IdeiaDoDiaSummary(){
  const [idea, setIdea] = useState("");
  const [loaded, setLoaded] = useState(false);
  useEffect(()=>{
    try{
      if(!isBrowser) return;
      const arr = safeGet('m360:activities', []);
      if(Array.isArray(arr)){
        const it = arr.find(a=>a && a.type==='idea');
        if(it && it.title) setIdea(String(it.title));
      }
    }catch{}
    setLoaded(true);
  },[]);
  return (
    <article className="block" aria-label="Ideia do Dia">
      <h3>Ideia do Dia</h3>
      {!loaded ? (<div className="motd-skeleton" style={{width:'70%'}} />) : (<p className="small">{idea || 'Sem sugestão salva'}</p>)}
      <div style={{marginTop:8}}>
        <a className="btn btn-primary" href="/descobrir?view=ideias">Abrir</a>
        <a className="btn btn-ghost" href="/descobrir?view=ideias" style={{marginLeft:8}}>Ver mais</a>
      </div>
    </article>
  );
}
