"use client";
import { useEffect } from "react";
import { getLastAge, setLastAge } from "../../lib/storage";

const AGES = ["0-2","3-4","5-7","8+"];

export default function AgeTabs({ value, onChange }){
  useEffect(()=>{
    if (value) return;
    const last = getLastAge();
    const fallback = "3-4";
    const v = AGES.includes(last) ? last : fallback;
    onChange && onChange(v);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  function choose(a){
    if (!AGES.includes(a)) return;
    setLastAge(a);
    onChange && onChange(a);
  }

  return (
    <div className="chips-row" role="tablist" aria-label="Idade">
      {AGES.map(a => (
        <button key={a} className={`chip ${value===a?"is-active":""}`} onClick={()=>choose(a)}>{a.replace("-","–")}</button>
      ))}
    </div>
  );
}
