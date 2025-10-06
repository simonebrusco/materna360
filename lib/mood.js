import { get, set, keys } from './storage';

export function recordMood(value) {
  const v = Math.max(1, Math.min(5, Number(value)));
  const hist = Array.isArray(get(keys.moodHistory, [])) ? get(keys.moodHistory, []) : [];
  const entry = { value: v, ts: Date.now() };
  const next = [...hist, entry].slice(-100);
  set(keys.moodHistory, next);
  return next;
}
