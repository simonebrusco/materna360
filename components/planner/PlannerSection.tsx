"use client";
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { usePlanner } from "./usePlanner";
import PlannerSheet from "./PlannerSheet";
import PlannerList from "./PlannerList";
import { onPlannerAdd, onPlannerPropose } from "./plannerBus";
import Button from "../ui/Button";
import { Calendar } from "lucide-react";

function uid() {
  return "id-" + Math.random().toString(36).slice(2,10) + "-" + Date.now().toString(36);
}

export default function PlannerSection() {
  const { items, addItem, toggleDone, loading } = usePlanner();
  const [open, setOpen] = useState(false);
  const [initial, setInitial] = useState<{title:string; category:any; durationMin:number; notes?:string} | null>(null);
  const sectionRef = useRef<HTMLElement|null>(null);

  const onAddClick = useCallback(() => setOpen(true), []);
  const onSubmit = useCallback((input: {title:string; category:any; durationMin:number; notes?:string}) => {
    addItem({
      id: uid(),
      title: input.title,
      category: input.category,
      durationMin: input.durationMin,
      notes: input.notes,
      done: false,
      createdAt: Date.now(),
    });
    setOpen(false);
  }, [addItem]);

  const empty = !items || items.length === 0;
  const top3 = useMemo(() => (items || []).slice(0,3), [items]);

  useEffect(() => {
    const offAdd = onPlannerAdd(() => {
      sectionRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setOpen(true);
    });
    const offPropose = onPlannerPropose((draft) => {
      sectionRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setInitial({
        title: draft.title || "",
        category: draft.category || "brincadeira",
        durationMin: typeof draft.durationMin === "number" ? draft.durationMin : 10,
        notes: draft.notes || "",
      });
      setOpen(true);
    });
    return () => {
      offAdd();
      offPropose();
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-[color:var(--brand-navy)]/70" />
          <h2 className="font-display text-[18px] leading-6 font-semibold tracking-[-0.01em] text-[color:var(--brand-navy)]">Planner</h2>
        </div>
        <Button variant="secondary" size="sm" onClick={onAddClick}>Adicionar</Button>
      </div>

      {empty ? (
        <div className="mt-3 rounded-xl bg-[#FAFAF8] p-4 text-sm text-gray-600 ring-1 ring-gray-200">
          <p className="mb-3">Organize atividades para hoje. Você pode começar com algo simples, como 10 minutos de brincadeira 💛</p>
          <Button onClick={onAddClick} variant="primary" size="md">Adicionar atividade</Button>
        </div>
      ) : (
        <div className="mt-4">
          <PlannerList items={top3} onToggleDone={toggleDone} />
          <button type="button" onClick={()=>console.log("ver tudo")} className="mt-3 text-sm text-gray-600 underline underline-offset-4 hover:text-gray-800">
            Ver tudo
          </button>
        </div>
      )}

      <PlannerSheet open={open} onOpenChange={setOpen} onSubmit={onSubmit} initial={initial ?? undefined} />
    </section>
  );
}
