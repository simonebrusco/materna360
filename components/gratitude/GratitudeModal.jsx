"use client";
import React, { useState } from "react";
import BaseModal from "../modals/BaseModal";
import { addGratitude } from "../../lib/storage";
import { emitEu360Refresh } from "../../lib/clientEvents";

export default function GratitudeModal({ open, onClose = () => {}, onSaved = () => {} }){
  const [text, setText] = useState("");

  function onCancel(){ setText(""); onClose(); }
  function onSave(){
    const list = addGratitude(text);
    setText("");
    try { emitEu360Refresh(); } catch {}
    try { onSaved(list); } catch {}
    onClose();
  }

  return (
    <BaseModal open={open} onClose={onCancel}>
      <div className="m360-modal-title">Gratidão</div>
      <p className="m360-modal-text">Por que você é grata hoje?</p>
      <div className="m360-field">
        <textarea
          className="m360-input"
          placeholder="Por que você é grata hoje?"
          rows={4}
          value={text}
          onChange={(e)=> setText(e.target.value)}
        />
      </div>
      <div className="m360-actions">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancelar</button>
        <button type="button" className="btn btn-primary" onClick={onSave}>Salvar</button>
      </div>
    </BaseModal>
  );
}
