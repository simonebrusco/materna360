"use client";
import { useEffect, useState } from "react";
import BaseModal from "../modals/BaseModal";
import Btn from "../ui/Btn";
import { addPlannerEntry } from "../../lib/storage";
import { showToast } from "../../lib/ui/toast";

function getCurrentTab(){
  try{ const { safeGet } = require("@/lib/utils/safeStorage"); return safeGet("m360:planner:tab", "home"); }catch{ return "home"; }
}

function persistToTab(tab, payload){
  try{
    const { safeGet, safeSet } = require("@/lib/utils/safeStorage");
    const key = tab === "kids" ? "m360:planner.kids" : (tab === "me" ? "m360:planner.me" : "m360:planner.home");
    const list = safeGet(key, []);
    const base = Array.isArray(list) ? list : (Array.isArray(list?.items) ? list.items : []);
    const next = [{ text: payload?.title || String(payload||"").trim(), ts: Date.now() }, ...base].slice(0,200);
    safeSet(key, next);
  }catch{}
}

export default function QuickAddModal({ open, onClose = () => {}, dayIndex = 0 }){
  const [text, setText] = useState("");
  const canSave = String(text || "").trim().length > 0;

  useEffect(()=>{ if (open) setText(""); }, [open]);

  function onSave(){
    const value = String(text||"").trim();
    if (!value) return;
    try{
      addPlannerEntry(dayIndex, { title: value, kind: "task", done: false });
      persistToTab(getCurrentTab(), { title: value });
      showToast("Anotado no planner");
      onClose?.();
    }catch{ showToast("Não conseguimos salvar agora. Tente novamente."); }
  }

  return (
    <BaseModal open={open} onClose={onClose}>
      <div className="m360-modal-title">Adicionar anotação rápida</div>
      <div className="m360-field">
        <input className="m360-input" placeholder="O que você quer anotar?" value={text} onChange={(e)=>setText(e.target.value)} />
      </div>
      <div className="m360-actions" style={{justifyContent:"space-between"}}>
        <Btn variant="ghost" onClick={onClose}>Cancelar</Btn>
        <Btn onClick={onSave} disabled={!canSave}>Salvar</Btn>
      </div>
    </BaseModal>
  );
}
