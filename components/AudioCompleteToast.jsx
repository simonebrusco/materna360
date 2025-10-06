'use client';
import { useEffect, useState } from 'react';

export default function AudioCompleteToast(){
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    const onCompleted = () => {
      setMsg('Áudio concluído! Você se escolheu hoje 💗');
      const t = setTimeout(() => setMsg(null), 2200);
      return () => clearTimeout(t);
    };
    window.addEventListener('m360:audio:completed', onCompleted);
    return () => window.removeEventListener('m360:audio:completed', onCompleted);
  }, []);

  if (!msg) return null;
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-2xl bg-black text-white text-sm shadow-lg">
      {msg}
    </div>
  );
}
