'use client';
import { useEffect, useState } from 'react';
import { getMoodToday, setMoodToday } from '../hooks/useMood';
import { showToast } from '../lib/toast';

const EMOJIS = { 1: '😕', 2: '🙂', 3: '😌', 4: '😊', 5: '💛' };

export default function MoodInline(){
  const [val, setVal] = useState(null);

  useEffect(() => {
    try { setVal(getMoodToday()?.value ?? null); } catch {}
  }, []);

  return (
    <div className="mood-inline">
      {[1,2,3,4,5].map((v) => (
        <button
          key={v}
          type="button"
          onClick={() => {
            setMoodToday(v);
            setVal(v);
            showToast({ title: 'Humor salvo', message: 'Obrigada por se ouvir 💛', duration: 2500 });
          }}
          aria-pressed={v === val}
          className={`mood-emoji-btn${v === val ? ' is-active' : ''}`}
        >
          {EMOJIS[v]}
        </button>
      ))}
    </div>
  );
}
