"use client";

import React, { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import CountdownCircle from "../ui/CountdownCircle";

export default function PauseModal({ open, onClose = () => {}, onComplete = () => {} }) {
  const [minutes, setMinutes] = useState(3);
  const [phase, setPhase] = useState("select");

  useEffect(() => {
    if (!open) return;
    setMinutes(3);
    setPhase("select");
  }, [open]);

  if (!open) return null;

  const footerSelect = (
    <>
      <button type="button" className="btn btn-ghost" onClick={onClose}>Cancelar</button>
      <button type="button" className="btn btn-primary" onClick={() => setPhase("countdown")}>Confirmar</button>
    </>
  );

  const seconds = minutes * 60;

  return (
    <Modal
      title="Pausa"
      onClose={onClose}
      footer={phase === "select" ? footerSelect : (
        <button type="button" className="btn btn-primary" onClick={() => { onComplete(minutes); onClose(); }}>Concluir</button>
      )}
    >
      {phase === "select" ? (
        <>
          <p className="m360-modal-text">Escolha uma pausa rápida:</p>
          <div className="m360-chip-row">
            {[3, 5, 10].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMinutes(m)}
                className={`m360-chip${minutes === m ? " is-selected" : ""}`}
                aria-pressed={minutes === m}
              >
                {m} min
              </button>
            ))}
          </div>
        </>
      ) : (
        <CountdownCircle duration={seconds} label={`${seconds}s`} onComplete={() => { onComplete(minutes); onClose(); }} />
      )}
    </Modal>
  );
}
