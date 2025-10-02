"use client";

import { useCallback } from "react";
import { useWeeklyGoals } from "./useWeeklyGoals";

const HEART_CORAL = "#FF6F61"; // accent for filled hearts
const GRAY_300 = "#D1D5DB"; // Tailwind gray-300

export default function WeeklyGoals() {
  const { goals, setFilled, reset, isLoading } = useWeeklyGoals();

  const onHeartClick = useCallback(
    (index: number) => {
      const next = index + 1;
      setFilled(goals.filled === next ? index : next);
    },
    [goals.filled, setFilled]
  );

  return (
    <section className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-6 space-y-3">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-lg sm:text-xl font-semibold text-charcoal leading-7 sm:leading-8 mb-2 sm:mb-3">Defina suas metas da semana 💛</h2>
          <p className="text-sm text-gray-600">Toque nos corações para marcar suas metas desta semana.</p>
        </div>

        <button
          type="button"
          onClick={reset}
          aria-label="Clear weekly goals"
          className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 text-gray-700 hover:bg-gray-100 focus-visible:outline-gray-300"
        >
          Limpar metas
        </button>
      </div>

      <div className="mt-4 flex items-center gap-2">
        {[0, 1, 2, 3, 4].map((i) => {
          const filled = goals.filled > i;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onHeartClick(i)}
              aria-pressed={filled}
              aria-label={filled ? `Meta ${i + 1} selecionada` : `Selecionar meta ${i + 1}`}
              className={[
                "inline-flex h-10 w-10 items-center justify-center rounded-full transition-transform",
                "focus:outline-none focus:ring-2 focus:ring-indigo-300",
                filled ? "bg-[#FF6F61]/10" : "bg-white",
                "ring-1 ring-gray-300 hover:scale-105 active:scale-[0.98]",
              ].join(" ")}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill={filled ? HEART_CORAL : "none"}
                stroke={filled ? HEART_CORAL : GRAY_300}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          );
        })}
      </div>

      {isLoading && <p className="mt-2 text-xs text-gray-400">Carregando metas…</p>}
    </section>
  );
}
