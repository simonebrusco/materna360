"use client";
import { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import NavyCard from "../components/ui/NavyCard";
import Btn from "../components/ui/Btn";
import BreathModal from "../components/modals/BreathModal";
import MoodModal from "../components/modals/MoodModal";
import InspireModal from "../components/modals/InspireModal";
import PauseModal from "../components/modals/PauseModal";
import { addAction, addMood, toggleDayDone, getWeeklyPlan, getMotd, setMotd } from "../lib/storage";
import { emitEu360Refresh } from "../lib/clientEvents";
import WeekProgressCard from "../components/planner/WeekProgressCard";
import MotdBinder from "../components/MotdBinder";

export default function Home(){
  const [openBreath, setOpenBreath] = useState(false);
  const [openMood, setOpenMood] = useState(false);
  const [openInspire, setOpenInspire] = useState(false);
  const [openPause, setOpenPause] = useState(false);
  const [motd, setMotdState] = useState(null);

  // Planner state and actions (same data flow as before)
  const [plan, setPlan] = useState(Array(7).fill(false));
  const done = Array.isArray(plan) ? plan.filter(Boolean).length : 0;
  useEffect(()=>{ try{ setPlan(getWeeklyPlan()); }catch{} },[]);
  useEffect(()=>{ try{ setMotdState(getMotd(null)); }catch{} },[]);
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
      <MotdBinder nameHint={null} />
      <h1 className="h1">Bom dia, Simone <span>💛</span></h1>
      <p className="sub">Como você está hoje?</p>

      <div className="grid-2">
        <Card>
          <strong style={{display:"block",marginBottom:8}}>“Mensagem do dia”</strong>
          <p className="small" style={{margin:"0 0 12px"}}>{(motd && typeof motd === 'object' ? motd.body : motd) || "Com você, por você. Força."}</p>
          <Btn onClick={() => { try { const cur = (motd && typeof motd === 'object' ? motd.body : motd) || ""; const next = window.prompt("Digite sua mensagem do dia:", cur); if (next != null) { const v = String(next).trim(); if (v) { const base = (motd && typeof motd === 'object') ? motd : {}; const update = { ...base, body: v, at: new Date().toISOString() }; setMotd(update); setMotdState(update); } } } catch {} }}>Nova mensagem</Btn>
        </Card>

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
