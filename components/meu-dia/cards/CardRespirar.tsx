"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "../../ui/Icon";
import { getAll } from "../../../lib/storage";

export default function CardRespirar(){
  const [count, setCount] = useState(0);
  const [last, setLast] = useState<string | null>(null);

  useEffect(()=>{
    try{
      const all = getAll();
      const list = Array.isArray(all?.actions) ? all.actions : [];
      const breaths = list.filter((a:any)=>a?.type==='breath');
      setCount(breaths.length);
      setLast(breaths.length ? new Date(breaths[breaths.length-1]?.date||Date.now()).toLocaleDateString() : null);
    }catch{ setCount(0); setLast(null); }
  },[]);

  function win(){ try{ window.dispatchEvent(new CustomEvent('m360:win', { detail:{ source:'hub', action:'respirar' } })); }catch{} }

  return (
    <div className="hub-card tap-scale">
      <div className="hub-card-head">
        <Icon name="breath" className="icon-20 icon-accent" />
        <div className="hub-card-titles">
          <div className="hub-card-title">Respirar</div>
          <div className="hub-card-sub">3 respirações profundas</div>
        </div>
      </div>
      <div className="hub-card-body">
        <div className="hub-meta">Práticas: {count}{last?` · Última: ${last}`:''}</div>
      </div>
      <div className="hub-card-actions">
        <Link className="btn btn-primary" href="/cuidar" onClick={win}>Respirar agora</Link>
        <Link className="btn btn-outline" href="/cuidar">ver mais</Link>
      </div>
    </div>
  );
}
