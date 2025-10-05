"use client";

import React from "react";

export default function InspireModal({ open, onClose = () => {}, onComplete = () => {} }) {
  if (!open) return null;
  return (
    <div className="m360-overlay" role="dialog" aria-modal="true">
      <div className="m360-modal" role="document">
        <h2 className="m360-modal-title">Inspiração</h2>
        <p className="m360-modal-text">“Respire fundo. Você é mais forte do que imagina.”</p>
        <div className="m360-actions">
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
