'use client';
import { useEffect, useState } from 'react';

export default function DownloadsToasts(){
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    const onLimit = () => {
      setMsg('Limite diário de downloads (Free) atingido. Desbloqueie no Premium ✨');
      const t = setTimeout(() => setMsg(null), 2400);
      return () => clearTimeout(t);
    };
    const onUpgrade = () => {
      setMsg('Este conteúdo é Premium. Faça o upgrade para baixar ✨');
      const t = setTimeout(() => setMsg(null), 2400);
      return () => clearTimeout(t);
    };
    window.addEventListener('m360:downloads:limit', onLimit);
    window.addEventListener('m360:upgrade:prompt', onUpgrade);
    return () => {
      window.removeEventListener('m360:downloads:limit', onLimit);
      window.removeEventListener('m360:upgrade:prompt', onUpgrade);
    };
  }, []);

  if (!msg) return null;
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-2xl bg-black text-white text-sm shadow-lg">
      {msg}
    </div>
  );
}
