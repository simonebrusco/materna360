import { get, set, keys } from './storage';

export function isPremium(){
  return !!get(keys.premium, { active:false })?.active;
}
export function setPremium(active, until=null){
  const next = { active:!!active, ...(until?{ until }:{}) };
  set(keys.premium, next);
  if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('m360:premium:changed', { detail: next }));
  return next;
}

// Limite de downloads Free por dia (ajustável)
export const MAX_FREE_DOWNLOADS_PER_DAY = 2;

function todayISO(d = new Date()){
  const z = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  return z.toISOString().slice(0,10);
}

export function canDownloadFree(){
  if (isPremium()) return { ok:true, premium:true, remaining: Infinity };
  const dl = get(keys.downloads, { items:[], countN:{} });
  const iso = todayISO();
  const used = dl.countN?.[iso] || 0;
  const left = Math.max(0, MAX_FREE_DOWNLOADS_PER_DAY - used);
  return { ok: left > 0, premium:false, remaining:left };
}

export function markDownload(item){ // {id,title,url,type}
  const dl = get(keys.downloads, { items:[], countN:{} });
  const iso = todayISO();
  dl.items.unshift({ ...item, at: Date.now() });
  dl.items = dl.items.slice(0, 200);
  dl.countN[iso] = (dl.countN[iso] || 0) + 1;
  set(keys.downloads, dl);
  if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('m360:downloads:changed', { detail: item }));
  return dl;
}
