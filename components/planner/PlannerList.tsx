"use client";
import { PlannerItem } from "./usePlanner";

const emoji = {
  brincadeira: "🎲",
  aprendizado: "📚",
  movimento:  "🏃",
  vínculo:    "🤝",
} as const;

export default function PlannerList({
  items, onToggleDone
}:{
  items: PlannerItem[];
  onToggleDone: (id:string)=>void;
}) {
  return (
    <ul className="space-y-2">
      {items.slice(0,3).map(it => (
        <li key={it.id} className="flex items-center justify-between rounded-lg ring-1 ring-gray-200 px-3 py-2">
          <div className="flex items-center gap-2">
            <span aria-hidden className="text-base">{emoji[it.category]}</span>
            <div className={it.done ? "text-gray-400 line-through" : "text-gray-800"}>
              <div className="text-sm">{it.title}</div>
              <div className="text-xs text-gray-500">{it.durationMin} min {it.notes ? `· ${it.notes}` : ""}</div>
            </div>
          </div>
          <button
            onClick={()=>onToggleDone(it.id)}
            className="rounded-md px-2 py-1 text-xs ring-1 ring-gray-300 hover:bg-gray-50"
            aria-pressed={it.done}
            aria-label={it.done ? "Marcar como não concluída" : "Marcar como concluída"}
          >
            {it.done ? "Concluído" : "Concluir"}
          </button>
        </li>
      ))}
    </ul>
  );
}
