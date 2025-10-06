'use client';
import { useEffect, useState } from 'react';
import * as score from '../lib/score';
import { onUpdate } from '../lib/storage';

export default function Eu360CircleBinder({ children }) {
  const [circle, setCircle] = useState(0);

  useEffect(() => {
    setCircle(typeof score.get === 'function' ? score.get() : 0);
    let t = null;
    const off = onUpdate(() => {
      clearTimeout(t);
      t = setTimeout(() => setCircle(score.get()), 300);
    });
    return () => { off(); clearTimeout(t); };
  }, []);

  return typeof children === 'function' ? children(circle) : null;
}
