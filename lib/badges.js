import { get, set, getAll, keys } from './storage';

// Configuração dos 4 selos (targets semanais mínimos)
const CONFIG = {
  conexao:    { id: 'conexao',    label: 'Conexão',    target: 3, source: 'descobrir' }, // 3 atividades/semana
  cuidado:    { id: 'cuidado',    label: 'Cuidado',    target: 2, source: 'cuidar'    }, // 2 ações Cuidar
  equilibrio: { id: 'equilibrio', label: 'Equilíbrio', target: 4, source: 'planner'   }, // 4 dias no planner
  gratidao:   { id: 'gratidao',   label: 'Gratidão',   target: 2, source: 'gratidao'  }, // 2 registros
};

const LEVELS = ['bronze','prata','ouro','diamante']; // diamante só se over-achieve

function toLevel(progress, target, allowDiamond = false) {
  if (progress <= 0) return null;
  if (progress < target) return 'bronze';
  if (progress === target) return 'prata';
  if (progress > target)  return allowDiamond ? 'diamante' : 'ouro';
  return 'ouro';
}

function countPlannerDays(planner) {
  if (!planner) return 0;
  if (Array.isArray(planner?.done)) return planner.done.length;
  if (Array.isArray(planner?.days)) return planner.days.filter(Boolean).length;
  if (Array.isArray(planner)) return planner.filter(Boolean).length;
  return Object.values(planner || {}).filter(d => d && d.done).length;
}

// Heurísticas simples de origem (ajustadas aos tipos usados no app)
function isCuidarAction(type)    { return ['breath','pause','reflect','meditate','cheer'].includes(String(type||'').toLowerCase()); }
function isDescobrirAction(type) { return ['inspire','idea_done','play','learn'].includes(String(type||'').toLowerCase()); }

export function computeState() {
  const { actions = [], gratitudes = [], planner = {} } = getAll();

  const qtdCuidar  = (Array.isArray(actions) ? actions : []).filter(a => isCuidarAction(a?.type)).length;
  const qtdDesc    = (Array.isArray(actions) ? actions : []).filter(a => isDescobrirAction(a?.type)).length;
  const qtdPlanner = countPlannerDays(planner);
  const qtdGrat    = Array.isArray(gratitudes) ? gratitudes.length : 0;

  const st = {};

  // Conexão (Descobrir)
  {
    const cfg = CONFIG.conexao;
    const progress = qtdDesc;
    st[cfg.id] = {
      id: cfg.id, label: cfg.label, progress, target: cfg.target,
      level: toLevel(progress, cfg.target, false),
      reward: 'Áudio “Respire com seu filho”'
    };
  }

  // Cuidado (Cuidar)
  {
    const cfg = CONFIG.cuidado;
    const progress = qtdCuidar;
    st[cfg.id] = {
      id: cfg.id, label: cfg.label, progress, target: cfg.target,
      level: toLevel(progress, cfg.target, false),
      reward: 'Áudio “Respiração para recomeçar o dia”'
    };
  }

  // Equilíbrio (Planner)
  {
    const cfg = CONFIG.equilibrio;
    const progress = qtdPlanner;
    st[cfg.id] = {
      id: cfg.id, label: cfg.label, progress, target: cfg.target,
      level: toLevel(progress, cfg.target, false),
      reward: 'Mensagem motivacional IA'
    };
  }

  // Gratidão
  {
    const cfg = CONFIG.gratidao;
    const progress = qtdGrat;
    st[cfg.id] = {
      id: cfg.id, label: cfg.label, progress, target: cfg.target,
      level: toLevel(progress, cfg.target, true), // pode ir a diamante
      reward: 'Áudio “Ser grata muda tudo”'
    };
  }

  return st;
}

// Persiste no storage e devolve se houve “subida de nível”
export function evaluateAndPersist() {
  const prev = get(keys.badges, {});
  const next = computeState();

  const leveled = [];
  Object.keys(next).forEach(id => {
    const before = prev?.[id]?.level || null;
    const after  = next?.[id]?.level || null;
    if (after && before && LEVELS.indexOf(after) > LEVELS.indexOf(before)) {
      leveled.push({ id, from: before, to: after });
    }
  });

  set(keys.badges, next);
  return { next, leveled };
}

export function getBadges() {
  return get(keys.badges, {});
}
