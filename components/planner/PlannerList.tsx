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
        <li key={it.id} className={["flex items-center justify-between rounded-lg ring-1 ring-gray-200 px-3 py-2 transition", it.done ? "bg-offwhite" : "bg-white"].join(" ") }>
          <div className="flex items-center gap-3">
            <input
              id={`planner-done-${it.id}`}
              type="checkbox"
              checked={it.done}
              onChange={() => onToggleDone(it.id)}
              className="h-5 w-5 rounded-md border border-gray-300 accent-[#FF6F61] focus:outline-none focus:ring-2 focus:ring-coral focus:ring-offset-1"
              aria-label={it.done ? "Marcar como não concluída" : "Marcar como concluída"}
            />
            <span aria-hidden className="text-base">{emoji[it.category]}</span>
            <div className={it.done ? "text-grayMid line-through" : "text-charcoal"}>
              <div className="text-sm">{it.title}</div>
              <div className="text-xs text-gray-500">{it.durationMin} min {it.notes ? `· ${it.notes}` : ""}</div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
