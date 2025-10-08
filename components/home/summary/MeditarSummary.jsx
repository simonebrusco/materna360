import React, { useEffect, useState } from "react";

ai_main_d2bddf17272b
import { safeGet, hasWindow } from "../../../lib/utils/safeStorage";

import { safeGet, isBrowser } from "@/lib/utils/safeStorage";
main

export default function MeditarSummary(){
  const [minutes, setMinutes] = useState(0);
  const [loaded, setLoaded] = useState(false);
  useEffect(()=>{
    try{

ai_main_d2bddf17272b
      if(!hasWindow) return;
      const raw = safeGet('m360:activities');
      if(raw){
        try{
          const arr = JSON.parse(raw);
          if(Array.isArray(arr)){
            const mins = arr.filter(a=>a && a.type==='meditation').reduce((s,a)=> s + (Number(a.duration)||0), 0);
            setMinutes(mins);
          }
        }catch{}

      if(!isBrowser) return;
      const arr = safeGet('m360:activities', []);
      if(Array.isArray(arr)){
        const mins = arr.filter(a=>a && a.type==='meditation').reduce((s,a)=> s + (Number(a.duration)||0), 0);
        setMinutes(mins);
main
      }
    }catch{}
    setLoaded(true);
  },[]);
  return (
    <article className="block" aria-label="Meditar">
      <h3>Meditar</h3>
      {!loaded ? (<div className="motd-skeleton" style={{width:'40%'}} />) : (<p className="small">Minutos: {minutes}</p>)}
      <div style={{marginTop:8}}>
        <a className="btn btn-primary" href="/cuidar?view=meditar">Abrir</a>
        <a className="btn btn-ghost" href="/cuidar?view=meditar" style={{marginLeft:8}}>Ver mais</a>
      </div>
    </article>
  );
}
