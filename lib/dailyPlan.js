// /lib/dailyPlan.js
import { get, set, keys } from './storage';

function todayISO(d = new Date()) {
  const z = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  return z.toISOString().slice(0, 10);
}

const EMPTY_DAY = { morning: false, afternoon: false, evening: false };

export function getToday() {
  const all = get(keys.dailyPlan, {});
  return all[todayISO()] || { ...EMPTY_DAY };
}

export function setToday(part, value) {
  const d = todayISO();
  const all = get(keys.dailyPlan, {});
  const cur = all[d] || { ...EMPTY_DAY };
  const next = { ...cur, [part]: !!value };
  const updated = { ...all, [d]: next };
  set(keys.dailyPlan, updated);
  return next;
}

export function doneCountWeek() {
  const all = get(keys.dailyPlan, {});
  const days = Object.keys(all);
  const d = new Date();
  d.setDate(d.getDate() - 6);
  const start = todayISO(d);
  return days
    .filter((day) => day >= start)
    .reduce((acc, day) => {
      const v = all[day] || EMPTY_DAY;
      return acc + (v.morning ? 1 : 0) + (v.afternoon ? 1 : 0) + (v.evening ? 1 : 0);
    }, 0);
}
