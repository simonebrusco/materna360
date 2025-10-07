'use client';
import { useEffect, useState } from 'react';
import { get, set, keys } from '../lib/storage';

const MESSAGES = [
  'Você está fazendo o seu melhor. E isso é muito.',
  'Respire. Você é presença, não perfeição.',
  'Amor também é se escolher por um minuto.',
  'Tudo bem desacelerar hoje.',
];

function dayStamp(d = new Date()) {
  const y = d.getFullYear();
  const m = d.getMonth();
  const day = d.getDate();
  return new Date(y, m, day).toISOString().slice(0, 10);
}

export default function useMessageOfDay() {
  const [msg, setMsgState] = useState(MESSAGES[0]);

  useEffect(() => {
    const idxKey = keys.tipsIndex;
    const seenKey = keys.lastSeen;
    const seen = get(seenKey, {}) || {};
    const today = dayStamp();
    let idx = (Number(get(idxKey, 0)) || 0) % MESSAGES.length;

    if (seen.msgDay !== today) {
      idx = (idx + 1) % MESSAGES.length;
      set(idxKey, idx);
      set(seenKey, { ...seen, msgDay: today });
    }

    setMsgState(MESSAGES[idx]);
  }, []);

  return msg;
}
