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

// Persist last selected context (discover page) and recommendation category
export function getLastContext(fallback = "Casa") {
  return getJSON("m360.lastCtx", fallback);
}
export function setLastContext(ctx) {
  try { setJSON("m360.lastCtx", ctx); } catch {}
}
export function getLastRecCategory(fallback = "Livros") {
  return getJSON("m360.lastRecCat", fallback);
}
export function setLastRecCategory(cat) {
  try { setJSON("m360.lastRecCat", cat); } catch {}
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
export function addGratitude(text) {
  const list = getJSON(KV.gratitude, []);
  list.unshift({ text, date: new Date().toISOString() });
  setJSON(KV.gratitude, list.slice(0, 200));
}

/** Weekly plan stubs (optional) */
export function getWeeklyPlan() { return getJSON(KV.weeklyPlan, { days:[false,false,false,false,false,false,false] }); }
export function setWeeklyPlan(plan) { setJSON(KV.weeklyPlan, plan); }
