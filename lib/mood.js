const STORAGE_KEY = "m360_moods";

function loadAll() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function hasMoodToday() {
  const list = loadAll();
  const today = new Date();
  const y = today.getFullYear();
  const m = today.getMonth();
  const d = today.getDate();
  return list.some((e) => {
    const t = new Date(e.date);
    return t.getFullYear() === y && t.getMonth() === m && t.getDate() === d;
  });
}
