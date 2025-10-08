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
        if (message && message.toLowerCase().includes("failed to fetch") && stack.toLowerCase().includes("fullstory")) {
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
        if (msg.toLowerCase().includes("failed to fetch") && src.toLowerCase().includes("fullstory")) {
          ev.preventDefault && ev.preventDefault();
          ev.stopPropagation && ev.stopPropagation();
          console.debug("Suppressed FullStory fetch error (dev error event):", msg, src);
        }
      } catch (e) {
        // swallow
      }
    }

    // Also mute repetitive console noise coming from the FullStory script during dev HMR
    const origConsoleError = console.error;
    const origConsoleWarn = console.warn;
    function consoleFilter(fn, args){
      try{
        const joined = args.map(a => (typeof a === 'string' ? a : String(a))).join(' ');
        if (joined.toLowerCase().includes('failed to fetch') && joined.toLowerCase().includes('fullstory')) {
          // swallow
          return;
        }
      }catch(e){}
      fn.apply(console, args);
    }
    console.error = function(...a){ consoleFilter(origConsoleError, a); };
    console.warn = function(...a){ consoleFilter(origConsoleWarn, a); };

    // Wrap window.fetch to catch and gracefully handle FullStory network failures
    const origFetch = typeof window !== 'undefined' ? window.fetch : undefined;
    try{
      if (typeof window !== 'undefined' && typeof origFetch === 'function'){
        window.fetch = function(input, init){
          try{
            const url = typeof input === 'string' ? input : (input && input.url) ? input.url : '';
            if (typeof url === 'string' && url.toLowerCase().includes('fullstory')){
              return origFetch(input, init).catch(err => {
                try{ console.debug('Suppressed FullStory network fetch error (dev):', err); }catch(e){}
                // Return an empty successful Response to avoid unhandled rejections bubbling
                try{ return new Response(null, { status: 204, statusText: 'No Content' }); }catch(e){ return Promise.resolve(undefined); }
              });
            }
          }catch(e){ /* swallow */ }
          return origFetch(input, init);
        };
      }
    }catch(e){}

    window.addEventListener("unhandledrejection", onUnhandledRejection);
    window.addEventListener("error", onError);

    // store restore helper
    try{ window.__devErrorSuppressor_restore = () => { console.error = origConsoleError; console.warn = origConsoleWarn; if (typeof origFetch === 'function') window.fetch = origFetch; }; }catch(e){}

    return () => { try { if (typeof window !== 'undefined' && window.__devErrorSuppressor_restore) { try { window.__devErrorSuppressor_restore(); } catch(e){} window.__devErrorSuppressor_restore = null; } } catch(e){}
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
      window.removeEventListener("error", onError);
    };
  }, []);

  return null;
}
