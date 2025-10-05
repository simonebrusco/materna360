"use client";

import React, { useEffect, useMemo, useRef } from "react";
import BaseModal from "./BaseModal";
import { showToast } from "../../lib/ui/toast";

export default function BreathModal({ open, onClose = () => {}, onComplete = () => {} }) {
  const timeoutRef = useRef(null);
  const C = 140; // circle size
  const R = 64; // radius
  const circumference = useMemo(() => 2 * Math.PI * R, [R]);

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

      <div className="m360-breath-wrap">
        <svg className="m360-breath-svg" viewBox={`0 0 ${C} ${C}`} aria-hidden="true">
          <circle className="m360-breath-track" cx={C/2} cy={C/2} r={R} />
          <circle
            className="m360-breath-progress"
            cx={C/2}
            cy={C/2}
            r={R}
            style={{ strokeDasharray: circumference, strokeDashoffset: "var(--circ)", "--circ": circumference }}
          />
        </svg>
        <div className="m360-breath-label">60s</div>
      </div>

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
