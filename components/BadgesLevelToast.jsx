"use client";
import { useEffect, useRef, useState } from "react";

const NAME = {
  conexao: "Conexão",
  cuidado: "Cuidado",
  equilibrio: "Equilíbrio",
  gratidao: "Gratidão",
  // engine ids
  actions_week: "Conexão",
  streak: "Conexão",
  planner: "Cuidado",
  score: "Equilíbrio",
  gratitudes: "Gratidão",
};

export default function BadgesLevelToast(){
  const [msg, setMsg] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    function onLeveled(e){
      const first = e?.detail?.leveled?.[0];
      if (!first) return;
      const name = NAME[first.id] || first?.badge?.title || first.id;
      const from = String(first?.from || "").toUpperCase();
      const to = String(first?.to || "").toUpperCase();
      setMsg(`Selo ${name}: ${from} → ${to} 🎉`);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setMsg(null), 2400);
    }
    window.addEventListener('m360:badges:leveled', onLeveled);
    return () => {
      window.removeEventListener('m360:badges:leveled', onLeveled);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (!msg) return null;
  return (
    <div className="m360-toast-wrap" role="status" aria-live="polite" aria-atomic="true">
      <div className="m360-toast">{msg}</div>
    </div>
  );
}
