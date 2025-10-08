"use client";

import React, { useEffect, useMemo, useState } from "react";
import Card from "../ui/Card";
import { showToast } from "../../lib/ui/toast";
import { getTodayChecklist, setTodayChecklist } from "../../lib/storage";

export default function ChecklistToday({ onProgress = () => {} }){
  const [items, setItems] = useState([]);

  useEffect(()=>{ setItems(getTodayChecklist()); },[]);

  const total = items.length || 0;
  const done = useMemo(()=> items.filter(i=>i?.done).length, [items]);
  const ratio = total ? done/total : 0;

  useEffect(()=>{ onProgress(Math.round(ratio*10)); }, [ratio, onProgress]);

  function toggle(id){
    const next = items.map(it => it.id===id ? { ...it, done: !it.done } : it);
    setItems(next);
    setTodayChecklist(next);
    try { showToast("Checklist atualizado ✨"); } catch {}
    const allDone = next.length>0 && next.every(i=>i.done);
    if (allDone) { try { showToast("Organizada 🎉"); } catch {} }
  }

  if (!Array.isArray(items) || items.length===0) return null;

  return (
    <Card>
      <div className="card-title">Checklist do Dia</div>
      <div className="small" style={{opacity:.8, marginBottom:8}}>Concluídos: {done} de {total}</div>
      <div style={{display:"grid", gap:8}}>
        {items.map(it => (
          <label key={it.id} style={{display:"grid", gridTemplateColumns:"auto 1fr", alignItems:"center", gap:10}}>
            <input type="checkbox" checked={!!it.done} onChange={()=>toggle(it.id)} aria-label={it.title} />
            <span>{it.title}</span>
          </label>
        ))}
      </div>
    </Card>
  );
}
