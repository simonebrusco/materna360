"use client";
import { useEffect, useState } from "react";

/**
 * Client-only weekly progress with localStorage persistence.
 * Key: "m360.completedActivities" -> number 0..7
 */
export default function WeeklyProgress() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem("m360.completedActivities") : null;
    const n = raw ? parseInt(raw, 10) : 0;
    setCount(Number.isFinite(n) ? Math.max(0, Math.min(7, n)) : 0);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("m360.completedActivities", String(count));
    }
  }, [count]);

  const pct = Math.round((count / 7) * 100);

  return (
    <section className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-6 space-y-3">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Progresso da semana</h2>

      {/* Bar */}
      <div className="h-3 w-full rounded-full bg-gray-100 ring-1 ring-gray-200/70 overflow-hidden">
        <div
          className="h-full bg-coral transition-all"
          style={{ width: `${pct}%` }}
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          role="progressbar"
        />
      </div>

      <p className="text-sm text-gray-600">{count === 0 ? "Let’s start! Your journey begins today 🚀" : <>Você já fez <span className="font-semibold text-charcoal">{count}</span> atividade(s) essa semana. Continue assim 👏</>}</p>

      {/* TEMP dev controls (keep minimal, we may hide later) */}
      <div className="flex gap-2 pt-2">
        <button onClick={() => setCount(c => Math.max(0, c - 1))} className="inline-flex items-center justify-center rounded-lg bg-white ring-1 ring-gray-300 px-3 py-1.5 text-sm text-gray-900 hover:bg-gray-50">-1</button>
        <button onClick={() => setCount(c => Math.min(7, c + 1))} className="inline-flex items-center justify-center rounded-lg bg-coral px-3 py-1.5 text-sm text-white hover:bg-coral-hover">+1</button>
        <button onClick={() => setCount(0)} className="ml-auto inline-flex items-center justify-center rounded-lg bg-gray-100 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-200">reset</button>
      </div>
    </section>
  );
}
