import { useEffect, useState } from "react";
import { perguntasReflexivas } from "@/lib/perguntasReflexivas";
import { safeGet, safeSet } from "@/lib/utils/safeStorage";

export default function MessageOfDayCard({ className = "", message }) {
  const [text, setText] = useState("");

  useEffect(() => {
    // SSR-safe: only run on client
    const KEY = "m360:perguntaDia";
    const KEY_TS = "m360:perguntaDia:lastChange";
    const DAY_MS = 86_400_000;
    try {
      const now = Date.now();
      const last = Number(safeGet(KEY_TS, 0)) || 0;
      const stored = String(safeGet(KEY, "") || "").trim();
      const provided = typeof message === "string" ? String(message).trim() : "";

      // If a message prop is provided, prefer it (still store to keep rotation consistent)
      if (provided) {
        setText(provided);
        try { safeSet(KEY, provided); safeSet(KEY_TS, now); } catch {}
        return;
      }

      if (stored && now - last < DAY_MS) {
        setText(stored);
        return;
      }

      const idxFromStored = perguntasReflexivas.indexOf(stored);
      const nextIdx = idxFromStored >= 0
        ? (idxFromStored + 1) % perguntasReflexivas.length
        : Math.abs(Math.floor(now / DAY_MS)) % perguntasReflexivas.length;
      const pick = perguntasReflexivas[nextIdx] || perguntasReflexivas[0] || "";
      setText(pick);
      try { safeSet(KEY, pick); safeSet(KEY_TS, now); } catch {}
    } catch {
      setText("");
    }
  }, [message]);

  // Render only the italic phrase with decorative quote icon
  return (
    <p className={`small motd-text ${className}`.trim()} aria-live="polite">
      <span className="motd-quote" aria-hidden>“</span>
      <i>{text}</i>
    </p>
  );
}
