"use client";

import React, { useState } from "react";

export default function PauseModal({ open, onClose = () => {}, onComplete = () => {} }) {
  const [minutes, setMinutes] = useState(3);
  if (!open) return null;
  return (
    <div className="m360-overlay" role="dialog" aria-modal="true">
      <div className="m360-modal" role="document">
        <h2 className="m360-modal-title">Pausa</h2>
        <p className="m360-modal-text">Escolha uma pausa rápida:</p>
        <div className="m360-chip-row">
          {[3, 5, 10].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMinutes(m)}
              className={`m360-chip${minutes === m ? " is-selected" : ""}`}
              aria-pressed={minutes === m}
            >
              {m} min
            </button>
          ))}
        </div>
        <div className="m360-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose}>Cancelar</button>
          <button type="button" className="btn btn-primary" onClick={() => { onComplete(minutes); onClose(); }}>Confirmar</button>
        </div>
      </div>
    </div>
  );
}
