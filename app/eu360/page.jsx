"use client";
import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Btn from "../../components/ui/Btn";
import { getGratitude, deleteGratitude } from "../../lib/storage";
import { computeScore } from "../../lib/score";
import GratitudeModal from "../../components/gratitude/GratitudeModal";
import { showToast } from "../../lib/ui/toast";

function useGratitudeModel(){
  const [items, setItems] = useState([]);
  useEffect(()=>{ try{ setItems(getGratitude()); }catch{} },[]);
  return {
    items,
    setItems,
    remove: (id)=> setItems(getGratitude().filter(x=>x.id!==id) && (deleteGratitude(id)))
  };
}

function GratitudeSection({ g }){
  const model = g || useGratitudeModel();
  return (
    <section style={{marginTop:16}}>
      <div style={{fontWeight:800,fontSize:18,color:"#0D1B2A", marginBottom:10}}>Gratidões recentes</div>
      {model.items.length===0 ? (
        <div className="card rec" style={{padding:16, opacity:.8}}>Você ainda não registrou gratidões.</div>
      ) : (
        <div className="grid-recs">
          {model.items.slice(0,6).map(it=>(
            <div key={it.id} className="card rec" style={{display:"flex",justifyContent:"space-between",gap:10,alignItems:"center"}}>
              <div>
                <div style={{fontWeight:700, marginBottom:6}}>{new Date(it.ts).toLocaleDateString()}</div>
                <div style={{opacity:.9}}>{it.text}</div>
              </div>
              <button className="chip" onClick={()=>model.remove(it.id)} title="Excluir">Excluir</button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default function Eu360(){
  const g = useGratitudeModel();
  const [score, setScore] = useState(0);
  const [openGrat, setOpenGrat] = useState(false);

  const refresh = () => {
    const { score: s } = computeScore();
    setScore(Math.max(0, Math.min(1000, s)));
    try { g.setItems(getGratitude()); } catch {}
  };

  useEffect(()=>{
    refresh();
    function onVis(){ if (document.visibilityState === 'visible') refresh(); }
    function onEvt(){ refresh(); }
    window.addEventListener('visibilitychange', onVis);
    window.addEventListener('refreshEu360', onEvt);
    return () => {
      window.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('refreshEu360', onEvt);
    };
  },[]);

  const pct = Math.max(0, Math.min(100, score/10));

  return (
    <div className="container">
      <h1 className="h1">Eu360</h1>

      <Card className="card-navy" style={{display:"grid",gridTemplateColumns:"140px 1fr",gap:18,alignItems:"center"}}>
        <div className="ring" style={{"--p": `${pct}%`}}>
          <div>Círculo<br/>{score}</div>
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
        <Btn onClick={() => setOpenGrat(true)}>Registrar</Btn>
      </Card>

      <GratitudeSection g={g} />

      <GratitudeModal
        open={openGrat}
        onClose={() => setOpenGrat(false)}
        onSaved={() => { refresh(); showToast("Gratidão registrada ✨"); }}
      />
    </div>
  );
}
