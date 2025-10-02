"use client";
import { useEffect, useRef, useState } from "react";

type Input = {
  title: string;
  category: "brincadeira" | "aprendizado" | "movimento" | "vínculo";
  durationMin: number;
  notes?: string;
};
export default function PlannerSheet({
  open, onOpenChange, onSubmit, initial
}:{
  open: boolean;
  onOpenChange: (b:boolean)=>void;
  onSubmit: (input: Input)=>void;
  initial?: Partial<Input>;
}) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Input["category"]>("brincadeira");
  const [duration, setDuration] = useState(10);
  const [notes, setNotes] = useState("");
  const first = useRef<HTMLInputElement|null>(null);

  useEffect(() => {
    if (open) setTimeout(() => first.current?.focus(), 0);
  }, [open]);

  useEffect(() => {
    if (open && initial) {
      if (initial.title) setTitle(initial.title);
      if (initial.category) setCategory(initial.category as Input["category"]);
      if (typeof initial.durationMin === 'number') setDuration(initial.durationMin);
      if (initial.notes) setNotes(initial.notes);
    }
  }, [open, initial]);

  const close = () => onOpenChange(false);
  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    const t = title.trim();
    if (!t || t.length > 60) return;
    onSubmit({ title: t, category, durationMin: duration, notes: notes.trim() || undefined });
    setTitle(""); setNotes("");
  };

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" onClick={close} />
      <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-md rounded-t-2xl bg-white p-5 shadow-xl">
        <h2 className="text-base font-semibold text-gray-900 mb-3">Adicionar atividade</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input ref={first} value={title} onChange={e=>setTitle(e.target.value)} placeholder="Título (ex.: Brincar com blocos)" className="w-full rounded-lg ring-1 ring-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6F61]" />
          <div className="flex gap-2">
            <select value={category} onChange={e=>setCategory(e.target.value as any)} className="flex-1 rounded-lg ring-1 ring-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6F61]">
              <option value="brincadeira">Brincadeira</option>
              <option value="aprendizado">Aprendizado</option>
              <option value="movimento">Movimento</option>
              <option value="vínculo">Vínculo</option>
            </select>
            <select value={duration} onChange={e=>setDuration(parseInt(e.target.value))} className="w-32 rounded-lg ring-1 ring-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6F61]">
              {[5,10,15,20,30].map(n=> <option key={n} value={n}>{n} min</option>)}
            </select>
          </div>
          <textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Notas (opcional)" className="w-full rounded-lg ring-1 ring-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6F61]" rows={3}/>
          <div className="flex justify-end gap-2 pt-1">
            <button type="button" onClick={close} className="rounded-lg bg-white ring-1 ring-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Cancelar</button>
            <button type="submit" className="rounded-lg bg-[#FF6F61] hover:bg-[#FF786B] active:bg-[#E85D51] px-4 py-2 text-sm text-white">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
