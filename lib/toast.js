export function showToast({ title, message, duration = 4000 } = {}) {
  if (typeof window === 'undefined') return;
  try {
    window.dispatchEvent(new CustomEvent('m360:toast', {
      detail: { title, message, duration }
    }));
  } catch {}
}
