"use client";
import React, { useMemo } from "react";
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
    // Map to Seg..Dom (Mon..Sun) indexing used by our planner
    return d === 0 ? 6 : d - 1;
  } catch {
    return -1;
  }
}

export default function WeekProgressCard({ completedCount = 0, total = 7, days = Array(7).fill(false), onDayPress = () => {}, bonus }){
  const todayIdx = useMemo(() => getTodayIndex(), []);

  return (
    <Card>
      <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", gap:12, marginBottom:10}}>
        <div style={{fontWeight:800,fontSize:18,color:"#0D1B2A", opacity:.92}}>Planner da semana</div>
        <div className="small" style={{opacity:.75}}>{completedCount} de {total} concluídos</div>
      </div>

      <div className="m360-scroll-x" role="group" aria-label="Planner semanal">
        {DAY_LABELS.map((d, i) => {
          const done = !!days?.[i];
          const isToday = i === todayIdx;
          const aria = `${DAY_FULL[i]} ${done ? "concluído" : "não concluído"}`;
          return (
            <button
              key={i}
              type="button"
              className={`m360-chip m360-day-chip${done ? " is-complete" : ""}${isToday ? " is-today" : ""}`}
              aria-pressed={done}
              aria-label={aria}
              onClick={() => onDayPress(i)}
            >
              {d}
            </button>
          );
        })}
      </div>

      {bonus ? (
        <div style={{display:"flex", alignItems:"center", gap:8, marginTop:10}}>
          <span aria-hidden style={{width:8,height:8,borderRadius:999,background:"#FF005E",display:"inline-block"}} />
          <div style={{fontWeight:700, color:"#0D1B2A", opacity:.9}}>{bonus}</div>
        </div>
      ) : null}
    </Card>
  );
}
