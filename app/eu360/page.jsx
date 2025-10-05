"use client";

import Card from "../../components/ui/Card";
import Btn from "../../components/ui/Btn";
import { useEffect, useMemo, useState } from "react";
import { useScore } from "../../hooks/useScore";
import { getActions, getMoodHistory } from "../../lib/storage";

function dateKey(d){ try { return new Date(d).toISOString().slice(0,10);} catch { return ""; } }
function weekKeys(){
  const keys=[]; const now=new Date();
  const day=(now.getDay()+6)%7; // Mon=0..Sun=6
  const monday=new Date(now); monday.setDate(now.getDate()-day);
  for(let i=0;i<7;i++){ const d=new Date(monday); d.setDate(monday.getDate()+i); keys.push(dateKey(d)); }
  return keys;
}

export default function Eu360(){
  const { score } = useScore();
  const [actions,setActions]=useState([]);
  const [moods,setMoods]=useState([]);
  useEffect(()=>{ try{ setActions(getActions()); setMoods(getMoodHistory()); } catch{} },[]);

  const keys = useMemo(()=>weekKeys(),[]);

  const daysWith2plus = useMemo(()=>{
    const counts = new Map();
    for(const a of actions){ const k=dateKey(a?.date); if(!keys.includes(k)) continue; counts.set(k,(counts.get(k)||0)+1); }
    let c=0; for(const v of counts.values()){ if(v>=2) c++; } return c;
  },[actions,keys]);

  const avgMoodLabel = useMemo(()=>{
    const lastPerDay=new Map();
    for(const m of moods){ const k=dateKey(m?.date); if(!keys.includes(k)) continue; lastPerDay.set(k, typeof m.mood==="number"? m.mood:0); }
    const arr=[...lastPerDay.values()];
    const avg = arr.length? arr.reduce((a,b)=>a+b,0)/arr.length : 0;
    if (avg >= 0.5) return "Feliz"; if (avg <= -0.5) return "Triste"; return "Neutro";
  },[moods,keys]);

  const circleValue = typeof score === "number" ? Math.round((score / 100) * 350) : 350;

  return (
    <div className="container">
      <h1 className="h1">Eu360</h1>

      <Card className="card-navy" style={{display:"grid",gridTemplateColumns:"140px 1fr",gap:18,alignItems:"center"}}>
        <div className="ring" style={{"--p":"72%",background:"conic-gradient(#FF3B84 var(--p), rgba(255,255,255,.25) 0)"}}>
          <div>Círculo<br/>{circleValue}</div>
        </div>
        <div>
          <div style={{fontWeight:800,marginBottom:6}}>Você é importante</div>
          <div className="small" style={{opacity:.9}}>Siga no seu ritmo 💛</div>
        </div>
      </Card>

      <div className="space"></div>

      <Card>
        <strong>Humor da semana</strong>
        <div style={{display:"flex",alignItems:"center",gap:10,marginTop:8}}>
          <div className="iconToken">🙂</div>
          <div className="small">{avgMoodLabel}</div>
        </div>
      </Card>

      <div className="space"></div>

      <Card>
        <strong>Conquistas</strong>
        <div className="small" style={{marginTop:8}}>{daysWith2plus>=2? "2 metas alcançadas":"0 metas alcançadas"}</div>
      </Card>

      <div className="space"></div>

      <Card>
        <strong>Gratidão</strong>
        <div className="space"></div>
        <Btn>Registrar</Btn>
      </Card>
    </div>
  );
}
