"use client";

import { useEffect } from "react";

export default function DevErrorSuppressor() {
  useEffect(() => {
    // Suppress noisy FullStory network errors during development by listening to global errors
    function isFullStorySource(txt = ""){
      try{
        const s = String(txt).toLowerCase();
        return s.includes("fullstory") || s.includes("edge.fullstory") || s.includes("fs.js") || s.includes("fs.min.js") || s.includes("fullstory.com");
      }catch{return false}
    }

    function onUnhandledRejection(ev) {
      try {
        const reason = ev && (ev.reason ?? ev.detail ?? null);
        const message = reason && (reason.message || String(reason)) || "";
        const stack = reason && reason.stack ? String(reason.stack) : "";
        const lower = String(message).toLowerCase();
        // Suppress noisy FullStory "Failed to fetch" during dev HMR when it originates from their edge script
        if ((lower.includes("failed to fetch") || lower.includes("networkrequestfailed") || lower.includes("networkerror")) && isFullStorySource(stack + " " + message)) {
          ev.preventDefault && ev.preventDefault();
          ev.stopPropagation && ev.stopPropagation();
          console.debug("Suppressed FullStory fetch error (dev unhandledrejection):", message, stack);
          return;
        }
      } catch (e) {
        // swallow
      }
    }

    function onError(ev) {
      try {
        const msg = ev && ev.message ? String(ev.message) : "";
        const src = ev && ev.filename ? String(ev.filename) : "";
        const lower = msg.toLowerCase();
        if ((lower.includes("failed to fetch") || lower.includes("networkerror")) && isFullStorySource(src + " " + msg)) {
          ev.preventDefault && ev.preventDefault();
          ev.stopPropagation && ev.stopPropagation();
          console.debug("Suppressed FullStory fetch error (dev error event):", msg, src);
          return;
        }
      } catch (e) {
        // swallow
      }
    }

    window.addEventListener("unhandledrejection", onUnhandledRejection);
    window.addEventListener("error", onError);

    return () => {
      try { if (typeof window !== 'undefined' && window.__devErrorSuppressor_restore) { try { window.__devErrorSuppressor_restore(); } catch(e){} window.__devErrorSuppressor_restore = null; } } catch(e){}
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
      window.removeEventListener("error", onError);
    };
  }, []);

  return null;
}
