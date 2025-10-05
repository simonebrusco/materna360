"use client";
import { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import NavyCard from "../components/ui/NavyCard";
import Btn from "../components/ui/Btn";
import BreathModal from "../components/modals/BreathModal";
import MoodModal from "../components/modals/MoodModal";
import InspireModal from "../components/modals/InspireModal";
import PauseModal from "../components/modals/PauseModal";
import { addAction, addMood, toggleDayDone, getWeeklyPlan } from "../lib/storage";
import WeekChips from "../components/planner/WeekChips";
import TipsRotator from "../components/planner/TipsRotator";

function WeeklyPlannerAndTip(){
  const [plan, setPlan] = useState(Array(7).fill(false));
  const done = plan.filter(Boolean).length;

  useEffect(()=>{ try{ setPlan(getWeeklyPlan()); }catch{} },[]);

  function onToggle(i){
    const p = toggleDayDone(i);
    setPlan(p);
    if (typeof window !== 'undefined') window.dispatchEvent(new Event('refreshEu360'));
  }

  return (
    <section data-planner-root style={{marginTop:16}}>
      <div style={{fontWeight:800,fontSize:18,color:"#0D1B2A", marginBottom:10, display:"flex", alignItems:"center", justifyContent:"space-between", gap:12}}>
        <span>Planner da semana</span>
        <span className="small" style={{opacity:.7}}>{done}/7 concluídos</span>
      </div>
      <WeekChips value={plan} onToggle={onToggle} />
      <TipsRotator
        tips={[
          "Beba água e alongue-se 1 min.",
          "Três respirações profundas.",
          "Envie uma mensagem carinhosa pra você mesma.",
          "Caminhe 2 min e olhe o céu."
        ]}
        key={done}
      />
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
      <p className="sub">Como você está hoje?</p>

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
          if (typeof window !== 'undefined') window.dispatchEvent(new Event('refreshEu360'));
          setOpenBreath(false);
        }}
      />
      <MoodModal
        open={openMood}
        onClose={() => setOpenMood(false)}
        onComplete={(entry)=>{
          try{ addMood({ date:new Date().toISOString(), mood:entry?.mood ?? 0, note:entry?.note }); }catch{}
          if (typeof window !== 'undefined') window.dispatchEvent(new Event('refreshEu360'));
          setOpenMood(false);
        }}
      />
      <InspireModal
        open={openInspire}
        onClose={() => setOpenInspire(false)}
        onComplete={()=>{
          try{ addAction({ date:new Date().toISOString(), type:"inspire" }); }catch{}
          try{ toggleDayDone(new Date()); }catch{}
          if (typeof window !== 'undefined') window.dispatchEvent(new Event('refreshEu360'));
          setOpenInspire(false);
        }}
      />
      <PauseModal
        open={openPause}
        onClose={() => setOpenPause(false)}
        onComplete={(minutes)=>{
          try{ addAction({ date:new Date().toISOString(), type:"pause", duration:minutes||3 }); }catch{}
          try{ toggleDayDone(new Date()); }catch{}
          if (typeof window !== 'undefined') window.dispatchEvent(new Event('refreshEu360'));
          setOpenPause(false);
        }}
      />
    </div>
  );
}
