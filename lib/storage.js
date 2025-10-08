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
  if (typeof v === 'string' && v) {
    const map = { livros: "Livros", brinquedos: "Brinquedos", cuidado: "Cuidado", cuidados: "Cuidado", para_voce: "Para você" };
    const norm = map[String(v).toLowerCase()];
    return norm || v;
  }
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
  if (IS_BROWSER) { try { const { safeSet } = require('@/lib/utils/safeStorage'); safeSet('weeklyPlan', plan); } catch {} }
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
  try { const { safeGet } = require('@/lib/utils/safeStorage'); return Number(safeGet(TIPS_KEY, 0)) || 0; } catch { return 0; }
}
export function bumpTipsIndex(total){
  const next = ((getTipsIndex() + 1) % Math.max(1,total||1));
  set(keys.tipsIndex, next);
  try { if (IS_BROWSER) { const { safeSet } = require('@/lib/utils/safeStorage'); safeSet(TIPS_KEY, next); } } catch {}
}

// ---- Gratitude history ----
const GRAT_KEY = "m360.gratitude.v1"; // [{id,text,ts}]
export function getGratitude(){
  const v = get(keys.gratitudes, null);
  if (Array.isArray(v)) return v;
  // Prefer plain 'gratitude' key
  if (IS_BROWSER) {
    try {
      const { safeGet } = require('@/lib/utils/safeStorage');
      const arr = safeGet('gratitude', []);
      if (Array.isArray(arr)) return arr;
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
  try { const { safeSet } = require('@/lib/utils/safeStorage'); safeSet('gratitude', trimmed); } catch {}
  try { setLocalJson("m360:gratitude", trimmed); } catch {}
  return trimmed;
}
export function deleteGratitude(id){
  const list = getGratitude().filter(x=>x.id!==id);
  setLocalJson(GRAT_KEY, list);
  set(keys.gratitudes, list);
  if (IS_BROWSER) { try { const { safeSet } = require('@/lib/utils/safeStorage'); safeSet('gratitude', list); } catch {} }
  return list;
}
export function getGratitudes(){ return getGratitude(); }

// ---- Mood history (safe getter; returns {ts, score:1..5}) ----
export function getMoodHistory(){
  if (!IS_BROWSER) return [];
  try {
    const { safeGet } = require('@/lib/utils/safeStorage');
    const arr = safeGet('moodHistory', []);
    if (Array.isArray(arr)) {
      return arr.map((m)=>({ ts: Number(m?.ts) || Date.parse(m?.date) || Date.now(), score: Math.max(1, Math.min(5, Number(m?.score) || 0)) })).filter(Boolean);
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

export const getLastProductsCategory = () => {
  const v = get(keys.recProductsCategory, "livros");
  const map = { Livros: "livros", Brinquedos: "brinquedos", Cuidado: "cuidados", Cuidados: "cuidados", "Para você": "para_voce" };
  const byKey = String(v || "").toLowerCase();
  if (map[v]) return map[v];
  if (["livros","brinquedos","cuidados","para_voce"].includes(byKey)) return byKey;
  return "livros";
};
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
  reminders: `${NS}reminders`,
  lastSeen: `${NS}reminders:lastSeen`,
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
    reminders: get(keys.reminders, {}),
    lastSeen: get(keys.lastSeen, {}),
  };
}

// ---- Planner (array of 7 days with { date, items[], mood?, reminders[] }) ----
function startOfDayISO(ts){ try{ const d=new Date(ts||Date.now()); d.setHours(0,0,0,0); return d.toISOString(); }catch{ return new Date().toISOString(); } }
function getMonday(d){ const x=new Date(d||Date.now()); const day=(x.getDay()+6)%7; x.setDate(x.getDate()-day); x.setHours(0,0,0,0); return x; }
function buildWeek(base){ const arr=[]; for(let i=0;i<7;i++){ const dd=new Date(base); dd.setDate(base.getDate()+i); arr.push({ date: dd.toISOString().slice(0,10), items: [], mood: undefined, reminders: [] }); } return arr; }

export function getPlannerWeek(){
  const raw = get(keys.planner, null);
  if (raw && Array.isArray(raw?.week) && raw.week.length===7) return raw.week;
  if (Array.isArray(raw) && raw.length===7 && raw.every(x=>x && typeof x==='object' && 'items' in x)) return raw;
  // initialize
  const base = getMonday(Date.now());
  const week = buildWeek(base);
  const currentDays = Array.isArray(getWeeklyPlan()) ? getWeeklyPlan() : Array(7).fill(false);
  // mirror legacy booleans by creating placeholder items for completed days
  week.forEach((d, i)=>{ if (currentDays[i]) d.items.push({ id:`day-${i}`, done:true, ts: Date.now() }); });
  const val = { days: currentDays, week };
  set(keys.planner, val);
  return week;
}

export function setPlannerWeek(week){
  if (!Array.isArray(week) || week.length!==7) return;
  const planDays = getWeeklyPlan();
  const payload = { days: planDays, week };
  set(keys.planner, payload);
  // validate write
  try {
    const back = get(keys.planner, null);
    if (!back || !Array.isArray(back?.week) || back.week.length!==7) throw new Error('invalid');
  } catch {
    try { if (typeof window!=="undefined") window.dispatchEvent(new CustomEvent('m360:toast', { detail:{ message: "N��o conseguimos salvar — tente novamente" } })); } catch {}
  }
}

export function addPlannerTodayItem(id){
  try{
    const week = getPlannerWeek().slice();
    const now = new Date();
    const idx = (now.getDay()+6)%7; // Mon=0..Sun=6
    const day = { ...week[idx] };
    const exists = (day.items||[]).some(it => String(it.id)===String(id));
    if (!exists){
      day.items = [...(day.items||[]), { id: String(id), done: false, ts: Date.now() }];
      week[idx] = day;
      setPlannerWeek(week);
      try { const p = togglePlanDay(idx); setWeeklyPlan(p); } catch {}
      try {
        const list = get(keys.actions, []);
        const next = [...(Array.isArray(list)?list:[]), { type:'planner_add', ts: Date.now() }];
        set(keys.actions, next);
      } catch {}
    }
    return week;
  } catch {
    try { if (typeof window!=="undefined") window.dispatchEvent(new CustomEvent('m360:toast', { detail:{ message: "Não conseguimos salvar — tente novamente" } })); } catch {}
    return getPlannerWeek();
  }
}

// ---- New Notepad-style planner (array model) ----
function mondayOf(date){ const d=new Date(date||Date.now()); const day=(d.getDay()+6)%7; d.setDate(d.getDate()-day); d.setHours(0,0,0,0); return d; }
function sameWeek(a,b){ return mondayOf(a).toISOString().slice(0,10)===mondayOf(b).toISOString().slice(0,10); }
function newWeekArray(base){ const arr=[]; const m=mondayOf(base); for(let i=0;i<7;i++){ const d=new Date(m); d.setDate(m.getDate()+i); arr.push({ dateISO: d.toISOString().slice(0,10), entries: [] }); } return arr; }

export function ensurePlannerWeek(){
  const raw = get(keys.planner, null);
  // Accept legacy shapes
  if (raw && Array.isArray(raw.week)) {
    const week = raw.week.map((d)=>({ dateISO: (d.date||d.dateISO)||new Date().toISOString().slice(0,10), entries: Array.isArray(d.items)? d.items.map(it=>({ id:String(it.id), title:String(it.id), kind:'task', done:!!it.done, createdAt:it.ts||Date.now(), updatedAt:it.ts||Date.now() })) : [] }));
    set(keys.planner, week);
    return week;
  }
  if (!Array.isArray(raw)) {
    const nw = newWeekArray(Date.now());
    set(keys.planner, nw);
    return nw;
  }
  const days = raw;
  if (days.length !== 7) {
    const nw = newWeekArray(Date.now());
    set(keys.planner, nw);
    return nw;
  }
  // rollover if week changed
  const now = Date.now();
  if (!sameWeek(days?.[0]?.dateISO || Date.now(), now)) {
    try {
      const archKey = `${keys.planner}:archive`;
      const prev = get(archKey, []);
      const nextArch = [days, ...prev].slice(0, 3);
      set(archKey, nextArch);
    } catch {}
    const nw = newWeekArray(now);
    set(keys.planner, nw);
    return nw;
  }
  return days;
}

export function getPlanner(){ const v = get(keys.planner, null); if (Array.isArray(v) && v.length===7) return v; return ensurePlannerWeek(); }
export function setPlanner(days){ if (!Array.isArray(days) || days.length!==7) return; set(keys.planner, days); const back=get(keys.planner, null); if (!Array.isArray(back)||back.length!==7){ try { if (typeof window!=="undefined") window.dispatchEvent(new CustomEvent('m360:toast', { detail:{ message: "Não conseguimos salvar agora. Tente novamente." } })); } catch {} } }

export function addPlannerEntry(dayIndex, entry){ const days = getPlanner().slice(); const i = Math.max(0, Math.min(6, dayIndex|0)); const list = Array.isArray(days[i].entries)?days[i].entries.slice():[]; const now = Date.now(); const item = { ...entry, id: entry.id || (Math.random().toString(36).slice(2)), createdAt: entry.createdAt||now, updatedAt: now }; list.push(item); days[i] = { ...days[i], entries: list }; setPlanner(days); try{ const acts = get(keys.actions, []); set(keys.actions, [...(Array.isArray(acts)?acts:[]), { type:'planner_update', ts: now }]); }catch{} return days; }

export function updatePlannerEntry(dayIndex, id, patch){ const days = getPlanner().slice(); const i = Math.max(0, Math.min(6, dayIndex|0)); const list = Array.isArray(days[i].entries)?days[i].entries.slice():[]; const idx = list.findIndex(e=>String(e.id)===String(id)); if (idx>=0){ list[idx] = { ...list[idx], ...patch, id: list[idx].id, updatedAt: Date.now() }; days[i]={...days[i], entries:list}; setPlanner(days);} return days; }

export function deletePlannerEntry(dayIndex, id){ const days = getPlanner().slice(); const i = Math.max(0, Math.min(6, dayIndex|0)); const list = Array.isArray(days[i].entries)?days[i].entries.slice():[]; const next = list.filter(e=>String(e.id)!==String(id)); days[i] = { ...days[i], entries: next }; setPlanner(days); return days; }

export function togglePlannerTaskDone(dayIndex, id){ const days = getPlanner().slice(); const i = Math.max(0, Math.min(6, dayIndex|0)); const list = Array.isArray(days[i].entries)?days[i].entries.slice():[]; const idx = list.findIndex(e=>String(e.id)===String(id)); if (idx>=0){ const e=list[idx]; list[idx] = { ...e, done: !e.done, updatedAt: Date.now() }; days[i] = { ...days[i], entries: list }; setPlanner(days);} return days; }

export function getPlannerDaysDone(){ const days = getPlanner(); return days.map(d => Array.isArray(d.entries) ? d.entries.some(e => e.kind==='task' && e.done) : false); }

// ---- Segmented planners (Casa | Filhos | Eu) ----
const PL_HOME = 'm360:planner.home';
const PL_KIDS = 'm360:planner.kids';
const PL_ME   = 'm360:planner.me';
function readSeg(k, fb){ return get(k, fb); }
function writeSeg(k, v){ set(k, v); }
export function ensureSegmentedPlanners(){
  try{
    const hasHome = readSeg(PL_HOME, null);
    const hasKids = readSeg(PL_KIDS, null);
    const hasMe   = readSeg(PL_ME, null);
    if (!hasHome || !Array.isArray(hasHome) || hasHome.length!==7){
      const base = ensurePlannerWeek();
      writeSeg(PL_HOME, base);
    }
    if (!hasKids || !Array.isArray(hasKids) || hasKids.length!==7){
      writeSeg(PL_KIDS, ensurePlannerWeek());
    }
    if (!hasMe || !Array.isArray(hasMe) || hasMe.length!==7){
      writeSeg(PL_ME, ensurePlannerWeek());
    }
  }catch{}
}
export function getSegmentPlanner(tab){
  const key = tab==='kids' ? PL_KIDS : tab==='me' ? PL_ME : PL_HOME;
  const v = readSeg(key, null);
  if (Array.isArray(v) && v.length===7) return v;
  ensureSegmentedPlanners();
  return readSeg(key, ensurePlannerWeek());
}
export function getSegmentDaysDone(tab){
  const days = getSegmentPlanner(tab);
  return days.map(d => Array.isArray(d.entries) ? d.entries.some(e => e.kind==='task' && e.done) : false);
}

// ---- Checklist Today helpers ----
function todayKey(){ try{ const d=new Date(); const y=d.getFullYear(); const m=String(d.getMonth()+1).padStart(2,'0'); const day=String(d.getDate()).padStart(2,'0'); return `m360:checklist:${y}-${m}-${day}`; }catch{ return 'm360:checklist:today'; } }
export function getTodayChecklist(){
  const def = [
    { id:'water', title:'Beber água 💧', done:false },
    { id:'stretch', title:'Alongar-se 🧘', done:false },
    { id:'play', title:'Brincar com meu filho 🎲', done:false },
  ];
  const k = todayKey();
  const v = get(k, null);
  if (Array.isArray(v)) return v;
  set(k, def);
  return def;
}
export function setTodayChecklist(list){ const k=todayKey(); set(k, Array.isArray(list)?list:[]); }
