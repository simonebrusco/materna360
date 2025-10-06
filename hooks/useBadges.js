'use client';
import { useEffect, useState } from 'react';
import { get, keys, onUpdate } from '../lib/storage';

export default function useBadges(){
  const [badges, setBadges] = useState(() => get(keys.badges, {}));

  useEffect(() => {
    const off = onUpdate(() => setBadges(get(keys.badges, {})));
    function onLeveled(){ setBadges(get(keys.badges, {})); }
    if (typeof window !== 'undefined') {
      window.addEventListener('m360:badges:leveled', onLeveled);
    }
    return () => {
      off?.();
      if (typeof window !== 'undefined') {
        window.removeEventListener('m360:badges:leveled', onLeveled);
      }
    };
  }, []);

  return badges;
}
