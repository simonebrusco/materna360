const K = 'm360:gratitude';
const storageAvailable = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

export function listGratitude() {
  if (!storageAvailable) return [];
  try {
    const raw = localStorage.getItem(K) || '[]';
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function addGratitude(text) {
  const cur = listGratitude();
  const next = [{ text, dateISO: new Date().toISOString() }, ...cur].slice(0, 20);
  if (storageAvailable) {
    try { localStorage.setItem(K, JSON.stringify(next)); } catch { /* ignore */ }
  }
  return next;
}
