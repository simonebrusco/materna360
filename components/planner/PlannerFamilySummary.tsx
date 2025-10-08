"use client";

import { useEffect, useMemo, useState } from "react";
import { getPlanner } from "../../lib/storage";

type Entry = {
  id: string; title: string; kind: "note"|"task"|"event";
  tags?: string[]; done?: boolean;
};

const scopes = ["Todos", "Casa", "Filhos", "Eu"] as const;

export default function PlannerFamilySummary(){
  const [tab, setTab] = useState<(typeof scopes)[number]>("Todos");
  const [raw, setRaw] = useState<Entry[]>([]);

  useEffect(()=>{
    try{
      const week = getPlanner();
      const flat = Array.isArray(week) ? week.flatMap(d => Array.isArray(d?.entries) ? d.entries : []) : [];
      setRaw(flat as any);
    }catch{ setRaw([]); }
  },[]);

  useEffect(()=>{
    const onData = () => {
      try{
        const week = getPlanner();
        const flat = Array.isArray(week) ? week.flatMap(d => Array.isArray(d?.entries) ? d.entries : []) : [];
        setRaw(flat as any);
      }catch{}
    };
    try{ window.addEventListener('m360:data:updated', onData); }catch{}
    return ()=>{ try{ window.removeEventListener('m360:data:updated', onData); }catch{} };
  },[]);

  const filtered = useMemo(()=>{
    if (tab === "Todos") return raw;
    const key = tab === "Casa" ? "casa" : tab === "Filhos" ? "filhos" : "eu";
    return raw.filter(e => Array.isArray(e.tags) && e.tags.includes(key));
  },[raw, tab]);

  const done = filtered.filter(e => !!e.done).length;
  const total = filtered.length || 0;
  const pct = total ? Math.round((done/total)*100) : 0;

  return (
    <div>
      <header style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
        <h3 className="card-title">Planner da família</h3>
        <span className="small" style={{opacity:.8}}>{done} de {total} concluídos</span>
      </header>

      <div style={{display:"flex",gap:8,marginBottom:10,flexWrap:"wrap"}}>
        {scopes.map(s => (
          <button key={s} onClick={()=>setTab(s)} className={`chip ${tab===s?"is-active":""}`}>{s}</button>
        ))}
      </div>

      <div style={{height:6, background:"#eee", borderRadius:6}}>
        <div style={{height:6, borderRadius:6, background:"#FF005E", width: `${pct}%`}} />
      </div>
    </div>
  );
}
