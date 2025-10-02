'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type PlannerCategory = 'brincadeira' | 'aprendizado' | 'movimento' | 'vínculo';

export type PlannerItem = {
  id: string;
  title: string;
  category: PlannerCategory;
  durationMin: number;
  done: boolean;
  notes?: string;
  createdAt: number;
};

export type PlannerItemInput = {
  title: string;
  category: PlannerCategory;
  durationMin: number;
  notes?: string;
};

const STORAGE_KEY = 'm360_planner_v1';

function safeParse(raw: string | null): PlannerItem[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter((it) => typeof it === 'object' && it && typeof it.id === 'string');
    }
    return [];
  } catch {
    return [];
  }
}

function read(): PlannerItem[] {
  if (typeof window === 'undefined') return [];
  try {
    return safeParse(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return [];
  }
}

function write(items: PlannerItem[]) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore quota/errors
  }
}

function uuid(): string {
  // Prefer crypto.randomUUID when available
  if (typeof globalThis !== 'undefined' && (globalThis as any).crypto?.randomUUID) {
    try {
      return (globalThis as any).crypto.randomUUID();
    } catch {
      // fallback
    }
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function categoryEmoji(cat: PlannerCategory): string {
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

export function usePlanner() {
  const [items, setItems] = useState<PlannerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const saveTimer = useRef<number | null>(null);

  // Initial load
  useEffect(() => {
    try {
      const initial = read();
      setItems(initial);
    } catch (e) {
      setError('Falha ao carregar dados locais');
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced save
  useEffect(() => {
    if (loading) return; // avoid saving initial load
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => {
      try {
        write(items);
      } catch {
        // ignore and keep memory state
      }
    }, 300);
    return () => {
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
    };
  }, [items, loading]);

  const addItem = useCallback((input: PlannerItemInput) => {
    const item: PlannerItem = {
      id: uuid(),
      title: input.title.trim(),
      category: input.category,
      durationMin: input.durationMin,
      notes: input.notes?.trim() || undefined,
      done: false,
      createdAt: Date.now(),
    };
    setItems((prev) => [item, ...prev].slice(0, 200));
  }, []);

  const toggleDone = useCallback((id: string) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, done: !it.done } : it)));
  }, []);

  const value = useMemo(
    () => ({ items, addItem, toggleDone, loading, error }),
    [items, addItem, toggleDone, loading, error]
  );

  return value;
}
