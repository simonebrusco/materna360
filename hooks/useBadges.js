'use client';
import { useEffect, useState } from 'react';
import { get, keys, onUpdate } from '../lib/storage';

export default function useBadges(){
  const [badges, setBadges] = useState(() => get(keys.badges, {}));

  useEffect(() => {
    const off = onUpdate(() => setBadges(get(keys.badges, {})));
    const onLeveled = () => setBadges(get(keys.badges, {}));
    window.addEventListener('m360:badges:leveled', onLeveled);
    return () => { try { off && off(); } catch {} window.removeEventListener('m360:badges:leveled', onLeveled); };
  }, []);

  return badges;
}
