"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Card from "../ui/Card";
import { showToast } from "../../lib/ui/toast";
import { getTodayChecklist, setTodayChecklist } from "../../lib/storage";

export default function ChecklistToday({ onProgress = () => {}, onUndo = () => {} }){
  const [items, setItems] = useState([]);
  const lastCheckedRef = useRef(null);
  const completionTimerRef = useRef(null);

  useEffect(()=>{ setItems(getTodayChecklist()); },[]);

  const total = items.length || 0;
  const done = useMemo(()=> items.filter(i=>i?.done).length, [items]);
  const ratio = total ? done/total : 0;

  useEffect(()=>{ onProgress(Math.round(ratio*10)); }, [ratio, onProgress]);

  function toggle(id){
    const next = items.map(it => it.id===id ? { ...it, done: !it.done } : it);
    setItems(next);
    setTodayChecklist(next);
    lastCheckedRef.current = id;
    try { showToast("Checklist atualizado ✨"); } catch {}
    const allDone = next.length>0 && next.every(i=>i.done);
    if (allDone) {
      // Debounce completion slightly and provide Undo for 3s
      if (completionTimerRef.current) { clearTimeout(completionTimerRef.current); completionTimerRef.current = null; }
      completionTimerRef.current = setTimeout(() => {
        try {
          showToast("Você concluiu 3 tarefas hoje 💗", {
            duration: 3000,
            action: { label: "Desfazer", onClick: () => {
              const last = lastCheckedRef.current;
              if (!last) return;
              setItems((prev)=>{
                const reverted = prev.map(it => it.id===last ? { ...it, done: false } : it);
                setTodayChecklist(reverted);
                return reverted;
              });
              try { onUndo(); } catch {}
            } }
          });
          // Fire a lightweight event for achievements listeners
          try { window.dispatchEvent(new CustomEvent('m360:checklist-complete')); } catch {}
        } catch {}
      }, 250);
    }
  }

  if (!Array.isArray(items) || items.length===0) return null;

  return (
    <Card role="region" aria-label="Checklist do Dia">
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
