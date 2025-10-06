import { getAll, get, set, keys } from './storage';
import { summarizeActions } from './score';

function emitBadgesLeveled(detail){
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('m360:badges:leveled', { detail }));
  }
}

function levelByThresholds(value, thresholds){
  // thresholds: { bronze:number, prata:number, ouro:number, diamante:number }
  if (value >= thresholds.diamante) return 'diamante';
  if (value >= thresholds.ouro) return 'ouro';
  if (value >= thresholds.prata) return 'prata';
  if (value >= thresholds.bronze) return 'bronze';
  return null;
}

function computeState(){
  const { actions = [], gratitudes = [], planner = {} } = getAll();

  // planner days done (supports multiple shapes)
  const daysDone = Array.isArray(planner?.done)
    ? planner.done.length
    : Array.isArray(planner?.days)
      ? planner.days.filter(Boolean).length
      : Array.isArray(planner)
        ? planner.filter(Boolean).length
        : Object.values(planner || {}).filter(d => d && d.done).length;

  const gratCount = Array.isArray(gratitudes) ? gratitudes.length : 0;
  const { streakDays = 0 } = summarizeActions(actions);

  const res = {};

  // Planner badge
  {
    const level = levelByThresholds(daysDone, { bronze: 1, prata: 3, ouro: 5, diamante: 7 });
    res.planner = { id: 'planner', label: 'Plano semanal', value: daysDone, level };
  }
  // Gratitude badge
  {
    const level = levelByThresholds(gratCount, { bronze: 1, prata: 10, ouro: 25, diamante: 50 });
    res.gratitude = { id: 'gratitude', label: 'Gratidões', value: gratCount, level };
  }
  // Streak badge (consecutive active days)
  {
    const level = levelByThresholds(streakDays, { bronze: 2, prata: 5, ouro: 10, diamante: 20 });
    res.streak = { id: 'streak', label: 'Sequência de dias ativos', value: streakDays, level };
  }

  return res;
}

export function evaluateAndPersist() {
  const prev = get(keys.badges, {});
  const next = computeState();
  const leveled = [];
  Object.keys(next).forEach(id => {
    const before = prev?.[id]?.level || null;
    const after  = next?.[id]?.level || null;
    const order = (x) => ['bronze','prata','ouro','diamante'].indexOf(x);
    if (after && before && order(after) > order(before)) {
      leveled.push({ id, from: before, to: after, badge: next[id] });
    }
  });
  set(keys.badges, next);
  if (leveled.length) emitBadgesLeveled({ leveled, badges: next });
  return { next, leveled };
}

export { computeState };
