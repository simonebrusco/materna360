"use client";
import Modal from "../ui/Modal";
export default function BreathModal({ open, onClose = () => {}, onComplete = () => {} }){
  return (
    <Modal open={open} onClose={onClose} title="Respiração" widthClass="max-w-md">
      <p>Exercício de respiração de 60s.</p>
      <div className="modal-footer">
        <button type="button" className="btn btn-ghost" onClick={onClose}>Cancelar</button>
        <button type="button" className="btn" onClick={() => onComplete({ duration: 60 })}>Concluir</button>
      </div>
    </Modal>
  );
}
