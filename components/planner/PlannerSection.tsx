"use client";
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { usePlanner } from "./usePlanner";
import PlannerSheet from "./PlannerSheet";
import PlannerList from "./PlannerList";
import { onPlannerAdd, onPlannerPropose, PlannerProposedItem } from "./plannerBus";

function uid() {
  return "id-" + Math.random().toString(36).slice(2,10) + "-" + Date.now().toString(36);
}

export default function PlannerSection() {
  const { items, addItem, toggleDone, loading } = usePlanner();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState<PlannerProposedItem | null>(null);
  const sectionRef = useRef<HTMLElement|null>(null);

  const onAddClick = useCallback(() => setOpen(true), []);
  const onSubmit = useCallback((input: {title:string; category:any; durationMin:number; notes?:string}) => {
    const exists = (items || []).some(it =>
      it.title.trim().toLowerCase() === input.title.trim().toLowerCase() &&
      it.category === input.category &&
      it.durationMin === input.durationMin
    );
    if (!exists) {
      addItem({
        id: uid(),
        title: input.title,
        category: input.category,
        durationMin: input.durationMin,
        notes: input.notes,
        done: false,
        createdAt: Date.now(),
      });
    }
    setPending(null);
    setOpen(false);
  }, [addItem, items]);

  const empty = !items || items.length === 0;
  const top3 = useMemo(() => (items || []).slice(0,3), [items]);

  useEffect(() => onPlannerAdd(() => {
    sectionRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setOpen(true);
  }), []);

  useEffect(() => onPlannerPropose((p) => {
    sectionRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setPending(p);
    setOpen(true);
  }), []);

  return (
    <section ref={sectionRef} className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-6">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Planner</h2>
        <button onClick={onAddClick} className="rounded-lg bg-white ring-1 ring-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50">Adicionar</button>
      </div>

      {empty ? (
        <div className="mt-3 rounded-xl bg-[#FAFAF8] p-4 text-sm text-gray-600 ring-1 ring-gray-200">
          <p className="mb-3">Organize atividades para hoje. Você pode começar com algo simples, como 10 minutos de brincadeira 💛</p>
          <button onClick={onAddClick} className="rounded-lg bg-[#FF6F61] hover:bg-[#FF786B] active:bg-[#E85D51] px-4 py-2 text-sm text-white">
            Adicionar atividade
          </button>
        </div>
      ) : (
        <div className="mt-4">
          <PlannerList items={top3} onToggleDone={toggleDone} />
          <button type="button" onClick={()=>console.log("ver tudo")} className="mt-3 text-sm text-gray-600 underline underline-offset-4 hover:text-gray-800">
            Ver tudo
          </button>
        </div>
      )}

      <PlannerSheet open={open} onOpenChange={setOpen} onSubmit={onSubmit} initial={pending ?? undefined} />
    </section>
  );
}
