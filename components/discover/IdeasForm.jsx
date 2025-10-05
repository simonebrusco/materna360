"use client";
import { useMemo, useState } from "react";
import AgeTabs from "./AgeTabs";
import PlaceChips from "./PlaceChips";
import { generateIdeas } from "../../lib/ideas";
import { clientPaginate } from "../../lib/clientPaginate";
import RecommendationsDrawer from "./RecommendationsDrawer";

function mapPlace(p){
  if (p === "Home") return "Casa";
  if (p === "Park") return "Parque";
  if (p === "Outdoor") return "Ar livre";
  return "Casa";
}

export default function IdeasForm({ age, place, onChangeAge, onChangePlace }){
  const [ideas, setIdeas] = useState([]);
  const [page, setPage] = useState(1);

  function onGenerate(){
    if (!age || !place) return;
    const mapped = mapPlace(place);
    const res = generateIdeas(age, mapped) || [];
    setIdeas(res);
    setPage(1);
  }

  const pageData = useMemo(()=>clientPaginate(ideas, page, 6), [ideas, page]);

  return (
    <section>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <AgeTabs value={age} onChange={onChangeAge} />
        <PlaceChips value={place} onChange={onChangePlace} />
      </div>

      <div style={{display:"flex",gap:10,alignItems:"center",marginTop:12}}>
        <button className="btn btn-primary" onClick={onGenerate}>Get ideas</button>
        <RecommendationsDrawer age={age||"3-4"} />
      </div>

      {pageData.items.length > 0 ? (
        <div className="grid-ideas" style={{marginTop:12}}>
          {pageData.items.map((i)=> (
            <div key={i.id} className="card idea">
              <div className="card-title">{i.title}</div>
              {i.duration ? <div className="chip subtle">{i.duration}</div> : null}
              <div className="card-desc">{i.desc}</div>
              <div style={{marginTop:8}}>
                <button className="btn btn-ghost">Try it</button>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {pageData.hasMore ? (
        <div style={{display:"flex",justifyContent:"center",marginTop:12}}>
          <button className="btn btn-ghost" onClick={()=>setPage(p=>p+1)}>Show more</button>
        </div>
      ) : null}
    </section>
  );
}
