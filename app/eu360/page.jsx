'use client';

import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Btn from "../../components/ui/Btn";
import { getLastNDays } from "../../lib/mood";

export const metadata={title:"Eu360 • Materna360"};

export default function Eu360(){
  const [week, setWeek] = useState([]);
  useEffect(() => { setWeek(getLastNDays(7)); }, []);
  return (
    <div className="container">
      <h1 className="h1">Eu360</h1>

      <Card className="card-navy" style={{display:"grid",gridTemplateColumns:"140px 1fr",gap:18,alignItems:"center"}}>
        <div className="ring" style={{"--p":"72%",background:"conic-gradient(#FF3B84 var(--p), rgba(255,255,255,.25) 0)"}}>
          <div>Círculo<br/>350</div>
        </div>
        <div>
          <div style={{fontWeight:800,marginBottom:6}}>Você é importante</div>
          <div className="small" style={{opacity:.9}}>Siga no seu ritmo 💛</div>
        </div>
      </Card>

      <div className="space"></div>

      <Card>
        <strong>Humor da semana</strong>
        <div className="mood-week" style={{marginTop:8}}>
          {week.map((d, i) => (
            <div key={i} className={`mood-day ${d.mood ? 'is-set' : ''}`}></div>
          ))}
        </div>
      </Card>

      <div className="space"></div>

      <Card>
        <strong>Conquistas</strong>
        <div className="small" style={{marginTop:8}}>2 metas alcançadas</div>
      </Card>

      <div className="space"></div>

      <Card>
        <strong>Gratidão</strong>
        <div className="space"></div>
        <Btn>Registrar</Btn>
      </Card>
    </div>
  );
}
