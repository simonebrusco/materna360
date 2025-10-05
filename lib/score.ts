/**
 * @typedef {Object} MoodEntry
 * @property {string} date
 * @property {-2|-1|0|1|2} mood
 * @property {string} [note]
 */

/**
 * @typedef {Object} ActionLog
 * @property {string} date
 * @property {"breath"|"pause"|"inspire"} type
 * @property {number} [duration]
 */

function dateKey(d) {
  try {
    const dd = d instanceof Date ? d : new Date(d);
    if (Number.isNaN(dd.getTime())) return "";
    return dd.toISOString().slice(0, 10);
  } catch {
    return "";
  }
}

function lastNDaysKeys(n) {
  const arr = [];
  const today = new Date();
  for (let i = 0; i < n; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    arr.push(dateKey(d));
  }
  return arr;
}

function clamp(x, min, max) {
  return Math.max(min, Math.min(max, x));
}

/**
 * Calculates overall score.
 * @param {{actions: ActionLog[]|undefined, moodHistory: MoodEntry[]|undefined, gratitudes: any}} input
 * @returns {{score:number, weeklyMood:number, actionsToday:number}}
 */
export function calcScore(input) {
  const actions = Array.isArray(input?.actions) ? input.actions : [];
  const moodHistory = Array.isArray(input?.moodHistory) ? input.moodHistory : [];

  const days = lastNDaysKeys(7);
  const todayKey = days[0];

  // Actions today count (raw logs)
  const actionsToday = actions.filter(a => dateKey(a?.date) === todayKey).length;

  // Aggregate actions per day
  let actionPoints = 0;
  for (const day of days) {
    const dayLogs = actions.filter(a => dateKey(a?.date) === day);
    if (dayLogs.length === 0) continue;

    const breathCount = dayLogs.filter(a => a.type === "breath").length;
    if (breathCount > 0) actionPoints += 5 + Math.max(0, breathCount - 1) * 2;

    const pauseDurations = dayLogs.filter(a => a.type === "pause").map(a => Number(a.duration) || 0);
    if (pauseDurations.length > 0) {
      const maxMin = Math.max(...pauseDurations);
      if (maxMin >= 10) actionPoints += 5; else if (maxMin >= 5) actionPoints += 4; else if (maxMin >= 3) actionPoints += 3;
    }

    const hasInspire = dayLogs.some(a => a.type === "inspire");
    if (hasInspire) actionPoints += 2;
  }

  // Mood contribution over last 7 days (use last entry per day if multiple)
  const moodByDay = new Map();
  for (const m of moodHistory) {
    const k = dateKey(m?.date);
    if (!k) continue;
    if (!days.includes(k)) continue;
    moodByDay.set(k, typeof m.mood === "number" ? m.mood : 0);
  }
  const moods = Array.from(moodByDay.values());
  const avgMood = moods.length ? moods.reduce((a, b) => a + b, 0) / moods.length : 0; // in -2..2
  const weeklyMood = clamp(((avgMood + 2) / 4) * 10, 0, 10); // normalize to 0..10
  const moodContribution = (weeklyMood / 10) * 20; // up to +20

  const rawScore = actionPoints + moodContribution;
  const score = clamp(Math.round(rawScore), 0, 100);

  return { score, weeklyMood, actionsToday };
}
