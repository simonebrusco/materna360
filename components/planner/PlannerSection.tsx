'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import SectionTitle from '@/components/ui/SectionTitle';
import PlannerList from './PlannerList';
import PlannerSheet from './PlannerSheet';
import { usePlanner, PlannerItemInput } from './usePlanner';

export default function PlannerSection() {
  const { items, addItem, toggleDone, loading } = usePlanner();
  const [open, setOpen] = useState(false);

  const handleSubmit = (input: PlannerItemInput) => {
    addItem(input);
  };

  return (
    <Card>
      <div className="flex items-center justify-between">
        <SectionTitle>Planner</SectionTitle>
        {items.length > 0 && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-lg bg-white px-3 py-1.5 text-sm text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50"
          >
            Adicionar
          </button>
        )}
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Carregando…</p>
      ) : items.length === 0 ? (
        <div className="rounded-xl bg-gray-50 text-gray-600 ring-1 ring-gray-200 p-4 sm:p-5 flex items-center justify-between gap-3">
          <div className="text-sm sm:text-base">
            <div className="font-medium text-gray-900">✨ Organize atividades para hoje</div>
            <div>Adicione pequenas atividades para brincar, aprender e se movimentar.</div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center rounded-lg bg-[#FF6F61] px-3 py-2 text-sm font-medium text-white hover:bg-[#FF786B] active:bg-[#E85D51]"
          >
            Adicionar atividade
          </button>
        </div>
      ) : (
        <PlannerList items={items} onToggleDone={toggleDone} />
      )}

      <PlannerSheet open={open} onOpenChange={setOpen} onSubmit={handleSubmit} />
    </Card>
  );
}
