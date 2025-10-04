function weekKey(d = new Date()) {
  const year = d.getFullYear();
  const first = new Date(d.getFullYear(), 0, 1);
  const day = Math.floor((d - first) / 86400000) + first.getDay() + 1;
  const week = Math.ceil(day / 7);
  return `m360:planner:${year}-${String(week).padStart(2, '0')}`;
}

const storageAvailable = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
const emptyWeek = () => ({ days: [false, false, false, false, false, false, false] });

export function getWeek() {
  const k = weekKey();
  if (!storageAvailable) return emptyWeek();
  try {
    const raw = localStorage.getItem(k) || JSON.stringify(emptyWeek());
    const data = JSON.parse(raw);
    if (!data || !Array.isArray(data.days) || data.days.length !== 7) return emptyWeek();
    return data;
  } catch {
    return emptyWeek();
  }
}

export function toggleToday() {
  const k = weekKey();
  const cur = getWeek();
  const dow = new Date().getDay(); // 0..6
  if (!Array.isArray(cur.days) || cur.days.length !== 7) cur.days = emptyWeek().days;
  cur.days[dow] = !cur.days[dow];
  if (storageAvailable) {
    try { localStorage.setItem(k, JSON.stringify(cur)); } catch { /* ignore */ }
  }
  return cur;
}
