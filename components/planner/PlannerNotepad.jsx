"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import BaseModal from "../modals/BaseModal";
import Btn from "../ui/Btn";
import Icon from "../ui/Icon";
import { showToast } from "../../lib/ui/toast";
import { ensurePlannerWeek, getPlanner, setPlanner, addPlannerEntry, updatePlannerEntry, deletePlannerEntry, togglePlannerTaskDone } from "../../lib/storage";

function formatDateLabel(d){
  try{
    const dt = new Date(d);
    const weekday = dt.toLocaleDateString("pt-BR", { weekday:"long" });
    const date = dt.toLocaleDateString("pt-BR", { day:"2-digit", month:"2-digit" });
    return `${weekday[0].toUpperCase()}${weekday.slice(1)} • ${date}`;
  }catch{ return ""; }
}

function emptyEntry(){
  const now = Date.now();
  return { id: Math.random().toString(36).slice(2), title: "", kind: "note", time: "", tags: [], content: "", done: false, reminderAt: null, createdAt: now, updatedAt: now };
}

export default function PlannerNotepad({ open, onClose, dayIndex=0, onChangeDay }){
  const [days, setDays] = useState([]);
  const [idx, setIdx] = useState(dayIndex);
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState(null);
  const formRef = useRef(null);
  const listRef = useRef(null);

  useEffect(()=>{ ensurePlannerWeek(); setDays(getPlanner()); setIdx(dayIndex); }, [dayIndex, open]);
  useEffect(()=>{
    const id = setInterval(()=>{
      if (editing && draft) {
        try { localStorage.setItem(`m360:planner:draft:${idx}`, JSON.stringify(draft)); } catch {}
      }
    }, 2000);
    return () => clearInterval(id);
  }, [editing, draft, idx]);

  useEffect(()=>{
    try{
      const raw = localStorage.getItem(`m360:planner:draft:${idx}`);
      if (raw) setDraft(JSON.parse(raw));
    }catch{}
  }, [idx]);

  const day = days[idx] || { dateISO: new Date().toISOString().slice(0,10), entries: [] };
  const entries = useMemo(()=>{
    const arr = Array.isArray(day.entries) ? day.entries.slice() : [];
    return arr.sort((a,b)=>{
      const at = a.time ? a.time : "99:99";
      const bt = b.time ? b.time : "99:99";
      if (at === bt) return (a.kind||"").localeCompare(b.kind||"");
      return at.localeCompare(bt);
    });
  }, [day]);

  function changeDay(delta){
    const next = Math.max(0, Math.min(6, idx + delta));
    setIdx(next);
    onChangeDay?.(next);
  }

  function beginNew(){ setEditing("new"); setDraft(emptyEntry()); queueMicrotask(()=> formRef.current?.querySelector("input[name=title]")?.focus()); }
  function cancelForm(){ setEditing(null); setDraft(null); }

  const saveForm = useCallback(()=>{
    if (!draft || !String(draft.title).trim()) { showToast("Título é obrigatório"); return; }
    const now = Date.now();
    const item = { ...draft, updatedAt: now, createdAt: draft.createdAt || now };
    try{
      if (editing === "edit" && item.id){ setDays(addOrUpdate(idx, item, true)); }
      else { setDays(addOrUpdate(idx, item, false)); }
      setEditing(null); setDraft(null);
      try { localStorage.removeItem(`m360:planner:draft:${idx}`); } catch {}
      showToast("Salvo");
    }catch{ showToast("Não conseguimos salvar agora. Tente novamente."); }
  }, [draft, editing, idx]);

  function addOrUpdate(i, item, isUpdate){
    if (isUpdate) { updatePlannerEntry(i, item.id, item); }
    else { addPlannerEntry(i, item); }
    const next = getPlanner();
    setPlanner(next);
    return next;
  }

  function onEdit(entry){ setEditing("edit"); setDraft({ ...entry }); }
  function onDelete(entry){ try{ deletePlannerEntry(idx, entry.id); setDays(getPlanner()); showToast("Removido"); }catch{ showToast("Não conseguimos salvar agora. Tente novamente."); } }
  function onToggle(entry){ try{ togglePlannerTaskDone(idx, entry.id); setDays(getPlanner()); }catch{} }

  useEffect(()=>{
    function onKey(e){
      if (!open) return;
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") { e.preventDefault(); saveForm(); }
      if (e.key === "Escape") { e.preventDefault(); onClose?.(); }
      if (e.key.toLowerCase() === "n" && !editing) { e.preventDefault(); beginNew(); }
    }
    window.addEventListener("keydown", onKey);
    return ()=> window.removeEventListener("keydown", onKey);
  }, [open, editing, saveForm]);

  useEffect(()=>{ listRef.current?.focus?.(); }, [open]);

  return (
    <BaseModal open={open} onClose={onClose}>
      <div className="m360-modal-title" style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
        <button className="btn btn-ghost" aria-label="Dia anterior" onClick={()=>changeDay(-1)}><span className="icon-20 icon-default">‹</span></button>
        <div style={{textAlign:"center",flex:1}}>{formatDateLabel(day.dateISO)}</div>
        <button className="btn btn-ghost" aria-label="Próximo dia" onClick={()=>changeDay(1)}><span className="icon-20 icon-default">›</span></button>
      </div>

      <div ref={listRef} tabIndex={-1} style={{maxHeight:"50vh", overflowY:"auto", outline:"none"}} aria-label="Anotações do dia">
        {entries.length === 0 ? (
          <div className="card" style={{padding:16, marginTop:8}}>
            <div className="small" style={{opacity:.9}}>Seu espaço para anotar compromissos, brincadeiras e lembretes do dia.</div>
            <div style={{marginTop:10}}><Btn onClick={beginNew}>Adicionar primeira anotação</Btn></div>
          </div>
        ) : (
          <div style={{display:"grid", gap:8, marginTop:8}}>
            {entries.map(e => (
              <div key={e.id} className="card" style={{padding:12, display:"grid", gridTemplateColumns:"auto 1fr auto", alignItems:"center", gap:10}}>
                <input type="checkbox" aria-label="Concluir" checked={!!e.done} onChange={()=>onToggle(e)} />
                <div>
                  <div style={{fontWeight:700}}>{e.title}</div>
                  <div className="small" style={{opacity:.75}}>{[e.time, (e.kind||"note")].filter(Boolean).join(" • ")}</div>
                </div>
                <div>
                  <button className="btn btn-ghost" aria-label="Editar" onClick={()=>onEdit(e)}>Editar</button>
                  <button className="btn btn-ghost" aria-label="Excluir" onClick={()=>onDelete(e)}>Excluir</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="m360-actions" style={{justifyContent:"space-between"}}>
        <Btn variant="ghost" onClick={beginNew}>Novo</Btn>
        <Btn variant="ghost" onClick={onClose}>Fechar</Btn>
      </div>

      {editing ? (
        <div className="card" style={{padding:16, marginTop:10}} role="form" ref={formRef}>
          <div className="m360-field">
            <label className="small">Título</label>
            <input className="m360-input" name="title" value={draft?.title||""} onChange={(e)=>setDraft(d=>({...d, title: e.target.value}))} placeholder="Título" />
          </div>
          <div className="m360-field" style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8}}>
            <div>
              <label className="small">Tipo</label>
              <select className="m360-input" value={draft?.kind||"note"} onChange={e=>setDraft(d=>({...d, kind:e.target.value}))}>
                <option value="note">Nota</option>
                <option value="task">Tarefa</option>
                <option value="event">Compromisso</option>
              </select>
            </div>
            <div>
              <label className="small">Hora</label>
              <input className="m360-input" placeholder="HH:mm" value={draft?.time||""} onChange={e=>setDraft(d=>({...d, time:e.target.value}))} />
            </div>
          </div>
          <div className="m360-field">
            <label className="small">Tags</label>
            <input className="m360-input" placeholder="Separadas por vírgula" value={(draft?.tags||[]).join(", ")} onChange={e=>setDraft(d=>({...d, tags: e.target.value.split(",").map(t=>t.trim()).filter(Boolean)}))} />
          </div>
          <div className="m360-field">
            <label className="small">Conteúdo</label>
            <textarea className="m360-input" rows={4} value={draft?.content||""} onChange={e=>setDraft(d=>({...d, content:e.target.value}))} placeholder="Detalhes" />
          </div>
          <div className="m360-field" style={{display:"flex", alignItems:"center", gap:8}}>
            <input id="reminder" type="checkbox" checked={!!draft?.reminderAt} onChange={(e)=>setDraft(d=>({...d, reminderAt: e.target.checked ? new Date(Date.now()+60*60*1000).toISOString() : null}))} />
            <label htmlFor="reminder">Lembrete</label>
          </div>
          <div className="m360-actions" style={{justifyContent:"space-between"}}>
            <Btn variant="ghost" onClick={cancelForm}>Cancelar</Btn>
            <Btn onClick={saveForm}>Salvar</Btn>
          </div>
        </div>
      ) : null}
    </BaseModal>
  );
}
