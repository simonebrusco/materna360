"use client";

import React from "react";

export default function InspireModal({ open, onClose = () => {}, onComplete = () => {} }) {
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true">
      <div>
        <h2>Inspiração</h2>
        <p>“Respire fundo. Você é mais forte do que imagina.”</p>
        <button type="button" onClick={() => { onComplete(); onClose(); }}>
          Concluir
        </button>
      </div>
    </div>
  );
}
