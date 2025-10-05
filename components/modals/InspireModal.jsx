"use client";
import Modal from "../ui/Modal";
export default function InspireModal({ open, onClose = () => {}, onComplete = () => {} }){
  return (
    <Modal open={open} onClose={onClose} title="Inspiração" widthClass="max-w-md">
      <p>“Respire fundo. Você é mais forte do que imagina.”</p>
      <div className="modal-footer">
        <button type="button" className="btn btn-ghost" onClick={onClose}>Cancelar</button>
        <button type="button" className="btn" onClick={()=>onComplete()}>Concluir</button>
      </div>
    </Modal>
  );
}
