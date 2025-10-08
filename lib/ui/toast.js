"use client";

import React, { useEffect, useRef, useState } from "react";

const EVT = "m360:toast";
let lastToastAt = 0;

/**
 * showToast(message, { duration?: number, action?: { label: string, onClick: () => void }, force?: boolean })
 */
export function showToast(message = "", opts = {}) {
  if (typeof window === "undefined") return;
  const now = Date.now();
  const throttleMs = 3000;
  const force = !!opts.force;
  if (!force && now - lastToastAt < throttleMs) return;
  lastToastAt = now;
  const detail = {
    message: String(message || ""),
    duration: typeof opts.duration === "number" ? opts.duration : 3000,
    action: opts.action && typeof opts.action === "object" ? {
      label: String(opts.action.label || ""),
      // callback stored in a closure-safe map via event listener
      __has: true
    } : null
  };
  // store callback on window-scoped map (ephemeral)
  try {
    const map = (window.__m360ToastActions ||= new Map());
    const id = Math.random().toString(36).slice(2);
    if (detail.action && detail.action.__has) {
      map.set(id, typeof opts.action.onClick === "function" ? opts.action.onClick : null);
      detail.action.id = id;
    }
  } catch {}
  window.dispatchEvent(new CustomEvent(EVT, { detail }));
}

export function Toaster() {
  const [toasts, setToasts] = useState([]);
  const timeoutsRef = useRef(new Map());

  useEffect(() => {
    function onToast(e) {
      const id = Math.random().toString(36).slice(2);
      const msg = e?.detail?.message || "";
      const action = e?.detail?.action || null;
      const duration = e?.detail?.duration || 3000;
      const toast = { id, message: msg, duration, action };
      setToasts((prev) => [...prev, toast]);
      const t = setTimeout(() => {
        setToasts((prev) => prev.filter((x) => x.id !== id));
        timeoutsRef.current.delete(id);
      }, duration);
      timeoutsRef.current.set(id, t);
    }
    window.addEventListener(EVT, onToast);
    return () => {
      window.removeEventListener(EVT, onToast);
      timeoutsRef.current.forEach((t) => clearTimeout(t));
      timeoutsRef.current.clear();
    };
  }, []);

  function toastClass(message){
    try{
      const s = String(message||"");
      if (/Mãe Presente|Organizada|concluiu 3 tarefas|registrado com sucesso/i.test(s)) return "m360-toast m360-toast-pulse";
    }catch{}
    return "m360-toast";
  }

  function onActionClick(toast){
    try{
      const map = window.__m360ToastActions;
      const id = toast?.action?.id;
      const cb = map?.get?.(id);
      if (typeof cb === "function") cb();
      map?.delete?.(id);
    }catch{}
    setToasts(prev => prev.filter(x => x.id !== toast.id));
  }

  return (
    <div className="m360-toast-wrap" aria-live="polite" aria-atomic="true">
      {toasts.map((t) => (
        <div key={t.id} className={toastClass(t.message)}>
          <span>{t.message}</span>
          {t.action && t.action.label ? (
            <button className="btn btn-ghost" style={{marginLeft:8}} onClick={()=>onActionClick(t)}>{t.action.label}</button>
          ) : null}
        </div>
      ))}
    </div>
  );
}
