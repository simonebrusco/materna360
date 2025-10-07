"use client";
import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Btn from "../../components/ui/Btn";
import { getGratitude, deleteGratitude, readJSON, getMoodHistory, getActions } from "../../lib/storage";
import { computeScore, summarizeActions } from "../../lib/score";
import { onEu360Refresh } from "../../lib/clientEvents";
import GratitudeModal from "../../components/eu360/GratitudeModal";
import { showToast } from "../../lib/toast";
import BadgesBinder from "../../components/BadgesBinder";
import Eu360CircleBinder from "../../components/Eu360CircleBinder";
import BadgesStrip from "../../components/BadgesStrip";
import BadgesLevelToast from "../../components/BadgesLevelToast";

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
  const [achText, setAchText] = useState("");
  const [weeklyMood, setWeeklyMood] = useState("—");
  const [openGrat, setOpenGrat] = useState(false);

  const refresh = () => {
    try {
      const rawMH = readJSON("m360:moodHistory", null);
      const mh0 = Array.isArray(rawMH) ? rawMH : getMoodHistory();
      const mh = (mh0 || []).map(m => {
        const v = typeof m === 'number' ? m : (typeof m?.score === 'number' ? m.score : 0);
        return v >= 1 && v <= 5 ? (v - 1) : v; // normalize 0..4
      });
      const acts = Array.isArray(readJSON("m360:actions", null)) ? readJSON("m360:actions", null) : getActions();
      const { score: sc } = computeScore({ moodHistory: mh, actions: acts });
      setScore(Math.max(0, Math.min(1000, sc)));
      const { count7d } = summarizeActions(acts);
      setAchText(count7d >= 2 ? "2 metas alcançadas" : (count7d >= 1 ? "1 meta alcançada" : "comece hoje!"));
      const last7 = mh.slice(-7);
      const avg = last7.length ? last7.reduce((a,b)=>a+b,0)/last7.length : null;
      if (avg == null) setWeeklyMood("—");
      else {
        const idx = Math.max(0, Math.min(4, Math.round(avg)));
        const EMO = ["😞","🙁","😐","🙂","😄"]; setWeeklyMood(EMO[idx]);
      }
    } catch {}
    try { g.setItems(getGratitude()); } catch {}
  };

  useEffect(()=>{
    refresh();
    function onVis(){ if (document.visibilityState === 'visible') refresh(); }
    const off = onEu360Refresh(refresh);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      document.removeEventListener('visibilitychange', onVis);
      try { off && off(); } catch {}
    };
  },[]);

  const pct = Math.max(0, Math.min(100, score/10));

  return (
    <div className="container">
      <BadgesBinder />
      <Eu360CircleBinder>{() => null}</Eu360CircleBinder>
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

      <section style={{marginTop:16}}>
        <BadgesStrip />
      </section>

      <div className="space"></div>

      <Card>
        <strong>Humor da semana</strong>
        <div style={{display:"flex",alignItems:"center",gap:10,marginTop:8}}>
          <div className="iconToken">{weeklyMood}</div>
          <div className="small" style={{opacity:.9}}>{weeklyMood === "—" ? "—" : "média dos últimos registros"}</div>
        </div>
      </Card>

      <div className="space"></div>

      <Card>
        <strong>Conquistas</strong>
        <div className="small" style={{marginTop:8, opacity:.85}}>{achText}</div>
      </Card>

      <div className="space"></div>

      <Card>
        <strong>Gratidão</strong>
        <div className="space"></div>
        <Btn onClick={() => setOpenGrat(true)}>Registrar</Btn>
        {g.items && g.items.length > 0 && (
          <div style={{marginTop:12}}>
            {g.items.slice(0,3).map(it => (
              <div key={it.id} className="small" style={{opacity:.8, padding:"4px 0"}}>
                {String(it.text||"").split("\n")[0]}
              </div>
            ))}
          </div>
        )}
      </Card>

      <GratitudeSection g={g} />

      <GratitudeModal
        open={openGrat}
        onClose={() => setOpenGrat(false)}
        onSaved={() => { refresh(); showToast("Gratidão registrada ✨"); }}
      />

      <BadgesLevelToast />
    </div>
  );
}
