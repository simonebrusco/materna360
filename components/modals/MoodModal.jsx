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
    <div className="m360-overlay" role="dialog" aria-modal="true">
      <div className="m360-modal" role="document">
        <h2 className="m360-modal-title">Como você está?</h2>

        <div className="m360-emoji-row">
          {options.map((o) => (
            <button
              key={o.v}
              type="button"
              onClick={() => setMood(o.v)}
              className={`m360-emoji${mood === o.v ? " is-selected" : ""}`}
              aria-pressed={mood === o.v}
            >
              <span aria-label={`mood-${o.v}`} role="img">{o.e}</span>
            </button>
          ))}
        </div>

        <div className="m360-field">
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Nota (opcional)"
            className="m360-input"
          />
        </div>

        <div className="m360-actions">
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
