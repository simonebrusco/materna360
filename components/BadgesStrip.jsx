"use client";
import { useEffect, useState } from "react";
import { readJSON, onUpdate } from "../lib/storage";

export default function BadgesStrip(){
  const [badges, setBadges] = useState([]);

  const load = () => {
    try {
      const v = readJSON("m360:badges", []);
      const arr = Array.isArray(v) ? v : [];
      // Deduplicate by id, keep latest order
      const seen = new Set();
      const uniq = [];
      for (let i=0;i<arr.length;i++){
        const b = arr[i];
        const id = String(b?.id||"");
        if (!id || seen.has(id)) continue;
        seen.add(id);
        uniq.push({ id, label: String(b?.label||"") });
      }
      setBadges(uniq);
    } catch { setBadges([]); }
  };

  useEffect(() => {
    load();
    const off = onUpdate(() => load());
    const onVis = () => { if (document.visibilityState === "visible") load(); };
    document.addEventListener("visibilitychange", onVis);
    return () => { try { off && off(); } catch {} document.removeEventListener("visibilitychange", onVis); };
  }, []);

  if (!badges || badges.length === 0) return null;

  return (
    <div className="m360-scroll-x" aria-label="Conquistas recentes">
      {badges.map(b => (
        <span key={b.id} className="chip subtle" title={b.label}>{b.label}</span>
      ))}
    </div>
  );
}
