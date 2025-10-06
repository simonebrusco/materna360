'use client';
import { useEffect, useState } from 'react';

function periodOfDay(h = new Date().getHours()) {
  if (h < 12) return 'Bom dia';
  if (h < 18) return 'Boa tarde';
  return 'Boa noite';
}

export default function GreetingBinder({ name, children }) {
  const [greet, setGreet] = useState(periodOfDay());

  useEffect(() => {
    const t = setInterval(() => setGreet(periodOfDay()), 5 * 60 * 1000);
    return () => clearInterval(t);
  }, []);

  return typeof children === 'function' ? children(`${greet}, ${name}`) : null;
}
