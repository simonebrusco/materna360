"use client";
import { useEffect, useState } from "react";
import BaseModal from "../modals/BaseModal";
import { generateHealthyRecipe } from "../../lib/recipes";
import Btn from "../ui/Btn";

export default function RecipeModal({ open, onClose }) {
  const [loading, setLoading] = useState(false);
  const [diet, setDiet] = useState("geral");
  const [time, setTime] = useState(15);
  const [data, setData] = useState(null);

  async function load() {
    setLoading(true);
    try {
      const r = await generateHealthyRecipe({ diet, time });
      setData(r);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { if (open) load(); }, [open]);

  if (!open) return null;

  return (
    <BaseModal open={open} onClose={onClose}>
      <div style={{display:"grid", gap:12}}>
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
          <div className="m360-modal-title">Receita saudável</div>
          <button aria-label="Fechar" onClick={onClose} className="btn btn-ghost" style={{padding:"6px 10px"}}>✕</button>
        </div>

        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10}}>
          <div>
            <label className="small" style={{opacity:.8}}>Preferência</label>
            <select value={diet} onChange={e=>setDiet(e.target.value)} className="m360-input" style={{marginTop:6}}>
              <option value="geral">Geral</option>
              <option value="vegetariana">Vegetariana</option>
              <option value="sem_lactose">Sem lactose</option>
            </select>
          </div>
          <div>
            <label className="small" style={{opacity:.8}}>Tempo (min)</label>
            <select value={time} onChange={e=>setTime(Number(e.target.value))} className="m360-input" style={{marginTop:6}}>
              <option value={10}>Até 10</option>
              <option value={15}>~15</option>
              <option value={20}>20–30</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div style={{padding:"24px 0", textAlign:"center", opacity:.7}}>Gerando ideia gostosa…</div>
        ) : data ? (
          <div style={{display:"grid", gap:12}}>
            <div>
              <div style={{fontWeight:800, fontSize:18}}>{data.title}</div>
              <div className="small" style={{opacity:.8}}>{data.timeNote} • ~{data.kcal} kcal</div>
            </div>
            <div>
              <div style={{fontWeight:700, marginBottom:6}}>Ingredientes</div>
              <ul style={{paddingLeft:18}}>
                {data.ingredients.map((i, idx)=>(<li key={idx} style={{margin:"4px 0"}}>{i}</li>))}
              </ul>
            </div>
            <div>
              <div style={{fontWeight:700, marginBottom:6}}>Preparo</div>
              <ol style={{paddingLeft:18}}>
                {data.steps.map((s, idx)=>(<li key={idx} style={{margin:"4px 0"}}>{s}</li>))}
              </ol>
            </div>
          </div>
        ) : null}

        <div className="m360-actions">
          <Btn variant="ghost" onClick={onClose}>Fechar</Btn>
          <Btn onClick={load}>Gerar outra</Btn>
        </div>
      </div>
    </BaseModal>
  );
}
