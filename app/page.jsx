"use client";
import { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import NavyCard from "../components/ui/NavyCard";
import Btn from "../components/ui/Btn";
import Icon from "../components/ui/Icon";
import PlannerNotepad from "../components/planner/PlannerNotepad";
import BreathModal from "../components/modals/BreathModal";
import MoodModal from "../components/modals/MoodModal";
import InspireModal from "../components/modals/InspireModal";
import PauseModal from "../components/modals/PauseModal";
import { addAction, addMood, toggleDayDone, getWeeklyPlan, ensurePlannerWeek, getPlanner, getPlannerDaysDone } from "../lib/storage";
import { emitEu360Refresh } from "../lib/clientEvents";
import WeekProgressCard from "../components/planner/WeekProgressCard";
import dynamic from "next/dynamic";
const GreetingBinder = dynamic(() => import("../components/GreetingBinder"), { ssr: false });
import QuickRow from "../components/QuickRow";
import MessageOfDayCard from "../components/motd/MessageOfDayCard";
import SafeBoundary from "../components/SafeBoundary";
import { flags } from "../lib/flags";
import MessageOfDay from "../components/MessageOfDay";
import MoodQuickPanel from "../components/MoodQuickPanel";
import TodayChecklist from "../components/TodayChecklist";
import ReminderBell from "../components/ReminderBell";
import FabAddNote from "../components/FabAddNote";
import SmallWins from "../components/SmallWins";
import DiscoverTip from "../components/DiscoverTip";

export default function Home(){
  const [openBreath, setOpenBreath] = useState(false);
  const [openMood, setOpenMood] = useState(false);
  const [openInspire, setOpenInspire] = useState(false);
  const [openPause, setOpenPause] = useState(false);

  // Planner computed from notepad entries; fall back to legacy weekly plan
  const [plan, setPlan] = useState(Array(7).fill(false));
  const [openPad, setOpenPad] = useState(false);
  const [padDay, setPadDay] = useState(() => { try{ const d=new Date().getDay(); return d===0?6:d-1; }catch{ return 0; } });
  const done = Array.isArray(plan) ? plan.filter(Boolean).length : 0;
  useEffect(()=>{ try{ ensurePlannerWeek(); setPlan(getPlannerDaysDone() || getWeeklyPlan()); }catch{} },[]);
  useEffect(()=>{
    const off = () => setPlan(getPlannerDaysDone() || getWeeklyPlan());
    try { window.addEventListener('m360:data:updated', off); } catch {}
    const onFab = (e)=>{
      try{
        const iso = e?.detail?.date || new Date().toISOString().slice(0,10);
        const d = new Date(iso);
        const dow = d.getDay();
        const idx = dow===0?6:dow-1;
        setPadDay(idx);
        setOpenPad(true);
      }catch{}
    };
    try { window.addEventListener('m360:planner:newEntry', onFab); } catch {}
    return () => { try { window.removeEventListener('m360:data:updated', off); window.removeEventListener('m360:planner:newEntry', onFab); } catch {} };
  },[]);
  function openNotepad(i){ if (typeof i==='number') setPadDay(i); setOpenPad(true); }
  const tips = [
    "Beba água e alongue-se 1 min.",
    "Três respirações profundas.",
    "Envie uma mensagem carinhosa pra você mesma.",
    "Caminhe 2 min e olhe o céu."
  ];
  const bonus = tips[done % tips.length];

  return (
    <div className="container">
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
        <GreetingBinder>
          {({ name, part }) => (
            <h1 className="h1" suppressHydrationWarning>{part}, {name} <span aria-hidden>💛</span></h1>
          )}
        </GreetingBinder>
        {flags.globalReminders && (
          <SafeBoundary><ReminderBell /></SafeBoundary>
        )}
      </div>
      {flags.messageOfDay && (
        <SafeBoundary><MessageOfDay /></SafeBoundary>
      )}
      <p className="sub">Como você está hoje?</p>

      <QuickRow />

      <div className="grid-2">
        <MessageOfDayCard showTitle={false} showButton={false} />

        <Card>
          <div style={{display:"grid",gridTemplateColumns:"48px 1fr",gap:12,alignItems:"center"}}>
            <Icon name="mood" className="icon-24 icon-default" />
            <div>
              <div style={{fontWeight:800}}>Como você se sente?</div>
              <div className="small" style={{opacity:.75}}>Toque para registrar</div>
              {flags.moodQuickPanel && (
                <SafeBoundary><MoodQuickPanel /></SafeBoundary>
              )}
            </div>
          </div>
        </Card>
      </div>

      <div className="space"></div>

      <div className="actions-grid">
        <NavyCard onClick={() => setOpenBreath(true)}><div className="iconStack"><Icon name="breath" className="icon-24 icon-action" /><div>Respirar</div></div></NavyCard>
        <Card style={{minHeight:110,display:"grid",placeItems:"center",cursor:"pointer"}} onClick={() => setOpenMood(true)}><div className="iconStack"><Icon name="reflect" className="icon-24 icon-action" /><div>Refletir</div></div></Card>
        <NavyCard onClick={() => setOpenInspire(true)}><div className="iconStack"><Icon name="inspire" className="icon-24 icon-action" /><div>Inspirar</div></div></NavyCard>
        <Card style={{minHeight:110,display:"grid",placeItems:"center",cursor:"pointer"}} onClick={() => setOpenPause(true)}><div className="iconStack"><Icon name="pause" className="icon-24 icon-action" /><div>Pausar</div></div></Card>
      </div>

      <WeekProgressCard className="planner-card" completedCount={done} total={7} days={plan} onOpenDay={(i)=>openNotepad(i)} onOpenCard={()=>openNotepad(padDay)} bonus={bonus} />
      {flags.homeTodayCard && (
        <SafeBoundary><TodayChecklist /></SafeBoundary>
      )}

      <PlannerNotepad open={openPad} onClose={()=>setOpenPad(false)} dayIndex={padDay} onChangeDay={(i)=>setPadDay(i)} />
      {flags.discoverTip && (
        <SafeBoundary><DiscoverTip /></SafeBoundary>
      )}


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
