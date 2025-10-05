"use client";

import { useState, useMemo } from "react";
import Card from "../../components/ui/Card";
import NavyCard from "../../components/ui/NavyCard";
import Btn from "../../components/ui/Btn";
import AgeTitle from "../../components/discover/AgeTitle";
import { getLastAgeGroup, setLastAgeGroup } from "../../lib/storage";
import { activitiesByAge, productRecs } from "../../lib/recs";

const allowed = ["0-2","3-4","5-7","8+"];

export default function Descobrir(){
  const [age, setAge] = useState(getLastAgeGroup("3-4"));
  const setAgeSafe = (next) => {
    if (!allowed.includes(next)) return;
    setAge(next);
    setLastAgeGroup(next);
  };

  const activities = useMemo(() => activitiesByAge?.[age] ?? [], [age]);
  const recs = useMemo(() => productRecs?.[age] ?? [], [age]);

  return (
    <div className="container">
      <h1 className="h1">Descobrir</h1>

      <div className="age-tabs" role="tablist" aria-label="Faixas etárias">
        {allowed.map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={age === key}
            className={`age-tab ${age === key ? "is-active" : ""}`}
            onClick={() => setAgeSafe(key)}
          >
            {key.replace("-", "–")}
          </button>
        ))}
      </div>

      <Card className="card-navy">
        <div style={{display:"grid",gridTemplateColumns:"32px 1fr",gap:12,alignItems:"center"}}>
          <div className="iconToken">🐻</div>
          <div>
            <AgeTitle />
            <Btn variant="solid">Ver sugestões</Btn>
          </div>
        </div>
      </Card>

      <section className="mt-3">
        <h3 className="section-title">Atividades para {age}</h3>
        <div className="grid-activities">
          {activities.slice(0,3).map((a) => (
            <div key={a.id} className="card activity">
              <div className="card-title">{a.title}</div>
              <div className="card-desc">{a.desc}</div>
            </div>
          ))}
        </div>
        <button type="button" className="btn btn-primary" onClick={() => null}>
          Ver sugestões
        </button>
      </section>

      <section className="mt-4">
        <h3 className="section-title">Recomendações</h3>
        <div className="grid-recs">
          {recs.slice(0,2).map((r, i) => (
            <div key={i} className="card rec">
              <div className="card-title">{r.type === "book" ? "Livro" : "Brinquedo"}: {r.title}</div>
              <div className="card-desc">{r.blurb}</div>
              <div className="rec-actions">
                <a className="btn btn-ghost" href={r.amazon||"#"} target="_blank" rel="noopener noreferrer sponsored">Ver na Amazon</a>
                <a className="btn btn-ghost" href={r.shopee||"#"} target="_blank" rel="noopener noreferrer sponsored">Ver na Shopee</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="space"></div>

      <div className="grid-2">
        <NavyCard><div className="iconToken">♡</div><div>Refletir</div></NavyCard>
        <NavyCard><div className="iconToken">🌙</div><div>Dormir</div></NavyCard>
      </div>
    </div>
  );
}
