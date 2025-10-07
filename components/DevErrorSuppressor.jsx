"use client";

import { useEffect } from "react";

export default function DevErrorSuppressor() {
  useEffect(() => {
    // In dev, wrap window.fetch to suppress FullStory network errors that cause noisy overlays
    if (typeof window !== 'undefined' && typeof window.fetch === 'function' && process.env.NODE_ENV === 'development') {
      try {
        const _origFetch = window.fetch;
        const _restoreListener = () => { try { window.fetch = _origFetch; } catch (e) {} };
        window.fetch = function(resource, ...args) {
          try {
            const url = typeof resource === 'string' ? resource : (resource && resource.url) || '';
            const p = _origFetch.apply(this, [resource, ...args]);
            if (typeof url === 'string' && url.includes('fullstory')) {
              return p.catch(err => {
                console.debug('DevErrorSuppressor: suppressed FullStory fetch error', err);
                try { return Promise.resolve(new Response('', { status: 204, statusText: 'FullStory suppressed' })); } catch(e){ return Promise.resolve(null); }
              });
            }
            return p;
          } catch(e){ return Promise.reject(e); }
        };
        window.addEventListener('beforeunload', _restoreListener);
        // expose cleanup for effect return
        try { window.__devErrorSuppressor_restore = _restoreListener; } catch(e){}
      } catch(e) { /* swallow */ }
    }
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
