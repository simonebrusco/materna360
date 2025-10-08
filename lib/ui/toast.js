"use client";

import React, { useEffect, useState } from "react";

const EVT = "m360:toast";

export function showToast(message = "", opts = {}) {
  if (typeof window === "undefined") return;
  const detail = { message: String(message || ""), duration: typeof opts.duration === "number" ? opts.duration : 3000 };
  window.dispatchEvent(new CustomEvent(EVT, { detail }));
}

export function Toaster() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    function onToast(e) {
      const id = Math.random().toString(36).slice(2);
      const msg = e?.detail?.message || "";
      const t = { id, message: msg, duration: e?.detail?.duration || 3000 };
      setToasts((prev) => [...prev, t]);
      setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), t.duration);
    }
    window.addEventListener(EVT, onToast);
    return () => window.removeEventListener(EVT, onToast);
  }, []);

  function toastClass(message){
    try{
      const s = String(message||"");
      if (/Mãe Presente|Organizada|concluiu 3 tarefas|Momento com seu filho/i.test(s)) return "m360-toast m360-toast-pulse";
    }catch{}
    return "m360-toast";
  }

  return (
    <div className="m360-toast-wrap" aria-live="polite" aria-atomic="true">
      {toasts.map((t) => (
        <div key={t.id} className={toastClass(t.message)}>
          {t.message}
        </div>
      ))}
    </div>
  );
}
