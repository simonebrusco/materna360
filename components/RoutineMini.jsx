"use client";

import Card from "./ui/Card";
import useRoutinePlanner from "../hooks/useRoutinePlanner";

const LABEL = { morning: "Manhã", afternoon: "Tarde", evening: "Noite" };

export default function RoutineMini(){
  const { day, data, addTask, toggle, markDay } = useRoutinePlanner();

  return (
    <Card className="planner-card">
      <div className="planner-head">
        <div className="planner-title">Rotina de hoje</div>
        <div className="planner-meta">{day} · {data.done ? "concluído" : "em progresso"}</div>
      </div>

      <div className="m360-actions" style={{justifyContent:'space-between'}}>
        <div className="planner-tip"><span aria-hidden className="planner-dot" /><div className="planner-tip-text">Crie pequenas tarefas para o dia</div></div>
        <button type="button" className="btn btn-ghost" onClick={() => markDay(!data.done)}>
          {data.done ? "Desmarcar dia" : "Marcar dia concluído"}
        </button>
      </div>

      {(["morning","afternoon","evening"]).map((sec) => (
        <section key={sec} aria-labelledby={`sec-${sec}`} className="m360-field">
          <div id={`sec-${sec}`} className="h3" style={{fontSize:16, margin: "8px 0 6px"}}>{LABEL[sec]}</div>
          <input
            className="m360-input"
            placeholder="Nova tarefa..."
            onKeyDown={(e)=>{
              if (e.key === 'Enter') {
                const v = e.currentTarget.value.trim();
                if (v) { addTask(sec, v); e.currentTarget.value = ""; }
              }
            }}
          />
          <ul style={{listStyle:"none", margin: "8px 0 0", padding: 0}}>
            {(data[sec]||[]).map((t)=> (
              <li key={t.id}>
                <label style={{display:"flex", alignItems:"center", gap:8}}>
                  <input type="checkbox" checked={!!t.done} onChange={()=>toggle(sec, t.id)} />
                  <span className={t.done ? "m360-soft" : ""} style={t.done ? {textDecoration:"line-through"} : undefined}>{t.text}</span>
                </label>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </Card>
  );
}
