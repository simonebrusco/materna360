import { get, set, keys } from './storage';

const MAX_FREE_PER_DAY = 3;

function todayISO(d = new Date()){
  const z = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  return z.toISOString().slice(0,10);
}

function readRaw(){
  const v = get(keys.favorites, null);
  return v || { ideas:{}, products:{}, meta:{} };
}

function writeRaw(next){
  set(keys.favorites, next);
  return next;
}

export function isPremium(){
  const p = get(keys.premium, { active:false });
  return !!p?.active;
}

function countToday(meta, kind){
  const iso = todayISO();
  const arr = meta?.daily?.[iso]?.[kind] || [];
  return arr.length;
}

function addDaily(meta, kind, id){
  const iso = todayISO();
  meta.daily = meta.daily || {};
  meta.daily[iso] = meta.daily[iso] || { ideas:[], products:[] };
  if (!meta.daily[iso][kind].includes(id)) meta.daily[iso][kind].push(id);
  return meta;
}

// kind: 'ideas' | 'products'
export function toggleFavorite(kind, item){
  if (!['ideas','products'].includes(kind)) throw new Error('invalid kind');
  if (!item?.id) throw new Error('item requires id');

  const state = readRaw();
  const bag = state[kind] || {};
  const meta = state.meta || {};
  const id = String(item.id);

  // already favorited -> remove
  if (bag[id]) {
    delete bag[id];
    state[kind] = bag;
    writeRaw(state);
    if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('m360:fav:changed', { detail:{ kind, id, op:'remove' } }));
    return { ok:true, removed:true, limit:false, state };
  }

  // not favorited -> check quota if not premium
  if (!isPremium()) {
    const used = countToday(meta, kind);
    if (used >= MAX_FREE_PER_DAY) {
      if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('m360:fav:limit', { detail:{ kind, max:MAX_FREE_PER_DAY } }));
      return { ok:false, removed:false, limit:true, state };
    }
  }

  // add
  bag[id] = {
    id,
    title: item.title || '',
    thumb: item.thumb || '',
    price: item.price || null,
    at: Date.now(),
    extra: item.extra || null,
  };
  state[kind] = bag;
  state.meta = addDaily(meta, kind, id);
  writeRaw(state);

  if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('m360:fav:changed', { detail:{ kind, id, op:'add' } }));
  return { ok:true, removed:false, limit:false, state };
}

export function isFavorite(kind, id){
  const state = readRaw();
  return !!state?.[kind]?.[String(id)];
}

export function listFavorites(kind){
  const bag = readRaw()?.[kind] || {};
  return Object.values(bag).sort((a,b)=> (b?.at||0)-(a?.at||0));
}

export function getQuota(kind){
  const premium = isPremium();
  if (premium) return { premium:true, used:0, max:Infinity };
  const st = readRaw();
  const used = countToday(st.meta || {}, kind);
  return { premium:false, used, max:MAX_FREE_PER_DAY };
}

export function setPremium(active, until=null){
  const next = { active:!!active, ...(until?{ until }:{}) };
  set(keys.premium, next);
  if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('m360:premium:changed', { detail: next }));
  return next;
}
