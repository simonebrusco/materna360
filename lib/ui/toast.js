"use client";

import React, { useEffect, useRef, useState } from "react";

const EVT = "m360:toast";

// Flexible API: showToast("message", { duration }) or showToast({ title, message, duration })
export function showToast(arg = "", opts = {}) {
  if (typeof window === "undefined") return;
  let payload = {};
  if (typeof arg === "string") {
    payload = { message: String(arg || "") };
  } else if (arg && typeof arg === "object") {
    const { title, message, duration } = arg;
    payload = { title: title ? String(title) : undefined, message: String(message || ""), duration };
  }
  const duration = typeof (opts.duration ?? payload.duration) === "number" ? (opts.duration ?? payload.duration) : 4000;
  const detail = { title: payload.title, message: payload.message, duration };
  window.dispatchEvent(new CustomEvent(EVT, { detail }));
}

export function Toaster() {
  const [toasts, setToasts] = useState([]);
  const seq = useRef(0);

  useEffect(() => {
    function onToast(e) {
      const id = `${Date.now().toString(36)}-${(++seq.current).toString(36)}`;
      const t = {
        id,
        title: e?.detail?.title ? String(e.detail.title) : undefined,
        message: e?.detail?.message ? String(e.detail.message) : "",
        duration: typeof e?.detail?.duration === "number" ? e.detail.duration : 4000,
      };
      setToasts((prev) => [...prev, t]);
      const timeout = window.setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), t.duration);
      return () => window.clearTimeout(timeout);
    }
    window.addEventListener(EVT, onToast);
    return () => window.removeEventListener(EVT, onToast);
  }, []);

  return (
    <div className="m360-toast-wrap" aria-live="polite" aria-atomic="true">
      {toasts.map((t) => (
        <div key={t.id} className="m360-toast">
          {t.title ? <div className="m360-toast-title">{t.title}</div> : null}
          <div className="m360-toast-message">{t.message}</div>
        </div>
      ))}
    </div>
  );
}
