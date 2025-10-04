"use client";

import { useEffect, useState } from "react";
import { getWeek, toggleToday } from "../../lib/planner";

export default function WeeklyPlanner() {
  const [week, setWeek] = useState(() => []);

  useEffect(() => {
    setWeek(getWeek());
  }, []);

  const onToggle = () => {
    const updated = toggleToday();
    setWeek(updated);
  };

  const completed = week.filter((d) => d.completed).length;

  return (
    <div>
      <div className="week-tracker" role="group" aria-label="Weekly planner">
        {week.map((d, i) => {
          const cls = [
            "week-day",
            d.isToday ? "is-current" : "",
            d.completed ? "is-completed" : "",
          ]
            .filter(Boolean)
            .join(" ");

        if (d.isToday) {
          return (
            <button
              key={i}
              type="button"
              className={cls}
              aria-pressed={d.completed}
              aria-label={`Hoje (${d.label}) - ${d.completed ? "completo" : "incompleto"}`}
              onClick={onToggle}
            >
              {d.label}
            </button>
          );
        }
        return (
          <div
            key={i}
            className={cls}
            aria-label={`Dia ${d.label} - ${d.completed ? "completo" : "incompleto"}`}
          >
            {d.label}
          </div>
        );
      })}
      </div>
      <div className="small week-summary">{completed}/7 completed 💖</div>
    </div>
  );
}
