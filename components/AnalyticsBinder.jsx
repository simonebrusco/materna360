'use client';
import { useEffect } from 'react';
import { trackEvent, trackRoute } from '../lib/analytics';

// Hook simples para escutar mudanças de rota via History API
function usePathWatcher() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const emit = () => {
      const path = window.location.pathname;
      const qs = window.location.search?.slice(1) || '';
      trackRoute(path, { qs });
    };

    const origPush = history.pushState;
    const origReplace = history.replaceState;
    history.pushState = function (...args) { origPush.apply(this, args); emit(); };
    history.replaceState = function (...args) { origReplace.apply(this, args); emit(); };

    window.addEventListener('popstate', emit);

    emit();

    return () => {
      history.pushState = origPush;
      history.replaceState = origReplace;
      window.removeEventListener('popstate', emit);
    };
  }, []);
}

export default function AnalyticsBinder() {
  usePathWatcher();

  useEffect(() => {
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
