// /lib/storage.js
/**
 * Materna360 lightweight client storage (SSR-safe).
 * Uses localStorage with guards. All methods are no-throw.
 */

const isBrowser = typeof window !== "undefined";

/** @template T */
function getJSON(key, fallback) {
  if (!isBrowser) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

/** @template T */
function setJSON(key, value) {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

// Lightweight exported helpers (SSR-safe)
export function getLocalJson(key, fallback){
  if (typeof window === "undefined") return fallback;
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}
export function setLocalJson(key, value){
  if (typeof window === "undefined") return;
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

// Keys namespace (versioned for future migrations)
const NS = "m360";
const KV = {
  lastAgeGroup: `${NS}:discover:lastAgeGroup:v1`,
  // Placeholders for future IA/back-end sync (kept here to avoid future breaking changes)
  mood:        `${NS}:mood:v1`,
  actions:     `${NS}:actions:v1`,
  gratitude:   `${NS}:gratitude:v1`,
  weeklyPlan:  `${NS}:weeklyPlan:v1`,
};

// ---- Public API: Discover age group ----

/**
 * @typedef {"0-2"|"3-4"|"5-7"|"8+"} AgeGroup
 */

/**
 * Returns last selected age group or the provided default (default "3-4").
 * @param {AgeGroup} [fallback="3-4"]
 * @returns {AgeGroup}
 */
export function getLastAgeGroup(fallback = "3-4") {
  const v = getJSON(KV.lastAgeGroup, fallback);
  // Defensive: only allow known values
  const allowed = ["0-2","3-4","5-7","8+"];
  return allowed.includes(v) ? v : fallback;
}

/**
 * Persists the selected age group.
 * @param {AgeGroup} group
 */
export function setLastAgeGroup(group) {
  const allowed = ["0-2","3-4","5-7","8+"];
  if (!allowed.includes(group)) return;
  setJSON(KV.lastAgeGroup, group);
}

// ---- (Future-ready) Stubs you might need soon ----

/** Add a mood entry (kept for later IA scoring) */
export function addMood(entry) {
  const list = getJSON(KV.mood, []);
  list.unshift(entry);
  setJSON(KV.mood, list.slice(0, 200)); // cap
}

/** Record a quick action (breathe/reflect/inspire/pause) */
export function addAction(entry) {
  const list = getJSON(KV.actions, []);
  list.unshift(entry);
  setJSON(KV.actions, list.slice(0, 500)); // cap
}

/** Gratitude helpers (optional for future) */
export function listGratitude() { return getJSON(KV.gratitude, []); }
export function addGratitude(text){
  const list = getGratitude();
  const item = { id: Date.now()+"_"+Math.random().toString(36).slice(2), text: (text||"").trim(), ts: Date.now() };
  list.unshift(item);
  setLocalJson(GRAT_KEY, list.slice(0,200));
  return list;
}

/** Weekly plan stubs (optional) */
// ---- Weekly plan (Sun..Sat) ----
const PLAN_KEY = "m360.weeklyPlan.v1";
export function getWeeklyPlan(){
  const stored = typeof window === "undefined" ? null : getLocalJson(PLAN_KEY, null);
  const legacy = getJSON ? getJSON(KV.weeklyPlan, null) : null;
  const val = stored ?? legacy;
  if (Array.isArray(val) && val.length === 7) return val;
  if (val && Array.isArray(val.days) && val.days.length === 7) return val.days;
  return [false,false,false,false,false,false,false];
}
export function setWeeklyPlan(plan){
  if (!Array.isArray(plan) || plan.length !== 7) return;
  setLocalJson(PLAN_KEY, plan);
}
export function togglePlanDay(idx){
  const p = getWeeklyPlan().slice();
  if (idx < 0 || idx > 6) return p;
  p[idx] = !p[idx];
  setWeeklyPlan(p);
  return p;
}

// ---- Tips rotation ----
const TIPS_KEY = "m360.tips.idx.v1";
export function getTipsIndex(){
  if (typeof window === "undefined") return 0;
  try { return Number(localStorage.getItem(TIPS_KEY)) || 0; } catch { return 0; }
}
export function bumpTipsIndex(total){
  if (typeof window === "undefined") return;
  try {
    const next = ((getTipsIndex() + 1) % Math.max(1,total||1));
    localStorage.setItem(TIPS_KEY, String(next));
  } catch {}
}

// ---- Gratitude history ----
const GRAT_KEY = "m360.gratitude.v1"; // [{id,text,ts}]
export function getGratitude(){
  const list = getLocalJson(GRAT_KEY, []);
  if (!Array.isArray(list) || list.length === 0) {
    const legacy = getJSON ? getJSON(KV.gratitude, []) : [];
    if (Array.isArray(legacy) && legacy.length) {
      const migrated = legacy.map(x => ({
        id: Date.now()+"_"+Math.random().toString(36).slice(2),
        text: x?.text || "",
        ts: x?.date ? (Date.parse(x.date) || Date.now()) : Date.now()
      }));
      setLocalJson(GRAT_KEY, migrated);
      return migrated;
    }
  }
  return Array.isArray(list) ? list : [];
}
export function deleteGratitude(id){
  const list = getGratitude().filter(x=>x.id!==id);
  setLocalJson(GRAT_KEY, list);
  return list;
}
