// SSR-safe storage helpers
export const isBrowser = typeof window !== 'undefined';
export const hasWindow = isBrowser && typeof window.localStorage !== 'undefined';

export function safeGet(key, fallback = null) {
  try {
    if (!isBrowser) return fallback;
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function safeSet(key, value) {
  try {
    if (!isBrowser) return;
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export function safeRemove(key) {
  try {
    if (!isBrowser) return;
    localStorage.removeItem(key);
  } catch {}
}

export function safeMergeObject(key, patch) {
  const prev = (safeGet(key, {}) || {});
  const next = { ...(typeof prev === 'object' && prev ? prev : {}), ...(typeof patch === 'object' && patch ? patch : {}) };
  safeSet(key, next);
  return next;
}
