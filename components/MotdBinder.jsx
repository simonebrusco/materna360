'use client';
import { useEffect, useRef } from 'react';
import { onUpdate, get, keys } from '../lib/storage';
import { ensureMessage } from '../lib/messages';

export default function MotdBinder({ nameHint = null }) {
  const timerRef = useRef(null);

  function scheduleNextTick() {
    try { clearTimeout(timerRef.current); } catch {}
    const motd = get(keys.motd, null);
    if (!motd?.nextRefreshAt) return;
    const delta = new Date(motd.nextRefreshAt).getTime() - Date.now();
    if (delta > 0) {
      timerRef.current = setTimeout(() => {
        try { ensureMessage(nameHint); } catch {}
        scheduleNextTick();
      }, delta);
    }
  }

  useEffect(() => {
    try { ensureMessage(nameHint); } catch {}
    scheduleNextTick();

    const off = onUpdate((key) => {
      if (key === 'migration' || key === keys.moodHistory || key === keys.motd) {
        try { ensureMessage(nameHint); } catch {}
        scheduleNextTick();
      }
    });

    return () => { try { off && off(); } catch {}; try { clearTimeout(timerRef.current); } catch {} };
  }, [nameHint]);

  return null;
}
