export function grantBadge(id = "", label = ""){
  try{
    const bKey = "m360:badges";
    const raw = typeof localStorage !== "undefined" ? localStorage.getItem(bKey) : "[]";
    const arr = (() => { try { const v = JSON.parse(raw||"[]"); return Array.isArray(v) ? v : []; } catch { return []; } })();
    const item = { id: String(id||""), label: String(label||"") };
    const exists = arr.some(b => String(b.id) === item.id);
    const next = exists ? arr : [...arr, item];
    try{ localStorage.setItem(bKey, JSON.stringify(next)); }catch{}
    try{ window.dispatchEvent(new CustomEvent('m360:badges:leveled', { detail: { leveled: [{ id: item.id, from: 0, to: 1 }] } })); }catch{}
  }catch{}
}
export default { grantBadge };
