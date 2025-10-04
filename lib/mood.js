export const moods = ['sad', 'meh', 'ok', 'good', 'great'];
export const moodEmoji = { sad: '😞', meh: '😕', ok: '🙂', good: '😄', great: '🤩' };

const storageAvailable = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
const key = (d) => `m360:mood:${d.toISOString().slice(0, 10)}`;

export function setMood(date, value) {
  if (!storageAvailable) return;
  try { localStorage.setItem(key(date), value); } catch (_) { /* ignore */ }
}

export function getMood(date) {
  if (!storageAvailable) return null;
  try { return localStorage.getItem(key(date)); } catch (_) { return null; }
}

export function getLastNDays(n = 7) {
  const out = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setHours(0,0,0,0);
    d.setDate(d.getDate() - i);
    out.push({ date: d, mood: getMood(d) || null });
  }
  return out;
}
