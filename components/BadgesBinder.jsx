"use client";
import { useEffect, useRef } from "react";
import { writeJSON, onUpdate } from "../lib/storage";
import { evaluateAndPersist, labelsFromState } from "../lib/badges";

export default function BadgesBinder(){
  const mounted = useRef(false);

  const sync = () => {
    try {
      const { next } = evaluateAndPersist();
      const labels = labelsFromState(next);
      writeJSON("m360:badges", labels);
    } catch {}
  };

  useEffect(() => {
    sync();
    const off = onUpdate(() => sync());
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
