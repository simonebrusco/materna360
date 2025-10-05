"use client";
import { useState } from "react";
import Modal from "../ui/Modal";
const EMOJIS=[{v:-2,e:"😞"},{v:-1,e:"🙁"},{v:0,e:"😐"},{v:1,e:"🙂"},{v:2,e:"😄"}];

export default function MoodModal({ open, onClose = () => {}, onComplete = () => {} }){
  const [mood,setMood]=useState(0);
  const [note,setNote]=useState("");
  return (
    <Modal open={open} onClose={onClose} title="Como você está?" widthClass="max-w-md">
      <div style={{ display:"flex", gap:8, padding:"8px 0" }}>
        {EMOJIS.map(i=> (
          <button key={i.v} type="button" className={`emoji-chip ${mood===i.v?"emoji-chip--active":""}`} onClick={()=>setMood(i.v)}>{i.e}</button>
        ))}
      </div>
      <input className="input" placeholder="Nota (opcional)" value={note} onChange={e=>setNote(e.target.value)} />
      <div className="modal-footer">
        <button type="button" className="btn btn-ghost" onClick={onClose}>Cancelar</button>
        <button type="button" className="btn" onClick={()=>onComplete({mood, note})}>Salvar</button>
      </div>
    </Modal>
  );
}
