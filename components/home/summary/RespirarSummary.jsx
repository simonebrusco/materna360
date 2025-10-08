import React, { useEffect, useState } from "react";
import { safeGet, isBrowser } from "@/lib/utils/safeStorage";

export default function RespirarSummary(){
  const [sessions, setSessions] = useState(0);
  const [loaded, setLoaded] = useState(false);
  useEffect(()=>{
    try{
      if(!isBrowser) return;
      const arr = safeGet('m360:activities', []);
      if(Array.isArray(arr)){
        const n = arr.filter(a=>a && a.type==='breath').length;
        setSessions(n);
      }
    }catch{}
    setLoaded(true);
  },[]);
  return (
    <article className="block" aria-label="Respirar">
      <h3>Respirar</h3>
      {!loaded ? (<div className="motd-skeleton" style={{width:'40%'}} />) : (<p className="small">Sessões: {sessions}</p>)}
      <div style={{marginTop:8}}>
        <a className="btn btn-primary" href="/cuidar?view=respirar">Abrir</a>
        <a className="btn btn-ghost" href="/cuidar?view=respirar" style={{marginLeft:8}}>Ver mais</a>
      </div>
    </article>
  );
}
