const STORAGE_KEY = "m360_gratitudes";

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

function saveAll(list) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function addGratitude(text) {
  const entry = {
    id: Date.now(),
    text: String(text).slice(0, 140),
    date: new Date().toISOString(),
  };
  const list = loadAll();
  list.push(entry);
  list.sort((a, b) => new Date(b.date) - new Date(a.date));
  saveAll(list);
  return entry;
}

export function getRecentGratitudes(limit = 3) {
  const list = loadAll();
  list.sort((a, b) => new Date(b.date) - new Date(a.date));
  return list.slice(0, limit);
}
