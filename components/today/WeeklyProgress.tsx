"use client";
import { useMemo } from "react";
import { usePlanner } from "@/components/planner/usePlanner";

export default function WeeklyProgress() {
  const { items } = usePlanner();

  const { doneCount, totalCount, pct } = useMemo(() => {
    const total = items?.length || 0;
    const done = (items || []).reduce((acc, it) => acc + (it.done ? 1 : 0), 0);
    const percent = total === 0 ? 0 : Math.round((done / total) * 100);
    return { doneCount: done, totalCount: total, pct: percent };
  }, [items]);

  return (
    <section className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-6 space-y-3">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Progresso da semana</h2>

      <div className="h-3 w-full rounded-full bg-gray-100 ring-1 ring-gray-200/70 overflow-hidden">
        <div
          className="h-full bg-coral transition-all"
          style={{ width: `${pct}%` }}
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          role="progressbar"
        />
      </div>

      {totalCount === 0 ? (
        <p className="text-sm text-gray-600">Adicione atividades ao Planner para acompanhar seu progresso.</p>
      ) : (
        <p className="text-sm text-gray-600">Você concluiu <span className="font-semibold text-charcoal">{doneCount}</span> de <span className="font-semibold text-charcoal">{totalCount}</span> atividade(s).</p>
      )}
    </section>
  );
}
