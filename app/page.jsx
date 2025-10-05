"use client";

import { useEffect, useMemo, useState } from "react";
import Card from "../components/ui/Card";
import NavyCard from "../components/ui/NavyCard";
import Btn from "../components/ui/Btn";
import BreathModal from "../components/modals/BreathModal";
import MoodModal from "../components/modals/MoodModal";
import InspireModal from "../components/modals/InspireModal";
import PauseModal from "../components/modals/PauseModal";
import { addAction, addMood, toggleDayDone, getWeeklyPlan, togglePlanDay, getTipsIndex, bumpTipsIndex } from "../lib/storage";

function WeeklyPlannerAndTip(){
  const DAYS = ["S","T","Q","Q","S","S","D"];
  const TIPS = [
    "Hidrate-se e faça uma pausa de 1 minuto para respirar.",
    "Movimente-se por 3 minutos e alongue os ombros.",
    "Envie uma mensagem carinhosa para você mesma no futuro.",
    "Hoje, escolha uma tarefa pequena e conclua com calma.",
    "Três respirações profundas podem mudar o seu momento."
  ];
  const [plan, setPlan] = useState([false,false,false,false,false,false,false]);
  const [tipIdx, setTipIdx] = useState(0);
  const done = useMemo(()=> plan.filter(Boolean).length, [plan]);

  useEffect(()=>{
    try {
      setPlan(getWeeklyPlan());
      const i = getTipsIndex();
      setTipIdx(i % TIPS.length);
      bumpTipsIndex(TIPS.length);
    } catch {}
  },[]);

  function onToggle(i){
    const p = togglePlanDay(i);
    setPlan(p);
  }

  return (
    <section data-planner-root style={{marginTop:16}}>
      <div style={{fontWeight:800,fontSize:18,color:"#0D1B2A", marginBottom:10}}>
        Planner da semana <span style={{opacity:.6,fontWeight:600}}>— {done}/7</span>
      </div>
      <div className="chips-row" role="group" aria-label="Planner semanal">
        {DAYS.map((d,i)=>(
          <button key={i}
            className={`chip ${plan[i] ? "is-active" : ""}`}
            onClick={()=>onToggle(i)}
            aria-pressed={plan[i]}
            title={`Dia ${i+1}`}>{d}</button>
        ))}
      </div>

      <div className="card rec" style={{padding:"16px 18px", marginTop:10}}>
        <div style={{fontWeight:700, color:"#0D1B2A", marginBottom:6}}>Seu bem-estar também é importante</div>
        <div style={{opacity:.85}}>{TIPS[tipIdx]}</div>
      </div>
    </section>
  );
}

export default function Home(){
  const [openBreath, setOpenBreath] = useState(false);
  const [openMood, setOpenMood] = useState(false);
  const [openInspire, setOpenInspire] = useState(false);
  const [openPause, setOpenPause] = useState(false);

  return (
    <div className="container">
      <h1 className="h1">Bom dia, Simone <span>💛</span></h1>
      <p className="sub">Como você está hoje? ���</p>

      <div className="grid-2">
        <Card>
          <strong style={{display:"block",marginBottom:8}}>“Mensagem do dia”</strong>
          <p className="small" style={{margin:"0 0 12px"}}>Com você, por você. Força.</p>
          <Btn>Nova mensagem</Btn>
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

      <div className="grid-2">
        <NavyCard onClick={() => setOpenBreath(true)}><div className="iconToken">◐</div><div>Respirar</div></NavyCard>
        <Card style={{minHeight:110,display:"grid",placeItems:"center"}} onClick={() => setOpenMood(true)}><div className="iconStack"><div className="iconToken">♡</div><div>Refletir</div></div></Card>
        <NavyCard onClick={() => setOpenInspire(true)}><div className="iconToken">🔔</div><div>Inspirar</div></NavyCard>
        <Card style={{minHeight:110,display:"grid",placeItems:"center"}} onClick={() => setOpenPause(true)}><div className="iconStack"><div className="iconToken">Ⅱ</div><div>Pausar</div></div></Card>
      </div>

      <div className="space"></div>

      <WeeklyPlannerAndTip />

      <BreathModal
        open={openBreath}
        onClose={() => setOpenBreath(false)}
        onComplete={(data)=>{
          try{ addAction({ date:new Date().toISOString(), type:"breath", duration:data?.duration ?? 60 }); }catch{}
          try{ toggleDayDone(new Date()); }catch{}
          setOpenBreath(false);
        }}
      />
      <MoodModal
        open={openMood}
        onClose={() => setOpenMood(false)}
        onComplete={(entry)=>{
          try{ addMood({ date:new Date().toISOString(), mood:entry?.mood ?? 0, note:entry?.note }); }catch{}
          setOpenMood(false);
        }}
      />
      <InspireModal
        open={openInspire}
        onClose={() => setOpenInspire(false)}
        onComplete={()=>{
          try{ addAction({ date:new Date().toISOString(), type:"inspire" }); }catch{}
          try{ toggleDayDone(new Date()); }catch{}
          setOpenInspire(false);
        }}
      />
      <PauseModal
        open={openPause}
        onClose={() => setOpenPause(false)}
        onComplete={(minutes)=>{
          try{ addAction({ date:new Date().toISOString(), type:"pause", duration:minutes||3 }); }catch{}
          try{ toggleDayDone(new Date()); }catch{}
          setOpenPause(false);
        }}
      />
    </div>
  );
}
