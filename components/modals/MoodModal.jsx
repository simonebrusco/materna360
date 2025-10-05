"use client";

import React, { useMemo, useState } from "react";

const moods = [
  { label: "😢", value: -2 },
  { label: "😕", value: -1 },
  { label: "🙂", value: 0 },
  { label: "😊", value: 1 },
  { label: "🤗", value: 2 },
];

export default function MoodModal({ open, onClose = () => {}, onComplete = () => {} }) {
  const [selected, setSelected] = useState(0);
  const [note, setNote] = useState("");

  const moodValue = useMemo(() => (moods.find(m => m.label && m.value === selected) ? selected : 0), [selected]);

  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true">
      <div>
        <h2>Como você se sente?</h2>
        <div style={{display:"flex", gap:8, margin:"8px 0"}}>
          {moods.map(m => (
            <button key={m.value} type="button" onClick={() => setSelected(m.value)} aria-pressed={selected===m.value}>
              <span role="img" aria-label={`mood-${m.value}`}>{m.label}</span>
            </button>
          ))}
        </div>
        <div style={{marginTop:8}}>
          <label className="small" htmlFor="mood-note">Quer anotar algo?</label>
          <textarea id="mood-note" rows={3} value={note} onChange={e=>setNote(e.target.value)} style={{display:"block",width:"100%",marginTop:6}} />
        </div>
        <div style={{display:"flex", gap:8, marginTop:12}}>
          <button type="button" onClick={onClose}>Fechar</button>
          <button
            type="button"
            onClick={() => {
              const payload = { date: new Date().toISOString(), mood: moodValue, note: note?.trim() ? note.trim() : undefined };
              onComplete(payload);
              onClose();
            }}
          >Salvar</button>
        </div>
      </div>
    </div>
  );
}
