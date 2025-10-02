"use client";

import { useEffect } from "react";

export default function FetchGuard() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Wrap existing fetch to catch synchronous exceptions thrown by third-party wrappers
    try {
      const originalFetch = window.fetch;
      // Avoid wrapping multiple times
      if (!(originalFetch as any).__isGuarded) {
        const guarded = function (input: RequestInfo | URL, init?: RequestInit) {
          try {
            return originalFetch.call(window, input as any, init);
          } catch (err) {
            // Convert synchronous throw into a rejected Promise to avoid uncaught exceptions
            console?.warn("FetchGuard: caught synchronous fetch error", err);
            return Promise.reject(err);
          }
        } as typeof window.fetch;
        (guarded as any).__isGuarded = true;
        try {
          // Preserve properties
          Object.assign(guarded, originalFetch);
        } catch (e) {
          // ignore if cannot assign
        }
        window.fetch = guarded;
      }
    } catch (e) {
      console?.warn("FetchGuard: could not wrap fetch", e);
    }

    // Global handlers to prevent dev overlay from crashing due to third-party errors
    const onError = (evt: ErrorEvent) => {
      // Ignore specific FullStory network errors
      if (evt?.message && typeof evt.message === "string" && evt.message.includes("Failed to fetch")) {
        evt.preventDefault();
        console?.warn("FetchGuard: suppressed error", evt.message);
      }
    };

    const onRejection = (evt: PromiseRejectionEvent) => {
      const reason = evt?.reason;
      if (reason && typeof reason === "object" && (reason as any).message && typeof (reason as any).message === "string" && (reason as any).message.includes("Failed to fetch")) {
        evt.preventDefault();
        console?.warn("FetchGuard: suppressed unhandled rejection", (reason as any).message);
      }
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);

    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  return null;
}
