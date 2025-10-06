"use client";
import { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import NavyCard from "../components/ui/NavyCard";
import Btn from "../components/ui/Btn";
import BreathModal from "../components/modals/BreathModal";
import MoodModal from "../components/modals/MoodModal";
import InspireModal from "../components/modals/InspireModal";
import PauseModal from "../components/modals/PauseModal";
import RoutineMini from "../components/RoutineMini";
import { addAction, addMood, toggleDayDone, getWeeklyPlan } from "../lib/storage";
import { emitEu360Refresh } from "../lib/clientEvents";
import WeekProgressCard from "../components/planner/WeekProgressCard";
import MessageOfDayCard from "../components/motd/MessageOfDayCard";

export default function Home(){
  const [openBreath, setOpenBreath] = useState(false);
  const [openMood, setOpenMood] = useState(false);
  const [openInspire, setOpenInspire] = useState(false);
  const [openPause, setOpenPause] = useState(false);

  // Planner state and actions (same data flow as before)
  const [plan, setPlan] = useState(Array(7).fill(false));
  const done = Array.isArray(plan) ? plan.filter(Boolean).length : 0;
  useEffect(()=>{ try{ setPlan(getWeeklyPlan()); }catch{} },[]);
  function onToggle(i){
    try {
      const p = toggleDayDone(i);
      setPlan(p);
      emitEu360Refresh();
    } catch {}
  }
  const tips = [
    "Beba água e alongue-se 1 min.",
    "Três respirações profundas.",
    "Envie uma mensagem carinhosa pra você mesma.",
    "Caminhe 2 min e olhe o céu."
  ];
  const bonus = tips[done % tips.length];

  return (
    <div className="container">
      <h1 className="h1">Bom dia, Simone <span>💛</span></h1>
      <p className="sub">Como você está hoje?</p>

      <div className="grid-2">
        <MessageOfDayCard />

        <Card>
          <div style={{display:"grid",gridTemplateColumns:"48px 1fr",gap:12,alignItems:"center"}}>
            <div className="iconToken">🙂</div>
            <div>
              <div style={{fontWeight:800}}>Como você se sente?</div>
              <div className="small" style={{opacity:.75}}>Toque para registrar</div>
            </div>
          </div>
        </Card>
      </div>

      <div className="space"></div>

      <div className="actions-grid">
        <NavyCard onClick={() => setOpenBreath(true)}><div className="iconToken">◐</div><div>Respirar</div></NavyCard>
        <Card style={{minHeight:110,display:"grid",placeItems:"center"}} onClick={() => setOpenMood(true)}><div className="iconStack"><div className="iconToken">♡</div><div>Refletir</div></div></Card>
        <NavyCard onClick={() => setOpenInspire(true)}><div className="iconToken">🔔</div><div>Inspirar</div></NavyCard>
        <Card style={{minHeight:110,display:"grid",placeItems:"center"}} onClick={() => setOpenPause(true)}><div className="iconStack"><div className="iconToken">Ⅱ</div><div>Pausar</div></div></Card>
      </div>

      <WeekProgressCard className="planner-card" completedCount={done} total={7} days={plan} onDayPress={onToggle} bonus={bonus} />

      <div className="space"></div>
      <section>
        <RoutineMini />
      </section>

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
