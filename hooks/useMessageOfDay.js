'use client';
import { useEffect, useState, useCallback } from 'react';
import { get, keys, onUpdate } from '../lib/storage';
import { ensureMessage } from '../lib/messages';

export default function useMessageOfDay(nameHint = null) {
  // SSR-safe: start as null to avoid reading storage on first render
  const [motd, setMotd] = useState(null);

  const read = useCallback(() => {
    const v = get(keys.motd, null);
    setMotd(v);
    return v;
  }, []);

  const refresh = useCallback(() => {
    const v = ensureMessage(nameHint);
    setMotd(v);
    return v;
  }, [nameHint]);

  useEffect(() => {
    if (!motd) refresh();
    const off = onUpdate(() => read());
    const onMotd = () => read();
    if (typeof window !== 'undefined') {
      window.addEventListener('m360:motd:updated', onMotd);
    }
    return () => {
      off?.();
      if (typeof window !== 'undefined') {
        window.removeEventListener('m360:motd:updated', onMotd);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, read]);

  return { motd, refresh };
}
