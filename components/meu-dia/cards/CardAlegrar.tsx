"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "../../ui/Icon";

export default function CardAlegrar(){
  const [count, setCount] = useState(0);
  const [last, setLast] = useState<string | null>(null);

  useEffect(()=>{
    try{
      const raw = typeof window !== 'undefined' ? window.localStorage.getItem('m360:gratitudes') : null;
      const list = raw ? JSON.parse(raw) : [];
      setCount(Array.isArray(list)?list.length:0);
      setLast(Array.isArray(list) && list.length ? new Date(list[list.length-1]?.date||Date.now()).toLocaleDateString() : null);
    }catch{ setCount(0); setLast(null); }
  },[]);

  function win(){ try{ window.dispatchEvent(new CustomEvent('m360:win', { detail:{ source:'hub', action:'alegrar' } })); }catch{} }

  return (
    <div className="hub-card tap-scale">
      <div className="hub-card-head">
        <Icon name="spark" className="icon-20 icon-accent" />
        <div className="hub-card-titles">
          <div className="hub-card-title">Alegrar</div>
          <div className="hub-card-sub">Um gesto de carinho por dia</div>
        </div>
      </div>
      <div className="hub-card-body">
        <div className="hub-meta">Registros: {count}{last?` · Último: ${last}`:''}</div>
      </div>
      <div className="hub-card-actions">
        <Link className="btn btn-primary" href="/eu360" onClick={win}>Expressar gratidão</Link>
        <Link className="btn btn-outline" href="/eu360">ver mais</Link>
      </div>
    </div>
  );
}
