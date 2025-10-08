"use client";
import React from "react";
import { showToast } from "../../lib/ui/toast";

export type Entry = {
  id: string;
  dateISO: string;
  title: string;
  kind: "note"|"task"|"event";
  scope?: "casa"|"filhos"|"eu";
  tags?: string[];
  done?: boolean;
};

const STORE = "m360:planner";
const SCOPES = ["Todos","Casa","Filhos","Eu"] as const;
const map = { Casa:"casa", Filhos:"filhos", Eu:"eu" } as const;

function read(): Entry[] {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE) || "[]");
    const flat = Array.isArray(raw) ? (raw.flat?.() ?? raw) : [];
    return flat as Entry[];
  } catch { return []; }
}
function write(arr: Entry[]) { try { localStorage.setItem(STORE, JSON.stringify(arr)); } catch {} }

export default function PlannerFamilySummary(){
  const [tab, setTab] = React.useState<(typeof SCOPES)[number]>("Todos");
  const [items, setItems] = React.useState<Entry[]>([]);

  React.useEffect(()=>{ setItems(read()); },[]);
  React.useEffect(()=>{
    const h = () => setItems(read());
    try { window.addEventListener("m360:planner:refresh", h); } catch {}
    return () => { try { window.removeEventListener("m360:planner:refresh", h); } catch {} };
  },[]);

  const filtered = React.useMemo(()=>{
    if (tab === "Todos") return items;
    const k = map[tab as Exclude<typeof tab, "Todos">];
    return items.filter(e => (e.scope ?? "eu") === k || (e.tags||[]).includes(k));
  },[items, tab]);

  const today = React.useMemo(()=> new Date().toISOString().split("T")[0], []);
  const todayItems = React.useMemo(()=> filtered.filter(e => e.dateISO === today), [filtered, today]);

  const done = todayItems.filter(e=>e.done).length;
  const total = todayItems.length;

  const toggle = (id: string) => {
    const beforeDone = items.filter(e=>e.done).length;
    const next = items.map(e => e.id === id ? { ...e, done: !e.done } : e);
    write(next); setItems(next);
    try { window.dispatchEvent(new CustomEvent("m360:planner:refreshed")); } catch {}
    const afterDone = next.filter(e=>e.done).length;
    if (beforeDone < 3 && afterDone >= 3) {
      showToast("Você concluiu 3 tarefas hoje 💗");
      try { window.dispatchEvent(new CustomEvent("m360:badge", { detail: { key: "Organizada", label: "Organizada" } })); } catch {}
    }
  };

  const pct = total ? Math.round((done / Math.max(total,1)) * 100) : 0;

  return (
    <div className="planner-summary">
      <header className="planner-summary-head">
        <h3 className="card-title">Planner da família</h3>
        <span className="small m360-soft">{done} de {total || 0} concluídos</span>
      </header>

      <div className="planner-summary-tabs" role="tablist" aria-label="Escopos do planner">
        {SCOPES.map((s) => (
          <button
            key={s}
            onClick={() => setTab(s)}
            className={`chip ${tab===s ? "is-active" : ""}`}
            aria-pressed={tab===s}
          >{s}</button>
        ))}
      </div>

      <div className="planner-progress-track" aria-label="Progresso de hoje">
        <div className="planner-progress-bar" style={{ width: total ? `${pct}%` : "0%" }} />
      </div>

      <ul className="planner-list" aria-live="polite">
        {todayItems.slice(0, 6).map((e) => (
          <li key={e.id} className="planner-list-item">
            <input type="checkbox" checked={!!e.done} onChange={() => toggle(e.id)} aria-label={`Marcar ${e.title}`} />
            <span className={`planner-entry-title ${e.done ? "is-done" : ""}`}>{e.title}</span>
            <span className="chip planner-scope-chip">{e.scope ?? "eu"}</span>
          </li>
        ))}
        {todayItems.length === 0 && (
          <li className="small m360-soft">Toque nos cards abaixo para adicionar rapidamente</li>
        )}
      </ul>
    </div>
  );
}
