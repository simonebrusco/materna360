"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "../../ui/Icon";
import { getPlannerWeek } from "../../../lib/storage";

export default function CardRotinaCasa(){
  const [todayCount, setTodayCount] = useState(0);

  useEffect(()=>{
    try{
      const week = getPlannerWeek();
      const idx = (()=>{ try{ const d=new Date(); return (d.getDay()+6)%7; }catch{ return 0; } })();
      const day = Array.isArray(week)?week[idx]:null;
      const entries = Array.isArray((day as any)?.entries) ? (day as any).entries : (Array.isArray((day as any)?.items)?(day as any).items:[]);
      setTodayCount(entries.length);
    }catch{ setTodayCount(0); }
  },[]);

  function win(){ try{ window.dispatchEvent(new CustomEvent('m360:win', { detail:{ source:'hub', action:'rotina' } })); }catch{} }

  return (
    <div className="hub-card tap-scale">
      <div className="hub-card-head">
        <Icon name="home" className="icon-20 icon-accent" />
        <div className="hub-card-titles">
          <div className="hub-card-title">Rotina da Casa</div>
          <div className="hub-card-sub">Tarefas e lembretes</div>
        </div>
      </div>
      <div className="hub-card-body">
        <div className="hub-meta">Hoje: {todayCount} itens</div>
      </div>
      <div className="hub-card-actions">
        <Link className="btn btn-primary" href="/" onClick={win}>Adicionar</Link>
        <Link className="btn btn-outline" href="/">ver mais</Link>
      </div>
    </div>
  );
}
