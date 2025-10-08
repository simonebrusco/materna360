"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Card from "./ui/Card";
import PlannerNotepad from "./planner/PlannerNotepad";
import TipsRotator from "./planner/TipsRotator";
import MessageOfDayCard from "./motd/MessageOfDayCard";
import Vitrine from "./discover/Vitrine";
import PlannerFamilySummary from "./planner/PlannerFamilySummary";
import { ensurePlannerWeek, getPlannerDaysDone, addPlannerEntry } from "../lib/storage";
import BadgesLevelToast from "./BadgesLevelToast";
import { useRouter } from "next/navigation";

const GreetingBinder = dynamic(() => import("./GreetingBinder"), { ssr: false });

function todayIndexMonBased(){ try{ const d=new Date().getDay(); return d===0?6:d-1; }catch{ return 0; } }
function todayISO(){ try{ return new Date().toISOString().split("T")[0]; }catch{ return ""; } }

export default function MaternalHome(){
  const router = useRouter();

  const [plan, setPlan] = useState<boolean[]>(Array(7).fill(false));
  const [openPad, setOpenPad] = useState(false);
  const [padDay, setPadDay] = useState(() => todayIndexMonBased());
  const doneDays = useMemo(() => (Array.isArray(plan) ? plan.filter(Boolean).length : 0), [plan]);

  useEffect(()=>{ try{ ensurePlannerWeek(); setPlan(getPlannerDaysDone()); }catch{} },[]);
  useEffect(()=>{
    const off = () => { try { setPlan(getPlannerDaysDone()); } catch {} };
    try { window.addEventListener('m360:data:updated', off); } catch {}
    return () => { try { window.removeEventListener('m360:data:updated', off); } catch {} };
  },[]);

  function openNotepad(i?: number){ if (typeof i==='number') setPadDay(i); setOpenPad(true); }

  const tips = [
    "Beba água e alongue-se 1 min.",
    "Três respirações profundas.",
    "Envie uma mensagem carinhosa pra você mesma.",
    "Caminhe 2 min e olhe o céu."
  ];
  const bonus = tips[doneDays % tips.length];

  function quickAdd(params: { scope?: "casa"|"filhos"|"eu"; tags?: string[]; kind?: "note"|"task"|"event"; title: string; }){
    const i = todayIndexMonBased();
    const entry = { title: params.title, kind: params.kind||"note", time: "", tags: params.tags||[], content: "", done: false } as any;
    try { addPlannerEntry(i, entry); } catch {}
    setPadDay(i); setOpenPad(true);
  }

  return (
    <div className="m360-container">
      {/* 1) Hero (saudação + mensagem do dia) */}
      <section className="m360-hero">
        <GreetingBinder>
          {({ name, part }) => (
            <h1 className="h1" suppressHydrationWarning>{part}, {name} <span aria-hidden>💛</span></h1>
          )}
        </GreetingBinder>
        <p className="sub">Como você está hoje?</p>
        <div className="m360-grid" style={{marginBottom:0}}>
          <MessageOfDayCard showTitle={false} showButton={false} />
          <Card>
            <div style={{display:"grid",gridTemplateColumns:"48px 1fr",gap:12,alignItems:"center"}}>
              <span className="icon-24 icon-default">🙂</span>
              <div>
                <div style={{fontWeight:800}}>Como você se sente?</div>
                <div className="small" style={{opacity:.75}}>Toque para registrar</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* 2) Planner da família (full-width) */}
      <section className="m360-planner">
        <PlannerFamilySummary />
      </section>

      {/* 3) Maternal card grid (2–3 colunas) */}
      <section className="m360-grid">
        <CardRotinaDaCasa onAdd={()=>quickAdd({ scope:"casa", tags:["casa"], kind:"task", title:"Tarefa da casa" })} onOpen={()=>openNotepad(todayIndexMonBased())} />
        <CardTempoComMeuFilho onAdd={()=>quickAdd({ scope:"filhos", tags:["filhos","momento"], kind:"event", title:"Momento com meu filho" })} onOpen={()=>openNotepad(todayIndexMonBased())} />
        <CardAtividadeDoDia onAdd={()=>quickAdd({ scope:"filhos", tags:["atividade","brincadeira"], kind:"event", title:"Atividade do dia" })} onSee={()=>router.push("/descobrir")} />
        <CardMomentoParaMim onAdd={()=>quickAdd({ scope:"eu", tags:["eu","pausa"], kind:"note", title:"Pausa para mim" })} onOpen={()=>openNotepad(todayIndexMonBased())} />
      </section>

      {/* 4) Hoje + Descobrir (lado a lado em telas médias+) */}
      <section className="m360-row">
        <div className="m360-col">
          <h2 className="h3" style={{marginBottom:8}}>Hoje</h2>
          <TipsRotator tips={[bonus, ...tips]} />
        </div>
        <div className="m360-col">
          <Vitrine />
        </div>
      </section>

      {/* 5) FAB (já existente) */}
      <button className="fab" aria-label="Nova anotação" onClick={()=>openNotepad(padDay)}>＋</button>

      {/* 6) Toasts */}
      <BadgesLevelToast />

      {/* Notepad */}
      <PlannerNotepad open={openPad} onClose={()=>setOpenPad(false)} dayIndex={padDay} onChangeDay={(i)=>setPadDay(i)} />
    </div>
  );
}

/* ----------------- Maternal Cards ------------------ */

function CardRotinaDaCasa({ onAdd, onOpen }:{ onAdd:()=>void; onOpen:()=>void; }){
  return (
    <article className="card">
      <h3 className="card-title">Rotina da Casa 🏡</h3>
      <p className="card-sub">Organize tarefas do lar (arrumar, preparar, compras).</p>
      <div className="row">
        <button className="btn-primary" onClick={onAdd}>Adicionar tarefa</button>
        <button className="btn-outline" onClick={onOpen}>Ver agenda</button>
      </div>
    </article>
  );
}

function CardTempoComMeuFilho({ onAdd, onOpen }:{ onAdd:()=>void; onOpen:()=>void; }){
  return (
    <article className="card">
      <h3 className="card-title">Tempo com Meu Filho 💕</h3>
      <p className="card-sub">Registre um momento especial do dia.</p>
      <div className="row">
        <button className="btn-primary" onClick={onAdd}>Registrar momento</button>
        <button className="btn-outline" onClick={onOpen}>Ver timeline</button>
      </div>
    </article>
  );
}

function CardAtividadeDoDia({ onAdd, onSee }:{ onAdd:()=>void; onSee:()=>void; }){
  return (
    <article className="card">
      <h3 className="card-title">Atividade do Dia 🎨</h3>
      <p className="card-sub">Sugestão educativa simples para hoje.</p>
      <div className="row">
        <button className="btn-primary" onClick={onAdd}>Salvar no planner</button>
        <button className="btn-outline" onClick={onSee}>Ver sugestões</button>
      </div>
    </article>
  );
}

function CardMomentoParaMim({ onAdd, onOpen }:{ onAdd:()=>void; onOpen:()=>void; }){
  return (
    <article className="card">
      <h3 className="card-title">Momento para Mim 🌿</h3>
      <p className="card-sub">Uma pequena pausa de cuidado e carinho.</p>
      <div className="row">
        <button className="btn-primary" onClick={onAdd}>Fazer agora</button>
        <button className="btn-outline" onClick={onOpen}>Planejar</button>
      </div>
    </article>
  );
}
