'use client';
import { useEffect, useState } from 'react';
import { keys, get, onUpdate } from '../../lib/storage';
import { setDayDone } from '../../lib/planner';

function weekISO(){
  const base = new Date();
  const day = base.getDay() || 7; // 1..7 (Mon..Sun when mapped)
  const monday = new Date(base);
  monday.setHours(0,0,0,0);
  monday.setDate(base.getDate() - (day - 1));
  return Array.from({length:7}).map((_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.toISOString().slice(0,10);
  });
}

export default function WeeklyChips(){
  const [planner, setPlanner] = useState(() => get(keys.planner, {}));
  const days = weekISO();

  useEffect(() => {
    const off = onUpdate((k) => { if (!k || k === keys.planner) setPlanner(get(keys.planner, {})); });
    return () => off?.();
  }, []);

  const todayISO = new Date().toISOString().slice(0,10);

  return (
    <div className="m360-scroll-x" role="group" aria-label="Semana atual">
      {days.map((iso) => {
        const done = !!planner?.dates?.[iso]?.done || !!planner?.[iso]?.done; // support both shapes
        const label = new Date(iso).toLocaleDateString('pt-BR', { weekday:'short' }).replace('.', '');
        const isToday = iso === todayISO;
        const cls = `m360-chip m360-day-chip${done ? ' is-complete' : ''}${isToday ? ' is-today' : ''}`;
        return (
          <button
            key={iso}
            type="button"
            onClick={() => setDayDone(iso, !done)}
            className={cls}
            aria-pressed={done}
            title={iso}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
