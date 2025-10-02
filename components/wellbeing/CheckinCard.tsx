"use client";

import { useEffect, useMemo, useState } from "react";
import Card from "../ui/Card";
import SectionTitle from "../ui/SectionTitle";

type Checkin = { mood: number; date: string };

const STORAGE_KEY = "materna360:checkins";

function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

function readCheckins(): Checkin[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter((x) => typeof x?.mood === "number" && typeof x?.date === "string");
    }
    if (parsed && typeof parsed === "object" && typeof (parsed as any).mood === "number" && typeof (parsed as any).date === "string") {
      return [parsed as Checkin];
    }
  } catch {
    return [];
  }
  return [];
}

function writeCheckins(list: Checkin[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export default function CheckinCard() {
  const [selected, setSelected] = useState<number | null>(null);
  const today = useMemo(() => getToday(), []);

  useEffect(() => {
    const list = readCheckins();
    const existing = list.find((c) => c.date === today);
    if (existing) setSelected(existing.mood);
  }, [today]);

  const moods = [
    { value: 1, emoji: "😢", label: "muito triste" },
    { value: 2, emoji: "😐", label: "neutro" },
    { value: 3, emoji: "🙂", label: "bem" },
    { value: 4, emoji: "😀", label: "feliz" },
    { value: 5, emoji: "🤩", label: "muito feliz" },
  ] as const;

  const handleSelect = (value: number) => {
    setSelected(value);
    const list = readCheckins();
    const idx = list.findIndex((c) => c.date === today);
    const entry: Checkin = { mood: value, date: today };
    if (idx >= 0) {
      list[idx] = entry;
    } else {
      list.push(entry);
    }
    writeCheckins(list);
  };

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
              onClick={() => handleSelect(m.value)}
              className={[
                "text-3xl p-2 rounded-full hover:bg-gray-100 focus:ring-2 focus:ring-indigo-300",
                isSelected ? "bg-[#FF6F61] text-white" : "text-gray-800"
              ].join(" ")}
            >
              <span aria-hidden>{m.emoji}</span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
