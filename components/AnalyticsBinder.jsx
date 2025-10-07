'use client';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackEvent, trackRoute } from '../lib/analytics';

export default function AnalyticsBinder(){
  const pathname = usePathname();
  const search = useSearchParams();

  // Rota (evita função no deps)
  useEffect(() => {
    if (!pathname) return;
    const qs = search ? String(search) : '';
    trackRoute(pathname, { qs });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, search]); // ok: search é um objeto estável do App Router

  useEffect(() => {
    // Guards extras para SSR/hidratação
    if (typeof window === 'undefined') return;

    const onData = (e) => trackEvent('storage:update', { key: e?.detail?.key || '' });
    const onLeveled = (e) => {
      const f = e?.detail?.leveled?.[0];
      if (f) trackEvent('badge:level_up', { id: f.id, from: f.from, to: f.to });
    };
    const onAudioCompleted = (e) => trackEvent('audio:completed', { type: e?.detail?.type, ms: e?.detail?.ms });
    const onDownload = (e) => trackEvent('download:item', e?.detail || {});
    const onDownloadLimit = (e) => trackEvent('download:limit', e?.detail || {});
    const onFav = (e) => trackEvent(`fav:${e?.detail?.op || 'change'}`, { kind: e?.detail?.kind, id: e?.detail?.id });
    const onFavLimit = () => trackEvent('fav:limit', {});
    const onUpgrade = (e) => trackEvent('upgrade:prompt', e?.detail || {});
    const onMotd = () => trackEvent('motd:update', {});

    window.addEventListener('m360:data:updated', onData);
    window.addEventListener('m360:badges:leveled', onLeveled);
    window.addEventListener('m360:audio:completed', onAudioCompleted);
    window.addEventListener('m360:downloads:changed', onDownload);
    window.addEventListener('m360:downloads:limit', onDownloadLimit);
    window.addEventListener('m360:fav:changed', onFav);
    window.addEventListener('m360:fav:limit', onFavLimit);
    window.addEventListener('m360:upgrade:prompt', onUpgrade);
    window.addEventListener('m360:motd:updated', onMotd);

    return () => {
      window.removeEventListener('m360:data:updated', onData);
      window.removeEventListener('m360:badges:leveled', onLeveled);
      window.removeEventListener('m360:audio:completed', onAudioCompleted);
      window.removeEventListener('m360:downloads:changed', onDownload);
      window.removeEventListener('m360:downloads:limit', onDownloadLimit);
      window.removeEventListener('m360:fav:changed', onFav);
      window.removeEventListener('m360:fav:limit', onFavLimit);
      window.removeEventListener('m360:upgrade:prompt', onUpgrade);
      window.removeEventListener('m360:motd:updated', onMotd);
    };
  }, []);

  return null;
}
