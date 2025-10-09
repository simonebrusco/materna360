import React, { useEffect, useState } from "react";
import { safeGet } from "@/lib/utils/safeStorage";

export default function ConquistasMini(){
  const [badges, setBadges] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(()=>{
    try{
      const arr = safeGet('m360:badges', []);
      setBadges(Array.isArray(arr)? arr.length : 0);
    }catch{}
    setLoaded(true);
  },[]);

  return (
    <article className="block" aria-label="Conquistas">
      <h3>Conquistas</h3>
      {!loaded ? (<div className="motd-skeleton" style={{width:'50%'}} />) : (<p className="small">Selos: {badges}</p>)}
      <div style={{marginTop:8}}>
        <a className="btn btn-primary" href="/eu360?view=conquistas">Abrir</a>
        <a className="btn btn-ghost" href="/eu360?view=conquistas" style={{marginLeft:8}}>Ver mais</a>
      </div>
    </article>
  );
}
