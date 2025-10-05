"use client";
import React, { useMemo, useState } from "react";
import Card from "../ui/Card";
import Btn from "../ui/Btn";
import ProductModal from "./ProductModal";

export default function Vitrine({ categories = [], productsByCategory = {}, pageSize = 6 }){
  const [active, setActive] = useState(categories[0] || "");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState(null);

  const items = Array.isArray(productsByCategory?.[active]) ? productsByCategory[active] : [];
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const pageItems = useMemo(()=> items.slice((page-1)*pageSize, page*pageSize), [items, page, pageSize]);

  function view(p){ setSel(p); setOpen(true); }

  return (
    <section style={{marginTop:16}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:10, marginBottom:10}}>
        <div className="h3" style={{margin:0}}>Recomendações</div>
      </div>
      <div className="chips-row" role="tablist" aria-label="Categorias">
        {categories.map(c => (
          <button key={c} className={`chip ${active===c?"is-active":""}`} onClick={()=>{ setActive(c); setPage(1); }} role="tab" aria-selected={active===c}>{c}</button>
        ))}
      </div>

      <div className="grid-recs">
        {pageItems.map((p) => (
          <div key={p.id} className="card rec" style={{display:"grid", gap:10}}>
            <img src={p.img} alt={p.title} className="thumb" style={{aspectRatio:"3 / 2"}} />
            <div style={{fontWeight:700}}>{p.title}</div>
            <Btn onClick={()=>view(p)}>Ver</Btn>
          </div>
        ))}
      </div>

      {items.length > pageSize ? (
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:10, marginTop:12}}>
          <button className="btn btn-ghost" onClick={()=> setPage(p=> Math.max(1, p-1))} disabled={page===1}>Prev</button>
          <div className="small" style={{opacity:.7}}>{page}/{totalPages}</div>
          <button className="btn btn-ghost" onClick={()=> setPage(p=> Math.min(totalPages, p+1))} disabled={page===totalPages}>Next</button>
        </div>
      ) : null}

      <ProductModal open={open} onClose={()=>setOpen(false)} product={sel} />
    </section>
  );
}
