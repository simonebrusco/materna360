import { get, set, keys } from './storage';
import { record } from './actions';

// Mapeia tipo → ação (para selos/score)
const ACTION_BY_TYPE = {
  meditate: 'meditate', // Cuidar
  cheer: 'cheer',       // Cuidar
};

function now() { return Date.now(); }

function getStats() { return get(keys.audioStats, {}); }
function setStats(s) { set(keys.audioStats, s); return s; }

/**
 * startAudio({ id, type, title, durationSec })
 * - marca início e registra "play" (não conta para selos/score)
 * - armazena carimbo de início para calcular duração real
 */
export function startAudio({ id, type = 'meditate', title = '', durationSec = 0 }) {
  if (!id) id = `${type}-${now()}`;
  const stats = getStats();
  stats[id] = {
    ...(stats[id] || {}),
    id, type, title, durationSec,
    startedAt: now(),
    completed: false,
    lastPlayedAt: now(),
    totalMs: stats[id]?.totalMs || 0,
    sessions: (stats[id]?.sessions || 0) + 1,
  };
  setStats(stats);
  // evento analítico leve (opcional), não conta para selos
  return { id, type };
}

/**
 * completeAudio({ id, type })
 * - calcula tempo efetivo (entre start e complete)
 * - registra ação para selos/score (record('meditate'|'cheer', { ms }))
 */
export function completeAudio({ id, type = 'meditate' }) {
  if (!id) return null;
  const stats = getStats();
  const s = stats[id];
  if (!s?.startedAt) return null;

  const elapsed = Math.max(0, now() - s.startedAt);
  s.totalMs = (s.totalMs || 0) + elapsed;
  s.completed = true;
  s.completedAt = now();
  delete s.startedAt;

  stats[id] = s;
  setStats(stats);

  const action = ACTION_BY_TYPE[type] || 'meditate';
  record(action, { id, ms: elapsed, title: s.title || '', durationSec: s.durationSec || 0 });

  // evento para microinterações (toast opcional)
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('m360:audio:completed', { detail: { id, type, ms: elapsed } }));
  }
  return { id, ms: elapsed };
}

/**
 * failOrStopAudio({ id, type })
 * - se quiser encerrar sem completar (não registra ação de selo)
 */
export function failOrStopAudio({ id, type = 'meditate' }) {
  const stats = getStats();
  if (stats[id]?.startedAt) delete stats[id].startedAt;
  setStats(stats);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('m360:audio:stopped', { detail: { id, type } }));
  }
}

/**
 * helpers de leitura
 */
export function getAudioStats() { return get(keys.audioStats, {}); }
