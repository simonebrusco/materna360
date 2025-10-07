'use client';
import { useEffect } from 'react';
import { get, keys, onUpdate } from '../lib/storage';

function daypart(date = new Date()){
  const h = date.getHours();
  if (h < 12) return 'Bom dia';
  if (h < 18) return 'Boa tarde';
  return 'Boa noite';
}

export default function GreetingClient(){
  useEffect(() => {
    const el = typeof document !== 'undefined' ? document.getElementById('greeting-text') : null;
    const apply = () => {
      try {
        const ctx = get(keys.lastCtx, { name: 'Simone' });
        const name = (ctx && typeof ctx === 'object' ? ctx.name : ctx) || 'Simone';
        const part = daypart();
        if (el) el.textContent = `${part}, ${name} 💛`;
      } catch {}
    };
    apply();
    const off = onUpdate((k) => { if (k === keys.lastCtx) apply(); });
    const t = setInterval(apply, 60 * 1000);
    return () => { off?.(); clearInterval(t); };
  }, []);
  return null;
}
