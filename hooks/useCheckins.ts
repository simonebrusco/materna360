"use client";

import { useEffect, useState } from "react";

export type Checkin = { mood: number; date: string };

const STORAGE_KEY = "materna360:checkins";

export function useCheckins() {
  const [checkins, setCheckins] = useState<Checkin[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setCheckins(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const addCheckin = (mood: number) => {
    const today = new Date().toISOString().split("T")[0];
    const next = [...checkins.filter((c) => c.date !== today), { mood, date: today }];
    setCheckins(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  return { checkins, addCheckin } as const;
}
