"use client";

import { useRef, useState } from "react";
import Card from "../../components/ui/Card";
import NavyCard from "../../components/ui/NavyCard";
import Btn from "../../components/ui/Btn";
import AgeTabs from "../../components/discover/AgeTabs";
import PlaceChips from "../../components/discover/PlaceChips";
import IdeasPanel from "../../components/discover/IdeasPanel";
import Vitrine from "../../components/discover/Vitrine";
import { readJSON, writeJSON } from "../../lib/storage";
import { generateIdeas } from "../../lib/ideas";

export default function Descobrir(){
  const [age, setAge] = useState(readJSON("m360:lastAge","3-4"));
  const [place, setPlace] = useState(readJSON("m360:lastPlace","home"));
  const [ideas, setIdeas] = useState([]);
  const ideasRef = useRef(null);

  function chooseAge(a){ setAge(a); writeJSON("m360:lastAge", a); }
  function choosePlace(p){ setPlace(p); writeJSON("m360:lastPlace", p); }
  function onGenerate(){ setIdeas(generateIdeas(age, place)); setTimeout(()=>ideasRef.current?.scrollIntoView({behavior:"smooth"}), 10); }

  return (
    <div className="container">
      <h1 className="h1">Descobrir</h1>

      <Card className="card-navy">
        <div style={{display:"grid",gridTemplateColumns:"32px 1fr",gap:12,alignItems:"center"}}>
          <div className="iconToken">🐻</div>
          <div>
            <div style={{fontWeight:800,marginBottom:6}}>Atividades personalizadas</div>
            <Btn variant="solid" onClick={onGenerate}>Ver sugestões</Btn>
          </div>
        </div>
      </Card>

      <section className="mt-3">
        <AgeTabs value={age} onChange={chooseAge} />
        <PlaceChips value={place} onChange={choosePlace} />
        <div ref={ideasRef}></div>
        {ideas.length ? (
          <div className="grid-ideas" style={{marginTop:12}}>
            {ideas.map((t, idx) => (
              <div key={idx} className="card idea">
                <div className="card-title" style={{fontWeight:600}}>{t}</div>
              </div>
            ))}
          </div>
        ) : (
          <IdeasPanel age={age} place={place} />
        )}
      </section>

      <section className="mt-4">
        <Vitrine age={age} />
      </section>

      <div className="space"></div>

      <div className="grid-2">
        <NavyCard><div className="iconToken">♡</div><div>Refletir</div></NavyCard>
        <NavyCard><div className="iconToken">🌙</div><div>Dormir</div></NavyCard>
      </div>
    </div>
  );
}
