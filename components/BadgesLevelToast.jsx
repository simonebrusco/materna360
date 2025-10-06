'use client';
import { useEffect } from 'react';
import { showToast } from '../lib/ui/toast';

const NAMES = { conexao:'Conexão', cuidado:'Cuidado', equilibrio:'Equilíbrio', gratidao:'Gratidão' };

export default function BadgesLevelToast(){
  useEffect(() => {
    function onLeveled(e){
      try{
        const first = e?.detail?.leveled?.[0];
        if (!first) return;
        const name = NAMES[first.id] || first.id;
        const from = first.from ? String(first.from).toUpperCase() : '';
        const to = first.to ? String(first.to).toUpperCase() : '';
        const msg = `Selo ${name}: ${from} → ${to} 🎉`;
        showToast(msg, { duration: 2500 });
      }catch{}
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('m360:badges:leveled', onLeveled);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('m360:badges:leveled', onLeveled);
      }
    };
  }, []);
  return null;
}
