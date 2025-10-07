"use client";
import { useState } from "react";
const EMOJIS = ["😌","🙂","😕","😣","😴","🤍"];
export default function MoodQuickPanel(){
  const [open,setOpen]=useState(false);
  const [text,setText]=useState("");
  const [selected,setSelected]=useState<string>("😌");
  const save = () => {
    try{
      const rec = { ts: Date.now(), mood: selected || "😌", note: text };
      const key="m360:moods"; const arr=JSON.parse(localStorage.getItem(key)||"[]");
      arr.unshift(rec); localStorage.setItem(key, JSON.stringify(arr.slice(0,200)));
      dispatchEvent(new CustomEvent("m360:win",{detail:{type:"mood"}}));
      setOpen(false); setText("");
    }catch{}
  };
  return (
    <div>
      <button className="btn-outline" onClick={()=>setOpen(true)}>Registrar agora</button>
      {open && (
        <div className="mq-modal" role="dialog" aria-modal="true">
          <div className="mq-body">
            <div className="emoji-row">
              {EMOJIS.map(e=> (
                <button key={e} onClick={()=>setSelected(e)} aria-pressed={selected===e}>{e}</button>
              ))}
            </div>
            <textarea placeholder="Quer anotar algo?" value={text} onChange={e=>setText(e.target.value)} />
            <div className="row">
              <button className="btn-outline" onClick={()=>setOpen(false)}>Cancelar</button>
              <button className="btn-primary" onClick={save}>Salvar</button>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        .mq-modal{position:fixed;inset:0;background:rgba(0,0,0,.15);display:flex;align-items:center;justify-content:center;z-index:40}
        .mq-body{background:#fff;border-radius:16px;padding:16px;width:min(640px,92vw);box-shadow:0 10px 30px rgba(0,0,0,.15);display:grid;gap:10px}
        .emoji-row button{font-size:22px;margin:4px;border-radius:12px;padding:6px 10px;border:2px solid #FFEEF5}
        .emoji-row button[aria-pressed="true"]{border-color:#FF005E;box-shadow:0 0 8px rgba(255,0,94,.35)}
        textarea{width:100%;min-height:80px;border:1px solid rgba(0,0,0,.15);border-radius:12px;padding:10px}
        .row{display:flex;gap:8px;justify-content:flex-end}
      `}</style>
    </div>
  );
}
