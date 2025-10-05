"use client";

import React from "react";

export default function BreathModal({ open, onClose = () => {}, onComplete = () => {} }) {
  if (!open) return null;
  return (
    <div className="m360-overlay" role="dialog" aria-modal="true">
      <div className="m360-modal" role="document">
        <h2 className="m360-modal-title">Respiração</h2>
        <p className="m360-modal-text">Exercício de respiração de 60s.</p>
        <div className="m360-actions">
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
