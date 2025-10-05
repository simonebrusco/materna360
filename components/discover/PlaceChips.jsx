"use client";
import { useEffect } from "react";
import { getLastPlace, setLastPlace } from "../../lib/storage";

const PLACES = ["Home","Park","Outdoor"];

export default function PlaceChips({ value, onChange }){
  useEffect(()=>{
    if (value) return;
    const last = getLastPlace();
    const fallback = "Home";
    const v = PLACES.includes(last) ? last : fallback;
    onChange && onChange(v);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  function choose(p){
    if (!PLACES.includes(p)) return;
    setLastPlace(p);
    onChange && onChange(p);
  }

  return (
    <div className="chips-row" role="tablist" aria-label="Local">
      {PLACES.map(p => (
        <button key={p} className={`chip ${value===p?"is-active":""}`} onClick={()=>choose(p)}>{p}</button>
      ))}
    </div>
  );
}
