"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "../../ui/Icon";
import { getMoodHistory } from "../../../lib/storage";

export default function CardHumorSemana(){
  const [avg, setAvg] = useState<number>(0);
  const [last, setLast] = useState<number | null>(null);

  useEffect(()=>{
    try{
      const list = getMoodHistory();
      const tail = list.slice(-7);
      const a = tail.length ? (tail.reduce((s:any,m:any)=>s+(Number(m?.score)||0),0)/tail.length) : 0;
      setAvg(Number(a.toFixed(1)));
      setLast(tail.length ? tail[tail.length-1]?.score||null : null);
    }catch{ setAvg(0); setLast(null); }
  },[]);

  function win(){ try{ window.dispatchEvent(new CustomEvent('m360:win', { detail:{ source:'hub', action:'humor' } })); }catch{} }

  return (
    <div className="hub-card tap-scale">
      <div className="hub-card-head">
        <Icon name="mood" className="icon-20 icon-accent" />
        <div className="hub-card-titles">
          <div className="hub-card-title">Humor da Semana</div>
          <div className="hub-card-sub">Média dos últimos dias</div>
        </div>
      </div>
      <div className="hub-card-body">
        <div className="hub-meta">Média: {avg || 0}{typeof last==='number'?` · Último: ${last}`:''}</div>
      </div>
      <div className="hub-card-actions">
        <Link className="btn btn-primary" href="/eu360" onClick={win}>Registrar humor</Link>
        <Link className="btn btn-outline" href="/eu360">ver mais</Link>
      </div>
    </div>
  );
}
