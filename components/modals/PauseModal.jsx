"use client";

import React, { useState } from "react";

export default function PauseModal({ open, onClose = () => {}, onComplete = () => {} }) {
  const [minutes, setMinutes] = useState(3);
  if (!open) return null;
  return (
    <div className="modal-overlay open" role="dialog" aria-modal="true" aria-hidden="false">
      <div className="modal open" role="document">
        <button className="close" aria-label="Fechar" type="button" onClick={onClose}>×</button>
        <h2>Pausa</h2>
        <p className="body">Escolha uma pausa rápida:</p>
        <div className="chips">
          {[3, 5, 10].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMinutes(m)}
              className={`btn btn-subtle${minutes === m ? " active" : ""}`}
              aria-pressed={minutes === m}
            >
              {m} min
            </button>
          ))}
        </div>
        <div className="actions">
          <button type="button" className="btn btn-ghost" onClick={onClose}>Cancelar</button>
          <button type="button" className="btn btn-primary" onClick={() => { onComplete(minutes); onClose(); }}>Confirmar</button>
        </div>
      </div>
    </div>
  );
}
