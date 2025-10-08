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

  function openNotepad(i?: number){ if (typeof i==='number') setPadDay(i); setOpenPad(true); }

  const tips = [
    "Beba água e alongue-se 1 min.",
    "Três respirações profundas.",
    "Envie uma mensagem carinhosa pra você mesma.",
    "Caminhe 2 min e olhe o céu."
  ];
  const bonus = tips[done % tips.length];

  return (
    <div className="m360-container meu-dia">
      {/* 1) Hero (saudação + mensagem do dia) */}
      <section className="m360-hero" style={{marginBottom:24}}>
        <GreetingBinder>
          {({ name, part }) => (
            <div>
              <h1 className="greeting-title" suppressHydrationWarning>{part}, {name} <span aria-hidden>💛</span></h1>
              <p className="greeting-sub">Como você está hoje?</p>
            </div>
          )}
        </GreetingBinder>
        <div className="m360-grid" style={{marginBottom:0}}>
          <MessageOfDayCard showTitle={false} showButton={false} />
          <Card className="tap-scale" onClick={()=>setOpenMood(true)}>
            <div style={{display:"grid",gridTemplateColumns:"48px 1fr",gap:12,alignItems:"center"}}>
              <Icon name="mood" className="icon-24 icon-secondary" />
              <div>
                <div style={{fontWeight:800,color:'#1E1E1E'}}>Como você se sente?</div>
                <div className="small" style={{opacity:.75}}>Toque para registrar</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* 2) Planner da Família (full-width) */}
      <section className="m360-planner" style={{marginBottom:24}}>
        {/* Segmented tabs */}
        <PlannerTabs />
        <WeekProgressCard className="planner-card" completedCount={done} total={7} days={plan} onOpenDay={(i)=>openNotepad(i)} onOpenCard={()=>openNotepad(padDay)} bonus={bonus} />
        <DailyChecklist />
      </section>

      {/* 3) Ações (2x2) */}
      <section className="m360-grid m360-maternal-actions" style={{gap:16, marginBottom:24}}>
        <div className="card m360-action tap-scale">
          <div className="card-icon" aria-hidden>🏠</div>
          <h3>Rotina da Casa</h3>
          <p>Organize tarefas do lar — arrumar, preparar, compras.</p>
          <div className="card-actions">
            <button className="btn btn-primary" onClick={()=>setOpenPad(true)}>Adicionar tarefa</button>
            <button className="btn btn-outline" onClick={()=>setOpenPad(true)}>Ver agenda</button>
          </div>
        </div>

        <div className="card m360-action tap-scale">
          <div className="card-icon" aria-hidden>💕</div>
          <h3>Tempo com Meu Filho</h3>
          <p>Registre um momento especial do dia com seu filho.</p>
          <div className="card-actions">
            <button className="btn btn-primary" onClick={()=>{ try{ (window as any).requestAnimationFrame?.(()=>{}); }catch{}; }}>Registrar momento</button>
            <button className="btn btn-outline">Ver timeline</button>
          </div>
        </div>

        <div className="card m360-action tap-scale">
          <div className="card-icon" aria-hidden>🎨</div>
          <h3>Atividade do Dia</h3>
          <p>Receba sugestões educativas e brincadeiras do dia.</p>
          <div className="card-actions">
            <button className="btn btn-primary" onClick={()=>setOpenPad(true)}>Salvar no planner</button>
            <button className="btn btn-outline">Ver sugestões</button>
          </div>
        </div>

        <div className="card m360-action tap-scale">
          <div className="card-icon" aria-hidden>🌿</div>
          <h3>Momento para Mim</h3>
          <p>Uma pequena pausa de cuidado e carinho com você.</p>
          <div className="card-actions">
            <button className="btn btn-primary" onClick={()=>setOpenPause(true)}>Fazer agora</button>
            <button className="btn btn-outline">Planejar</button>
          </div>
        </div>
      </section>

      {/* 4) Hoje + Descobrir (lado a lado em telas médias+) */}
      <section className="m360-row" style={{marginBottom:24}}>
        <div className="m360-col">
          <h2 className="h3" style={{marginBottom:8}}>Hoje</h2>
          <TipsRotator tips={tips} />
        </div>
        <div className="m360-col">
          <Vitrine />
        </div>
      </section>

      {/* 5) FAB */}
      <button className="fab btn btn-primary" aria-label="Anotar" onClick={()=>setOpenQuick(true)}>＋ Anotar</button>

      {/* 6) Toasts */}
      <BadgesLevelToast />

      {/* Modais e Notepad */}
      <PlannerNotepad open={openPad} onClose={()=>setOpenPad(false)} dayIndex={padDay} onChangeDay={(i)=>setPadDay(i)} />
      <QuickAddModal open={openQuick} onClose={()=>setOpenQuick(false)} dayIndex={padDay} />

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
