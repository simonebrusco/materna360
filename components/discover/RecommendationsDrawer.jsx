"use client";
import { useMemo, useState } from "react";
import BaseModal from "../modals/BaseModal";
import CloseX from "../ui/CloseX";
import { productCatalog } from "../../lib/recs";

const UI_CATS = ["Books","Toys"]; // room for Courses later
function mapCatToKey(cat){ return cat === "Books" ? "Livros" : cat === "Toys" ? "Brinquedos" : "Livros"; }

export default function RecommendationsDrawer({ age }){
  const [open, setOpen] = useState(false);
  const [cat, setCat] = useState("Books");
  const data = useMemo(()=>{
    const key = mapCatToKey(cat);
    const byAge = productCatalog?.[key]?.[age] || [];
    return Array.isArray(byAge) ? byAge : [];
  }, [cat, age]);

  return (
    <>
      <button className="btn btn-ghost" onClick={()=>setOpen(true)}>Recommendations</button>
      <BaseModal open={open} onClose={()=>setOpen(false)}>
        <div className="modal-head" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div className="title">Recommendations — {cat} • {age}</div>
          <CloseX onClick={()=>setOpen(false)} />
        </div>
        <div className="chips-row" role="tablist" aria-label="Categorias">
          {UI_CATS.map(c => (
            <button key={c} className={`chip ${c===cat?"is-active":""}`} onClick={()=>setCat(c)}>{c}</button>
          ))}
        </div>
        <div className="grid-recs" style={{marginTop:12}}>
          {data.map((p, idx) => (
            <ProductCard key={idx} product={p} />
          ))}
        </div>
      </BaseModal>
    </>
  );
}

function ProductCard({ product }){
  const [more, setMore] = useState(false);
  const img = product?.image || "";
  return (
    <div className="card rec">
      {img ? <img src={img} alt={product?.title||""} className="thumb" /> : <div className="thumb" style={{height:120,background:"rgba(13,27,42,.06)",borderRadius:12}} />}
      <div className="card-title">{product?.title || "Untitled"}</div>
      {product?.blurb ? <div className="card-desc small" style={{opacity:.9}}>{product.blurb}</div> : null}
      <div style={{display:"flex",gap:8,marginTop:8}}>
        <button className="btn btn-primary" onClick={()=>{ if (product?.url) window.open(product.url, "_blank", "noopener"); }}>View</button>
        <button className="btn btn-ghost" onClick={()=>setMore(v=>!v)}>{more?"Less":"More"}</button>
      </div>
      {more && product?.blurb ? (
        <ul className="small" style={{marginTop:8,opacity:.9}}>
          <li>{product.blurb}</li>
        </ul>
      ) : null}
    </div>
  );
}
