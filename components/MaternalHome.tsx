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
import FABQuickNote from "./planner/FABQuickNote";
import MessageOfDayCard from "./motd/MessageOfDayCard";
import Vitrine from "./discover/Vitrine";
import TodayChecklist from "./planner/TodayChecklist";
import { flags } from "../lib/flags";
import { addAction, addMood, ensurePlannerWeek, getPlannerDaysDone, getWeeklyPlan, toggleDayDone } from "../lib/storage";
import { emitEu360Refresh } from "../lib/clientEvents";
import BadgesLevelToast from "./BadgesLevelToast";

const GreetingBinder = dynamic(() => import("./GreetingBinder"), { ssr: false });

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
    const off = () => { try { setPlan(getPlannerDaysDone() || getWeeklyPlan()); } catch {} };
    try { window.addEventListener('m360:data:updated', off); } catch {}
    return () => { try { window.removeEventListener('m360:data:updated', off); } catch {} };
  },[]);

  useEffect(()=>{
    function onOpen(){ try{ setOpenPad(true); }catch{} }
    function onNew(e: any){
      try{
        ensurePlannerWeek();
        const dStr = e?.detail?.date;
        const title = String(e?.detail?.title || "Anotação rápida");
        const kind = String(e?.detail?.kind || "note");
        const scope = String(e?.detail?.scope || "eu");
        const dt = new Date(dStr || new Date().toISOString());
        const i = (dt.getDay()+6)%7;
        setPadDay(i);
        try{ addAction({ date:new Date().toISOString(), type:"quick_note" }); }catch{}
        try{ addPlannerEntry(i, { title, kind, tags:[scope] }); }catch{}
        try{ setPlan(getPlannerDaysDone() || getWeeklyPlan()); }catch{}
        try{ setOpenPad(true); }catch{}
      }catch{}
    }
    try { window.addEventListener("m360:planner:open", onOpen as any); } catch {}
    try { window.addEventListener("m360:planner:newEntry", onNew as any); } catch {}
    return () => {
      try { window.removeEventListener("m360:planner:open", onOpen as any); } catch {}
      try { window.removeEventListener("m360:planner:newEntry", onNew as any); } catch {}
    };
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
              <Icon name="mood" className="icon-24 icon-default" />
              <div>
                <div style={{fontWeight:800}}>Como você se sente?</div>
                <div className="small" style={{opacity:.75}}>Toque para registrar</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* 2) Planner da Família (full-width) */}
      <section className="m360-planner">
        <WeekProgressCard className="planner-card" completedCount={done} total={7} days={plan} onOpenDay={(i)=>openNotepad(i)} onOpenCard={()=>openNotepad(padDay)} bonus={bonus} />
      </section>

      {/* 3) Grade de cards (nunca empilhar): 2–3 colunas conforme breakpoint */}
      <section className="m360-grid">
        <NavyCard onClick={() => setOpenBreath(true)}><div className="iconStack"><Icon name="breath" className="icon-24 icon-action" /><div>Respirar</div></div></NavyCard>
        <Card style={{minHeight:110,display:"grid",placeItems:"center",cursor:"pointer"}} onClick={() => setOpenMood(true)}><div className="iconStack"><Icon name="reflect" className="icon-24 icon-action" /><div>Refletir</div></div></Card>
        <NavyCard onClick={() => setOpenInspire(true)}><div className="iconStack"><Icon name="inspire" className="icon-24 icon-action" /><div>Inspirar</div></div></NavyCard>
        <Card style={{minHeight:110,display:"grid",placeItems:"center",cursor:"pointer"}} onClick={() => setOpenPause(true)}><div className="iconStack"><Icon name="pause" className="icon-24 icon-action" /><div>Pausar</div></div></Card>
      </section>

      {/* 4) Hoje + Descobrir (lado a lado em telas médias+) */}
      <section className="m360-row">
        <div className="m360-col">
          <h2 className="h3" style={{marginBottom:8}}>Hoje</h2>
          <TipsRotator tips={tips} />
          {flags.todayChecklist ? (
            <Card style={{marginTop:12}}>
              <TodayChecklist />
            </Card>
          ) : null}
        </div>
        <div className="m360-col">
          <Vitrine />
        </div>
      </section>

      {/* 5) FAB (fica como já está) */}
      {flags.floatingQuickNote ? (
        <FABQuickNote />
      ) : null}

      {/* 6) Toasts (já existentes) */}
      <BadgesLevelToast />

      {/* Modais e Notepad */}
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
