'use client';
import { useEffect, useState } from 'react';
import { getDayData, setNote, addItem, addEvent } from '../lib/plannerNotes';

export default function PlannerDrawer({ open, onClose }) {
  const [data, setData] = useState(getDayData());
  const [txt, setTxt] = useState('');
  const [evtTxt, setEvtTxt] = useState('');
  const [evtTime, setEvtTime] = useState('09:00');

  useEffect(() => { if (open) setData(getDayData()); }, [open]);
  if (!open) return null;

  return (
    <div className="planner-overlay" onClick={onClose}>
      <div className="planner-drawer" onClick={(e) => e.stopPropagation()}>
        <h3 className="planner-title">Planner do dia</h3>

        <label className="planner-label">Nota rápida</label>
        <textarea
          value={data.note}
          onChange={(e) => setData({ ...data, note: e.target.value })}
          onBlur={() => setData(setNote(data.note))}
          className="planner-textarea"
        />

        <div className="planner-grid-2">
          <input value={txt} onChange={(e) => setTxt(e.target.value)} placeholder="Salvar atividade/receita..." className="planner-input"/>
          <button onClick={() => { if (!txt) return; setData(addItem(txt)); setTxt(''); }} className="planner-btn">Adicionar</button>
        </div>

        <div className="planner-grid-3">
          <input type="time" value={evtTime} onChange={(e) => setEvtTime(e.target.value)} className="planner-input"/>
          <input value={evtTxt} onChange={(e) => setEvtTxt(e.target.value)} placeholder="Compromisso" className="planner-input"/>
          <button onClick={() => { if (!evtTxt) return; setData(addEvent({ time: evtTime, txt: evtTxt })); setEvtTxt(''); }} className="planner-btn">Agendar</button>
        </div>

        <h4 className="planner-subtitle">Itens salvos</h4>
        <ul className="planner-list">
          {data.items.map((i) => <li key={i.id}>{i.txt}</li>)}
        </ul>

        <h4>Compromissos</h4>
        <ul className="planner-list">
          {data.events.map((e) => <li key={e.id}>{e.time} — {e.txt}</li>)}
        </ul>
      </div>
    </div>
  );
}
