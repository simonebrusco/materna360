import { getAll } from './storage';

// /lib/score.js

// Compute score from inputs
// moodHistory: array of last entries with a numeric value 0..4 (or 1..5), newer last or first
// actions: array of entries with { type: 'breath'|'reflect'|'inspire'|'pause', ts|date }
export function computeScore({ moodHistory = [], actions = [] } = {}){
  const last7Mood = (Array.isArray(moodHistory) ? moodHistory : []).slice(-7);
  const mapMood = (m) => {
    const v = typeof m === 'number' ? m : (typeof m?.score === 'number' ? m.score : 0);
    // support 1..5 by normalizing to 0..4
    const n = v >= 1 && v <= 5 ? (v - 1) : v;
    return Math.max(0, Math.min(4, Number.isFinite(n) ? n : 0));
  };
  const moodAvg = last7Mood.length ? last7Mood.reduce((a,m)=> a + mapMood(m), 0) / last7Mood.length : 0;
  const moodPart = Math.round(moodAvg * 200); // 0..800

  const now = Date.now();
  const toTs = (a) => (a && (Number(a.ts) || Date.parse(a.date))) || 0;
  const dayMs = 24*60*60*1000;
  const actions7d = (Array.isArray(actions) ? actions : []).filter(a => (now - toTs(a)) < 7*dayMs);
  const actionPart = Math.min(200, actions7d.length * 10);

  const score = Math.max(0, Math.min(1000, moodPart + actionPart));
  const percent = Math.round(score / 10);
  return { score, percent };
}

export function summarizeActions(actions = []){
  const dayMs = 24*60*60*1000;
  const now = Date.now();
  const toDay = (ts) => new Date(ts).toISOString().slice(0,10);
  const toTs = (a) => (a && (Number(a.ts) || Date.parse(a.date))) || 0;
  const recent = (Array.isArray(actions) ? actions : []).filter(a => (now - toTs(a)) < 7*dayMs);
  const count7d = recent.length;
  // streak: continuous days up to today with >=1 action
  let streakDays = 0;
  const todayKey = toDay(now);
  const set = new Set(recent.map(a => toDay(toTs(a))));
  for (let i=0;i<30;i++){
    const d = new Date(now - i*dayMs);
    const k = toDay(d);
    if (i === 0 && k !== todayKey) break; // if no action today, streak remains 0
    if (set.has(k)) streakDays++;
    else break;
  }
  return { count7d, streakDays };
}

// Backwards-compatible helpers kept for existing UI
import { safeGet } from '@/lib/utils/safeStorage';
function readJson(key, fallback){
  try { return safeGet(key, fallback); } catch { return fallback; }
}

export function computeScoreNow() {
  const mh = readJson("moodHistory", []);
  const avgMood = mh.length ? mh.reduce((a,b)=>a + (Number(b.score)||0), 0) / (mh.length*5) : 0.5;

  const plan = readJson("weeklyPlan", [false,false,false,false,false,false,false]);
  const done = Array.isArray(plan) ? plan.filter(Boolean).length : 0;
  const weekRatio = Math.min(1, Math.max(0, done/7));

  const gr = readJson("gratitude", []);
  const recent = Array.isArray(gr) ? gr.filter(g => Date.now() - (g.ts||0) < 7*24*60*60*1000).length : 0;
  const gratitudeRatio = Math.min(1, recent/5);

  const score = Math.round((avgMood*0.55 + weekRatio*0.30 + gratitudeRatio*0.15) * 1000);
  return {
    score: Math.max(0, Math.min(1000, score)),
    parts: { avgMood, weekRatio, gratitudeRatio },
    weekDone: done,
    gratitudeRecent: recent,
    moodCount: mh.length
  };
}

export function computeAchievements(){
  const a = [];
  const plan = readJson("weeklyPlan", []);
  const done = Array.isArray(plan) ? plan.filter(Boolean).length : 0;
  if (done >= 2) a.push({ id:"ach-2days", label:"2 metas na semana" });
  if (done >= 5) a.push({ id:"ach-5days", label:"5 dias ativos" });
  const gr = readJson("gratitude", []);
  if (Array.isArray(gr) && gr.length >= 1) a.push({ id:"ach-first-grat", label:"Primeira gratidão" });
  return a.slice(0,3);
}

// Simple aggregate score based on actions, gratitudes e planner
// Suporta:
// a) { done: ['2025-10-06', ...] }
// b) { seg:{done:true}, ter:{...}, ... }
// c) { days: [true,false,...] } ou [true,false,...]
export function compute({ actions = [], gratitudes = [], planner = {} } = {}) {
  const actionsPts = (actions?.length || 0) * 5;
  const gratPts    = (gratitudes?.length || 0) * 10;

  const daysDone = Array.isArray(planner?.done)
    ? planner.done.length
    : Array.isArray(planner?.days)
      ? planner.days.filter(Boolean).length
      : Array.isArray(planner)
        ? planner.filter(Boolean).length
        : Object.values(planner || {}).filter(d => d && d.done).length;

  const planPts = (daysDone || 0) * 15;

  const raw = actionsPts + gratPts + planPts;
  return Math.max(0, Math.min(1000, raw));
}

export function get() {
  const data = getAll();
  return compute(data);
}
