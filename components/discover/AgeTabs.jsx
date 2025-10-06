"use client";
import React from "react";
import { writeJSON, readJSON } from "../../lib/storage";

const AGES = ["0-2","3-4","5-7","8+"];

export default function AgeTabs({ value, onChange }){
  const val = value ?? readJSON("m360:lastAge", "3-4");
  function choose(v){ if(AGES.includes(v)){ writeJSON("m360:lastAge", v); onChange && onChange(v); } }
  return (
    <div className="chips-row" role="tablist" aria-label="Idade">
      {AGES.map(a => (
        <button key={a} onClick={() => choose(a)} className={`chip ${val===a?"is-active":""}`} aria-pressed={val===a}>
          {a.replace("-","–")}
        </button>
      ))}
    </div>
  );
}
