"use client";
import React, { useEffect } from "react";
import BaseModal from "../modals/BaseModal";

export default function ProductModal({ open, onClose = () => {}, product }){
  useEffect(()=>{
    function onKey(e){ if (e.key === 'Escape') onClose(); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!product) return null;

  return (
    <BaseModal open={open} onClose={onClose}>
      <div style={{display:"grid", gap:12}}>
        <img src={product.img} alt={product.title} style={{width:"100%", aspectRatio:"3 / 2", objectFit:"cover", borderRadius:16}} />
        <div className="m360-modal-title">{product.title}</div>
        <div className="m360-modal-text">Onde encontrar</div>
        <div className="m360-actions" style={{justifyContent:"flex-start"}}>
          <a className="btn btn-primary" href={product?.links?.amazon || '#'} target="_blank" rel="noopener noreferrer">Ver na Amazon</a>
          <a className="btn btn-primary" href={product?.links?.shopee || '#'} target="_blank" rel="noopener noreferrer">Ver na Shopee</a>
        </div>
        <div className="m360-actions">
          <button className="btn btn-ghost" onClick={onClose}>Fechar</button>
        </div>
      </div>
    </BaseModal>
  );
}
