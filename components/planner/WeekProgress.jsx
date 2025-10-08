"use client";
import { useEffect, useState } from "react";
import Card from "../ui/Card";
import WeekChips from "./WeekChips";
import TipsRotator from "./TipsRotator";
import { getWeeklyPlan, toggleDayDone } from "../../lib/storage";
import { emitEu360Refresh } from "../../lib/clientEvents";

export default function WeekProgress(){
  const [plan, setPlan] = useState(Array(7).fill(false));
  const done = Array.isArray(plan) ? plan.filter(Boolean).length : 0;

  useEffect(()=>{ try{ setPlan(getWeeklyPlan()); }catch{} },[]);

  function onToggle(i){
    try {
      const p = toggleDayDone(i);
      setPlan(p);
      emitEu360Refresh();
    } catch {}
  }

  return (
    <Card>
      <div style={{fontWeight:800,fontSize:18,color:"#0D1B2A", marginBottom:10, display:"flex", alignItems:"center", justifyContent:"space-between", gap:12}}>
        <span>Planner da Família</span>
        <span className="small" style={{opacity:.7}}>{done}/7 concluídos</span>
      </div>
      <WeekChips value={plan} onToggle={onToggle} />
      <TipsRotator
        tips={[
          "Beba água e alongue-se 1 min.",
          "Três respirações profundas.",
          "Envie uma mensagem carinhosa pra você mesma.",
          "Caminhe 2 min e olhe o céu."
        ]}
        key={done}
      />
    </Card>
  );
}
