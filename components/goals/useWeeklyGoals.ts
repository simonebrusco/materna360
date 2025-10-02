"use client";
import { useEffect, useRef, useState } from "react";

export type WeeklyGoals = { filled: number; updatedAt: string };

const KEY = "m360_goals_v1";
const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

export function useWeeklyGoals() {
  const [goals, setGoals] = useState<WeeklyGoals>({ filled: 0, updatedAt: new Date().toISOString() });
  const [isLoading, setIsLoading] = useState(true);
  const writeTimer = useRef<number | null>(null);

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      const raw = window.localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as WeeklyGoals;
        if (typeof (parsed as any)?.filled === "number") {
          setGoals({
            filled: clamp((parsed as any).filled, 0, 5),
            updatedAt: (parsed as any).updatedAt || new Date().toISOString(),
          });
        }
      }
    } catch (e) {
      console.warn("[WeeklyGoals] read error", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const persist = (next: WeeklyGoals) => {
    if (typeof window === "undefined") return;
    if (writeTimer.current) window.clearTimeout(writeTimer.current);
    writeTimer.current = window.setTimeout(() => {
      try {
        window.localStorage.setItem(KEY, JSON.stringify(next));
      } catch (e) {
        console.warn("[WeeklyGoals] write error", e);
      }
    }, 300) as unknown as number;
  };

  const setFilled = (count: number) => {
    setGoals((prev) => {
      const next = { filled: clamp(count, 0, 5), updatedAt: new Date().toISOString() };
      persist(next);
      return next;
    });
  };

  const reset = () => setFilled(0);

  return { goals, setFilled, reset, isLoading };
}
