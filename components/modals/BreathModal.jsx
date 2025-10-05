"use client";

import React, { useEffect, useMemo, useState } from "react";

const DURATION = 60; // seconds

export default function BreathModal({ open, onClose = () => {}, onComplete = () => {} }) {
  const [status, setStatus] = useState("idle"); // idle | running | paused | completed
  const [timeLeft, setTimeLeft] = useState(DURATION);

  useEffect(() => {
    if (!open) {
      setStatus("idle");
      setTimeLeft(DURATION);
      return;
    }
  }, [open]);

  useEffect(() => {
    if (status !== "running") return;
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(id);
          setStatus("completed");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [status]);

  const minutes = useMemo(() => Math.floor(timeLeft / 60), [timeLeft]);
  const seconds = useMemo(() => String(timeLeft % 60).padStart(2, "0"), [timeLeft]);

  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true">
      <div>
        <h2>Respiração</h2>
        <p>Timer: {minutes}:{seconds}</p>
        {status === "idle" && (
          <button type="button" onClick={() => setStatus("running")}>Começar</button>
        )}
        {status === "running" && (
          <button type="button" onClick={() => setStatus("paused")}>Pausar</button>
        )}
        {status === "paused" && (
          <button type="button" onClick={() => setStatus("running")}>Retomar</button>
        )}
        <button
          type="button"
          onClick={() => {
            onComplete({ type: "breath", duration: DURATION });
            onClose();
          }}
        >
          Concluir
        </button>
      </div>
    </div>
  );
}
