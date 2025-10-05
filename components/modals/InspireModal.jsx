"use client";

import React from "react";

export default function InspireModal({ open, onClose = () => {}, onComplete = () => {} }) {
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true">
      <div>
        <h2>Inspiração</h2>
        <p>Ideias e frases motivacionais. Conteúdo em breve.</p>
        <button type="button" onClick={() => { onComplete(); onClose(); }}>
          Concluir
        </button>
      </div>
    </div>
  );
}
