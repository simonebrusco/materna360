"use client";

import React from "react";

export default function BreathModal({ open, onClose = () => {}, onComplete = () => {} }) {
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true">
      <div>
        <h2>Respiração</h2>
        <p>Exercício de respiração. Conteúdo em breve.</p>
        <button type="button" onClick={() => { onComplete(); onClose(); }}>
          Concluir
        </button>
      </div>
    </div>
  );
}
