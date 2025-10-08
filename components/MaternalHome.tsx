"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Card from "./ui/Card";
import NavyCard from "./ui/NavyCard";
import Btn from "./ui/Btn";
import Icon from "./ui/Icon";
import PlannerNotepad from "./planner/PlannerNotepad";
import WeekProgressCard from "./planner/WeekProgressCard";
import TipsRotator from "./planner/TipsRotator";
import BreathModal from "./modals/BreathModal";
import MoodModal from "./modals/MoodModal";
import InspireModal from "./modals/InspireModal";
import PauseModal from "./modals/PauseModal";
import MessageOfDayCard from "./motd/MessageOfDayCard";
import Vitrine from "./discover/Vitrine";
import PlannerFamilySummary from "./planner/PlannerFamilySummary";
import { addAction, addMood, ensurePlannerWeek, getPlannerDaysDone, getWeeklyPlan, toggleDayDone, addPlannerEntry } from "../lib/storage";
import { emitEu360Refresh } from "../lib/clientEvents";
import BadgesLevelToast from "./BadgesLevelToast";
import { flags } from "../lib/flags";
import { grantBadge } from "../lib/badges";

const GreetingBinder = dynamic(() => import("./GreetingBinder"), { ssr: false });

const todayISO = () => { try { return new Date().toISOString().split("T")[0]; } catch { return new Date().toISOString().slice(0,10); } };
const todayIndex = () => { try{ const d=new Date(); return (d.getDay()+6)%7; }catch{ return 0; } };

export default function MaternalHome(){
  const [openBreath, setOpenBreath] = useState(false);
  const [openMood, setOpenMood] = useState(false);
  const [openInspire, setOpenInspire] = useState(false);
  const [openPause, setOpenPause] = useState(false);

  const [plan, setPlan] = useState<boolean[]>(Array(7).fill(false));
  const [openPad, setOpenPad] = useState(false);
  const [padDay, setPadDay] = useState(() => { try{ const d=new Date().getDay(); return d===0?6:d-1; }catch{ return 0; } });
  const done = useMemo(() => (Array.isArray(plan) ? plan.filter(Boolean).length : 0), [plan]);

  useEffect(()=>{ try{ ensurePlannerWeek(); setPlan(getPlannerDaysDone() || getWeeklyPlan()); }catch{} },[]);
  useEffect(()=>{
    const onOpen = (e: any) => { try{ const day = typeof e?.detail?.day === 'number' ? Math.max(0, Math.min(6, e.detail.day|0)) : todayIndex(); setPadDay(day); setOpenPad(true); }catch{ setOpenPad(true); } };
    const onNew = (e: any) => { try{ const d = e?.detail||{}; const i = todayIndex(); addPlannerEntry(i, { title: String(d?.title||""), kind: String(d?.kind||"task"), scope: String(d?.scope||""), tags: Array.isArray(d?.tags)? d.tags : undefined }); }catch{} };
    try{ window.addEventListener('m360:planner:open', onOpen as any); }catch{}
    try{ window.addEventListener('m360:planner:newEntry', onNew as any); }catch{}
    return () => { try{ window.removeEventListener('m360:planner:open', onOpen as any); }catch{} try{ window.removeEventListener('m360:planner:newEntry', onNew as any); }catch{} };
  },[]);
  useEffect(()=>{
    const off = () => { try { setPlan(getPlannerDaysDone() || getWeeklyPlan()); } catch {} };
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
  const bonus = tips[done % tips.length];

  return (
    <div className="m360-container">
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
              <Icon name="mood" className="icon-24 icon-default" />
              <div>
                <div style={{fontWeight:800}}>Como você se sente?</div>
                <div className="small" style={{opacity:.75}}>Toque para registrar</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="m360-planner">
        {flags.plannerFamily ? (
          <PlannerFamilySummary />
        ) : (
          <WeekProgressCard className="planner-card" completedCount={done} total={7} days={plan} onOpenDay={(i)=>openNotepad(i)} onOpenCard={()=>openNotepad(padDay)} bonus={bonus} />
        )}
      </section>

      <section className="m360-grid">
        {flags.plannerFamily ? (
          <>
            <CardRotinaDaCasa />
            <CardTempoComMeuFilho />
            <CardAtividadeDoDia />
            <CardMomentoParaMim />
          </>
        ) : (
          <>
            <NavyCard onClick={() => setOpenBreath(true)}><div className="iconStack"><Icon name="breath" className="icon-24 icon-action" /><div>Respirar</div></div></NavyCard>
            <Card style={{minHeight:110,display:"grid",placeItems:"center",cursor:"pointer"}} onClick={() => setOpenMood(true)}><div className="iconStack"><Icon name="reflect" className="icon-24 icon-action" /><div>Refletir</div></div></Card>
            <NavyCard onClick={() => setOpenInspire(true)}><div className="iconStack"><Icon name="inspire" className="icon-24 icon-action" /><div>Inspirar</div></div></NavyCard>
            <Card style={{minHeight:110,display:"grid",placeItems:"center",cursor:"pointer"}} onClick={() => setOpenPause(true)}><div className="iconStack"><Icon name="pause" className="icon-24 icon-action" /><div>Pausar</div></div></Card>
          </>
        )}
      </section>

      <section className="m360-row">
        <div className="m360-col">
          <h2 className="h3" style={{marginBottom:8}}>Hoje</h2>
          <TipsRotator tips={tips} />
        </div>
        <div className="m360-col">
          <Vitrine />
        </div>
      </section>

      <button className="fab" aria-label="Nova anotação" onClick={()=>openNotepad(padDay)}>＋</button>

      <BadgesLevelToast />

      <PlannerNotepad open={openPad} onClose={()=>setOpenPad(false)} dayIndex={padDay} onChangeDay={(i)=>setPadDay(i)} />

      <BreathModal
        open={openBreath}
        onClose={() => setOpenBreath(false)}
        onComplete={(data)=>{
          try{ addAction({ date:new Date().toISOString(), type:"breath", duration:data?.duration ?? 60 }); }catch{}
          try{ toggleDayDone(new Date()); }catch{}
          emitEu360Refresh();
          setOpenBreath(false);
        }}
      />
      <MoodModal
        open={openMood}
        onClose={() => setOpenMood(false)}
        onComplete={(entry)=>{
          try{ addMood({ date:new Date().toISOString(), mood:entry?.mood ?? 0, note:entry?.note }); }catch{}
          try{ addAction({ date:new Date().toISOString(), type:"reflect" }); }catch{}
          emitEu360Refresh();
          setOpenMood(false);
        }}
      />
      <InspireModal
        open={openInspire}
        onClose={() => setOpenInspire(false)}
        onComplete={()=>{
          try{ addAction({ date:new Date().toISOString(), type:"inspire" }); }catch{}
          try{ toggleDayDone(new Date()); }catch{}
          emitEu360Refresh();
          setOpenInspire(false);
        }}
      />
      <PauseModal
        open={openPause}
        onClose={() => setOpenPause(false)}
        onComplete={(minutes)=>{
          try{ addAction({ date:new Date().toISOString(), type:"pause", duration:minutes||3 }); }catch{}
          try{ toggleDayDone(new Date()); }catch{}
          emitEu360Refresh();
          setOpenPause(false);
        }}
      />
    </div>
  );
}

function CardRotinaDaCasa(){
  const add = () => { try{ const i = todayIndex(); (addPlannerEntry as any)(i, { scope:"casa", tags:["casa"], kind:"task", title:"Tarefa da casa" }); }catch{} };
  return (
    <article className="card">
      <h3 className="card-title">Rotina da Casa 🏡</h3>
      <p className="card-sub">Organize tarefas do lar (arrumar, preparar, compras).</p>
      <div className="row">
        <button className="btn-primary" onClick={add}>Adicionar tarefa</button>
        <button className="btn-ghost" onClick={()=>{ try{ window.dispatchEvent(new CustomEvent("m360:planner:open", { detail:{ tab:"casa" } })); }catch{} }}>Ver agenda</button>
      </div>
    </article>
  );
}

function CardTempoComMeuFilho(){
  const add = () => { try{ const i = todayIndex(); (addPlannerEntry as any)(i, { scope:"filhos", tags:["filhos","momento"], kind:"event", title:"Momento com meu filho" }); }catch{} };
  const badge = () => { try{ (grantBadge as any)("MaePresente","Mãe Presente"); }catch{} };
  return (
    <article className="card">
      <h3 className="card-title">Tempo com Meu Filho 💕</h3>
      <p className="card-sub">Registre um momento especial do dia.</p>
      <div className="row">
        <button className="btn-primary" onClick={()=>{ add(); badge(); }}>Registrar momento</button>
        <button className="btn-ghost" onClick={()=>{ try{ window.dispatchEvent(new CustomEvent("m360:planner:open", { detail:{ tab:"filhos" } })); }catch{} }}>Ver timeline</button>
      </div>
    </article>
  );
}

function CardAtividadeDoDia(){
  const add = () => { try{ const i = todayIndex(); (addPlannerEntry as any)(i, { scope:"filhos", tags:["atividade","brincadeira"], kind:"event", title:"Atividade do dia" }); }catch{} };
  return (
    <article className="card">
      <h3 className="card-title">Atividade do Dia 🎨</h3>
      <p className="card-sub">Sugestão educativa simples para hoje.</p>
      <div className="row">
        <button className="btn-primary" onClick={add}>Salvar no planner</button>
        <button className="btn-ghost" onClick={()=>{ try{ window.dispatchEvent(new CustomEvent("m360:discover:open")); }catch{} }}>Ver sugestões</button>
      </div>
    </article>
  );
}

function CardMomentoParaMim(){
  const add = () => { try{ const i = todayIndex(); (addPlannerEntry as any)(i, { scope:"eu", tags:["eu","pausa"], kind:"note", title:"Pausa para mim" }); }catch{} };
  const badge = () => { try{ (grantBadge as any)("CuidarDeMim","Cuidar de Mim"); }catch{} };
  return (
    <article className="card">
      <h3 className="card-title">Momento para Mim 🌿</h3>
      <p className="card-sub">Uma pequena pausa de cuidado e carinho.</p>
      <div className="row">
        <button className="btn-primary" onClick={()=>{ add(); badge(); }}>Fazer agora</button>
        <button className="btn-ghost" onClick={()=>{ try{ window.dispatchEvent(new CustomEvent("m360:planner:open", { detail:{ tab:"eu" } })); }catch{} }}>Planejar</button>
      </div>
    </article>
  );
}
