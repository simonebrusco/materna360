"use client";

import React from "react";

const options = [3,5,10];

export default function PauseModal({ open, onClose = () => {}, onComplete = () => {} }) {
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true">
      <div>
        <h2>Pausa</h2>
        <div style={{display:"flex", gap:8, margin:"8px 0"}}>
          {options.map(min => (
            <button key={min} type="button" onClick={() => { onComplete({ type: "pause", duration: min }); onClose(); }}>
              {min} min
            </button>
          ))}
        </div>
        <button type="button" onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}
