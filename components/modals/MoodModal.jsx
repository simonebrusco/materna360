"use client";

import React, { useEffect, useState } from "react";
import Modal from "../ui/Modal";

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
    { v: -2, e: "😔" },
    { v: -1, e: "😟" },
    { v: 0,  e: "😐" },
    { v: 1,  e: "🙂" },
    { v: 2,  e: "😄" },
  ];

  if (!open) return null;

  return (
    <Modal
      title="Como você está?"
      onClose={onClose}
      secondaryLabel="Cancelar"
      onSecondary={onClose}
      primaryLabel="Salvar"
      onPrimary={() => { try { window.localStorage.setItem("reflectionNotes", note || ""); } catch {}; onComplete({ mood, note: note || undefined }); onClose(); }}
    >
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
          placeholder="Nota (opcional)"
          className="m360-input"
          rows={3}
        />
      </div>
    </Modal>
  );
}
