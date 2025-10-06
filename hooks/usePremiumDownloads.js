'use client';
import { useCallback, useEffect, useState } from 'react';
import { onUpdate, get, keys } from '../lib/storage';
import { listByTier, getItem } from '../lib/premium-catalog';
import { isPremium, canDownloadFree, markDownload } from '../lib/premium';

export default function usePremiumDownloads(){
  const [premium, setPremium] = useState(() => isPremium());
  const [freeList, setFreeList] = useState(() => listByTier('free'));
  const [premList, setPremList] = useState(() => listByTier('premium'));
  const [quota, setQuota] = useState(() => canDownloadFree());
  const [history, setHistory] = useState(() => get(keys.downloads, { items:[], countN:{} }));

  const refresh = useCallback(() => {
    setPremium(isPremium());
    setFreeList(listByTier('free'));
    setPremList(listByTier('premium'));
    setQuota(canDownloadFree());
    setHistory(get(keys.downloads, { items:[], countN:{} }));
  }, []);

  const requestDownload = useCallback((id) => {
    const item = getItem(id);
    if (!item) return { ok:false, reason:'missing' };

    if (item.tier === 'premium' && !isPremium()) {
      if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('m360:upgrade:prompt', { detail: { reason:'premium_content' }}));
      return { ok:false, reason:'premium_required' };
    }

    if (!isPremium() && item.tier === 'free') {
      const q = canDownloadFree();
      if (!q.ok) {
        if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('m360:downloads:limit', { detail: q }));
        return { ok:false, reason:'quota_exceeded', quota:q };
      }
    }

    const dl = markDownload({ id:item.id, title:item.title, url:item.url, type:item.type });
    refresh();
    return { ok:true, item, history: dl };
  }, [refresh]);

  useEffect(() => {
    const off = onUpdate((key) => {
      if (!key || key === keys.premium || key === keys.premiumContent || key === keys.downloads) refresh();
    });
    const onPrem = () => refresh();
    const onDlc = () => refresh();

    window.addEventListener('m360:premium:changed', onPrem);
    window.addEventListener('m360:downloads:changed', onDlc);
    window.addEventListener('m360:downloads:limit', onDlc);

    return () => { off?.(); window.removeEventListener('m360:premium:changed', onPrem); window.removeEventListener('m360:downloads:changed', onDlc); window.removeEventListener('m360:downloads:limit', onDlc); };
  }, [refresh]);

  return { premium, freeList, premList, quota, history, requestDownload, refresh };
}
