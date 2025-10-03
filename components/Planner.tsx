'use client';

import Card from '@/components/ui/Card';
import SectionTitle from '@/components/ui/SectionTitle';

type Item = { id: string; label: string };

export default function Planner({ items = [] }: { items?: Item[] }) {
  const hasItems = items.length > 0;

  return (
    <Card>
      <SectionTitle>Planner</SectionTitle>

      {hasItems ? (
        <ul className="space-y-2">
          {items.slice(0, 3).map((i) => (
            <li key={i.id} className="text-gray-700">• {i.label}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">
          Você ainda não definiu atividades para hoje.
        </p>
      )}

      <div className="mt-4">
        <button
          className="rounded-full border border-[color:var(--brand-coral)]/30 bg-white px-4 py-2 text-sm text-[#4B4B4B] hover:bg-[color:var(--brand-coral)]/10 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-coral)]/40 focus:ring-offset-2"
          onClick={() => console.log('Adicionar atividade')}
        >
          Adicionar atividade
        </button>
      </div>
    </Card>
  );
}
