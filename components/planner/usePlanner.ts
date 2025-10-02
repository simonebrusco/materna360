"use client";
import { useEffect, useRef, useState } from "react";

export type PlannerItem = {
  id: string;
  title: string;
  category: "brincadeira" | "aprendizado" | "movimento" | "vínculo";
  durationMin: number;
  done: boolean;
  notes?: string;
  createdAt: number;
};

const KEY = "m360_planner_v1";

export function usePlanner() {
  const [items, setItems] = useState<PlannerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const timer = useRef<number | null>(null);

  // load once
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as PlannerItem[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch (e: any) {
      setError(e?.message || "read error");
    } finally {
      setLoading(false);
    }
  }, []);

  // debounced persist
  const persist = (next: PlannerItem[]) => {
    if (typeof window === "undefined") return;
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch (e) {
        // ignore
      }
    }, 300) as unknown as number;
  };

  const addItem = (item: PlannerItem) => {
    setItems(prev => {
      const next = [item, ...prev];
      persist(next);
      return next;
    });
  };

  const toggleDone = (id: string) => {
    setItems(prev => {
      const next = prev.map(it => (it.id === id ? { ...it, done: !it.done } : it));
      persist(next);
      return next;
    });
  };

  return { items, addItem, toggleDone, loading, error };
}
