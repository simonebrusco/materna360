"use client";
import React from "react";

const PLACES = [
  { v: 'Casa', label: 'Casa', icon: '🏠' },
  { v: 'Parque', label: 'Parque', icon: '🌳' },
  { v: 'Ar livre', label: 'Ar livre', icon: '☀️' }
];

export default function PlaceChips({ value = 'Casa', onChange = () => {} }){
  return (
    <div className="m360-chip-row" role="tablist" aria-label="Local">
      {PLACES.map(p => {
        const active = value === p.v;
        return (
          <button
            key={p.v}
            type="button"
            className={`m360-chip${active?" is-selected":""}`}
            role="tab"
            aria-selected={active}
            onClick={()=> onChange(p.v)}
            title={p.label}
          >
            <span aria-hidden style={{marginRight:6}}>{p.icon}</span>{p.label}
          </button>
        );
      })}
    </div>
  );
}
