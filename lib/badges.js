import { getAll, get, set, keys } from './storage';
import { summarizeActions, computeScore } from './score';

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
  const { actions = [], gratitudes = [], planner = {}, moodHistory = [] } = getAll();

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

  const scoreObj = computeScore({ moodHistory, actions });
  const percent = Math.max(0, Math.min(100, Number(scoreObj?.percent ?? Math.round((Number(scoreObj?.score)||0)/10)) || 0));

  const res = {};

  // Planner / Cuidado
  {
    const level = levelByThresholds(daysDone, { bronze: 1, prata: 3, ouro: 5, diamante: 7 });
    const obj = { id: 'cuidado', label: 'Cuidado', progress: daysDone, target: 7, level };
    res.cuidado = obj;
    res.planner = { ...obj, id: 'planner', label: 'Plano semanal' };
  }
  // Gratidão
  {
    const level = levelByThresholds(gratCount, { bronze: 1, prata: 10, ouro: 25, diamante: 50 });
    const obj = { id: 'gratidao', label: 'Gratidão', progress: gratCount, target: 50, level };
    res.gratidao = obj;
    res.gratitude = { ...obj, id: 'gratitude', label: 'Gratidões' };
  }
  // Conexão (streak)
  {
    const level = levelByThresholds(streakDays, { bronze: 2, prata: 5, ouro: 10, diamante: 20 });
    const obj = { id: 'conexao', label: 'Conexão', progress: streakDays, target: 20, level };
    res.conexao = obj;
    res.streak = { ...obj, id: 'streak', label: 'Sequência de dias ativos' };
  }
  // Equilíbrio (score %)
  {
    const level = levelByThresholds(percent, { bronze: 25, prata: 50, ouro: 75, diamante: 90 });
    res.equilibrio = { id: 'equilibrio', label: 'Equilíbrio', progress: percent, target: 100, level };
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
