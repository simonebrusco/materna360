"use client";

import React, { useEffect, useRef } from "react";
import BaseModal from "./BaseModal";
import CountdownCircle from "../ui/CountdownCircle";
import { showToast } from "../../lib/ui/toast";

export default function BreathModal({ open, onClose = () => {}, onComplete = () => {} }) {
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      onComplete({ duration: 60 });
      onClose();
      showToast("✨ You took a moment to breathe. Keep going at your own pace 💛");
    }, 60000);
    return () => clearTimeout(timeoutRef.current);
  }, [open, onClose, onComplete]);

  if (!open) return null; // BaseModal handles exit, but skip initial render when closed

  return (
    <BaseModal open={open} onClose={() => { onClose(); }}>
      <h2 className="m360-modal-title">Respiração</h2>
      <p className="m360-modal-text">Exercício de respiração de 60s.</p>

      <CountdownCircle duration={60} label="60s" onComplete={() => {}} />

      <div className="m360-actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            clearTimeout(timeoutRef.current);
            onComplete({ duration: 60 });
            onClose();
            showToast("✨ You took a moment to breathe. Keep going at your own pace 💛");
          }}
        >
          Concluir
        </button>
      </div>
    </BaseModal>
  );
}
