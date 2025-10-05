"use client";

import React from "react";

export default function InspireModal({ open, onClose = () => {}, onComplete = () => {} }) {
  if (!open) return null;
  return (
    <div className="modal-overlay open" role="dialog" aria-modal="true" aria-hidden="false">
      <div className="modal open" role="document">
        <button className="close" aria-label="Fechar" type="button" onClick={onClose}>×</button>
        <h2>Inspiração</h2>
        <div className="body">
          <blockquote className="quote">“Respire fundo. Você é mais forte do que imagina.”</blockquote>
        </div>
        <div className="actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              onComplete();
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
