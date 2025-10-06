'use client';
import { useCallback, useState } from 'react';
import { markIdeaDone } from '../lib/ideas-progress';

export default function useIdeaDone({ age, place } = {}) {
  const [last, setLast] = useState(null);
  const done = useCallback((id) => {
    const res = markIdeaDone({ id, age, place });
    setLast({ id, age, place, at: Date.now() });
    return res;
  }, [age, place]);
  return { done, last };
}
