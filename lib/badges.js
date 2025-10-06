import { getAll, get, set, keys } from './storage';
import { computeScore, summarizeActions } from './score';
import { getGratitude, getWeeklyPlan, getMoodHistory, getActions } from './storage';

const LEVELS = ['bronze','prata','ouro','diamante'];

function levelOf(value, thresholds){
  // thresholds must be ascending array of 4 numbers
  if (!Array.isArray(thresholds) || thresholds.length !== 4) return null;
  const [b, p, o, d] = thresholds.map(n => Number(n)||0);
  if (value >= d) return 'diamante';
  if (value >= o) return 'ouro';
  if (value >= p) return 'prata';
  if (value >= b) return 'bronze';
  return null;
}

function asDaysDone(plan){
  if (Array.isArray(plan)) return plan.filter(Boolean).length;
  if (plan && Array.isArray(plan.days)) return plan.days.filter(Boolean).length;
  if (plan && typeof plan === 'object') return Object.values(plan).filter(x => x && x.done).length;
  return 0;
}

export function computeState(){
  const data = getAll();
  const actions = Array.isArray(data.actions) ? data.actions : getActions();
  const mh = Array.isArray(data.moodHistory) && data.moodHistory.length ? data.moodHistory : getMoodHistory();
  const grat = getGratitude();
  const plan = getWeeklyPlan();

  const now = Date.now();
  const toTs = (a) => (a && (Number(a.ts) || Date.parse(a.date))) || 0;
  const dayMs = 24*60*60*1000;
  const actions7d = (Array.isArray(actions) ? actions : []).filter(a => (now - toTs(a)) < 7*dayMs);
  const { streakDays } = summarizeActions(actions);
  const { percent } = computeScore({ moodHistory: mh, actions });

  const badges = {};

  // Ações na semana
  const actionsLevel = levelOf(actions7d.length, [1,3,5,7]);
  badges.actions_week = { id: 'actions_week', title: 'Ações semanais', level: actionsLevel, value: actions7d.length };

  // Sequência
  const streakLevel = levelOf(streakDays, [2,3,5,7]);
  badges.streak = { id: 'streak', title: 'Sequência de dias', level: streakLevel, value: streakDays };

  // Gratidões
  const gratLevel = levelOf(Array.isArray(grat) ? grat.length : 0, [1,5,20,50]);
  badges.gratitudes = { id: 'gratitudes', title: 'Gratidões', level: gratLevel, value: Array.isArray(grat) ? grat.length : 0 };

  // Plano semanal (dias marcados)
  const doneCount = asDaysDone(plan);
  const planLevel = levelOf(doneCount, [1,3,5,7]);
  badges.planner = { id: 'planner', title: 'Plano semanal', level: planLevel, value: doneCount };

  // Pontuação geral (percentual)
  const scoreLevel = levelOf(percent, [25,50,75,90]);
  badges.score = { id: 'score', title: 'Pontuação', level: scoreLevel, value: percent };

  // Registros de humor
  const moodCount = Array.isArray(mh) ? mh.length : 0;
  const moodLevel = levelOf(moodCount, [1,7,21,50]);
  badges.mood_logs = { id: 'mood_logs', title: 'Registros de humor', level: moodLevel, value: moodCount };

  return badges;
}

function order(x){ return LEVELS.indexOf(x); }

export function emitBadgesLeveled(detail){
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('m360:badges:leveled', { detail }));
  }
}

export function evaluateAndPersist(){
  const prev = get(keys.badges, {});
  const next = computeState();

  const leveled = [];
  Object.keys(next).forEach((id) => {
    const before = prev?.[id]?.level ?? null;
    const after = next?.[id]?.level ?? null;
    if (after && before && order(after) > order(before)) {
      leveled.push({ id, from: before, to: after, badge: next[id] });
    }
  });

  const changed = JSON.stringify(prev) !== JSON.stringify(next);
  if (changed) set(keys.badges, next);
  if (leveled.length) emitBadgesLeveled({ leveled, badges: next });
  return { next, leveled };
}

export function labelsFromState(state){
  const arr = [];
  const s = state || {};
  Object.keys(s).forEach((id) => {
    const b = s[id];
    if (b && b.level) arr.push({ id, label: `${b.title} • ${b.level}` });
  });
  return arr;
}
