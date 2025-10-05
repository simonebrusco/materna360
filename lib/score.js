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
