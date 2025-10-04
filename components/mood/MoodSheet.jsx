'use client';

import { useCallback } from 'react';
import { moods, moodEmoji, setMood } from '../../lib/mood';

export default function MoodSheet({ open, onClose }) {
  const handlePick = useCallback((value) => {
    setMood(new Date(), value);
    if (onClose) onClose();
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="sheet-overlay" role="dialog" aria-modal="true" aria-label="Registrar humor">
      <div className="sheet-panel">
        <div className="sheet-title">Como você se sente?</div>
        <div className="mood-grid">
          {moods.map((m) => (
            <button key={m} className="mood-option" onClick={() => handlePick(m)} aria-label={m}>
              <span className="mood-emoji" aria-hidden>{moodEmoji[m]}</span>
            </button>
          ))}
        </div>
        <button className="btn btn-ghost sheet-close" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}
