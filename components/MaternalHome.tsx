"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Card from "./ui/Card";
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
import ChecklistToday from "./planner/ChecklistToday";
import {
  addAction,
  addMood,
  ensurePlannerWeek,
  getWeeklyPlan,
  toggleDayDone,
  ensureSegmentedPlanners,
  getSegmentDaysDone,
} from "../lib/storage";
import QuickAddModal from "./planner/QuickAddModal";
import { emitEu360Refresh } from "../lib/clientEvents";
import BadgesLevelToast from "./BadgesLevelToast";
import { showToast } from "../lib/ui/toast";

const GreetingBinder = dynamic(() => import("./GreetingBinder"), { ssr: false });

export default function MaternalHome(){
  const [openBreath, setOpenBreath] = useState(false);
  const [openMood, setOpenMood] = useState(false);
  const [openInspire, setOpenInspire] = useState(false);
  const [openPause, setOpenPause] = useState(false);

  const [activeTab, setActiveTab] = useState<'home'|'kids'|'me'>('home');
  const [plan, setPlan] = useState<boolean[]>(Array(7).fill(false));
  const [openQuick, setOpenQuick] = useState(false);
  const [openPad, setOpenPad] = useState(false);
  const [padDay, setPadDay] = useState(() => { try{ const d=new Date().getDay(); return d===0?6:d-1; }catch{ return 0; } });
  const [extraPct, setExtraPct] = useState(0);
  const done = useMemo(() => (Array.isArray(plan) ? plan.filter(Boolean).length : 0), [plan]);

  useEffect(()=>{ try{ ensurePlannerWeek(); ensureSegmentedPlanners(); setPlan(getSegmentDaysDone(activeTab)); }catch{} },[activeTab]);
  useEffect(()=>{
    const off = () => { try { setPlan(getSegmentDaysDone(activeTab) || getWeeklyPlan()); } catch {} };
    try { window.addEventListener('m360:data:updated', off); } catch {}
    return () => { try { window.removeEventListener('m360:data:updated', off); } catch {} };
  },[activeTab]);

  function openNotepad(i?: number){ if (typeof i==='number') setPadDay(i); setOpenPad(true); }

  const tips = [
    "Beba água e alongue-se 1 min.",
    "Três respirações profundas.",
    "Envie uma mensagem carinhosa pra você mesma.",
    "Caminhe 2 min e olhe o céu."
  ];
  const bonus = tips[done % tips.length];

  function PlannerTabs(){
    const [tab, setTab] = useState<string>(() => {
      try{ return localStorage.getItem('m360:planner:tab') || 'home'; }catch{ return 'home'; }
    });
    useEffect(()=>{ try{ localStorage.setItem('m360:planner:tab', tab); }catch{} }, [tab]);
    const items = [
      { id: 'home', label: 'Casa' },
      { id: 'kids', label: 'Filhos' },
      { id: 'me', label: 'Eu' }
    ];
    return (
      <div className="segmented" role="tablist" aria-label="Planner da Família">
        {items.map(it => (
          <button key={it.id} role="tab" aria-selected={tab===it.id} className={`segmented-item${tab===it.id?' is-active':''}`} onClick={()=>setTab(it.id)}>{it.label}</button>
        ))}
      </div>
    );
  }

  function DailyChecklist(){
    const today = useMemo(()=>{ try{ return new Date().toISOString().slice(0,10); }catch{ return ''; } }, []);
    const key = `m360:microtasks:${today}`;
    const [state, setState] = useState<{water:boolean;stretch:boolean;play:boolean}>(()=>{
      try{ return JSON.parse(localStorage.getItem(key)||'') || { water:false, stretch:false, play:false }; }catch{ return { water:false, stretch:false, play:false }; }
    });
    useEffect(()=>{ try{ localStorage.setItem(key, JSON.stringify(state)); }catch{} }, [state]);
    const total = 3; const count = Number(state.water) + Number(state.stretch) + Number(state.play);
    const pct = Math.round((count/total)*100);
    function toggleItem(k: 'water'|'stretch'|'play'){
      setState(s => {
        const next = { ...s, [k]: !s[k] };
        showToast(next[k] ? 'Boa! Tarefa concluída.' : 'Marcado como não concluído.');
        if (Number(next.water) + Number(next.stretch) + Number(next.play) === 3) {
          try { toggleDayDone(new Date()); } catch {}
          showToast('Organizada');
        }
        return next;
      });
    }
    return (
      <div className="card" style={{marginTop:12}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8}}>
          <div style={{fontWeight:800,color:'#1E1E1E'}}>Checklist do dia</div>
          <div className="small" style={{opacity:.75}}>{count} de {total} concluídos</div>
        </div>
        <div style={{display:'grid',gap:8}}>
          <label style={{display:'flex',alignItems:'center',gap:8}}><input type="checkbox" checked={state.water} onChange={()=>toggleItem('water')} /> Beber água 💧</label>
          <label style={{display:'flex',alignItems:'center',gap:8}}><input type="checkbox" checked={state.stretch} onChange={()=>toggleItem('stretch')} /> Alongar-se 🧘</label>
          <label style={{display:'flex',alignItems:'center',gap:8}}><input type="checkbox" checked={state.play} onChange={()=>toggleItem('play')} /> Brincar com meu filho 🎲</label>
        </div>
        <div style={{marginTop:10}} aria-hidden>
          <div style={{height:8, background:"rgba(13,27,42,.06)", borderRadius:999}}>
            <div style={{height:8, width:`${pct}%`, background:"#F15A2E", borderRadius:999}} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="m360-container meu-dia">
      {/* 1) Hero (saudação + mensagem do dia) */}
      <section className="m360-hero hero">
        <GreetingBinder>
          {({ name, part }) => (
            <div>
              <h1 className="greeting-title" suppressHydrationWarning>{part}, {name} <span aria-hidden>💛</span></h1>
              <p className="greeting-sub">Como você está hoje?</p>
            </div>
          )}
        </GreetingBinder>
        <div className="hero-grid">
          <MessageOfDayCard className="motd-card" showTitle={false} showButton={false} />
          <Card className="mood-card tap-scale" onClick={()=>setOpenMood(true)}>
            <Icon name="mood" className="icon-24 icon-accent" />
            <div>
              <h3>Como você se sente?</h3>
              <p className="small">Toque para registrar</p>
            </div>
          </Card>
        </div>

        {/* Checklist do Dia */}
        <div className="space" />
        <ChecklistToday onProgress={(p)=>setExtraPct(p)} />
      </section>

      {/* 2) Planner da Família (full-width) */}
      <section className="m360-planner">
        <div className="m360-chip-row" role="tablist" aria-label="Planner categorias">
          {['home','kids','me'].map((k)=>{
            const labels = { home: 'Casa', kids: 'Filhos', me: 'Eu' } as const;
            const is = activeTab===k;
            return (
              <button key={k} className={`m360-chip${is?' is-selected':''}`} role="tab" aria-selected={is} onClick={()=>setActiveTab(k as any)}>{labels[k as keyof typeof labels]}</button>
            );
          })}
        </div>
        <WeekProgressCard className="planner-card" completedCount={done} total={7} days={plan} onOpenDay={(i)=>openNotepad(i)} onOpenCard={()=>openNotepad(padDay)} bonus={bonus} extraPct={extraPct} />
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
          try{ import("../lib/ui/toast").then(m=>m.showToast("Mãe Presente 💗")).catch(()=>{}); }catch{}
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
          showToast("Mãe Presente");
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
          showToast("Mãe Presente");
          emitEu360Refresh();
          setOpenPause(false);
        }}
      />
    </div>
  );
}
