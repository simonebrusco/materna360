'use client';
import { useEffect } from 'react';

export default function DevErrorSuppressor() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // --- Preserve originals ---
    const origError = window.console?.error?.bind?.(console) ?? null;
    const origWarn  = window.console?.warn?.(console) ?? null;
    const origFetch = typeof window.fetch === 'function' ? window.fetch.bind(window) : null;

    // Restore helpers for hot-reload cleanup
    const restoreConsole = () => {
      try { if (origError) console.error = origError; } catch (e) {}
      try { if (origWarn)  console.warn  = origWarn;  } catch (e) {}
    };
    const restoreFetch = () => {
      try { if (origFetch) window.fetch = origFetch; } catch (e) {}
    };

    // Expose restore for external debugging / hot reload
    try { window.__devErrorSuppressor_restore = () => { restoreConsole(); restoreFetch(); }; } catch (e) {}

    // --- Console muting for noisy telemetry in dev ---
    try {
      const shouldMute = (args) => {
        try {
          const msg = (args || []).map(String).join(' ');
          return /fullstory|fs\.js|analytics|failed to fetch|network error/i.test(msg);
        } catch { return false; }
      };

      if (origError) {
        console.error = (...args) => {
          if (shouldMute(args)) return;
          origError(...args);
        };
      }
      if (origWarn) {
        console.warn = (...args) => {
          if (shouldMute(args)) return;
          origWarn(...args);
        };
      }
    } catch (e) {
      // swallow
    }

    // --- Safe fetch wrapper: suppress FullStory network failures only ---
    try {
      if (origFetch && process.env.NODE_ENV === 'development') {
        const _orig = origFetch;
        const wrapper = function(resource, ...args) {
          try {
            const url = typeof resource === 'string' ? resource : (resource && resource.url) || '';
            const p = _orig.apply(this, [resource, ...args]);

            if (typeof url === 'string' && /fullstory|fs\.js|edge\.fullstory|fullstory\.com/i.test(url)) {
              return p.catch(err => {
                // keep debug visibility but prevent noisy uncaught propagation
                try { console.debug('DevErrorSuppressor: suppressed FullStory fetch error', err); } catch(e){}
                try { return Promise.resolve(new Response('', { status: 204, statusText: 'FullStory suppressed' })); } catch(e){ return Promise.resolve(null); }
              });
            }

            return p;
          } catch (e) {
            return Promise.reject(e);
          }
        };

        try { window.fetch = wrapper; } catch (e) {}
        try { window.addEventListener('beforeunload', restoreFetch); } catch(e){}
      }
    } catch (e) {
      // swallow
    }

    // --- Additional runtime suppression for uncaught rejection/error events ---
    function onUnhandledRejection(ev) {
      try {
        const reason = ev && (ev.reason ?? ev.detail ?? null);
        const message = reason && (reason.message || String(reason));
        const stack = reason && reason.stack ? String(reason.stack) : '';
        if (message && message.toLowerCase().includes('failed to fetch') && stack && /fullstory/i.test(stack)) {
          ev.preventDefault && ev.preventDefault();
          ev.stopPropagation && ev.stopPropagation();
          try { console.debug('Suppressed FullStory fetch error (unhandledrejection)', reason); } catch(e){}
        }
      } catch (e) {}
    }

    function onError(ev) {
      try {
        const msg = ev && ev.message ? String(ev.message) : '';
        const src = ev && ev.filename ? String(ev.filename) : '';
        if (msg.toLowerCase().includes('failed to fetch') && /fullstory/i.test(src)) {
          ev.preventDefault && ev.preventDefault();
          ev.stopPropagation && ev.stopPropagation();
          try { console.debug('Suppressed FullStory fetch error (error event)', msg, src); } catch(e){}
        }
      } catch (e) {}
    }

    window.addEventListener('unhandledrejection', onUnhandledRejection);
    window.addEventListener('error', onError);

    return () => {
      try { if (window.__devErrorSuppressor_restore) { try { window.__devErrorSuppressor_restore(); } catch(e){} window.__devErrorSuppressor_restore = null; } } catch(e){}
      try { window.removeEventListener('unhandledrejection', onUnhandledRejection); } catch(e){}
      try { window.removeEventListener('error', onError); } catch(e){}
      try { restoreConsole(); } catch(e){}
      try { restoreFetch(); } catch(e){}
    };
  }, []);

  return null;
}
