"use client";

import { useMemo } from "react";
import { DayKey, usePlannerStorage } from "./PlannerStorage";

const ORDER: DayKey[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const LABELS: Record<DayKey, string> = {
  Mon: "Mon",
  Tue: "Tue",
  Wed: "Wed",
  Thu: "Thu",
  Fri: "Fri",
  Sat: "Sat",
  Sun: "Sun",
};

export default function PlannerPreview() {
  const { data } = usePlannerStorage();

  const isEmpty = useMemo(() => ORDER.every((d) => (data.days[d] ?? []).length === 0), [data]);

  if (isEmpty) {
    return (
      <div className="text-sm text-gray-600">Nenhuma atividade salva ainda. Use “Salvar no Planner” para adicionar.</div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {ORDER.map((day) => (
        <div key={day} className="rounded-xl border border-gray-200 p-3">
          <div className="text-xs font-semibold text-gray-700 tracking-wide">{LABELS[day]}</div>
          <ul className="mt-2 space-y-1">
            {(data.days[day] || []).map((item, idx) => (
              <li key={idx} className="text-sm text-gray-800 flex items-start">
                <span className="mt-1 mr-2 text-gray-400">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
