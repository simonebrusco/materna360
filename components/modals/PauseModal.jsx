"use client";

import React, { useState } from "react";

export default function PauseModal({ open, onClose = () => {}, onComplete = () => {} }) {
  const [minutes, setMinutes] = useState(3);
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true">
      <div>
        <h2>Pausa</h2>
        <p>Escolha uma pausa rápida:</p>
        <div style={{ display: "flex", gap: 8, margin: "8px 0" }}>
          {[3, 5, 10].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMinutes(m)}
              style={{
                all: "unset",
                cursor: "pointer",
                padding: "8px 10px",
                borderRadius: 8,
                border: minutes === m ? "2px solid currentColor" : "1px solid rgba(0,0,0,.15)",
              }}
            >
              {m} min
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button type="button" onClick={onClose} style={{ padding: "8px 12px" }}>Cancelar</button>
          <button type="button" onClick={() => { onComplete(minutes); onClose(); }} style={{ padding: "8px 12px" }}>Confirmar</button>
        </div>
      </div>
    </div>
  );
}
