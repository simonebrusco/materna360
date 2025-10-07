'use client';
import { get, set, keys } from './storage';

function dayStamp(d = new Date()){
  const y = d.getFullYear();
  const m = d.getMonth();
  const day = d.getDate();
  return new Date(y, m, day).toISOString().slice(0, 10);
}

function sameDay(aTs, bTs){
  try { return dayStamp(new Date(aTs)) === dayStamp(new Date(bTs)); } catch { return false; }
}

function toList(){
  const raw = get(keys.moodHistory, []);
  return Array.isArray(raw) ? raw.slice() : [];
}

export function setMoodToday(value, note){
  const list = toList();
  const now = Date.now();
  const today = dayStamp(new Date(now));
  // Normalize incoming value (expects 1..5) and persist as 1..5
  const v = Number(value);
  const score = Math.max(1, Math.min(5, Math.round(v)));

  // Find existing entry for today across supported shapes
  const idx = list.findIndex((x)=>{
    if (typeof x === 'number') return false;
    const ts = Number(x?.ts) || (x?.date ? Date.parse(x.date) : NaN);
    return Number.isFinite(ts) && sameDay(ts, now);
  });

  const entry = { ts: now, score, ...(note ? { note: String(note) } : {}) };
  if (idx >= 0) list[idx] = { ...list[idx], ...entry };
  else list.push(entry);

  // Persist in the canonical key used by the app
  set(keys.moodHistory, list);
}

export function getMoodToday(){
  const list = toList();
  const now = Date.now();
  const today = dayStamp(new Date(now));
  // Find entry for today (prefer latest)
  for (let i = list.length - 1; i >= 0; i--) {
    const x = list[i];
    const ts = typeof x === 'number' ? NaN : (Number(x?.ts) || (x?.date ? Date.parse(x.date) : NaN));
    if (Number.isFinite(ts) && dayStamp(new Date(ts)) === today) {
      const score = typeof x?.score === 'number' ? x.score : NaN;
      const value = Number.isFinite(score) ? Math.max(1, Math.min(5, Math.round(score))) : null;
      return { date: today, value, ...(x?.note ? { note: String(x.note) } : {}) };
    }
  }
  return null;
}
