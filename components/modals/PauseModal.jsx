"use client";
import { useState } from "react";
import Modal from "../ui/Modal";
const OPTIONS=[3,5,10];

export default function PauseModal({ open, onClose = () => {}, onComplete = () => {} }){
  const [m,setM]=useState(3);
  return (
    <Modal open={open} onClose={onClose} title="Pausa" widthClass="max-w-md">
      <p style={{ marginBottom:8 }}>Escolha uma pausa rápida:</p>
      <div style={{ display:"flex", gap:8, padding:"8px 0" }}>
        {OPTIONS.map(n=> (
          <button key={n} type="button" className={`chip ${m===n?"chip--active":""}`} onClick={()=>setM(n)}>{n} min</button>
        ))}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-ghost" onClick={onClose}>Cancelar</button>
        <button type="button" className="btn" onClick={()=>onComplete(m)}>Confirmar</button>
      </div>
    </Modal>
  );
}
