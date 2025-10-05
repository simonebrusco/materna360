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
    <div role="dialog" aria-modal="true">
      <div>
        <h2>Como você está?</h2>
        <div style={{ display: "flex", gap: 8, margin: "8px 0" }}>
          {options.map((o) => (
            <button
              key={o.v}
              type="button"
              onClick={() => setMood(o.v)}
              style={{
                all: "unset",
                cursor: "pointer",
                padding: "8px 10px",
                borderRadius: 8,
                border: mood === o.v ? "2px solid currentColor" : "1px solid rgba(0,0,0,.15)",
              }}
            >
              <span aria-label={`mood-${o.v}`} role="img">{o.e}</span>
            </button>
          ))}
        </div>
        <div style={{ margin: "8px 0" }}>
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Nota (opcional)"
            style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid rgba(0,0,0,.15)" }}
          />
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button type="button" onClick={onClose} style={{ padding: "8px 12px" }}>Cancelar</button>
          <button
            type="button"
            onClick={() => { onComplete({ mood, note: note || undefined }); onClose(); }}
            style={{ padding: "8px 12px" }}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
