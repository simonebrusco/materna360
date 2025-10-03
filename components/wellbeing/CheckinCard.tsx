"use client";

import Card from "../ui/Card";
import SectionTitle from "../ui/SectionTitle";
import { useMemo } from "react";
import { useCheckins } from "../../hooks/useCheckins";

const moods = [
  { value: 1, emoji: "😢", label: "muito triste" },
  { value: 2, emoji: "😐", label: "neutro" },
  { value: 3, emoji: "🙂", label: "bem" },
  { value: 4, emoji: "😀", label: "feliz" },
  { value: 5, emoji: "🤩", label: "muito feliz" },
] as const;

function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

function formatDDMM(dateISO: string): string {
  const [y, m, d] = dateISO.split("-");
  return `${d}/${m}`;
}

export default function CheckinCard() {
  const { checkins, addCheckin } = useCheckins();
  const today = useMemo(() => getToday(), []);

  const selected = useMemo(() => checkins.find((c) => c.date === today)?.mood ?? null, [checkins, today]);

  const recent = useMemo(() => {
    const sorted = [...checkins].sort((a, b) => b.date.localeCompare(a.date));
    return sorted.slice(0, 5);
  }, [checkins]);

  return (
    <Card>
      <SectionTitle>Como você está hoje?</SectionTitle>
      <div className="mt-2 flex items-center justify-between gap-1 sm:gap-2">
        {moods.map((m) => {
          const isSelected = selected === m.value;
          return (
            <button
              key={m.value}
              type="button"
              aria-label={m.label}
              onClick={() => addCheckin(m.value)}
              className={[
                "text-3xl p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-coral)]/40 focus:ring-offset-2",
                isSelected ? "bg-[#FF6F61] text-white" : "text-gray-800",
              ].join(" ")}
            >
              <span aria-hidden>{m.emoji}</span>
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-sm text-gray-600">Registrar seu humor ajuda você a perceber seus avanços.</p>

      <div className="text-sm text-gray-600 flex space-x-2 mt-4">
        {recent.length > 0 ? (
          recent.map((c, idx) => {
            const mood = moods.find((m) => m.value === c.mood)?.emoji ?? "";
            return (
              <span key={c.date + idx} className="inline-flex items-center">
                {formatDDMM(c.date)} {mood}
              </span>
            );
          })
        ) : (
          <span>Ainda não registrou nada. Que tal começar agora?</span>
        )}
      </div>
    </Card>
  );
}
