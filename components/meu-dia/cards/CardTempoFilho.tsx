"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "../../ui/Icon";
import { getAll } from "../../../lib/storage";

export default function CardTempoFilho(){
  const [count, setCount] = useState(0);

  useEffect(()=>{
    try{
      const all = getAll();
      const acts = Array.isArray(all?.actions) ? all.actions : [];
      const moments = acts.filter((a:any)=>a?.type==='kids_moment' || a?.type==='play');
      setCount(moments.length);
    }catch{ setCount(0); }
  },[]);

  function win(){ try{ window.dispatchEvent(new CustomEvent('m360:win', { detail:{ source:'hub', action:'tempo-filho' } })); }catch{} }

  return (
    <div className="hub-card tap-scale">
      <div className="hub-card-head">
        <Icon name="kids" className="icon-20 icon-accent" />
        <div className="hub-card-titles">
          <div className="hub-card-title">Tempo com Meu Filho</div>
          <div className="hub-card-sub">Momentos especiais</div>
        </div>
      </div>
      <div className="hub-card-body">
        <div className="hub-meta">Registros: {count}</div>
      </div>
      <div className="hub-card-actions">
        <Link className="btn btn-primary" href="/" onClick={win}>Registrar</Link>
        <Link className="btn btn-outline" href="/">ver mais</Link>
      </div>
    </div>
  );
}
