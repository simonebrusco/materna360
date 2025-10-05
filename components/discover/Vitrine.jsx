"use client";
import { useEffect, useState } from "react";
import Btn from "../ui/Btn";
import { getCategories, getSubfilters, getProducts } from "../../lib/products";
import { getLastProductsCategory, setLastProductsCategory } from "../../lib/storage";
import ProductModal from "./ProductModal";

const PER_PAGE = 8;

function CategoryTabs({ cats, value, onChange }) {
  return (
    <div className="chips-row">
      {cats.map((c) => (
        <button
          key={c.key}
          onClick={() => onChange(c.key)}
          className={`chip ${value===c.key ? "is-active" : ""}`}
          aria-pressed={value===c.key}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}

function ProductCard({ p, onOpen }) {
  const hasBrand = !!p.brand;
  const hasPrice = typeof p.price === "number";
  return (
    <div className="card rec" style={{position:"relative"}}>
      {/* badges */}
      {(p.badges?.length>0) && (
        <div style={{position:'absolute', left:8, top:8, display:'flex', gap:6, zIndex:1}}>
          {p.badges.slice(0,2).map((b,idx)=> (
            <span key={idx} style={{background:'#FF2B6A', color:'#fff', borderRadius:999, padding:'2px 8px', fontSize:11, fontWeight:700, boxShadow:'var(--shadow-soft)'}}>{b}</span>
          ))}
        </div>
      )}
      <img src={p.img} alt={p.title} className="thumb" />
      <div className="card-title" style={{fontWeight:600, marginTop:6}}>{p.title}</div>
      {hasBrand ? <div className="small" style={{opacity:.8}}>{p.brand}</div> : null}
      {hasPrice ? <div className="card-price" style={{fontWeight:700, marginTop:6}}>R$ {p.price?.toFixed?.(2)}</div> : null}
      <div className="rec-actions">
        <Btn onClick={() => onOpen(p)}>Detalhes</Btn>
      </div>
    </div>
  );
}

export default function Vitrine({ age = "3-4" }) {
  const cats = getCategories();
  const storedCat = getLastProductsCategory();
  const initialCat = cats.some(c=>c.key===storedCat) ? storedCat : (cats[0]?.key || "books");

  const [category, setCategory] = useState(initialCat);
  const [sub, setSub] = useState(null);
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null);

  const subfilters = getSubfilters(category);
  const allItems = getProducts(category, age, sub);
  const total = allItems.length;
  const start = (page-1)*PER_PAGE;
  const items = allItems.slice(start, start+PER_PAGE);

  function changeCategory(c) {
    setCategory(c);
    setLastProductsCategory(c);
    setSub(null);
    setPage(1);
  }

  const maxPage = Math.max(1, Math.ceil(total / PER_PAGE));

  return (
    <div style={{marginTop:16}}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8}}>
        <h3 className="h3">Recomendações</h3>
      </div>
      <CategoryTabs cats={cats} value={category} onChange={changeCategory} />

      {subfilters.length>0 && (
        <div className="chips-row" style={{marginTop:8}}>
          {subfilters.map((s)=> (
            <button key={s} onClick={()=>{ setSub(prev=>prev===s?null:s); setPage(1); }} className={`chip ${sub===s?"is-active":""}`}>{s}</button>
          ))}
        </div>
      )}

      <div className="grid-recs">
        {items.map((p) => {
          const normalized = { ...p, links: p.links || { ...(p.amazon ? { amazon: p.amazon } : {}), ...(p.shopee ? { shopee: p.shopee } : {}) } };
          return (
            <ProductCard key={p.id} p={normalized} onOpen={(prod) => { setSelected(normalized); setShow(true); }} />
          );
        })}
        {items.length === 0 && (
          <div className="card" style={{border:'1px dashed #FFD6E5', textAlign:'center'}}>
            Nada por aqui para este filtro.
          </div>
        )}
      </div>

      {maxPage > 1 && (
        <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:8, marginTop:12}}>
          <Btn variant="ghost" onClick={() => setPage((p) => Math.max(1, p - 1))}>Anterior</Btn>
          <span className="small">Página {page} de {maxPage}</span>
          <Btn variant="ghost" onClick={() => setPage((p) => Math.min(maxPage, p + 1))}>Próxima</Btn>
        </div>
      )}

      <ProductModal open={show} onClose={() => setShow(false)} product={selected} />
    </div>
  );
}
