import { getAll, get, set, keys } from './storage';

function periodOfDay(date = new Date()) {
  const h = date.getHours();
  if (h < 12) return 'morning';
  if (h < 18) return 'afternoon';
  return 'evening';
}

function greeting(name, period) {
  const base = period === 'morning' ? 'Bom dia' :
               period === 'afternoon' ? 'Boa tarde' : 'Boa noite';
  return name ? `${base}, ${name}` : base;
}

function coerceMoodValue(entry) {
  if (entry == null) return null;
  if (typeof entry === 'number') {
    // support 0..4 or 1..5
    const n = Number(entry);
    const v = n >= 0 && n <= 4 ? n + 1 : n; // map 0..4 -> 1..5
    return Math.max(1, Math.min(5, Math.round(v)));
  }
  const raw = typeof entry?.value === 'number' ? entry.value :
              typeof entry?.score === 'number' ? entry.score : null;
  if (raw == null) return null;
  return coerceMoodValue(raw);
}

function latestMoodScore(moodHistory = []) {
  if (!Array.isArray(moodHistory) || moodHistory.length === 0) return null;
  const sorted = [...moodHistory].sort((a,b)=> (Number(b?.ts)||0)-(Number(a?.ts)||0));
  for (const it of sorted) {
    const v = coerceMoodValue(it);
    if (v != null) return v;
  }
  return null;
}

function chooseBodyByMood(mood, period) {
  const byPeriod = {
    morning: [
      'Hoje é um bom dia para começar leve: respire fundo e escolha uma coisa simples para fazer com carinho.',
      'Um passo de cada vez. O seu ritmo é suficiente.',
      'Seu cuidado também conta — inclusive nos dias corridos.'
    ],
    afternoon: [
      'Pausa de 1 minutinho? Seu corpo agradece e a mente acompanha.',
      'Você está fazendo o melhor que pode com o que tem agora.',
      'Pequenas conexões constroem grandes memórias.'
    ],
    evening: [
      'Desacelerar também é produtividade: termine o dia com gentileza.',
      'Celebre um microprogresso de hoje — ele vale muito.',
      'Respire, solte os ombros e reconheça seu esforço.'
    ]
  };
  const pool = byPeriod[period] || byPeriod.morning;

  if (mood == null) return pool[0];
  if (mood <= 2)   return pool[0];
  if (mood === 3)  return pool[1];
  return pool[2];
}

export function computeMessage(nameHint = null, now = new Date()) {
  const { moodHistory = [] } = getAll();
  const m = latestMoodScore(moodHistory);
  const pd = periodOfDay(now);

  const title = greeting(nameHint, pd);
  const body  = chooseBodyByMood(m, pd);

  return {
    title,
    body,
    mood: m,
    period: pd,
    at: now.toISOString(),
    nextRefreshAt: new Date(now.getTime() + 24*60*60*1000).toISOString(),
  };
}

// idempotente: apenas recalcula quando passou 24h ou se não existir
export function ensureMessage(nameHint = null) {
  const motd = get(keys.motd, null);
  const now = new Date();
  const shouldRefresh =
    !motd ||
    !motd?.nextRefreshAt ||
    new Date(motd.nextRefreshAt).getTime() <= now.getTime();

  if (shouldRefresh) {
    const next = computeMessage(nameHint, now);
    set(keys.motd, next);
    return next;
  }
  return motd;
}

export { periodOfDay, greeting, latestMoodScore, chooseBodyByMood };
