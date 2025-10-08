export const hasWindow = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

export function safeGet(key) {
  try {
    if (!hasWindow) return null;
    return window.localStorage.getItem(key);
  } catch (_) {
    return null;
  }
}

export function safeSet(key, value) {
  try {
    if (!hasWindow) return false;
    window.localStorage.setItem(key, value);
    return true;
  } catch (_) {
    return false;
  }
}
