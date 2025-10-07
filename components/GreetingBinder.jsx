'use client';
import { useEffect, useState } from 'react';
import { get, keys, onUpdate } from '../lib/storage';

function daypart(date = new Date()){
  const h = date.getHours();
  if (h < 12) return 'Bom dia';
  if (h < 18) return 'Boa tarde';
  return 'Boa noite';
}

export default function GreetingBinder({ children }) {
  const [name, setName] = useState('Mãe');
  const [part, setPart] = useState(daypart());

  useEffect(() => {
    const read = () => {
      try {
        const ctx = get(keys.lastCtx, { name: 'Mãe' });
        setName((ctx && typeof ctx === 'object' ? ctx.name : ctx) || 'Mãe');
      } catch {
        setName('Mãe');
      }
    };
    read();
    const off = onUpdate((k) => { if (k === keys.lastCtx) read(); });
    const t = setInterval(() => setPart(daypart()), 60 * 1000);
    return () => { off?.(); clearInterval(t); };
  }, []);

  return typeof children === 'function' ? children({ name, part }) : null;
}
