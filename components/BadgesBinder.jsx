'use client';
import { useEffect } from 'react';
import { onUpdate } from '../lib/storage';
import { evaluateAndPersist } from '../lib/badges';

export default function BadgesBinder() {
  useEffect(() => {
    try { evaluateAndPersist(); } catch {}
    const off = onUpdate(() => {
      try { evaluateAndPersist(); } catch {}
    });
    return () => { try { off && off(); } catch {} };
  }, []);
  return null;
}
