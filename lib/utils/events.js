// SSR-safe event helpers
import { isBrowser } from "@/lib/utils/safeStorage";

export function onEvent(name, cb) {
  if (!isBrowser) return () => {};
  try {
    window.addEventListener(name, cb);
    return () => window.removeEventListener(name, cb);
  } catch {
    return () => {};
  }
}

export function emit(name, detail) {
  if (!isBrowser) return;
  try { window.dispatchEvent(new CustomEvent(name, { detail })); } catch {}
}
