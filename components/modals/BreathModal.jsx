"use client";

import React from "react";

export default function BreathModal({ open, onClose = () => {}, onComplete = () => {} }) {
  if (!open) return null;
  return (
    <div className="modal-overlay open" role="dialog" aria-modal="true" aria-hidden="false">
      <div className="modal open" role="document">
        <button className="close" aria-label="Fechar" type="button" onClick={onClose}>×</button>
        <h2>Respiração</h2>
        <div className="body body-center">
          <p>Exercício de respiração de 60s.</p>
        </div>
        <div className="actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              onComplete({ duration: 60 });
              onClose();
            }}
          >
            Concluir
          </button>
        </div>
      </div>
    </div>
  );
}
