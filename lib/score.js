// /lib/score.js
export function computeScore() {
  // Mood average 0..1
  const mh = (typeof window==='undefined') ? [] : (window.localStorage.getItem('moodHistory') ? JSON.parse(window.localStorage.getItem('moodHistory')) : []);
  const avgMood = mh.length ? mh.reduce((a,b)=>a+(Number(b.score)||0),0)/(mh.length*5) : 0.5;

  // Weekly completion 0..1
  const plan = (typeof window==='undefined') ? [] : (window.localStorage.getItem('weeklyPlan') ? JSON.parse(window.localStorage.getItem('weeklyPlan')) : Array(7).fill(false));
  const done = Array.isArray(plan) ? plan.filter(Boolean).length : 0;
  const weekRatio = done/7;

  // Gratitude factor 0..1 (cap at 5 per week for scaling)
  const gl = (typeof window==='undefined') ? [] : (window.localStorage.getItem('gratitude') ? JSON.parse(window.localStorage.getItem('gratitude')) : []);
  const now = Date.now();
  const recent = Array.isArray(gl) ? gl.filter(g=> now - (Number(g?.ts)||0) < 7*24*60*60*1000).length : 0;
  const gratitudeRatio = Math.min(recent,5)/5;

  // Weighted score (0..1000); tune weights softly
  const score = Math.round((avgMood*0.55 + weekRatio*0.30 + gratitudeRatio*0.15) * 1000);
  const safe = Math.max(0, Math.min(1000, score));
  return { score: safe, done, avgMood, gratitude: recent };
}

// ---- Extended helpers/APIs ----
function readJson(key, fallback){
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
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
