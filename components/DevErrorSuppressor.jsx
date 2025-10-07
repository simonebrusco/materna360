'use client';
import { useEffect } from 'react';

export default function DevErrorSuppressor() {
  useEffect(() => {
    // roda somente no browser
    // Evita barulho de "Failed to fetch" do FullStory/telemetria em dev
    const origError = window.console?.error?.bind?.(console) ?? null;
    const origWarn  = window.console?.warn?.bind?.(console) ?? null;

    try {
      // filtro simples: abafa fetch falhando para domínios de analytics/telemetria
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
    } catch {
      // não faz nada — é só um silenciador em dev
    }

    return () => {
      // restaura (por segurança em hot reload)
      if (origError) console.error = origError;
      if (origWarn)  console.warn  = origWarn;
    };
  }, []);

  return null;
}
