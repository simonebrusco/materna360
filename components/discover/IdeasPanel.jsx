"use client";
import React, { useEffect, useState } from "react";
import { generateIdeas } from "../../lib/ideas";

export default function IdeasPanel({ age, place }){
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      try { setItems(generateIdeas(age, place, 6)); } catch { setItems([]); }
      setLoading(false);
    }, 120);
    return () => clearTimeout(t);
  }, [age, place]);

  if (loading) {
    return (
      <div className="grid-ideas">
        {Array.from({ length: 6 }).map((_,i)=> (
          <div key={i} className="card idea" style={{opacity:.6}}>
            <div className="card-title" style={{background:"#FFEFF4",height:16,borderRadius:10,width:"60%",marginBottom:8}}/>
            <div className="card-desc" style={{background:"#FFF6F8",height:12,borderRadius:10,width:"90%"}}/>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid-ideas">
      {items.map((t, idx) => (
        <div key={idx} className="card idea">
          <div className="card-title" style={{fontWeight:600}}>{t}</div>
        </div>
      ))}
    </div>
  );
}
