"use client";

import React, { useEffect, useState } from "react";
import BaseModal from "./BaseModal";

const PHRASES = [
  "Breathe deeply. You’re stronger than you imagine.",
  "Small pauses bring big changes.",
  "You deserve a moment of peace.",
];

function nextIndex() {
  try {
    const { safeGet, safeSet, isBrowser } = require("@/lib/utils/safeStorage");
    if (!isBrowser) return Math.floor(Math.random() * PHRASES.length);
    const key = "m360:inspireIndex";
    const raw = safeGet(key, 0);
    const idx = typeof raw === 'number' ? raw : (parseInt(String(raw), 10) || 0);
    const next = (idx + 1) % PHRASES.length;
    safeSet(key, next);
    return idx;
  } catch {
    return Math.floor(Math.random() * PHRASES.length);
  }
}

export default function InspireModal({ open, onClose = () => {}, onComplete = () => {} }) {
  const [text, setText] = useState(PHRASES[0]);

  useEffect(() => {
    if (open) setText(PHRASES[nextIndex()]);
  }, [open]);

  if (!open) return null;

  return (
    <BaseModal open={open} onClose={onClose}>
      <h2 className="m360-modal-title">Inspiração</h2>
      <p className="m360-modal-text">“{text}”</p>
      <div className="m360-actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            onComplete();
            onClose();
          }}
        >
          Concluir
        </button>
      </div>
    </BaseModal>
  );
}
