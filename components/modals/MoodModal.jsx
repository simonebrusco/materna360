"use client";

import React from "react";

export default function MoodModal({ open, onClose = () => {}, onComplete = () => {} }) {
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true">
      <div>
        <h2>Humor</h2>
        <p>Registre como você está se sentindo. Conteúdo em breve.</p>
        <button type="button" onClick={() => { onComplete(); onClose(); }}>
          Concluir
        </button>
      </div>
    </div>
  );
}
