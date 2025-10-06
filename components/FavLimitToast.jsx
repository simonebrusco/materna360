'use client';
import { useEffect, useRef, useState } from 'react';

export default function FavLimitToast(){
  const [open, setOpen] = useState(false);
  const tRef = useRef(null);

  useEffect(() => {
    const onLimit = () => {
      setOpen(true);
      if (tRef.current) clearTimeout(tRef.current);
      tRef.current = setTimeout(() => setOpen(false), 2500);
    };
    window.addEventListener('m360:fav:limit', onLimit);
    return () => {
      window.removeEventListener('m360:fav:limit', onLimit);
      if (tRef.current) clearTimeout(tRef.current);
    };
  }, []);

  if (!open) return null;
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-2xl bg-black text-white text-sm shadow-lg">
      Limite diário de favoritos atingido. Desbloqueie no Premium ✨
    </div>
  );
}
