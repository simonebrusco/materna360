"use client";

import React, { useEffect, useState } from "react";
import BaseModal from "./BaseModal";
import { showToast } from "../../lib/ui/toast";
import { record } from "../../lib/actions";

export default function PauseModal({ open, onClose = () => {}, onComplete = () => {} }) {
  const [minutes, setMinutes] = useState(3);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!open) return;
    setMinutes(3);
    setRunning(false);
  }, [open]);

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => {
      try { record('pause', { duration: minutes * 60 }); } catch {}
      onComplete(minutes);
      onClose();
      showToast("☀️ Break complete! Your well-being matters.");
      setRunning(false);
    }, 2000); // placeholder countdown
    return () => clearTimeout(t);
  }, [running, minutes, onClose, onComplete]);

  if (!open) return null;

  return (
    <BaseModal open={open} onClose={() => { if (!running) onClose(); }}>
      <h2 className="m360-modal-title">Pausa</h2>
      <p className="m360-modal-text">Escolha uma pausa rápida:</p>

      <div className="m360-chip-row">
        {[3, 5, 10].map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => !running && setMinutes(m)}
            className={`m360-chip${minutes === m ? " is-selected" : ""}`}
            aria-pressed={minutes === m}
            disabled={running}
          >
            {m} min
          </button>
        ))}
      </div>

      {running && (
        <div className="m360-countdown" aria-live="polite">
          <div className="m360-spinner" />
          <div className="small m360-soft">Contagem regressiva...</div>
        </div>
      )}

      <div className="m360-actions">
        <button type="button" className="btn btn-ghost" disabled={running} onClick={onClose}>Cancelar</button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setRunning(true)}
          disabled={running}
        >
          Confirmar
        </button>
      </div>
    </BaseModal>
  );
}
