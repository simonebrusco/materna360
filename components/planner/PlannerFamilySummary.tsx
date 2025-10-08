"use client";
import { useEffect, useMemo, useState } from "react";
import { getPlanner, onUpdate } from "../../lib/storage";

function todayIndex(){ try{ const d=new Date(); return (d.getDay()+6)%7; }catch{ return 0; } }
function isToday(dateISO:string){ try{ return new Date(dateISO).toISOString().slice(0,10) === new Date().toISOString().slice(0,10); }catch{ return false; } }

export default function PlannerFamilySummary(){
  const [days, setDays] = useState(()=>getPlanner());

  useEffect(()=>{
    const off = onUpdate((key)=>{ if (!key || String(key).includes('planner')) { try{ setDays(getPlanner()); }catch{} } });
    return () => { try{ off?.(); }catch{} };
  },[]);

  const idx = todayIndex();
  const today = days?.[idx] || { dateISO: new Date().toISOString().slice(0,10), entries: [] } as any;

  const counts = useMemo(()=>{
    const entries = Array.isArray(today?.entries) ? today.entries : [];
    const norm = entries.map(e=>({ ...(e||{}), scope: String((e as any)?.scope||"").toLowerCase() }));
    const c = { casa:0, filhos:0, eu:0 } as Record<string,number>;
    norm.forEach(e=>{ if (e.scope in c) c[e.scope] += 1; });
    return c;
  }, [today]);

  return (
    <div className="card planner-card" aria-label="Resumo do Planner da Família">
      <div className="planner-head">
        <div className="planner-title">Planner da família</div>
        <div className="planner-meta">{isToday(today?.dateISO) ? "Hoje" : today?.dateISO} • {Array.isArray(today?.entries) ? today.entries.length : 0} itens</div>
      </div>
      <div className="m360-grid" style={{marginBottom:0}}>
        <div className="tile" style={{padding:12}} aria-label="Tarefas da casa hoje"><div><strong>{counts.casa}</strong> casa</div></div>
        <div className="tile" style={{padding:12}} aria-label="Momentos com filhos hoje"><div><strong>{counts.filhos}</strong> filhos</div></div>
        <div className="tile" style={{padding:12}} aria-label="Cuidados comigo hoje"><div><strong>{counts.eu}</strong> eu</div></div>
      </div>
      <div className="planner-tip">
        <span aria-hidden className="planner-dot" />
        <div className="planner-tip-text">Toque nos cards abaixo para adicionar rapidamente</div>
      </div>
    </div>
  );
}
