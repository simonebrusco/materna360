'use client';
import { useEffect, useState, useCallback } from 'react';
import { onUpdate, get, keys } from '../lib/storage';
import { toggleFavorite, isFavorite, listFavorites, getQuota, isPremium } from '../lib/favorites';

export default function useFavorites(kind='ideas'){
  const [items, setItems] = useState(() => listFavorites(kind));
  const [quota, setQuota] = useState(() => getQuota(kind));
  const [premium, setPremium] = useState(() => isPremium());

  const refresh = useCallback(() => {
    setItems(listFavorites(kind));
    setQuota(getQuota(kind));
    setPremium(isPremium());
  }, [kind]);

  const toggle = useCallback(async (item) => {
    const res = toggleFavorite(kind, item);
    refresh();
    return res;
  }, [kind, refresh]);

  const check = useCallback((id) => isFavorite(kind, id), [kind]);

  useEffect(() => {
    const off = onUpdate((key) => {
      if (!key || key === keys.favorites || key === keys.premium) refresh();
    });
    const onFav = () => refresh();
    const onLimit = () => refresh();
    const onPrem = () => refresh();

    window.addEventListener('m360:fav:changed', onFav);
    window.addEventListener('m360:fav:limit', onLimit);
    window.addEventListener('m360:premium:changed', onPrem);

    return () => {
      off?.();
      window.removeEventListener('m360:fav:changed', onFav);
      window.removeEventListener('m360:fav:limit', onLimit);
      window.removeEventListener('m360:premium:changed', onPrem);
    };
  }, [refresh]);

  return { items, quota, premium, toggle, check, refresh };
}
