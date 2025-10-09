// SSR-safe storage helpers with in-memory fallback
export const isBrowser = typeof window !== 'undefined';
export const hasWindow = isBrowser && typeof window.localStorage !== 'undefined';

const memoryStore = new Map();

function storageAvailable() {
  if (!hasWindow) return false;
  try {
    const k = '__m360_test__';
    window.localStorage.setItem(k, '1');
    window.localStorage.removeItem(k);
    return true;
  } catch {
    return false;
  }
}

export function safeGet(key, fallback = null) {
  try {
    const k = String(key);
    if (storageAvailable()) {
      const raw = window.localStorage.getItem(k);
      if (raw === null || raw === undefined) return fallback;
      try { return JSON.parse(raw); } catch { return raw; }
    }
    if (memoryStore.has(k)) {
      const raw = memoryStore.get(k);
      try { return JSON.parse(raw); } catch { return raw; }
    }
    return fallback;
  } catch {
    return fallback;
  }
}

export function safeSet(key, value) {
  try {
    const k = String(key);
    const v = typeof value === 'string' ? value : JSON.stringify(value);
    if (storageAvailable()) {
      window.localStorage.setItem(k, v);
    } else {
      memoryStore.set(k, v);
    }
    return true;
  } catch {
    return false;
  }
}

export function safeRemove(key) {
  try {
    const k = String(key);
    if (storageAvailable()) {
      window.localStorage.removeItem(k);
    } else {
      memoryStore.delete(k);
    }
    return true;
  } catch {
    return false;
  }
}

export function safeMergeObject(key, patch = {}) {
  const base = safeGet(key, {}) || {};
  const next = {
    ...(typeof base === 'object' && base ? base : {}),
    ...(typeof patch === 'object' && patch ? patch : {}),
  };
  safeSet(key, next);
  return next;
}

export const safeStorage = { get: safeGet, set: safeSet, remove: safeRemove };
export default safeStorage;
