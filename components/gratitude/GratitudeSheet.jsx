"use client";

import { useState } from "react";
import Btn from "../ui/Btn";
import { addGratitude } from "../../lib/gratitude";

export default function GratitudeSheet({ open, onClose, onSaved }) {
  const [text, setText] = useState("");

  if (!open) return null;

  const handleSave = () => {
    const value = text.trim();
    if (!value) return;
    addGratitude(value);
    setText("");
    onSaved?.();
    onClose?.();
  };

  return (
    <div className="sheet-overlay" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-title">Registrar gratidão</div>
        <textarea
          className="textarea-field"
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={140}
          placeholder="Escreva algo pelo qual você é grata hoje..."
        />
        <div className="sheet-actions">
          <Btn variant="subtle" onClick={onClose}>Cancelar</Btn>
          <Btn variant="primary" onClick={handleSave} disabled={!text.trim()}>Salvar</Btn>
        </div>
      </div>
    </div>
  );
}
