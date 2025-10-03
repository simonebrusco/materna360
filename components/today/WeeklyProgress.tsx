"use client";
import { useMemo } from "react";
import { usePlanner } from "@/components/planner/usePlanner";
import Button from "../ui/Button";
import { openPlannerAdd } from "../planner/plannerBus";

export default function WeeklyProgress() {
  const { items } = usePlanner();

  const { doneCount, totalCount, pct } = useMemo(() => {
    const total = items?.length || 0;
    const done = (items || []).reduce((acc, it) => acc + (it.done ? 1 : 0), 0);
    const percent = total === 0 ? 0 : Math.round((done / total) * 100);
    return { doneCount: done, totalCount: total, pct: percent };
  }, [items]);

  return (
    <section className="bg-white rounded-2xl shadow-sm ring-1 ring-[color:var(--neutral-100)] p-6 space-y-3">
      <h2 className="text-lg sm:text-xl font-semibold text-[color:var(--brand-navy)] mb-2">Progresso da semana</h2>

      <div className="h-3 w-full rounded-full bg-[color:rgba(47,58,86,.12)] overflow-hidden">
        <div
          className="h-full rounded-full bg-[color:var(--brand-coral)] motion-safe:transition-[width] motion-safe:duration-300 motion-safe:ease-out"
          style={{ width: `${pct}%` }}
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          role="progressbar"
        />
      </div>

      {totalCount === 0 ? (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm text-[color:var(--brand-navy)]/70">Adicione atividades ao Planner para acompanhar seu progresso.</p>
          <Button variant="secondary" size="sm" onClick={openPlannerAdd}>Adicionar atividade</Button>
        </div>
      ) : (
        <div className="space-y-1">
          <p className="text-sm text-[color:var(--brand-navy)]/80">Você concluiu <span className="font-semibold text-[color:var(--brand-navy)]">{doneCount}</span> de <span className="font-semibold text-[color:var(--brand-navy)]">{totalCount}</span> atividade(s).</p>
          <p className="text-xs text-[color:var(--brand-navy)]/60">Ótimo progresso — você consegue!</p>
        </div>
      )}
    </section>
  );
}
