'use client';
import { useEffect, useState, useCallback } from 'react';
import { get, keys, onUpdate } from '../lib/storage';
import { ensureMessage } from '../lib/messages';

export default function useMessageOfDay(nameHint = null) {
  const [motd, setMotd] = useState(() => get(keys.motd, null));

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
    const offStorage = onUpdate(() => read());
    function onMotdUpdated() { read(); }
    if (typeof window !== 'undefined') {
      window.addEventListener('m360:motd:updated', onMotdUpdated);
    }
    return () => {
      offStorage?.();
      if (typeof window !== 'undefined') {
        window.removeEventListener('m360:motd:updated', onMotdUpdated);
      }
    };
  }, [refresh, read, motd]);

  return { motd, refresh };
}
