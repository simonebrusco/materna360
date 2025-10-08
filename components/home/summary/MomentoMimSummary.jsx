import React, { useEffect, useState } from "react";
import { safeGet, isBrowser } from "@/lib/utils/safeStorage";

export default function MomentoMimSummary(){
  const [count, setCount] = useState(0);
  const [loaded, setLoaded] = useState(false);
  useEffect(()=>{
    try{
      if(!isBrowser) return;
      const arr = safeGet('m360:activities', []);
      if(Array.isArray(arr)){
        const n = arr.filter(a=>a && a.type==='pause').length;
        setCount(n);
      }
    }catch{}
    setLoaded(true);
  },[]);
  return (
    <article className="block" aria-label="Momento para Mim">
      <h3>Momento para Mim</h3>
      {!loaded ? (<div className="motd-skeleton" style={{width:'40%'}} />) : (<p className="small">Pausas: {count}</p>)}
      <div style={{marginTop:8}}>
        <a className="btn btn-primary" href="/cuidar?view=pausa">Abrir</a>
        <a className="btn btn-ghost" href="/cuidar?view=pausa" style={{marginLeft:8}}>Ver mais</a>
      </div>
    </article>
  );
}
