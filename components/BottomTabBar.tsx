"use client";
import * as React from "react";
import { COLORS, FONT_STACK } from "../lib/ui/tokens";
import { EASE, DURATION } from "../lib/ui/motion";

const TABS = [
  { key:"today", label:"Hoje",    emoji:"🏠" },
  { key:"acts",  label:"Atividades", emoji:"🎲" },
  { key:"well",  label:"Bem-estar",  emoji:"🌿" },
  { key:"profile",label:"Perfil",     emoji:"👤" },
  { key:"mentor", label:"Mentoria",   emoji:"💬" },
];

export default function BottomTabBar(){
  const [active, setActive] = React.useState("today");
  return (
    <nav style={{
      position:"fixed", left:0, right:0, bottom:0,
      background:"#fff",
      borderTop:`1px solid rgba(47,58,86,0.08)`,
      display:"grid",
      gridTemplateColumns:`repeat(${TABS.length}, 1fr)`,
      padding:"10px 8px",
      fontFamily: FONT_STACK,
      zIndex: 50
    }}>
      {TABS.map(t => {
        const is = t.key===active;
        return (
          <button key={t.key} onClick={()=>setActive(t.key)} style={{
            background:"transparent", border:0, cursor:"pointer",
            color: is ? COLORS.primary : COLORS.secondary,
            display:"grid", justifyItems:"center", gap:4,
            transition:`color ${DURATION} ${EASE}`
          }}>
            <span style={{fontSize:18}}>{t.emoji}</span>
            <span style={{fontSize:12, fontWeight:is?700:500}}>{t.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
