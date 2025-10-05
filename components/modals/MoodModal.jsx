"use client";

import React, { useState } from "react";

export default function MoodModal({ open, onClose = () => {}, onComplete = () => {} }) {
  const [mood, setMood] = useState(0);
  const [note, setNote] = useState("");

  if (!open) return null;

  const options = [
    { v: -2, e: "😞" },
    { v: -1, e: "🙁" },
    { v: 0, e: "😐" },
    { v: 1, e: "🙂" },
    { v: 2, e: "😄" },
  ];

  return (
    <div className="modal-overlay open" role="dialog" aria-modal="true" aria-hidden="false">
      <div className="modal open" role="document">
        <button className="close" aria-label="Fechar" type="button" onClick={onClose}>×</button>
        <h2>Como você está?</h2>

        <div className="emojis">
          {options.map((o) => (
            <button
              key={o.v}
              type="button"
              onClick={() => setMood(o.v)}
              className={`emoji-btn${mood === o.v ? " active" : ""}`}
              aria-pressed={mood === o.v}
            >
              <span aria-label={`mood-${o.v}`} role="img">{o.e}</span>
            </button>
          ))}
        </div>

        <div>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Nota (opcional)"
          />
        </div>

        <div className="actions">
          <button type="button" className="btn btn-ghost" onClick={onClose}>Cancelar</button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              onComplete({ mood, note: note || undefined });
              onClose();
            }}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
