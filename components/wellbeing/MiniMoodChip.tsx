"use client";
import React from "react";
import { addMood, addAction } from "@/lib/storage";
import { showToast } from "@/lib/ui/toast";
import { emitEu360Refresh } from "@/lib/clientEvents";

const options = [
  { v: 2, e: "😄", label: "feliz" },
  { v: 1, e: "🙂", label: "calma" },
  { v: 0, e: "😐", label: "neutra" },
  { v: -1, e: "🙁", label: "triste" },
  { v: -2, e: "😞", label: "sobrecarregada" },
];

export default function MiniMoodChip(){
  function onPick(v: number){
    try { addMood({ mood: v }); } catch {}
    try { addAction({ type: "moodCheckin", value: v as any }); } catch {}
    try { showToast("Check-in registrado ❤️"); } catch {}
    try { emitEu360Refresh(); } catch {}
  }
  return (
    <div className="mini-mood-chip" role="group" aria-label="Check-in emocional">
      <span className="mini-mood-label">Como você se sente?</span>
      <div className="mini-mood-emojis">
        {options.map(o => (
          <button
            key={o.v}
            type="button"
            className="mini-mood-emoji"
            onClick={() => onPick(o.v)}
            aria-label={`Me sinto ${o.label}`}
          >
            <span role="img" aria-hidden>{o.e}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
