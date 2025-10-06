"use client";
import React from "react";
import { writeJSON, readJSON } from "../../lib/storage";

const PLACES = [
  { key: "home", label: "Casa" },
  { key: "park", label: "Parque" },
  { key: "outdoor", label: "Ar livre" },
];

export default function PlaceChips({ value, onChange }){
  const val = value ?? readJSON("m360:lastPlace", "home");
  function choose(k){ writeJSON("m360:lastPlace", k); onChange && onChange(k); }
  return (
    <div className="chips-row" role="tablist" aria-label="Local">
      {PLACES.map(p => (
        <button key={p.key} onClick={() => choose(p.key)} className={`chip ${val===p.key?"is-active":""}`} aria-pressed={val===p.key}>
          {p.label}
        </button>
      ))}
    </div>
  );
}
