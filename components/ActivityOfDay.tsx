"use client";

import { useState } from "react";
import { openPlannerAdd, proposePlannerItem } from "./planner/plannerBus";

const DAY_ORDER: DayKey[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DAY_LABEL: Record<DayKey, string> = {
  Mon: "Mon",
  Tue: "Tue",
  Wed: "Wed",
  Thu: "Thu",
  Fri: "Fri",
  Sat: "Sat",
  Sun: "Sun",
};

export default function ActivityOfDay() {
  const activityTitle = "Brincadeira de blocos criativos";
  const activityDesc =
    "Separe alguns blocos de montar e convide seu filho para criar juntos uma torre, um animal ou o que a imaginação mandar.";

  const [saved, setSaved] = useState(false);

  const onSaveClick = () => {
    proposePlannerItem({
      title: activityTitle,
      category: 'brincadeira',
      durationMin: 10,
      notes: 'Atividade do dia'
    });
    setSaved(false);
  };

  return (
    <div>
      <div className="flex items-start justify-between">
        <span className="inline-flex rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 ml-auto">10 min</span>
      </div>

      <h3 className="mt-2 text-lg font-medium text-charcoal sm:text-xl">{activityTitle}</h3>
      <p className="mt-1.5 text-sm sm:text-base text-grayMid leading-relaxed">{activityDesc}</p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <button
          type="button"
          onClick={openPlannerAdd}
          className="inline-flex items-center justify-center rounded-lg bg-coral px-4 py-2 text-sm font-medium text-white hover:bg-coral-hover active:bg-coral-active shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 transition w-full sm:w-auto min-h-[44px]"
        >
          Iniciar
        </button>
        <button
          type="button"
          onClick={onSaveClick}
          className="inline-flex items-center justify-center rounded-lg bg-white ring-1 ring-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 transition w-full sm:w-auto min-h-[44px]"
          aria-label="Salvar atividade do dia no Planner"
        >
          Salvar no Planner
        </button>
      </div>

    </div>
  );
}
