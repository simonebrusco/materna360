"use client";
import { useEffect, useState } from "react";
import Btn from "../ui/Btn";
import { productCatalog, PRODUCT_CATEGORIES } from "../../lib/products";
import { getLastProductsCategory, setLastProductsCategory } from "../../lib/storage";
import ProductModal from "./ProductModal";

const PER_PAGE = 8;

function CategoryTabs({ value, onChange }) {
  return (
    <div className="chips-row">
      {PRODUCT_CATEGORIES.map((c) => (
        <button
          key={c.key}
          onClick={() => onChange(c.key)}
          className={`chip ${value===c.key ? "is-active" : ""}`}
          aria-pressed={value===c.key}
        >
          <span style={{marginRight:6}}>{c.icon}</span>{c.label}
        </button>
      ))}
    </div>
  );
}

function ProductCard({ p, onOpen }) {
  const [err, setErr] = useState(false);
  return (
    <div className="card rec">
      {!err ? (
        <img
          src={p.img}
          alt={p.title}
          className="thumb-rect"
          loading="lazy"
          onError={() => setErr(true)}
        />
      ) : (
        <div className="m360-thumb-fallback" aria-label="Imagem indisponível">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <rect x="3" y="5" width="18" height="14" rx="3" stroke="#0D1B2A" strokeOpacity="0.9" strokeWidth="1.6"/>
            <circle cx="9" cy="10" r="2" stroke="#0D1B2A" strokeOpacity="0.9" strokeWidth="1.6"/>
            <path d="M21 17l-4.5-5-5.5 6" stroke="#0D1B2A" strokeOpacity="0.9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
      <div className="card-title" style={{fontWeight:600, marginTop:6}}>{p.title}</div>
      <div className="small" style={{opacity:.8}}>{p.brand}</div>
      <div className="card-price" style={{fontWeight:700, marginTop:6}}>R$ {p.price?.toFixed?.(2)}</div>
      <div className="rec-actions">
        <Btn onClick={() => onOpen(p)}>Detalhes</Btn>
      </div>
    </div>
  );
}

export default function Vitrine({ age = "3-4" }) {
  const [category, setCategory] = useState(getLastProductsCategory());
  const [page, setPage] = useState(1);
  const [{ items, total }, setData] = useState({ items: [], total: 0 });
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const { items, total } = productCatalog({ age, category, page, pageSize: PER_PAGE });
    setData({ items, total });
  }, [age, category, page]);

  function changeCategory(c) {
    setCategory(c);
    setLastProductsCategory(c);
    setPage(1);
  }

  const maxPage = Math.max(1, Math.ceil(total / PER_PAGE));

  return (
    <div style={{marginTop:16}}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8}}>
        <h3 className="h3">Recomendações</h3>
      </div>
      <CategoryTabs value={category} onChange={changeCategory} />

      <div className="grid-recs">
        {items.map((p) => (
          <ProductCard key={p.id} p={p} onOpen={(prod) => { setSelected(prod); setShow(true); }} />
        ))}
        {items.length === 0 && (
          <div className="card" style={{border:'1px dashed #FFD6E5', textAlign:'center'}}>
            Em breve mais sugestões para esta faixa. 💡
          </div>
        )}
      </div>

      {maxPage > 1 && (
        <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:8, marginTop:12}}>
          <Btn variant="ghost" onClick={() => setPage((p) => Math.max(1, p - 1))}>Anterior</Btn>
          <span className="small">{page} / {maxPage}</span>
          <Btn variant="ghost" onClick={() => setPage((p) => Math.min(maxPage, p + 1))}>Próxima</Btn>
        </div>
      )}

      <ProductModal open={show} onClose={() => setShow(false)} product={selected} />
    </div>
  );
}
