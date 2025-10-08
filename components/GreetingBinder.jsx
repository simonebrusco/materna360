'use client';
import { useEffect, useState } from 'react';
import { get, keys, onUpdate } from '../lib/storage';
import { getGreeting } from '../lib/utils/greeting';

export default function GreetingBinder({ children }) {
  const [name, setName] = useState('');
  const [part, setPart] = useState('Olá');
  const [firstName, setFirstName] = useState('Mãe');

  useEffect(() => {
    const read = () => {
      try {
        const ctx = get(keys.lastCtx, { name: 'Mãe' });
        const resolved = (ctx && typeof ctx === 'object' ? ctx.name : ctx) || 'Mãe';
        setName(resolved);
        const fn = String(resolved).trim().split(/\s+/)[0] || 'Mãe';
        setFirstName(fn);
      } catch {
        setName('Mãe');
        setFirstName('Mãe');
      }
    };
    read();
    setPart(getGreeting());
    const off = onUpdate((k) => { if (k === keys.lastCtx) read(); });
    const t = setInterval(() => setPart(getGreeting()), 60 * 1000);
    return () => { off?.(); clearInterval(t); };
  }, []);

  const greet = `${part}, ${firstName} 💛`;
  return typeof children === 'function' ? children({ name, part, firstName, greet }) : null;
}
