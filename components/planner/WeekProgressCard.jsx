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
    return d === 0 ? 6 : d - 1; // Map to Seg..Dom (Mon..Sun)
  } catch {
    return -1;
  }
}

export default function WeekProgressCard({ completedCount = 0, total = 7, days = Array(7).fill(false), onDayPress = () => {}, bonus, className = "" }){
  const todayIdx = useMemo(() => getTodayIndex(), []);

  return (
    <Card className={`planner-card ${className}`.trim()}>
      <div className="planner-head">
        <div className="planner-title">Planner da semana</div>
        <div className="planner-meta">{completedCount} de {total} concluídos</div>
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
        <div className="planner-tip">
          <span aria-hidden className="planner-dot" />
          <div className="planner-tip-text">{bonus}</div>
        </div>
      ) : null}
    </Card>
  );
}
