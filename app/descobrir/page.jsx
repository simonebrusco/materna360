"use client";

import { useMemo, useState, useEffect } from "react";
import Card from "../../components/ui/Card";
import NavyCard from "../../components/ui/NavyCard";
import Btn from "../../components/ui/Btn";
import AgeTitle from "../../components/discover/AgeTitle";
import { getLastAgeGroup, setLastAgeGroup, getLastContext, setLastContext, getLastRecCategory, setLastRecCategory } from "../../lib/storage.js";
import { generateIdeas } from "../../lib/ideas.js";
import { productCatalog } from "../../lib/recs.js";
import { paginate } from "../../lib/showcase.js";

const AGE_GROUPS = ["0-2","3-4","5-7","8+"];
const CATEGORIES = ["Livros","Brinquedos","Cuidado"];

export default function Descobrir(){
  const [age, setAge] = useState(getLastAgeGroup("3-4"));
  const [ctx, setCtx] = useState(getLastContext("Casa"));
  const [ideas, setIdeas] = useState([]);
  const [category, setCategory] = useState(getLastRecCategory("Livros"));
  const [showVitrine, setShowVitrine] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => { setLastAgeGroup(age); }, [age]);
  useEffect(() => { setLastRecCategory(category); }, [category]);

  function chooseAge(a){ if(AGE_GROUPS.includes(a)){ setAge(a); } }
  function chooseCtx(c){ const list=["Casa","Parque","Ar livre","Escola"]; if(list.includes(c)){ setCtx(c); setLastContext(c); } }
  function onGenerate(){ setIdeas(generateIdeas(age, ctx)); }

  const products = useMemo(() => {
    const cat = productCatalog?.[category] || {};
    return cat?.[age] || [];
  }, [category, age]);

  const pager = useMemo(() => paginate(products, page, 6), [products, page]);

  function openVitrine(){ setPage(1); setShowVitrine(true); }
  function closeVitrine(){ setShowVitrine(false); }
  function goPage(n){ if(n<1 || n>pager.total) return; setPage(n); }

  return (
    <div className="container">
      <h1 className="h1">Descobrir</h1>

      <Card className="card-navy">
        <div style={{display:"grid",gridTemplateColumns:"32px 1fr",gap:12,alignItems:"center"}}>
          <div className="iconToken">🐻</div>
          <div>
            <AgeTitle />
            <Btn variant="solid">Ver sugestões</Btn>
          </div>
        </div>
      </Card>

      {/* Ideas generator */}
      <section className="mt-3">
        <div className="chips-row" role="tablist" aria-label="Idade">
          {AGE_GROUPS.map(a => (
            <button key={a} className={`chip ${age===a?"is-active":""}`} onClick={() => chooseAge(a)}>{a.replace("-", "–")}</button>
          ))}
        </div>
        <div className="chips-row" role="tablist" aria-label="Contexto">
          {["Casa","Parque","Ar livre","Escola"].map(c => (
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

      {/* Showcase section */}
      <section className="mt-4">
        <h3 className="section-title">Recomendações</h3>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",margin:"8px 0 14px"}}>
          <div className="chips-row">
            {CATEGORIES.map(cat => (
              <button key={cat} className={`chip ${cat===category?"is-active":""}`} onClick={() => { setCategory(cat); setPage(1); }}>{cat}</button>
            ))}
          </div>
          <button className="btn btn-primary" onClick={openVitrine}>Abrir vitrine</button>
        </div>

        <div className="grid-recs">
          {products.slice(0,3).map((p,i) => (
            <div key={p.title + i} className="card rec">
              <img className="thumb" src={p.image} alt={p.title} loading="lazy" />
              <div style={{fontWeight:600, marginBottom:6}}>{p.title}</div>
              {p.tag && <div style={{opacity:.7, fontSize:14}}>{p.tag}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* Vitrine Modal */}
      <div className={`modal ${showVitrine?"is-open":""}`} aria-hidden={!showVitrine} role="dialog" aria-modal={showVitrine?"true":"false"}>
        <div className="overlay" onClick={closeVitrine} />
        <div className="modal-content">
          <div className="modal-head">
            <div>
              <div style={{fontSize:22,fontWeight:800,color:"#0D1B2A"}}>Recomendações</div>
              <div style={{opacity:.7,marginTop:4}}>Escolha a idade e a categoria para ver sugestões.</div>
            </div>
            <button className="close" onClick={closeVitrine} aria-label="Fechar">×</button>
          </div>

          <div className="chips-row" style={{marginTop:6}}>
            {AGE_GROUPS.map(g => (
              <button key={g} className={`chip ${g===age?"is-active":""}`} onClick={() => { setAge(g); setPage(1); }}>{g}</button>
            ))}
          </div>

          <div className="chips-row" style={{marginTop:8}}>
            {CATEGORIES.map(cat => (
              <button key={cat} className={`chip ${cat===category?"is-active":""}`} onClick={() => { setCategory(cat); setPage(1); }}>{cat}</button>
            ))}
          </div>

          <div className="grid-recs" style={{marginTop:16}}>
            {pager.slice.map((p,i) => (
              <div key={p.title + i} className="card rec">
                <img className="thumb" src={p.image} alt={p.title} loading="lazy" />
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:10}}>
                  <div>
                    <div style={{fontWeight:700}}>{p.title}</div>
                    {p.tag && <div style={{opacity:.7,fontSize:13}}>{p.tag}</div>}
                  </div>
                  <a className="btn btn-ghost" href={p.url || "#"} target="_blank" rel="noopener noreferrer">Ver</a>
                </div>
              </div>
            ))}
          </div>

          <div style={{display:"flex",justifyContent:"center",gap:8,marginTop:16}}>
            <button className="chip" onClick={() => goPage(page-1)} disabled={page<=1}>‹</button>
            {Array.from({length:pager.total}).map((_,idx) => (
              <button key={idx} className={`chip ${page===idx+1?"is-active":""}`} onClick={() => goPage(idx+1)}>{idx+1}</button>
            ))}
            <button className="chip" onClick={() => goPage(page+1)} disabled={page>=pager.total}>›</button>
          </div>
        </div>
      </div>

      <div className="space"></div>

      <div className="grid-2">
        <NavyCard><div className="iconToken">♡</div><div>Refletir</div></NavyCard>
        <NavyCard><div className="iconToken">🌙</div><div>Dormir</div></NavyCard>
      </div>
    </div>
  );
}
