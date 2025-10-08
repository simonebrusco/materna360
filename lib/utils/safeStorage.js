export const hasWindow = typeof window !== "undefined" && typeof window.localStorage !== "undefined";

export function safeGet(key, fallback = null) {
  if (!hasWindow) return fallback;
  try {
    const raw = window.localStorage.getItem(String(key));
    if (raw === null || raw === undefined) return fallback;
    try { return JSON.parse(raw); } catch { return raw; }
  } catch { return fallback; }
}

export function safeSet(key, value) {
  if (!hasWindow) return;
  try {
    const v = typeof value === "string" ? value : JSON.stringify(value);
    window.localStorage.setItem(String(key), v);
  } catch {}
}

export function safeMergeObject(key, patch = {}){
  if (!hasWindow) return {};
  const base = safeGet(key, {}) || {};
  const next = { ...(typeof base === 'object' && base ? base : {}), ...(typeof patch === 'object' && patch ? patch : {}) };
  safeSet(key, next);
  return next;
}
