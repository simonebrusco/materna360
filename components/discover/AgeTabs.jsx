"use client";
import React from "react";

const AGES = ["0-2","3-4","5-7","8+"];

export default function AgeTabs({ value = "3-4", onChange = () => {} }){
  return (
    <div className="age-tabs" role="tablist" aria-label="Idade">
      {AGES.map((a)=> (
        <button
          key={a}
          type="button"
          className={`age-tab ${value===a?"is-active":""}`}
          role="tab"
          aria-selected={value===a}
          onClick={()=> onChange(a)}
        >
          {a.replace("-","–")}
        </button>
      ))}
    </div>
  );
}
