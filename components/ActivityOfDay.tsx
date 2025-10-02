"use client";

import { useState } from "react";
import { DayKey, saveActivity } from "./Planner/PlannerStorage";

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

  const [open, setOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<DayKey | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const onSaveClick = () => {
    setOpen(true);
    setSelectedDay(null);
    setSaved(false);
  };

  const onConfirm = async () => {
    if (!selectedDay) return;
    setSaving(true);
    try {
      saveActivity(selectedDay, activityTitle);
      setSaved(true);
      setOpen(false);
    } finally {
      setSaving(false);
    }
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
          className="inline-flex items-center justify-center rounded-lg bg-coral px-4 py-2 text-sm font-medium text-white hover:bg-coral-hover active:bg-coral-active shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 transition w-full sm:w-auto min-h-[44px]"
        >
          Iniciar
        </button>
        <button
          type="button"
          onClick={onSaveClick}
          className="inline-flex items-center justify-center rounded-lg bg-neutral px-4 py-2 text-white text-sm font-medium hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 transition w-full sm:w-auto min-h-[44px]"
        >
          {saved ? "Salvo!" : "Salvar no Planner"}
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-sm rounded-xl bg-white shadow-lg ring-1 ring-black/10 p-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-gray-900">Escolha um dia</h4>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {DAY_ORDER.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setSelectedDay(d)}
                  className={`rounded-lg border px-2 py-1 text-sm ${
                    selectedDay === d ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-800 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {DAY_LABEL[d]}
                </button>
              ))}
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={!selectedDay || saving}
                onClick={onConfirm}
                className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white disabled:opacity-50"
              >
                {saving ? "Salvando..." : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
