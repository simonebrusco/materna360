"use client";
import useBadges from "../hooks/useBadges";

const LABEL = { conexao: "Conexão", cuidado: "Cuidado", equilibrio: "Equilíbrio", gratidao: "Gratidão" };

function deriveProgress(b, thresholds){
  const value = Math.max(0, Number(b?.value || b?.progress || 0));
  const t = Array.isArray(thresholds) ? thresholds.slice().sort((a,b)=>a-b) : [1];
  let target = t[t.length - 1];
  for (let i=0;i<t.length;i++){ if (value < t[i]) { target = t[i]; break; } }
  const pct = Math.min(100, Math.round((value / (target || 1)) * 100));
  const level = b?.level || null;
  return { value, target, pct, level };
}

export default function BadgesStrip(){
  const badges = useBadges() || {};

  const map = {
    conexao: deriveProgress(badges.streak || badges.actions_week, [2,3,5,7]),
    cuidado: deriveProgress(badges.planner, [1,3,5,7]),
    equilibrio: deriveProgress(badges.score, [25,50,75,90]),
    gratidao: deriveProgress(badges.gratitudes, [1,5,20,50]),
  };

  const ids = ["conexao","cuidado","equilibrio","gratidao"];

  return (
    <div className="grid-2">
      {ids.map((id) => {
        const d = map[id] || { value: 0, target: 1, pct: 0, level: null };
        return (
          <div key={id} className="card">
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
              <span style={{fontWeight:700}}>{LABEL[id]}</span>
              <span className="small" style={{opacity:.7}}>{d.level ? String(d.level).toUpperCase() : "—"}</span>
            </div>
            <div className="m360-progress" aria-hidden>
              <div className="m360-progress-fill" style={{ width: `${d.pct}%` }} />
            </div>
            <div className="small" style={{opacity:.7, marginTop:6}}>{d.value} / {d.target}</div>
          </div>
        );
      })}
    </div>
  );
}
