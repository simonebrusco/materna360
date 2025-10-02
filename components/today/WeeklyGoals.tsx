"use client";
import { useEffect, useState } from "react";

type Goal = { id: number; done: boolean };

export default function WeeklyGoals() {
  const [goals, setGoals] = useState<Goal[]>([
    { id: 1, done: false },
    { id: 2, done: false },
    { id: 3, done: false },
  ]);

  useEffect(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem("m360.weeklyGoals") : null;
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length === 3) {
          setGoals(parsed.map((g: any, i: number) => ({ id: i + 1, done: !!g.done })));
        }
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("m360.weeklyGoals", JSON.stringify(goals));
    }
  }, [goals]);

  const allDone = goals.every(g => g.done);
  const noneDone = goals.every(g => !g.done);
  const toggle = (id: number) => setGoals(gs => gs.map(g => g.id === id ? { ...g, done: !g.done } : g));

  return (
    <section className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-6 space-y-3">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Metas da semana</h2>

      <div className="flex items-center gap-4">
        {goals.map(g => (
          <button
            key={g.id}
            onClick={() => toggle(g.id)}
            className={[
              "inline-flex h-12 w-12 items-center justify-center rounded-full ring-1 transition",
              g.done
                ? "bg-coral text-white ring-coral"
                : "bg-offwhite text-neutral ring-gray-200 hover:bg-gray-100"
            ].join(" ")}
            aria-pressed={g.done}
            aria-label={g.done ? "Meta concluída" : "Meta pendente"}
          >
            {/* Heart icon as text for now */}
            <span className="text-xl">{g.done ? "❤️" : "🤍"}</span>
          </button>
        ))}
      </div>

      {noneDone && (
        <div className="mt-2 rounded-xl bg-offwhite text-gray-600 shadow-sm ring-1 ring-gray-200 p-4 flex items-center gap-3">
          <div className="flex items-center gap-2" aria-hidden>
            <span className="text-xl">🤍</span>
            <span className="text-xl">🤍</span>
            <span className="text-xl">🤍</span>
          </div>
          <div className="text-sm sm:text-base">Define your weekly goals 💛</div>
        </div>
      )}

      <p className="text-sm text-gray-600">
        Toque nos corações para marcar suas metas desta semana. {allDone && (
          <span className="ml-1 font-medium text-coral">Parabéns! Você está cultivando uma rotina mais leve 💛</span>
        )}
      </p>
    </section>
  );
}
