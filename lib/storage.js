// /lib/storage.js
/**
 * Materna360 lightweight client storage (SSR-safe).
 * Uses localStorage with guards. All methods are no-throw.
 */

const IS_BROWSER = typeof window !== "undefined";

function getLocalJson(key, fallback){
  if (!IS_BROWSER) return fallback;
  try { const v = window.localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}
function setLocalJson(key, value){
  if (!IS_BROWSER) return;
  try { window.localStorage.setItem(key, JSON.stringify(value)); } catch {}
}
export { getLocalJson, setLocalJson };

// Public helpers (aliases) per spec
export function isBrowser(){ return typeof window !== "undefined"; }
export function readJSON(key, fallback){ return getLocalJson(key, fallback); }
export function writeJSON(key, value){ return setLocalJson(key, value); }

function getJSON(key, fallback) { return getLocalJson(key, fallback); }
function setJSON(key, value) { return setLocalJson(key, value); }

// Keys namespace (versioned for future migrations)
const KV_NS = "m360";
const KV = {
  lastAgeGroup: `${KV_NS}:discover:lastAgeGroup:v1`,
  lastContext: `${KV_NS}:discover:lastContext:v1`,
  lastRecCat: `${KV_NS}:discover:lastRecCat:v1`,
  mood:        `${KV_NS}:mood:v1`,
  actions:     `${KV_NS}:actions:v1`,
  gratitude:   `${KV_NS}:gratitude:v1`,
  weeklyPlan:  `${KV_NS}:weeklyPlan:v1`,
};

// ---- Public API: Discover selections ----
/** @typedef {"0-2"|"3-4"|"5-7"|"8+"} AgeGroup */
export function getLastAgeGroup(fallback = "3-4") {
  const v = getJSON(KV.lastAgeGroup, fallback);
  const allowed = ["0-2","3-4","5-7","8+"];
  return allowed.includes(v) ? v : fallback;
}
export function setLastAgeGroup(group) {
  const allowed = ["0-2","3-4","5-7","8+"];
  if (!allowed.includes(group)) return;
  setJSON(KV.lastAgeGroup, group);
}
export function getLastContext(defaultVal = "Casa") {
  try { const v = IS_BROWSER ? window.localStorage.getItem("m360.lastCtx") : null; return v || defaultVal; } catch { return defaultVal; }
}
export function setLastContext(v) { try { if (IS_BROWSER) window.localStorage.setItem("m360.lastCtx", v); } catch {} }
export function getLastRecCategory(defaultVal = "Livros") {
  const v = get(keys.recProductsCategory, null);
  if (typeof v === 'string' && v) return v;
  try { const x = IS_BROWSER ? window.localStorage.getItem("m360.lastRecCat") : null; return x || defaultVal; } catch { return defaultVal; }
}
export function setLastRecCategory(v) {
  if (typeof v !== 'string' || !v) return;
  set(keys.recProductsCategory, v);
  try { if (IS_BROWSER) window.localStorage.setItem("m360.lastRecCat", v); } catch {}
}

// ---- Mood and Actions ----
export function addMood(entry) {
  const list = getJSON(KV.mood, []);
  const e = { date: entry?.date || (new Date().toISOString()), mood: typeof entry?.mood === "number" ? entry.mood : 0, note: entry?.note };
  list.push(e);
  setJSON(KV.mood, list);
  try {
    const normalized = list.map((m)=>({ ts: Date.parse(m?.date) || Date.now(), score: Math.max(0, Math.min(4, Math.round((Number(m?.mood)||0) + 2))) }));
    setLocalJson("m360:moodHistory", normalized);
  } catch {}
  return list;
}
export function addAction(entry) {
  const list = getJSON(KV.actions, []);
  const e = { date: entry?.date || (new Date().toISOString()), type: entry?.type || "inspire", duration: typeof entry?.duration === "number" ? entry.duration : undefined };
  list.push(e);
  setJSON(KV.actions, list);
  try { setLocalJson("m360:actions", list); } catch {}
  return list;
}
export function getActions(){
  return getJSON(KV.actions, []);
}

// ---- Weekly plan (Mon..Sun index 0..6) ----
const PLAN_KEY = "m360.weeklyPlan.v1";
export function getWeeklyPlan(){
  // First try new storage API
  const p = get(keys.planner, null);
  if (Array.isArray(p) && p.length === 7) return p;
  if (p && Array.isArray(p.days) && p.days.length === 7) return p.days;
  // Prefer plain 'weeklyPlan' for compatibility (Mon=0 .. Sun=6)
  if (IS_BROWSER) {
    try {
      const raw = window.localStorage.getItem('weeklyPlan');
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr) && arr.length === 7) return arr;
      }
    } catch {}
  }
  const stored = getLocalJson(PLAN_KEY, null);
  const legacy = getJSON(KV.weeklyPlan, null);
  const val = stored ?? legacy;
  if (Array.isArray(val) && val.length === 7) return val;
  if (val && Array.isArray(val.days) && val.days.length === 7) return val.days;
  return [false,false,false,false,false,false,false];
}
export function setWeeklyPlan(plan){
  if (!Array.isArray(plan) || plan.length !== 7) return;
  setLocalJson(PLAN_KEY, plan);
  set(keys.planner, { days: plan });
  if (IS_BROWSER) { try { window.localStorage.setItem('weeklyPlan', JSON.stringify(plan)); } catch {} }
}
export function togglePlanDay(idx){
  const p = getWeeklyPlan().slice();
  if (typeof idx !== "number" || idx < 0 || idx > 6) return p;
  p[idx] = !p[idx];
  setWeeklyPlan(p);
  return p;
}
export function toggleDayDone(dateOrIndex){
  try {
    if (typeof dateOrIndex === "number") return togglePlanDay(dateOrIndex);
    const d = dateOrIndex instanceof Date ? dateOrIndex : new Date(dateOrIndex);
    const dow = typeof d.getDay === "function" ? d.getDay() : 0; // 0..6 (Sun..Sat)
    const monBased = (dow + 6) % 7; // Mon=0 .. Sun=6
    return togglePlanDay(monBased);
  } catch { return getWeeklyPlan(); }
}

// ---- Tips rotation ----
const TIPS_KEY = "m360.tips.idx.v1";
export function getTipsIndex(){
  const v = get(keys.tipsIndex, null);
  if (typeof v === 'number' && !Number.isNaN(v)) return v;
  if (!IS_BROWSER) return 0;
  try { return Number(window.localStorage.getItem(TIPS_KEY)) || 0; } catch { return 0; }
}
export function bumpTipsIndex(total){
  const next = ((getTipsIndex() + 1) % Math.max(1,total||1));
  set(keys.tipsIndex, next);
  try { if (IS_BROWSER) window.localStorage.setItem(TIPS_KEY, String(next)); } catch {}
}

// ---- Gratitude history ----
const GRAT_KEY = "m360.gratitude.v1"; // [{id,text,ts}]
export function getGratitude(){
  const v = get(keys.gratitudes, null);
  if (Array.isArray(v)) return v;
  // Prefer plain 'gratitude' key
  if (IS_BROWSER) {
    try {
      const raw = window.localStorage.getItem('gratitude');
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr)) return arr;
      }
    } catch {}
  }
  const list = getLocalJson(GRAT_KEY, []);
  if (!Array.isArray(list) || list.length === 0) {
    const legacy = getJSON(KV.gratitude, []);
    if (Array.isArray(legacy) && legacy.length) {
      const migrated = legacy.map(x => ({
        id: Date.now()+"_"+Math.random().toString(36).slice(2),
        text: x?.text || String(x||"").trim(),
        ts: x?.date ? (Date.parse(x.date) || Date.now()) : Date.now()
      }));
      setLocalJson(GRAT_KEY, migrated);
      if (isBrowser()) { try { window.localStorage.setItem('gratitude', JSON.stringify(migrated)); } catch {} }
      set(keys.gratitudes, migrated);
      return migrated;
    }
  }
  return Array.isArray(list) ? list : [];
}
export function addGratitude(text){
  const list = getGratitude().slice();
  const value = (text||"").toString().trim();
  if (!value) return list;
  const item = { id: Date.now()+"_"+Math.random().toString(36).slice(2), text: value, ts: Date.now() };
  list.unshift(item);
  const trimmed = list.slice(0,200);
  setLocalJson(GRAT_KEY, trimmed);
  set(keys.gratitudes, trimmed);
  try { window.localStorage.setItem('gratitude', JSON.stringify(trimmed)); } catch {}
  try { setLocalJson("m360:gratitude", trimmed); } catch {}
  return trimmed;
}
export function deleteGratitude(id){
  const list = getGratitude().filter(x=>x.id!==id);
  setLocalJson(GRAT_KEY, list);
  set(keys.gratitudes, list);
  if (IS_BROWSER) { try { window.localStorage.setItem('gratitude', JSON.stringify(list)); } catch {} }
  return list;
}
export function getGratitudes(){ return getGratitude(); }

// ---- Mood history (safe getter; returns {ts, score:1..5}) ----
export function getMoodHistory(){
  if (!IS_BROWSER) return [];
  try {
    const raw = window.localStorage.getItem('moodHistory');
    if (raw) {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) {
        return arr.map((m)=>({ ts: Number(m?.ts) || Date.parse(m?.date) || Date.now(), score: Math.max(1, Math.min(5, Number(m?.score) || 0)) })).filter(Boolean);
      }
    }
  } catch {}
  const legacy = getJSON(KV.mood, []);
  if (!Array.isArray(legacy)) return [];
  return legacy.map((m)=>{
    const ts = Date.parse(m?.date) || Date.now();
    const raw = Number(m?.mood) || 0; // often in -2..2
    const score = Math.max(1, Math.min(5, Math.round(raw + 3))); // map -2..2 -> 1..5
    return { ts, score };
  });
}

// ---- New: persist last chosen products category (SSR-safe) ----
const canUse = () => typeof window !== "undefined";
const getJsonKV = (k, d=null) => { try { return canUse() ? JSON.parse(localStorage.getItem(k)) ?? d : d; } catch { return d; } };
const setJsonKV = (k, v) => { try { if (canUse()) localStorage.setItem(k, JSON.stringify(v)); } catch {} };

export const getLastProductsCategory = () => get(keys.recProductsCategory, "livros");
export const setLastProductsCategory = (v) => set(keys.recProductsCategory, v);

// ----- New storage API (namespaced keys, events, migration) -----
const NS = 'm360:';
const UPDATED_EVENT = 'm360:data:updated';

function canUseStorage() {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}
function parse(json, fallback) {
  try { return json ? JSON.parse(json) : fallback; } catch(_) { return fallback; }
}
function readRaw(key) {
  if (!canUseStorage()) return null;
  try { return localStorage.getItem(key); } catch { return null; }
}
function writeRaw(key, value) {
  if (!canUseStorage()) return;
  try { localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value)); } catch {}
}

export const keys = {
  moodHistory: `${NS}moodHistory`,
  actions: `${NS}actions`,
  gratitudes: `${NS}gratitudes`,
  planner: `${NS}planner`,
  tipsIndex: `${NS}tipsIndex`,
  inspireIndex: `${NS}inspireIndex`,
  recProductsCategory: `${NS}recProductsCategory`,
  lastCtx: `${NS}lastCtx`,
};

export function get(key, fallback = null) {
  const v = readRaw(key);
  return parse(v, fallback);
}

export function set(key, value) {
  writeRaw(key, value);
  if (canUseStorage()) {
    queueMicrotask(() => {
      window.dispatchEvent(new CustomEvent(UPDATED_EVENT, { detail: { key } }));
    });
  }
}

export function onUpdate(handler) {
  if (!canUseStorage()) return () => {};
  const h = (e) => handler(e?.detail?.key);
  window.addEventListener(UPDATED_EVENT, h);
  return () => window.removeEventListener(UPDATED_EVENT, h);
}

export function migrateV1() {
  if (!canUseStorage()) return;
  try {
    const legacyMap = [
      { from: `${NS}gratitude`, alt: 'm360.gratitude.v1', to: keys.gratitudes, parseAs: 'array' },
      { from: 'm360.weeklyPlan.v1', to: keys.planner, parseAs: 'object' },
      { from: 'm360.tips.idx.v1', to: keys.tipsIndex, parseAs: 'number' },
      { from: `${NS}lastProductsCategory`, alt: 'm360.lastRecCat', to: keys.recProductsCategory, parseAs: 'string' },
    ];
    let moved = false;
    legacyMap.forEach(({ from, alt, to, parseAs }) => {
      const raw = readRaw(from) ?? readRaw(alt);
      if (raw !== null && readRaw(to) === null) {
        let v = raw;
        if (parseAs === 'array') v = parse(raw, []);
        else if (parseAs === 'object') v = parse(raw, {});
        else if (parseAs === 'number') v = Number(raw) || 0;
        else if (parseAs === 'string') v = String(raw);
        writeRaw(to, v);
        moved = true;
      }
    });
    if (moved) {
      queueMicrotask(() => window.dispatchEvent(new CustomEvent(UPDATED_EVENT, { detail: { key: 'migration' } })));
      console.info('m360:migration:ok');
    } else {
      console.info('m360:migration:noop');
    }
  } catch {
    console.warn('m360:migration:noop');
  }
}

export function getAll() {
  return {
    moodHistory: get(keys.moodHistory, []),
    actions: get(keys.actions, []),
    gratitudes: get(keys.gratitudes, []),
    planner: get(keys.planner, {}),
    tipsIndex: get(keys.tipsIndex, 0),
    inspireIndex: get(keys.inspireIndex, 0),
    recProductsCategory: get(keys.recProductsCategory, ''),
    lastCtx: get(keys.lastCtx, null),
  };
}
