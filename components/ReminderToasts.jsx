'use client';
import { useEffect } from 'react';
import { showToast } from '../lib/toast';

export default function ReminderToasts(){
  useEffect(() => {
    function onRem(e){
      const type = e?.detail?.type;
      if (type === 'breathe') {
        showToast({ title: 'Respirar', message: 'Faça 1 minuto de respiração guiada 💛', duration: 5000 });
      } else if (type === 'gratitude') {
        showToast({ title: 'Gratidão', message: 'Registre 1 gratidão do dia ✨', duration: 5000 });
      }
    }
    window.addEventListener('m360:reminder', onRem);
    return () => window.removeEventListener('m360:reminder', onRem);
  }, []);
  return null;
}
