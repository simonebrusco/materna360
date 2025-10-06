"use client";
import { useEffect, useRef } from "react";
import { onUpdate } from "../lib/storage";
import { evaluateAndPersist } from "../lib/badges";

export default function BadgesBinder(){
  const mounted = useRef(false);

  const sync = () => {
    try {
      evaluateAndPersist();
    } catch {}
  };

  useEffect(() => {
    // Initial sync after mount
    sync();
    // Sync when any m360 storage key changes
    const off = onUpdate(() => sync());
    // Also refresh when tab becomes visible (in case of stale state)
    const onVis = () => { if (document.visibilityState === "visible") sync(); };
    document.addEventListener("visibilitychange", onVis);
    mounted.current = true;
    return () => {
      try { off && off(); } catch {}
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return null;
}
