"use client";
import { useEffect, useState } from 'react';
import Card from './ui/Card';
import Btn from './ui/Btn';
import { ensureMessage } from '../lib/messages';
import { onUpdate, keys } from '../lib/storage';

export default function MessageOfDayCard({ nameHint = null }) {
  const [motd, setMotd] = useState(null);

  function compute() {
    try { const next = ensureMessage(nameHint); setMotd(next); } catch {}
  }

  useEffect(() => {
    compute();
    const off = onUpdate((key) => {
      if (key === 'migration' || key === keys.moodHistory || key === keys.motd) compute();
    });
    return () => { try { off && off(); } catch {} };
  }, [nameHint]);

  return (
    <Card>
      <strong style={{display:"block",marginBottom:8}}>“Mensagem do dia”</strong>
      <p className="small" style={{margin:"0 0 12px"}}>{motd?.body ?? "..."}</p>
      <Btn onClick={compute}>Nova mensagem</Btn>
    </Card>
  );
}
