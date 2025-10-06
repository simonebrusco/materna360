// Materna360 — Messages of the day (scheduled)
import { getAll, get, set, keys } from './storage';

function emitMotdUpdated(detail) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('m360:motd:updated', { detail }));
  }
}

const MESSAGES = [
  'Respire fundo. Você já fez coisas difíceis antes.',
  'Você merece cuidado e gentileza hoje.',
  'Passo a passo também é progresso.',
  'Seu corpo é sábio. Ouça-o com carinho.',
  'Pedir ajuda é força, não fraqueza.',
  'Você está fazendo o melhor que pode neste momento.',
  'Pequenas pausas renovam grandes forças.',
  'Seja doce consigo: tudo tem seu tempo.',
  'Celebrar o pequeno também alimenta a alma.',
  'Confie: você está aprendendo um dia de cada vez.',
  'Hoje, escolha uma coisa que te acolhe.',
  'Você importa. Suas emoções importam.',
  'Cuidar de si é parte do cuidado com quem você ama.',
  'Acolha o cansaço. Ele também passa.',
  'O carinho que você dá também merece voltar para você.',
  'Seu ritmo é único — e isso é perfeito.',
  'Silencie por um minuto e sinta seu coração.',
  'Você é suficiente, exatamente como é agora.',
  'Permita-se recomeçar quantas vezes precisar.',
  'Hoje pode ser mais leve. Um passo de cada vez.',
];

function nextIndex(current){
  const n = Number(current);
  if (!Number.isFinite(n) || n < 0) return 0;
  return (n + 1) % MESSAGES.length;
}

function personalize(text, name){
  const safe = typeof name === 'string' ? name.trim() : '';
  if (!safe) return text;
  return `${safe}, ${text.charAt(0).toLowerCase()}${text.slice(1)}`;
}

function nextMidnight(from){
  const d = new Date(from.getTime());
  d.setHours(24, 0, 0, 0); // start of next day
  return d;
}

function computeMessage(nameHint, now){
  const all = getAll();
  const idx = Number(all?.inspireIndex ?? 0) || 0;
  const body = personalize(MESSAGES[idx % MESSAGES.length], nameHint);
  const createdAt = now.toISOString();
  const nextRefreshAt = nextMidnight(now).toISOString();
  // advance pointer for the next computation
  set(keys.inspireIndex, nextIndex(idx));
  return { id: `motd_${idx}`, body, createdAt, nextRefreshAt };
}

export function ensureMessage(nameHint = null) {
  const motd = get(keys.motd, null);
  const now = new Date();
  const shouldRefresh = !motd || !motd?.nextRefreshAt || (new Date(motd.nextRefreshAt).getTime() <= now.getTime());

  if (shouldRefresh) {
    const next = computeMessage(nameHint, now);
    set(keys.motd, next);
    emitMotdUpdated({ reason: 'refresh', motd: next });
    return next;
  }
  emitMotdUpdated({ reason: 'noop', motd });
  return motd;
}
