// /lib/storage.js
/**
 * Materna360 lightweight client storage (SSR-safe).
 * Uses localStorage with guards. All methods are no-throw.
 */

const isBrowser = typeof window !== "undefined";

function getLocalJson(key, fallback){
  if (!isBrowser) return fallback;
  try { const v = window.localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}
function setLocalJson(key, value){
  if (!isBrowser) return;
  try { window.localStorage.setItem(key, JSON.stringify(value)); } catch {}
}
export { getLocalJson, setLocalJson };

function getJSON(key, fallback) { return getLocalJson(key, fallback); }
function setJSON(key, value) { return setLocalJson(key, value); }

// Keys namespace (versioned for future migrations)
const NS = "m360";
const KV = {
  lastAgeGroup: `${NS}:discover:lastAgeGroup:v1`,
  lastContext: `${NS}:discover:lastContext:v1`,
  lastRecCat: `${NS}:discover:lastRecCat:v1`,
  mood:        `${NS}:mood:v1`,
  actions:     `${NS}:actions:v1`,
  gratitude:   `${NS}:gratitude:v1`,
  weeklyPlan:  `${NS}:weeklyPlan:v1`,
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
  try { const v = isBrowser ? window.localStorage.getItem("m360.lastCtx") : null; return v || defaultVal; } catch { return defaultVal; }
}
export function setLastContext(v) { try { if (isBrowser) window.localStorage.setItem("m360.lastCtx", v); } catch {} }
export function getLastRecCategory(defaultVal = "Livros") {
  try { const v = isBrowser ? window.localStorage.getItem("m360.lastRecCat") : null; return v || defaultVal; } catch { return defaultVal; }
}
export function setLastRecCategory(v) { try { if (isBrowser) window.localStorage.setItem("m360.lastRecCat", v); } catch {} }

// ---- Mood and Actions ----
export function addMood(entry) {
  const list = getJSON(KV.mood, []);
  const e = { date: entry?.date || (new Date().toISOString()), mood: typeof entry?.mood === "number" ? entry.mood : 0, note: entry?.note };
  list.push(e);
  setJSON(KV.mood, list);
  return list;
}
export function addAction(entry) {
  const list = getJSON(KV.actions, []);
  const e = { date: entry?.date || (new Date().toISOString()), type: entry?.type || "inspire", duration: typeof entry?.duration === "number" ? entry.duration : undefined };
  list.push(e);
  setJSON(KV.actions, list);
  return list;
}

// ---- Weekly plan (Sun..Sat) ----
const PLAN_KEY = "m360.weeklyPlan.v1";
export function getWeeklyPlan(){
  const stored = getLocalJson(PLAN_KEY, null);
  const legacy = getJSON(KV.weeklyPlan, null);
  const val = stored ?? legacy;
  if (Array.isArray(val) && val.length === 7) return val;
  if (val && Array.isArray(val.days) && val.days.length === 7) return val.days;
  return [false,false,false,false,false,false,false];
}
export function setWeeklyPlan(plan){ if (Array.isArray(plan) && plan.length === 7) setLocalJson(PLAN_KEY, plan); }
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
    const i = typeof d.getDay === "function" ? d.getDay() : 0;
    return togglePlanDay(i);
  } catch { return getWeeklyPlan(); }
}

// ---- Tips rotation ----
const TIPS_KEY = "m360.tips.idx.v1";
export function getTipsIndex(){
  if (!isBrowser) return 0;
  try { return Number(window.localStorage.getItem(TIPS_KEY)) || 0; } catch { return 0; }
}
export function bumpTipsIndex(total){
  if (!isBrowser) return;
  try {
    const next = ((getTipsIndex() + 1) % Math.max(1,total||1));
    window.localStorage.setItem(TIPS_KEY, String(next));
  } catch {}
}

// ---- Gratitude history ----
const GRAT_KEY = "m360.gratitude.v1"; // [{id,text,ts}]
export function getGratitude(){
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
      return migrated;
    }
  }
  return Array.isArray(list) ? list : [];
}
export function addGratitude(text){
  const list = getGratitude();
  const value = (text||"").toString().trim();
  if (!value) return list;
  const item = { id: Date.now()+"_"+Math.random().toString(36).slice(2), text: value, ts: Date.now() };
  list.unshift(item);
  setLocalJson(GRAT_KEY, list.slice(0,200));
  return list;
}
export function deleteGratitude(id){
  const list = getGratitude().filter(x=>x.id!==id);
  setLocalJson(GRAT_KEY, list);
  return list;
}

// ---- Simple last selection helpers (explicit keys) ----
export function getLastAge(){ try { return isBrowser ? window.localStorage.getItem('lastAge') : null; } catch { return null; } }
export function setLastAge(age){ try { if (isBrowser) window.localStorage.setItem('lastAge', String(age)); } catch {} }
export function getLastPlace(){ try { return isBrowser ? window.localStorage.getItem('lastPlace') : null; } catch { return null; } }
export function setLastPlace(place){ try { if (isBrowser) window.localStorage.setItem('lastPlace', String(place)); } catch {} }
