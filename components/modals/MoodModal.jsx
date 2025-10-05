"use client";

import React, { useEffect, useState } from "react";
import BaseModal from "./BaseModal";

export default function MoodModal({ open, onClose = () => {}, onComplete = () => {} }) {
  const [mood, setMood] = useState(0);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!open) return;
    try {
      const prev = typeof window !== "undefined" ? window.localStorage.getItem("reflectionNotes") : null;
      if (prev) setNote(prev);
    } catch {}
  }, [open]);

  const options = [
    { v: -2, e: "😞" },
    { v: -1, e: "🙁" },
    { v: 0, e: "😐" },
    { v: 1, e: "🙂" },
    { v: 2, e: "😄" },
  ];

  if (!open) return null;

  return (
    <BaseModal open={open} onClose={onClose}>
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
        <textarea
          value={note}
          onChange={(e) => {
            const v = e.target.value;
            setNote(v);
            try { window.localStorage.setItem("reflectionNotes", v); } catch {}
          }}
          placeholder="Escreva como você se sente (opcional)"
          className="m360-input"
          rows={3}
        />
      </div>

      <div className="m360-actions">
        <button type="button" className="btn btn-ghost" onClick={onClose}>Cancelar</button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            try { window.localStorage.setItem("reflectionNotes", note || ""); } catch {}
            onComplete({ mood, note: note || undefined });
            onClose();
          }}
        >
          Salvar
        </button>
      </div>
    </BaseModal>
  );
}
