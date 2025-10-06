"use client";
import { useEffect, useState } from "react";
import { getAll, onUpdate } from "../lib/storage";
import { computeScore } from "../lib/score";
import { onEu360Refresh } from "../lib/clientEvents";

export default function Eu360CircleBinder({ children }){
  const [value, setValue] = useState(0);

  const calc = () => {
    try {
      const data = getAll();
      const { score } = computeScore({ moodHistory: data.moodHistory, actions: data.actions });
      setValue(Math.max(0, Math.min(1000, Number(score)||0)));
    } catch {
      // keep previous value
    }
  };

  useEffect(() => {
    calc();
    const offUpdate = onUpdate(() => calc());
    const offEvt = onEu360Refresh(() => calc());
    const onVis = () => { if (document.visibilityState === "visible") calc(); };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      try { offUpdate && offUpdate(); } catch {}
      try { offEvt && offEvt(); } catch {}
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  if (typeof children === "function") return children(value) || null;
  return null;
}
