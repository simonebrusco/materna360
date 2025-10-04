"use client";

import Card from "../../components/ui/Card";
import Btn from "../../components/ui/Btn";
import { useEffect, useState } from "react";
import GratitudeSheet from "../../components/gratitude/GratitudeSheet";
import { getRecentGratitudes } from "../../lib/gratitude";


export default function Eu360(){
  const [open, setOpen] = useState(false);
  const [recents, setRecents] = useState([]);
  const refreshRecents = () => setRecents(getRecentGratitudes(3));
  useEffect(() => { refreshRecents(); }, []);
  const formatDate = (iso) => new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
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
        <div style={{display:"flex",alignItems:"center",gap:10,marginTop:8}}>
          <div className="iconToken">🙂</div>
          <div className="small">Feliz</div>
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
        {recents.length ? (
          <ul className="gratitude-list">
            {recents.map((e) => (
              <li key={e.id} className="gratitude-item">
                <span className="gratitude-text">{e.text}</span>
                <span className="gratitude-date">{formatDate(e.date)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="small">Sem registros ainda.</div>
        )}
        <div className="space"></div>
        <Btn onClick={() => setOpen(true)}>Registrar</Btn>
      </Card>
      <GratitudeSheet open={open} onClose={() => setOpen(false)} onSaved={refreshRecents} />
    </div>
  );
}
