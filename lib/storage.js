// Client-only helpers for Discover selections
export function getLastAgeGroup(defaultVal="3-4"){
  if (typeof window === "undefined") return defaultVal;
  try { return localStorage.getItem("m360.lastAge") || defaultVal; } catch { return defaultVal; }
}
export function setLastAgeGroup(v){
  if (typeof window === "undefined") return;
  try { localStorage.setItem("m360.lastAge", v); } catch {}
}

export function getLastContext(defaultVal="Casa"){
  if (typeof window === "undefined") return defaultVal;
  try { return localStorage.getItem("m360.lastCtx") || defaultVal; } catch { return defaultVal; }
}
export function setLastContext(v){
  if (typeof window === "undefined") return;
  try { localStorage.setItem("m360.lastCtx", v); } catch {}
}

export function getLastRecCategory(defaultVal="Livros"){
  if (typeof window === "undefined") return defaultVal;
  try { return localStorage.getItem("m360.lastRecCat") || defaultVal; } catch { return defaultVal; }
}
export function setLastRecCategory(v){
  if (typeof window === "undefined") return;
  try { localStorage.setItem("m360.lastRecCat", v); } catch {}
}

// === Existing app storage API (kept to avoid breaking other pages) ===
const MOOD_HISTORY_KEY = "m360:moodHistory";
const ACTIONS_KEY = "m360:actions";
const WEEKLY_PLAN_KEY = "m360:weeklyPlan";
const GRATITUDES_KEY = "m360:gratitudes";

function safeGet(key, fallback) {
  try {
    if (typeof window === "undefined" || !window.localStorage) return fallback;
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed == null ? fallback : parsed;
  } catch {
    return fallback;
  }
}

function safeSet(key, value) {
  try {
    if (typeof window === "undefined" || !window.localStorage) return;
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

function nowIso() {
  try { return new Date().toISOString(); } catch { return ""; }
}

export function getMoodHistory() {
  const list = safeGet(MOOD_HISTORY_KEY, []);
  return Array.isArray(list) ? list : [];
}

export function addMood(entry) {
  const list = getMoodHistory();
  const toStore = {
    date: entry && typeof entry.date === "string" && entry.date ? entry.date : nowIso(),
    mood: entry && typeof entry.mood === "number" ? entry.mood : 0,
    note: entry && entry.note ? String(entry.note) : undefined,
  };
  list.push(toStore);
  safeSet(MOOD_HISTORY_KEY, list);
  return list;
}

export function getActions() {
  const list = safeGet(ACTIONS_KEY, []);
  return Array.isArray(list) ? list : [];
}

export function addAction(log) {
  const list = getActions();
  const type = log && log.type;
  const allowed = type === "breath" || type === "pause" || type === "inspire";
  const toStore = {
    date: log && typeof log.date === "string" && log.date ? log.date : nowIso(),
    type: allowed ? type : "inspire",
    duration: typeof log?.duration === "number" ? log.duration : undefined,
  };
  list.push(toStore);
  safeSet(ACTIONS_KEY, list);
  return list;
}

export function getWeeklyPlan() {
  const plan = safeGet(WEEKLY_PLAN_KEY, null);
  if (Array.isArray(plan) && plan.every(v => typeof v === "boolean")) return plan;
  const fresh = new Array(7).fill(false);
  safeSet(WEEKLY_PLAN_KEY, fresh);
  return fresh;
}

export function toggleDayDone(dateOrIndex) {
  try {
    const plan = getWeeklyPlan();
    let idx = null;
    if (typeof dateOrIndex === "number") {
      idx = dateOrIndex;
    } else if (dateOrIndex instanceof Date) {
      idx = dateOrIndex.getDay();
    } else if (dateOrIndex && typeof dateOrIndex.getDay === "function") {
      try { idx = dateOrIndex.getDay(); } catch {}
    }
    if (typeof idx !== "number" || idx < 0 || idx >= plan.length) return plan;
    const next = plan.slice();
    next[idx] = !next[idx];
    safeSet(WEEKLY_PLAN_KEY, next);
    return next;
  } catch {
    return getWeeklyPlan();
  }
}

export function getGratitudes() {
  const list = safeGet(GRATITUDES_KEY, []);
  return Array.isArray(list) ? list.map(String) : [];
}

export function addGratitude(text) {
  const value = (text ?? "").toString().trim();
  if (!value) return getGratitudes();
  const list = getGratitudes();
  list.push(value);
  safeSet(GRATITUDES_KEY, list);
  return list;
}
