"use client";
import React from "react";
import { showToast } from "../../lib/ui/toast";

export type Tick = { id:string; label:string; done:boolean };
const STORE = "m360:today";
const base: Tick[] = [
  {id:"agua", label:"Beber água 💧", done:false},
  {id:"alongar", label:"Alongar-se 🧘", done:false},
  {id:"brincar", label:"Brincar com meu filho 🎲", done:false},
];

function keyFor(dateISO:string){ return `${STORE}:${dateISO}`; }

export default function TodayChecklist(){
  const today = React.useMemo(() => new Date().toISOString().split("T")[0], []);
  const [ticks,setTicks] = React.useState<Tick[]>(base);

  React.useEffect(()=>{
    try{
      const saved = localStorage.getItem(keyFor(today));
      setTicks(saved ? JSON.parse(saved) : base);
    }catch{ setTicks(base); }
  },[today]);

  const toggle = (id:string) => {
    const next = ticks.map(t => t.id===id ? {...t, done:!t.done} : t);
    setTicks(next);
    try{ localStorage.setItem(keyFor(today), JSON.stringify(next)); }catch{}
    const doneCount = next.filter(t=>t.done).length;
    if (doneCount === 3) {
      showToast("Parabéns! Você cuidou de si e da família hoje 💗");
      try { window.dispatchEvent(new CustomEvent("m360:badge", { detail:{ key:"Organizada", label:"Organizada" } })); } catch {}
    }
  };

  return (
    <section className="today-checklist">
      <h3 className="card-title">Hoje</h3>
      <ul className="today-list">
        {ticks.map(t=> (
          <li key={t.id} className="today-item">
            <input type="checkbox" checked={t.done} onChange={()=>toggle(t.id)} />
            <span className={`today-label${t.done?" is-done":""}`}>{t.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
