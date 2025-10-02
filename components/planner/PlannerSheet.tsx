'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import type { PlannerItemInput, PlannerCategory } from './usePlanner';

const CATEGORIES: PlannerCategory[] = ['brincadeira', 'aprendizado', 'movimento', 'vínculo'];
const DURATIONS = [5, 10, 15, 20, 30] as const;

export default function PlannerSheet({ open, onOpenChange, onSubmit }: { open: boolean; onOpenChange: (b: boolean) => void; onSubmit: (item: PlannerItemInput) => void }) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const firstFieldRef = useRef<HTMLInputElement | null>(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<PlannerCategory>('brincadeira');
  const [durationMin, setDurationMin] = useState<number>(10);
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState<{ title?: string; notes?: string } | null>(null);

  const reset = () => {
    setTitle('');
    setCategory('brincadeira');
    setDurationMin(10);
    setNotes('');
    setErrors(null);
  };

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => firstFieldRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [open]);

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (!open) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      onOpenChange(false);
    }
  }, [open, onOpenChange]);

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  function validate() {
    const errs: { title?: string; notes?: string } = {};
    const t = title.trim();
    if (!t) errs.title = 'Obrigatório';
    if (t.length > 60) errs.title = 'Máx. 60 caracteres';
    if (notes.trim().length > 140) errs.notes = 'Máx. 140 caracteres';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ title: title.trim(), category, durationMin, notes: notes.trim() || undefined });
    onOpenChange(false);
    reset();
  }

  function onOverlayClick(e: React.MouseEvent) {
    if (e.target === overlayRef.current) onOpenChange(false);
  }

  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className={`absolute inset-0 bg-black/30 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onOverlayClick}
      />
      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="planner-sheet-title"
        ref={panelRef}
        className={`absolute inset-x-0 bottom-0 mx-auto w-full max-w-md rounded-t-2xl bg-white shadow-2xl ring-1 ring-gray-200 transition-transform ${open ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <h2 id="planner-sheet-title" className="text-base font-semibold text-gray-900">Adicionar atividade</h2>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700" htmlFor="planner-title">Título</label>
            <input
              id="planner-title"
              ref={firstFieldRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={60}
              required
              className="w-full rounded-lg border-0 ring-1 ring-gray-300 focus:ring-2 focus:ring-[#FF6F61] px-3 py-2 text-sm"
              placeholder="Ex.: Brincar de blocos"
            />
            {errors?.title && <p className="text-xs text-red-600">{errors.title}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700" htmlFor="planner-category">Categoria</label>
              <select
                id="planner-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as PlannerCategory)}
                className="w-full rounded-lg border-0 ring-1 ring-gray-300 focus:ring-2 focus:ring-[#FF6F61] px-3 py-2 text-sm bg-white"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700" htmlFor="planner-duration">Duração</label>
              <select
                id="planner-duration"
                value={durationMin}
                onChange={(e) => setDurationMin(Number(e.target.value))}
                className="w-full rounded-lg border-0 ring-1 ring-gray-300 focus:ring-2 focus:ring-[#FF6F61] px-3 py-2 text-sm bg-white"
              >
                {DURATIONS.map((d) => (
                  <option key={d} value={d}>{d} min</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700" htmlFor="planner-notes">Notas (opcional)</label>
            <textarea
              id="planner-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              maxLength={140}
              rows={3}
              className="w-full rounded-lg border-0 ring-1 ring-gray-300 focus:ring-2 focus:ring-[#FF6F61] px-3 py-2 text-sm"
              placeholder="Algo para lembrar..."
            />
            {errors?.notes && <p className="text-xs text-red-600">{errors.notes}</p>}
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button type="button" onClick={() => onOpenChange(false)} className="rounded-lg bg-white px-4 py-2 text-sm text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50">
              Cancelar
            </button>
            <button type="submit" className="rounded-lg bg-[#FF6F61] px-4 py-2 text-sm font-medium text-white hover:bg-[#FF786B] active:bg-[#E85D51]">
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
