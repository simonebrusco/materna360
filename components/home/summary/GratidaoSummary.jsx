import React, { useEffect, useState } from "react";
import { safeGet } from "@/lib/utils/safeStorage";

export default function GratidaoSummary(){
  const [count, setCount] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(()=>{
    try{
      const arr = safeGet('m360:gratitude', []);
      setCount(Array.isArray(arr)? arr.length : 0);
    }catch{}
    setLoaded(true);
  },[]);

  return (
    <article className="block" aria-label="Gratidão">
      <h3>Gratidão</h3>
      {!loaded ? (<div className="motd-skeleton" style={{width:'45%'}} />) : (<p className="small">Registros: {count}</p>)}
      <div style={{marginTop:8}}>
        <a className="btn btn-primary" href="/eu360?view=gratidao">Abrir</a>
        <a className="btn btn-ghost" href="/eu360?view=gratidao" style={{marginLeft:8}}>Ver mais</a>
      </div>
    </article>
  );
}
