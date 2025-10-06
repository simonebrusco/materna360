import { get, set, keys } from './storage';
import { record } from './actions';

// Key opcional para estatísticas locais por idade/lugar
const PROG_KEY = `${keys.lastCtx.replace('lastCtx','ideasProgress')}`; // m360:ideasProgress

export function markIdeaDone({ id, age, place }) {
  // 1) registra ação para selos/score
  record('idea_done', { id, age, place });

  // 2) estatísticas locais (não obrigatórias; úteis p/ UI futura)
  const prog = get(PROG_KEY, {});
  const key = `${age || 'na'}|${place || 'na'}`;
  prog[key] = (prog[key] || 0) + 1;
  set(PROG_KEY, prog);
  return prog;
}
