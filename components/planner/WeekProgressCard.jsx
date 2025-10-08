"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Card from "../ui/Card";

const DAY_LABELS = ["S","T","Q","Q","S","S","D"]; // Seg..Dom
const DAY_FULL = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
  "Domingo"
];

function getTodayIndex() {
  try {
    const d = new Date().getDay(); // 0=Sun..6=Sat
    return d === 0 ? 6 : d - 1; // Map to Seg..Dom (Mon..Sun)
  } catch {
    return -1;
  }
}

function microcopy(percent){
  if (percent <= 33) return "You’re getting started—one step at a time.";
  if (percent <= 66) return "Great rhythm—keep going!";
  return "You’re doing amazing—almost there!";
}

export default function WeekProgressCard({ completedCount = 0, total = 7, days = Array(7).fill(false), onOpenDay = () => {}, onOpenCard = () => {}, bonus, className = "", extraPct = 0 }){
  const todayIdx = useMemo(() => getTodayIndex(), []);
  const scrollRef = useRef(null);
  const [scrollX, setScrollX] = useState(0);

  useEffect(() => {
    try {
      const v = typeof window !== 'undefined' ? Number(localStorage.getItem('m360:planner:scrollX')) || 0 : 0;
      setScrollX(v);
      if (scrollRef.current) scrollRef.current.scrollLeft = v;
    } catch {}
  }, []);

  function onScroll(e){
    const x = e.currentTarget?.scrollLeft || 0;
    setScrollX(x);
    try { localStorage.setItem('m360:planner:scrollX', String(x)); } catch {}
  }

  const done = Array.isArray(days) ? days.filter(Boolean).length : 0;
  const denom = Math.max(1, Math.min(7, total || 7));
  const pct = Math.max(0, Math.min(100, Math.round((done / denom) * 100)));

  return (
    <Card className={`planner-card ${className}`.trim()}>
      <div className="planner-head" onClick={()=>onOpenCard()} style={{cursor:"pointer"}}>
        <div className="planner-title">Planner da Família</div>
        <div className="planner-meta">{done} de {denom} concluídos</div>
      </div>

      <div ref={scrollRef} onScroll={onScroll} className="m360-scroll-x" role="group" aria-label="Planner semanal">
        {DAY_LABELS.map((d, i) => {
          const isDone = !!days?.[i];
          const isToday = i === todayIdx;
          const aria = `${DAY_FULL[i]} ${isDone ? "concluído" : "não concluído"}`;
          return (
            <button
              key={i}
              type="button"
              className={`m360-chip m360-day-chip${isDone ? " is-complete" : ""}${isToday ? " is-today" : ""}`}
              aria-pressed={isDone}
              aria-label={aria}
              onClick={() => onOpenDay(i)}
            >
              {d}
            </button>
          );
        })}
      </div>

      <div style={{marginTop:10, cursor:"pointer"}} onClick={()=>onOpenCard()}>
        <div aria-hidden style={{position:"relative", height:8, background:"rgba(13,27,42,.06)", borderRadius:999, overflow:"hidden"}}>
          <div style={{height:8, width:`${pct}%`, background:"#F15A2E", borderRadius:999}} />
          {extraPct ? (
            <div style={{position:"absolute", top:0, left:0, height:8, width:`${Math.min(100, pct + extraPct)}%`, background:"rgba(241,115,36,.35)", borderRadius:999}} />
          ) : null}
        </div>
        <div className="small" style={{opacity:.8, marginTop:6}}>{microcopy(pct)}</div>
      </div>

      {bonus ? (
        <div className="planner-tip">
          <span aria-hidden className="planner-dot" />
          <div className="planner-tip-text">{bonus}</div>
        </div>
      ) : null}
    </Card>
  );
}
