"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import inspirations from "../../lib/inspirations";

function todayKey() {
  try { return new Date().toISOString().slice(0,10); } catch { return ""; }
}

export default function InspireModal({ open, onClose = () => {}, onComplete = () => {} }) {
  const [index, setIndex] = useState(()=>Math.floor(Math.random()*inspirations.length));
  const [favorite, setFavorite] = useState(false);
  const firstOpenTodayRef = useRef(false);

  useEffect(() => {
    if (!open) return;
    setFavorite(false);
    if (typeof window !== "undefined"){
      const k = todayKey();
      const last = window.localStorage?.getItem("m360:inspire_logged_day") || "";
      firstOpenTodayRef.current = last !== k;
    }
  }, [open]);

  const phrase = useMemo(() => inspirations[index] || "", [index]);

  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true">
      <div>
        <h2>Inspiração</h2>
        <p style={{margin:"8px 0"}}>{phrase}</p>
        <div style={{display:"flex", gap:8}}>
          <button type="button" onClick={() => setFavorite(v=>!v)} aria-pressed={favorite}>Salvar nos favoritos</button>
          <button type="button" onClick={() => setIndex((i)=> (i+1) % inspirations.length)}>Gerar outra</button>
        </div>
        <div style={{marginTop:12}}>
          <button
            type="button"
            onClick={() => {
              if (firstOpenTodayRef.current) {
                onComplete();
                try { window.localStorage?.setItem("m360:inspire_logged_day", todayKey()); } catch {}
              }
              onClose();
            }}
          >Fechar</button>
        </div>
      </div>
    </div>
  );
}
