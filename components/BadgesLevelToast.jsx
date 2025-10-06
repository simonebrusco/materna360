"use client";
import { useEffect, useRef } from "react";
import { readJSON, writeJSON, onUpdate } from "../lib/storage";
import { showToast } from "../lib/ui/toast";

function getBadges(){
  try {
    const v = readJSON("m360:badges", []);
    return Array.isArray(v) ? v.map(b => ({ id: String(b?.id||""), label: String(b?.label||"") })) : [];
  } catch { return []; }
}

export default function BadgesLevelToast(){
  const ready = useRef(false);

  const check = (silent = false) => {
    const current = getBadges();
    const seen = (() => { try { const v = readJSON("m360:badges:seen", []); return Array.isArray(v) ? v : []; } catch { return []; } })();
    const seenSet = new Set(seen.map(x => String(x)));
    const unseen = current.filter(b => b.id && !seenSet.has(b.id));

    if (!silent && unseen.length > 0) {
      const b = unseen[unseen.length - 1];
      if (b && b.label) showToast(`Conquista desbloqueada: ${b.label} ✨`);
    }

    try { writeJSON("m360:badges:seen", current.map(b => b.id)); } catch {}
  };

  useEffect(() => {
    check(true);
    const off = onUpdate(() => { if (ready.current) check(false); else { check(true); ready.current = true; } });

    function onLeveled(e){
      const list = (e?.detail?.leveled || []).filter(Boolean);
      list.forEach((it) => {
        const title = it?.badge?.title || it?.id || "Conquista";
        const to = it?.to || "";
        if (title && to) showToast(`Novo nível ${to} em ${title} ✨`);
      });
    }

    window.addEventListener('m360:badges:leveled', onLeveled);

    const onVis = () => { if (document.visibilityState === "visible") { if (ready.current) check(false); else { check(true); ready.current = true; } } };
    document.addEventListener("visibilitychange", onVis);
    const t = setTimeout(() => { ready.current = true; }, 300);
    return () => { try { off && off(); } catch {} document.removeEventListener("visibilitychange", onVis); window.removeEventListener('m360:badges:leveled', onLeveled); clearTimeout(t); };
  }, []);

  return null;
}
