'use client';
import { useEffect, useState } from 'react';

function periodOfDay(h = new Date().getHours()) {
  if (h < 12) return 'Bom dia';
  if (h < 18) return 'Boa tarde';
  return 'Boa noite';
}

export default function GreetingBinder({ name, children }) {
  // Start with a deterministic server-friendly default to avoid
  // server/client text mismatch during hydration.
  const [greet, setGreet] = useState(() => 'Bom dia');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // compute real greeting only on client after mount
    setMounted(true);
    setGreet(periodOfDay());
    const t = setInterval(() => setGreet(periodOfDay()), 5 * 60 * 1000);
    return () => clearInterval(t);
  }, []);

  return typeof children === 'function' ? children(`${greet}, ${name}`) : null;
}
