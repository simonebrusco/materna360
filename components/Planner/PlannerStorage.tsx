"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

export type DayKey = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
export type PlannerData = {
  days: Record<DayKey, string[]>;
};

export const STORAGE_KEY = "m360.planner.v1";

const DEFAULT_DATA: PlannerData = {
  days: {
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: [],
    Sun: [],
  },
};

function safeParse(raw: string | null): PlannerData {
  if (!raw) return { ...DEFAULT_DATA, days: { ...DEFAULT_DATA.days } };
  try {
    const parsed = JSON.parse(raw);
    const days: Partial<Record<DayKey, string[]>> = parsed?.days || {};
    const normalized: Record<DayKey, string[]> = {
      Mon: Array.isArray(days.Mon) ? days.Mon : [],
      Tue: Array.isArray(days.Tue) ? days.Tue : [],
      Wed: Array.isArray(days.Wed) ? days.Wed : [],
      Thu: Array.isArray(days.Thu) ? days.Thu : [],
      Fri: Array.isArray(days.Fri) ? days.Fri : [],
      Sat: Array.isArray(days.Sat) ? days.Sat : [],
      Sun: Array.isArray(days.Sun) ? days.Sun : [],
    };
    return { days: normalized };
  } catch {
    return { ...DEFAULT_DATA, days: { ...DEFAULT_DATA.days } };
  }
}

function read(): PlannerData {
  if (typeof window === "undefined") return { ...DEFAULT_DATA, days: { ...DEFAULT_DATA.days } };
  return safeParse(window.localStorage.getItem(STORAGE_KEY));
}

function write(data: PlannerData) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY, newValue: JSON.stringify(data) }));
}

export function saveActivity(day: DayKey, text: string) {
  const current = read();
  const next: PlannerData = {
    days: {
      ...current.days,
      [day]: [...current.days[day], text].slice(0, 50),
    },
  };
  write(next);
}

export function clearDay(day: DayKey) {
  const current = read();
  const next: PlannerData = {
    days: { ...current.days, [day]: [] },
  };
  write(next);
}

export function usePlannerStorage() {
  const [data, setData] = useState<PlannerData>(() => read());

  useEffect(() => {
    setData(read());
    const onStorage = (e: StorageEvent) => {
      if (e.key === null || e.key === STORAGE_KEY) {
        setData(read());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const actions = useMemo(
    () => ({
      save: (day: DayKey, text: string) => saveActivity(day, text),
      clearDay: (day: DayKey) => clearDay(day),
      read: () => read(),
    }),
    []
  );

  const getDay = useCallback((day: DayKey) => data.days[day], [data]);

  return { data, getDay, ...actions };
}

export default function PlannerStorage() {
  return null;
}
