"use client";

import Card from "../components/ui/Card";
import NavyCard from "../components/ui/NavyCard";
import Btn from "../components/ui/Btn";
import { useEffect, useMemo, useState } from "react";
import BreathModal from "../components/modals/BreathModal";
import MoodModal from "../components/modals/MoodModal";
import InspireModal from "../components/modals/InspireModal";
import PauseModal from "../components/modals/PauseModal";
import { addAction, addMood, getActions, getWeeklyPlan, toggleDayDone } from "../lib/storage";
import { useScore } from "../hooks/useScore";

function todayIndexMonFirst(){
  const d = new Date().getDay(); // 0..6 Sun..Sat
  return (d + 6) % 7; // Mon=0..Sun=6
}

export default function Home(){
  const [openBreath, setOpenBreath] = useState(false);
  const [openMood, setOpenMood] = useState(false);
  const [openInspire, setOpenInspire] = useState(false);
  const [openPause, setOpenPause] = useState(false);
  const [plan, setPlan] = useState([false,false,false,false,false,false,false]);
  const { refresh } = useScore();

  useEffect(() => {
    try { setPlan(getWeeklyPlan()); } catch {}
  }, []);

  const completedCount = useMemo(()=> plan.filter(Boolean).length, [plan]);

  function markFirstActionDone(){
    try {
      const idx = todayIndexMonFirst();
      if (!plan[idx]) {
        const next = toggleDayDone(idx);
        setPlan(next);
      }
    } catch {}
  }

  return (
    <div className="container">
      <h1 className="h1">Bom dia, Simone <span>💛</span></h1>
      <p className="sub">Como você está hoje? 😌</p>

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
        <Card style={{minHeight:110,display:"grid",placeItems:"center"}}>
          <div className="iconStack" onClick={() => setOpenMood(true)}><div className="iconToken">♡</div><div>Refletir</div></div>
        </Card>
        <NavyCard onClick={() => setOpenInspire(true)}><div className="iconToken">🔔</div><div>Inspirar</div></NavyCard>
        <Card style={{minHeight:110,display:"grid",placeItems:"center"}}>
          <div className="iconStack" onClick={() => setOpenPause(true)}><div className="iconToken">Ⅱ</div><div>Pausar</div></div>
        </Card>
      </div>

      <div className="space"></div>

      <Card className="card-navy">
        <div style={{fontWeight:800,marginBottom:6}}>Seu bem-estar também é importante</div>
        <div className="small" style={{opacity:.9}}>Dicas simples para o seu dia.</div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:10}}>
          {['S','T','Q','Q','S','S','D'].map((ch,i)=>
            <span key={i} className="small" style={{padding:"6px 10px",borderRadius:999,opacity: plan[i]? 1: .7, background: plan[i]? "rgba(255,255,255,.25)":"transparent", border: "1px solid rgba(255,255,255,.25)"}}>{ch}</span>
          )}
        </div>
        <div className="small" style={{marginTop:8}}>{completedCount}/7 concluídos</div>
      </Card>

      <BreathModal
        open={openBreath}
        onClose={() => setOpenBreath(false)}
        onComplete={(log) => {
          try { addAction({ date: new Date().toISOString(), ...log }); } catch {}
          markFirstActionDone();
          refresh();
          setOpenBreath(false);
        }}
      />

      <MoodModal
        open={openMood}
        onClose={() => setOpenMood(false)}
        onComplete={(entry) => {
          try { addMood(entry); } catch {}
          markFirstActionDone();
          refresh();
          setOpenMood(false);
        }}
      />

      <InspireModal
        open={openInspire}
        onClose={() => setOpenInspire(false)}
        onComplete={(log) => {
          try { addAction({ date: new Date().toISOString(), ...log }); } catch {}
          markFirstActionDone();
          refresh();
          setOpenInspire(false);
        }}
      />

      <PauseModal
        open={openPause}
        onClose={() => setOpenPause(false)}
        onComplete={(log) => {
          try { addAction({ date: new Date().toISOString(), ...log }); } catch {}
          markFirstActionDone();
          refresh();
          setOpenPause(false);
        }}
      />
    </div>
  );
}
