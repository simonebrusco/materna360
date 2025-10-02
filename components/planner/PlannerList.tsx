'use client';

import { PlannerItem, PlannerCategory } from './usePlanner';
import Button from '@/components/ui/Button';

function categoryEmoji(cat: PlannerCategory): string {
  switch (cat) {
    case 'brincadeira':
      return '🎲';
    case 'aprendizado':
      return '📚';
    case 'movimento':
      return '🏃';
    case 'vínculo':
      return '🤝';
    default:
      return '•';
  }
}

export default function PlannerList({ items, onToggleDone }: { items: PlannerItem[]; onToggleDone: (id: string) => void }) {
  const top = items.slice(0, 3);
  return (
    <div className="space-y-3">
      <ul className="divide-y divide-gray-100 rounded-xl ring-1 ring-gray-200 overflow-hidden">
        {top.map((it) => (
          <li key={it.id} className="flex items-center justify-between gap-3 bg-white px-3 py-2">
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-lg" aria-hidden>{categoryEmoji(it.category)}</span>
              <span className={`truncate ${it.done ? 'line-through text-gray-400' : 'text-gray-900'}`}>{it.title}</span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs text-gray-500">{it.durationMin}min</span>
              <input
                type="checkbox"
                aria-label={`Marcar ${it.title} como concluída`}
                className="h-4 w-4 rounded border-gray-300 text-[#FF6F61] focus:ring-[#FF6F61]"
                checked={it.done}
                onChange={() => onToggleDone(it.id)}
              />
            </div>
          </li>
        ))}
        {top.length === 0 && (
          <li className="px-3 py-2 text-sm text-gray-500">Sem atividades.</li>
        )}
      </ul>
      <div className="flex justify-end">
        <button
          type="button"
          className="text-sm text-gray-600 hover:text-gray-800"
          onClick={() => console.log('ver tudo')}
        >
          Ver tudo
        </button>
      </div>
    </div>
  );
}
