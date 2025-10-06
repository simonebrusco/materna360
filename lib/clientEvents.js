// lib/clientEvents.js
export function emitEu360Refresh(){
  if (typeof window !== "undefined") {
    try { window.dispatchEvent(new Event("refreshEu360")); } catch {}
  }
}
export function onEu360Refresh(cb){
  if (typeof window === "undefined") return () => {};
  try {
    window.addEventListener("refreshEu360", cb);
    return () => window.removeEventListener("refreshEu360", cb);
  } catch {
    return () => {};
  }
}
