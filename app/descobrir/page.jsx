"use client";
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

import { useMemo, useState } from "react";
import NextDynamic from "next/dynamic";
import Card from "../../components/ui/Card";
import NavyCard from "../../components/ui/NavyCard";
import Btn from "../../components/ui/Btn";
import AgeTitle from "../../components/discover/AgeTitle";
import { getLastAgeGroup, setLastAgeGroup, getLastContext, setLastContext, getLastRecCategory, setLastRecCategory } from "../../lib/storage";
import { generateIdeas } from "../../lib/ideas";
import { productCatalog } from "../../lib/recs";

const Vitrine = NextDynamic(() => import("../../components/discover/Vitrine"), { ssr: false });

export default function Descobrir(){
  const ages = ["0-2","3-4","5-7","8+"];
  const contexts = ["Casa","Parque","Ar livre","Escola"];
  const categories = ["Livros","Brinquedos","Cuidado"];

  const [age, setAge] = useState(getLastAgeGroup("3-4"));
  const [ctx, setCtx] = useState(getLastContext("Casa"));
  const [ideas, setIdeas] = useState([]);
  const [recCat, setRecCat] = useState(getLastRecCategory("Livros"));
  const [showcaseOpen, setShowcaseOpen] = useState(false);

  function chooseAge(a){ if(ages.includes(a)){ setAge(a); setLastAgeGroup(a); } }
  function chooseCtx(c){ if(contexts.includes(c)){ setCtx(c); setLastContext(c); } }
  function chooseCat(c){ if(categories.includes(c)){ setRecCat(c); setLastRecCategory(c); } }
  function onGenerate(){ setIdeas(generateIdeas(age, ctx)); }
  const recs = useMemo(() => (productCatalog[recCat]?.[age] ?? []).slice(0,8), [recCat, age]);

  return (
    <div className="container">
      <h1 className="h1">Descobrir</h1>

      {/* Keep existing hero/card */}
      <Card className="card-navy">
        <div style={{display:"grid",gridTemplateColumns:"32px 1fr",gap:12,alignItems:"center"}}>
          <div className="iconToken">🐻</div>
          <div>
            <AgeTitle />
            <Btn variant="solid">Ver sugestões</Btn>
          </div>
        </div>
      </Card>

      {/* A) Age + Context + Ideas */}
      <section className="mt-3">
        <div className="chips-row" role="tablist" aria-label="Idade">
          {ages.map(a => (
            <button key={a} className={`chip ${age===a?"is-active":""}`} onClick={() => chooseAge(a)}>{a.replace("-", "–")}</button>
          ))}
        </div>
        <div className="chips-row" role="tablist" aria-label="Contexto">
          {contexts.map(c => (
            <button key={c} className={`chip ${ctx===c?"is-active":""}`} onClick={() => chooseCtx(c)}>{c}</button>
          ))}
        </div>
        <button className="btn btn-primary" onClick={onGenerate}>Gerar ideias</button>

        {ideas.length ? (
          <div className="grid-ideas">
            {ideas.map(i => (
              <div key={i.id} className="card idea">
                <div className="card-title">{i.title}</div>
                <div className="card-desc">{i.desc}</div>
                {i.duration ? <div className="chip subtle">{i.duration}</div> : null}
              </div>
            ))}
          </div>
        ) : null}
      </section>

      {/* New Recommendations Vitrine (client) */}
      <section className="mt-4">
        <Vitrine age={age} />
      </section>

      {/* B) Showcase */}
      <section className="mt-4 showcase">
        <div className="chips-row" role="tablist" aria-label="Categorias">
          {categories.map(c => (
            <button key={c} className={`chip ${recCat===c?"is-active":""}`} onClick={() => chooseCat(c)}>{c}</button>
          ))}
        </div>
        <button className="btn btn-ghost" onClick={() => setShowcaseOpen(true)}>Abrir vitrine</button>
      </section>

      {showcaseOpen ? (
        <div className="modal is-open" role="dialog" aria-modal="true" aria-label="Vitrine">
          <div className="modal-content">
            <div className="modal-head">
              <div className="title">Vitrine — {recCat} • {age}</div>
              <button className="close" onClick={() => setShowcaseOpen(false)}>×</button>
            </div>
            <div className="grid-recs">
              {recs.map((p, idx) => (
                <div key={idx} className="card rec">
                  <img src={p.image} alt={p.title} className="thumb" />
                  <div className="card-title">{p.title}</div>
                  {p.tag ? <div className="chip subtle">{p.tag}</div> : null}
                  {p.blurb ? <div className="card-desc">{p.blurb}</div> : null}
                  <a className="btn btn-primary" href={p.url} target="_blank" rel="noopener noreferrer">Ver produto</a>
                </div>
              ))}
            </div>
          </div>
          <div className="overlay" onClick={() => setShowcaseOpen(false)} />
        </div>
      ) : null}

      <div className="space"></div>

      <div className="grid-2">
        <NavyCard><div className="iconToken">♡</div><div>Refletir</div></NavyCard>
        <NavyCard><div className="iconToken">🌙</div><div>Dormir</div></NavyCard>
      </div>
    </div>
  );
}
