"use client";
import { useEffect, useRef } from "react";
import { writeJSON, onUpdate } from "../lib/storage";
import { computeAchievements } from "../lib/score";

function computeBadges(){
  // Use existing achievements helper; extendable in the future
  const ach = computeAchievements();
  const now = Date.now();
  // Normalize to a stable structure
  const badges = (Array.isArray(ach) ? ach : []).map(b => ({ id: String(b?.id||""), label: String(b?.label||""), ts: now }));
  return badges;
}

export default function BadgesBinder(){
  const mounted = useRef(false);

  const sync = () => {
    try {
      const badges = computeBadges();
      writeJSON("m360:badges:list", badges);
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
