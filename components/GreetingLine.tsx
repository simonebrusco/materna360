"use client";
import * as React from "react";
import { COLORS, FONT_STACK } from "../lib/ui/tokens";

type Props = { name?: string };

function timeOfDay(d=new Date()){
  const h=d.getHours();
  if(h<12) return "Bom dia";
  if(h<18) return "Boa tarde";
  return "Boa noite";
}

export default function GreetingLine({name}:Props){
  const [greeting, setGreeting] = React.useState("");
  React.useEffect(()=>{ setGreeting(timeOfDay()); },[]);
  return (
    <div style={{display:"grid",gap:4,fontFamily:FONT_STACK}}>
      <h2 style={{margin:0,color:COLORS.secondary,fontWeight:600}}>
        {greeting}{name?`, ${name}`:""} 💛
      </h2>
      <span style={{color:COLORS.accent,fontSize:14}}>
        Como você está hoje?
      </span>
    </div>
  );
}
