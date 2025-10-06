// lib/clientEvents.js
export function emitEu360Refresh(){
  if (typeof window !== "undefined") {
    try { window.dispatchEvent(new Event("m360:eu360-refresh")); } catch {}
  }
}
export function onEu360Refresh(cb){
  if (typeof window === "undefined") return () => {};
  try {
    window.addEventListener("m360:eu360-refresh", cb);
    return () => window.removeEventListener("m360:eu360-refresh", cb);
  } catch {
    return () => {};
  }
}
