"use client";
import React, { useEffect, useState } from "react";
import Card from "../ui/Card";
import Btn from "../ui/Btn";
import { generateIdeas } from "../../lib/ideas";

export default function IdeasPanel({ age, place }){
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  async function load(){
    setLoading(true);
    try { const ideas = await generateIdeas(age, place); setList(Array.isArray(ideas)?ideas:[]); } finally { setLoading(false); }
  }

  useEffect(()=>{ load(); }, [age, place]);

  return (
    <Card>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:10,marginBottom:10}}>
        <div className="h3" style={{margin:0}}>Ideias para {age} no {place}</div>
        <Btn onClick={()=>{ if (!list.length) load(); }}>Ver sugestões</Btn>
      </div>
      {loading ? (
        <div style={{display:"grid",gap:10}}>
          {[0,1,2].map(i=> (
            <div key={i} style={{height:48, borderRadius:14, background:"linear-gradient(90deg, #ffffff 0%, #FFEFF4 50%, #ffffff 100%)", backgroundSize:"200% 100%", animation:"m360-shimmer 1.2s linear infinite"}} />
          ))}
        </div>
      ) : (
        <div style={{display:"grid",gap:10}}>
          {list.map((txt, idx)=> (
            <div key={idx} className="card" style={{padding:14, display:"flex", alignItems:"center", gap:10}}>
              <div aria-hidden style={{width:6,height:28,borderRadius:6,background:"#FF005E"}} />
              <div style={{fontWeight:700, color:"#0D1B2A"}}>{txt}</div>
            </div>
          ))}
        </div>
      )}
      <style jsx>{`
        @keyframes m360-shimmer { 0% { background-position: 0 0 } 100% { background-position: -200% 0 } }
      `}</style>
    </Card>
  );
}
