"use client";
import React, { useEffect, useRef } from "react";
import { productCatalog } from "../../lib/products";
import Btn from "../ui/Btn";

export default function ProductModal({ open, onClose, category, age, closeRef }){
  const wrapRef = useRef(null);

  useEffect(() => {
    function onKey(e){
      if(e.key === 'Escape') onClose && onClose();
      if(e.key === 'Tab'){
        const root = wrapRef.current;
        if (!root) return;
        const focusables = root.querySelectorAll('a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
        const list = Array.from(focusables).filter(el => !el.hasAttribute('disabled'));
        if (!list.length) return;
        const first = list[0];
        const last = list[list.length - 1];
        const active = document.activeElement;
        if (e.shiftKey) {
          if (active === first) { e.preventDefault(); last.focus(); }
        } else {
          if (active === last) { e.preventDefault(); first.focus(); }
        }
      }
    }
    if (open) { document.addEventListener('keydown', onKey); }
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  function onOverlay(e){ if (e.target === e.currentTarget) onClose && onClose(); }
  useEffect(()=>{ if(!open && closeRef?.current){ closeRef.current.focus(); } }, [open, closeRef]);

  if (!open || !category) return null;
  const list = productCatalog?.[category]?.[age] ?? [];

  return (
    <div className="m360-overlay" role="dialog" aria-modal="true" aria-label="Vitrine" onClick={onOverlay}>
      <div className="m360-modal" ref={wrapRef} role="document">
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8}}>
          <h3 className="m360-modal-title">{category === 'books' ? 'Livros' : 'Brinquedos'} • {age}</h3>
          <button onClick={onClose} aria-label="Fechar" className="btn btn-ghost" style={{padding:'6px 10px'}} autoFocus>✕</button>
        </div>
        <div className="grid-recs">
          {list.map((p) => (
            <div key={p.id} className="card rec">
              <img src={p.img} alt={p.title} className="thumb" />
              <div className="card-title" style={{fontWeight:600, marginTop:6}}>{p.title}</div>
              <div className="rec-actions">
                <a href={p.url} target="_blank" rel="noopener noreferrer"><Btn>Ver</Btn></a>
              </div>
            </div>
          ))}
          {list.length === 0 && (
            <div className="card" style={{textAlign:'center',border:'1px dashed #FFD6E5'}}>Em breve para esta faixa.</div>
          )}
        </div>
        <div className="m360-actions">
          <Btn variant="ghost" onClick={onClose}>Fechar</Btn>
        </div>
      </div>
    </div>
  );
}
