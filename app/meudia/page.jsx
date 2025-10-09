"use client";
import { useEffect, useMemo, useState } from "react";
import Card from "../../components/ui/Card";
import Btn from "../../components/ui/Btn";
import ChecklistToday from "../../components/planner/ChecklistToday";
import WeekProgressCard from "../../components/planner/WeekProgressCard";
import PlannerNotepad from "../../components/planner/PlannerNotepad";
import QuickAddModal from "../../components/planner/QuickAddModal";
import { showToast } from "../../lib/ui/toast";
import { safeGet, safeSet, isBrowser } from "@/lib/utils/safeStorage";
import { getPlannerDaysDone } from "@/lib/storage";
import useMessageOfDay from "@/hooks/useMessageOfDay";

function greeting(){
  try{
    const h = new Date().getHours();
    if (h < 12) return "Bom dia";
    if (h < 18) return "Boa tarde";
    return "Boa noite";
  }catch{ return "Olá"; }
}

export default function MeuDia(){
  const [name, setName] = useState("");
  const [tab, setTab] = useState("home"); // home | kids | me
  const [openPlanner, setOpenPlanner] = useState(false);
  const [plannerDay, setPlannerDay] = useState(0);
  const [openQuickAdd, setOpenQuickAdd] = useState(false);
  const [daysDone, setDaysDone] = useState(Array(7).fill(false));
  const motd = useMessageOfDay();

  useEffect(()=>{
    try{ const v = safeGet("m360:profile:name", ""); setName(String(v||"").split(" ")[0]); }catch{}
    try{ const t = safeGet("m360:planner:tab", "home"); setTab(t||"home"); }catch{}
    try{ setDaysDone(getPlannerDaysDone()); }catch{}
  },[]);

  function onStart(which){
    try{ safeSet("m360:planner:tab", which); }catch{}
    showToast("Vamos começar ✨");
    setOpenQuickAdd(true);
  }

  const greet = useMemo(()=>{
    const base = greeting();
    const em = base === "Bom dia" ? "☀️" : base === "Boa tarde" ? "🌿" : "🌙";
    return `${base}${name?`, ${name}`:""}! ${em}`;
  }, [name]);

  function openDay(i){ setPlannerDay(i); setOpenPlanner(true); }

  return (
    <div className="container meu-dia" aria-label="Meu Dia">
      {/* Header */}
      <section className="hero" aria-label="Saudação e energia">
        <h1 className="greeting-title">{greet}</h1>
        <div className="greeting-sub">Como está sua energia hoje?</div>
        <div style={{marginTop:10}}>
          <div className="card" style={{padding:12, background:"#FFF6F1"}}>
            <em className="small" style={{display:"block"}}>{motd}</em>
          </div>
        </div>
      </section>

      {/* Daily Routine Cards */}
      <section aria-label="Rotina diária">
        <div className="grid-2">
          <Card>
            <div className="card-title">🏠 Meu Dia</div>
            <div className="card-sub">organize tarefas do lar (arrumar, preparar, compras).</div>
            <div className="row">
              <Btn onClick={()=>onStart("home")} aria-label="Iniciar Meu Dia">Iniciar</Btn>
            </div>
          </Card>
          <Card>
            <div className="card-title">💕 Tempo com Meu Filho</div>
            <div className="card-sub">registrar momentos especiais do dia.</div>
            <div className="row">
              <Btn onClick={()=>{ onStart("kids"); try{ window.dispatchEvent(new CustomEvent('m360:badge',{ detail:{ key:'mae-presente' } })) }catch{} }} aria-label="Iniciar Tempo com Meu Filho">Iniciar</Btn>
            </div>
          </Card>
          <Card>
            <div className="card-title">🎨 Atividade do Dia</div>
            <div className="card-sub">sugestões automáticas (brincadeiras educativas).</div>
            <div className="row">
              <Btn onClick={()=>onStart("kids")} aria-label="Iniciar Atividade do Dia">Iniciar</Btn>
            </div>
          </Card>
          <Card>
            <div className="card-title">🌿 Momento para Mim</div>
            <div className="card-sub">pausas, respiros, afirmações e autocuidado.</div>
            <div className="row">
              <Btn onClick={()=>{ onStart("me"); try{ window.dispatchEvent(new CustomEvent('m360:badge',{ detail:{ key:'organizada' } })) }catch{} }} aria-label="Iniciar Momento para Mim">Iniciar</Btn>
            </div>
          </Card>
        </div>
      </section>

      {/* Weekly Planner */}
      <section id="planner" aria-label="Planner semanal">
        <Card className="planner-card">
          <div className="segmented" role="tablist" aria-label="Categorias do planner">
            <button className={`segmented-item${tab==='home'?' is-active':''}`} role="tab" aria-selected={tab==='home'} onClick={()=>{ setTab('home'); try{ safeSet('m360:planner:tab','home'); }catch{} }}>Casa</button>
            <button className={`segmented-item${tab==='kids'?' is-active':''}`} role="tab" aria-selected={tab==='kids'} onClick={()=>{ setTab('kids'); try{ safeSet('m360:planner:tab','kids'); }catch{} }}>Filhos</button>
            <button className={`segmented-item${tab==='me'?' is-active':''}`} role="tab" aria-selected={tab==='me'} onClick={()=>{ setTab('me'); try{ safeSet('m360:planner:tab','me'); }catch{} }}>Eu</button>
          </div>

          <WeekProgressCard days={daysDone} onOpenDay={openDay} onOpenCard={()=>{ setPlannerDay((()=>{ try{ const d=new Date(); return (d.getDay()+6)%7; }catch{return 0;} })()); setOpenPlanner(true); }} bonus="Você está indo muito bem 💕" />
        </Card>
      </section>

      {/* Checklist do Dia */}
      <section aria-label="Checklist do Dia">
        <ChecklistToday onProgress={()=>{ try{ setDaysDone(getPlannerDaysDone()); }catch{} }} onUndo={()=>{ try{ setDaysDone(getPlannerDaysDone()); }catch{} }} />
      </section>

      {/* FAB */}
      <button className="btn btn-primary fab" onClick={()=>setOpenQuickAdd(true)} aria-label="Adicionar anotação rápida">＋ Anotar</button>

      {/* Modals */}
      <PlannerNotepad open={openPlanner} onClose={()=>setOpenPlanner(false)} dayIndex={plannerDay} onChangeDay={(i)=>setPlannerDay(i)} />
      <QuickAddModal open={openQuickAdd} onClose={()=>setOpenQuickAdd(false)} />
    </div>
  );
}
