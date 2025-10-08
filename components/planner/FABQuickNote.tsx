"use client";
import React from "react";

export default function FABQuickNote(){
  const click = () => {
    const today = new Date().toISOString().split("T")[0];
    try {
      window.dispatchEvent(new CustomEvent("m360:planner:newEntry", { detail:{ date: today, scope:"eu", kind:"note", title:"Anotação rápida" } }));
    } catch {}
    try {
      window.dispatchEvent(new CustomEvent("m360:planner:open", { detail:{ tab:"Eu" } }));
    } catch {}
  };
  return (
    <button aria-label="Adicionar anotação" onClick={click} className="fab">＋</button>
  );
}
