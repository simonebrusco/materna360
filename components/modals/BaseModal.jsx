"use client";

import React, { useEffect, useRef, useState } from "react";

export default function BaseModal({ open, onClose = () => {}, children }) {
  const [visible, setVisible] = useState(open);
  const [closing, setClosing] = useState(false);
  const closeTimer = useRef(null);

  useEffect(() => {
    if (open) {
      setVisible(true);
      setClosing(false);
    } else if (visible) {
      setClosing(true);
      clearTimeout(closeTimer.current);
      closeTimer.current = setTimeout(() => {
        setVisible(false);
        setClosing(false);
      }, 220);
    }
    return () => clearTimeout(closeTimer.current);
  }, [open, visible]);

  if (!visible) return null;

  return (
    <div
      className={`m360-overlay${closing ? " is-closing" : ""}`}
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={`m360-modal${closing ? " is-closing" : ""}`} role="document">
        {children}
      </div>
    </div>
  );
}
