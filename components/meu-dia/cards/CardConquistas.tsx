"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "../../ui/Icon";
import { getAll } from "../../../lib/storage";

export default function CardConquistas(){
  const [wins, setWins] = useState<number>(0);
  const [lastType, setLastType] = useState<string | null>(null);

  useEffect(()=>{
    try{
      const all = getAll();
      const acts = Array.isArray(all?.actions) ? all.actions : [];
      setWins(acts.length);
      setLastType(acts.length ? String(acts[acts.length-1]?.type||'') : null);
    }catch{ setWins(0); setLastType(null); }
  },[]);

  function win(){ try{ window.dispatchEvent(new CustomEvent('m360:win', { detail:{ source:'hub', action:'conquista' } })); }catch{} }

  return (
    <div className="hub-card tap-scale">
      <div className="hub-card-head">
        <Icon name="trophy" className="icon-20 icon-accent" />
        <div className="hub-card-titles">
          <div className="hub-card-title">Conquistas</div>
          <div className="hub-card-sub">Pequenas vitórias diárias</div>
        </div>
      </div>
      <div className="hub-card-body">
        <div className="hub-meta">Eventos: {wins}{lastType?` · Último: ${lastType}`:''}</div>
      </div>
      <div className="hub-card-actions">
        <Link className="btn btn-primary" href="/eu360" onClick={win}>Ver conquistas</Link>
        <Link className="btn btn-outline" href="/eu360">ver mais</Link>
      </div>
    </div>
  );
}
