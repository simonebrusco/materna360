"use client";
import { useEffect, useState } from "react";

type Item = { id:string; label:string; done:boolean };
const DEFAULTS: Item[] = [
  {id:"water",label:"Beber água 8x",done:false},
  {id:"breathe",label:"Respirar 1 min",done:false},
  {id:"gratitude",label:"Registrar 1 gratidão",done:false},
  {id:"pause",label:"Pausar 1 min",done:false},
];
const KEY = "m360:today";
export default function TodayChecklist(){
  const [items,setItems]=useState<Item[]>(DEFAULTS);
  useEffect(()=>{ try{ const raw=localStorage.getItem(KEY); if(raw) setItems(JSON.parse(raw)); }catch{} },[]);
  useEffect(()=>{ try{ localStorage.setItem(KEY, JSON.stringify(items)); }catch{} },[items]);
  const toggle=(id:string)=>setItems(p=>p.map(i=>i.id===id?({...i,done:!i.done}):i));
  useEffect(()=>{ try{ window.dispatchEvent(new CustomEvent("m360:progressHint")); }catch{} },[items]);
  return (
    <div className="card">
      <h3 className="card-title">Hoje</h3>
      <ul style={{listStyle:"none",padding:0,margin:0,display:"grid",gap:8}}>
        {items.map(i=> (
          <li key={i.id}>
            <label style={{display:"flex",alignItems:"center",gap:8}}>
              <input type="checkbox" checked={i.done} onChange={()=>toggle(i.id)} />
              <span className="card-sub" style={{display:"inline-block"}}>{i.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
