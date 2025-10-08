import React, { useEffect, useState } from "react";

ai_main_d2bddf17272b
import { safeGet, hasWindow } from "../../../lib/utils/safeStorage";

import { safeGet, isBrowser } from "@/lib/utils/safeStorage";
main

export default function ConquistasMini(){
  const [badges, setBadges] = useState(0);
  const [loaded, setLoaded] = useState(false);
  useEffect(()=>{
    try{

ai_main_d2bddf17272b
      if(!hasWindow) return;
      const raw = safeGet('m360:badges');
      if(raw){ try{ const arr = JSON.parse(raw); setBadges(Array.isArray(arr)? arr.length : 0); }catch{} }

      if(!isBrowser) return;
      const arr = safeGet('m360:badges', []);
      setBadges(Array.isArray(arr)? arr.length : 0);
main
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
