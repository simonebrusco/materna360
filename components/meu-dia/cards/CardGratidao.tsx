"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "../../ui/Icon";
import { getGratitudes } from "../../../lib/storage";

export default function CardGratidao(){
  const [count, setCount] = useState(0);
  const [last, setLast] = useState<string | null>(null);

  useEffect(()=>{
    try{
      const list = getGratitudes();
      setCount(Array.isArray(list)?list.length:0);
      setLast(Array.isArray(list)&&list.length? (list[list.length-1]?.text || '') : null);
    }catch{ setCount(0); setLast(null); }
  },[]);

  function win(){ try{ window.dispatchEvent(new CustomEvent('m360:win', { detail:{ source:'hub', action:'gratidao' } })); }catch{} }

  return (
    <div className="hub-card tap-scale">
      <div className="hub-card-head">
        <Icon name="heart" className="icon-20 icon-accent" />
        <div className="hub-card-titles">
          <div className="hub-card-title">Gratidão</div>
          <div className="hub-card-sub">Um registro afetuoso</div>
        </div>
      </div>
      <div className="hub-card-body">
        <div className="hub-meta">Entradas: {count}{last?` · Última: ${last}`:''}</div>
      </div>
      <div className="hub-card-actions">
        <Link className="btn btn-primary" href="/eu360" onClick={win}>Registrar</Link>
        <Link className="btn btn-outline" href="/eu360">ver mais</Link>
      </div>
    </div>
  );
}
