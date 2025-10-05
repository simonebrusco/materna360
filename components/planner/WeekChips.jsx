"use client";
import React from "react";

export default function WeekChips({ value = Array(7).fill(false), onToggle = () => {} }) {
  const labels = ["S","T","Q","Q","S","S","D"]; // Seg..Dom initials
  const completed = Array.isArray(value) ? value.filter(Boolean).length : 0;

  return (
    <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", gap:12}}>
      <div className="m360-chip-row" role="group" aria-label="Planner semanal">
        {labels.map((d, i) => {
          const active = !!value[i];
          return (
            <button
              key={i}
              type="button"
              className={`m360-chip${active ? " is-selected" : ""}`}
              role="button"
              aria-pressed={active}
              onClick={() => onToggle(i)}
              title={`Dia ${i+1}`}
            >
              {d}
            </button>
          );
        })}
      </div>
      <div className="small" style={{opacity:.85}}>{completed}/7 concluídos</div>
    </div>
  );
}
