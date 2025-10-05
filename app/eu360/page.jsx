"use client";
import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Btn from "../../components/ui/Btn";
import { getGratitude, addGratitude, deleteGratitude } from "../../lib/storage";

function useGratitudeModel(){
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [items, setItems] = useState([]);
  useEffect(()=>{ try{ setItems(getGratitude()); }catch{} },[]);
  return {
    open, text, items,
    openModal: ()=>setOpen(true),
    closeModal: ()=>{ setOpen(false); setText(""); },
    setText,
    save: ()=>{
      if (!text.trim()) return;
      const list = addGratitude(text.trim());
      setItems(list); setText(""); setOpen(false);
    },
    remove: (id)=> setItems(deleteGratitude(id))
  };
}

function GratitudeSection({ g }){
  const model = g || useGratitudeModel();
  return (
    <>
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

      <div className={`modal ${model.open?"is-open":""}`} aria-hidden={!model.open}>
        <div className="overlay" onClick={model.closeModal} />
        <div className="modal-content" role="dialog" aria-modal="true" aria-label="Registrar gratidão">
          <div className="modal-head">
            <div style={{fontSize:22,fontWeight:800,color:"#0D1B2A"}}>Registrar gratidão</div>
            <button className="close" onClick={model.closeModal} aria-label="Fechar">×</button>
          </div>
          <textarea
            value={model.text}
            onChange={e=>model.setText(e.target.value)}
            placeholder="Por que você é grata hoje?"
            rows={4}
            style={{width:"100%",border:"1.5px solid rgba(13,27,42,.12)",borderRadius:14,padding:12,outline:"none"}}
          />
          <div style={{display:"flex",justifyContent:"flex-end",gap:10,marginTop:12}}>
            <button className="chip" onClick={model.closeModal}>Cancelar</button>
            <button className="btn btn-primary" onClick={model.save}>Salvar</button>
          </div>
        </div>
      </div>
    </>
  );
}


export default function Eu360(){
  const g = useGratitudeModel();
  return (
    <div className="container">
      <h1 className="h1">Eu360</h1>

      <Card className="card-navy" style={{display:"grid",gridTemplateColumns:"140px 1fr",gap:18,alignItems:"center"}}>
        <div className="ring" style={{"--p":"72%"}}>
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
        <Btn onClick={() => g.openModal()}>Registrar</Btn>
      </Card>

      <GratitudeSection g={g} />
    </div>
  );
}
