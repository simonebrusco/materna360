"use client";

import { useEffect } from "react";

export default function DevErrorSuppressor() {
  useEffect(() => {
    // Suppress noisy FullStory network errors during development by listening to global errors
    function onUnhandledRejection(ev) {
      try {
        const reason = ev && (ev.reason ?? ev.detail ?? null);
        const message = reason && (reason.message || String(reason));
        const stack = reason && reason.stack ? String(reason.stack) : "";
        // Suppress noisy FullStory "Failed to fetch" during dev HMR when it originates from their edge script
        if (message && message.toLowerCase().includes("failed to fetch") && stack.includes("fullstory")) {
          // Prevent the error from surfacing as an uncaught rejection
          ev.preventDefault && ev.preventDefault();
          // Also stop propagation for some browsers
          ev.stopPropagation && ev.stopPropagation();
          // keep a debug-level log for visibility
          console.debug("Suppressed FullStory fetch error (dev):", reason);
        }
      } catch (e) {
        // swallow
      }
    }

    function onError(ev) {
      try {
        const msg = ev && ev.message ? String(ev.message) : "";
        const src = ev && ev.filename ? String(ev.filename) : "";
        if (msg.toLowerCase().includes("failed to fetch") && src.includes("fullstory")) {
          ev.preventDefault && ev.preventDefault();
          ev.stopPropagation && ev.stopPropagation();
          console.debug("Suppressed FullStory fetch error (dev error event):", msg, src);
        }
      } catch (e) {
        // swallow
      }
    }

    window.addEventListener("unhandledrejection", onUnhandledRejection);
    window.addEventListener("error", onError);

    return () => { try { if (typeof window !== 'undefined' && window.__devErrorSuppressor_restore) { try { window.__devErrorSuppressor_restore(); } catch(e){} window.__devErrorSuppressor_restore = null; } } catch(e){}
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
      window.removeEventListener("error", onError);
    };
  }, []);

  return null;
}
