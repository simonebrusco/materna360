'use client';
import { useCallback, useMemo } from 'react';
import { get, set, keys } from '../lib/storage';

function todayISO(d = new Date()) {
  const z = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  return z.toISOString().slice(0, 10);
}

export function useMood() {
  const list = get(keys.moodHistory, []); // [{date:'YYYY-MM-DD', value:1..5, note?:string}]
  const today = todayISO();

  const todayEntry = useMemo(() => list.find((x) => x.date === today) || null, [list, today]);

  const setMood = useCallback((value, note) => {
    const data = get(keys.moodHistory, []).slice();
    const d = todayISO();
    const idx = data.findIndex((x) => x.date === d);
    const entry = { date: d, value: Number(value), ...(note ? { note: String(note) } : {}) };
    if (idx >= 0) data[idx] = entry; else data.push(entry);
    set(keys.moodHistory, data);
  }, []);

  const weekAvg = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - 6);
    const start = todayISO(d);
    const last7 = list.filter((x) => x.date >= start);
    if (!last7.length) return 0;
    const sum = last7.reduce((a, b) => a + (Number(b.value) || 0), 0);
    return Math.round((sum / last7.length) * 10) / 10;
  }, [list]);

  return { list, today: todayEntry, setMood, weekAvg };
}
