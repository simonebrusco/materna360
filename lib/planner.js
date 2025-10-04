const STORAGE_PREFIX = "m360_planner_";

function getWeekStart(date = new Date()) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay(); // 0=Sun..6=Sat
  d.setDate(d.getDate() - day);
  return d; // Sunday
}

function weekKey(date = new Date()) {
  const start = getWeekStart(date);
  const y = start.getFullYear();
  const m = String(start.getMonth() + 1).padStart(2, "0");
  const day = String(start.getDate()).padStart(2, "0");
  return `${STORAGE_PREFIX}${y}-${m}-${day}`;
}

function loadWeekState(key) {
  if (typeof window === "undefined") return Array(7).fill(false);
  try {
    const raw = localStorage.getItem(key);
    const arr = raw ? JSON.parse(raw) : null;
    if (Array.isArray(arr) && arr.length === 7) return arr.map(Boolean);
    return Array(7).fill(false);
  } catch {
    return Array(7).fill(false);
  }
}

function saveWeekState(key, arr) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(arr));
}

export function getWeek() {
  const letters = ["S", "M", "T", "W", "T", "F", "S"];
  const key = weekKey();
  const state = loadWeekState(key);
  const todayIdx = new Date().getDay();
  const start = getWeekStart();
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return {
      label: letters[i],
      completed: !!state[i],
      isToday: i === todayIdx,
      date: d.toISOString(),
    };
  });
}

export function toggleToday() {
  const key = weekKey();
  const state = loadWeekState(key);
  const idx = new Date().getDay();
  state[idx] = !state[idx];
  saveWeekState(key, state);
  return getWeek();
}
