"use client";
import Btn from "../ui/Btn";

export default function ProductModal({ open, onClose, product }) {
  if (!open || !product) return null;
  const vendors = Object.entries(product.links || {});
  return (
    <div className="m360-overlay" role="dialog" aria-modal="true">
      <div className="m360-modal">
        <div className="m360-modal-head" style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8}}>
          <h3 className="m360-modal-title">{product.title}</h3>
          <button onClick={onClose} aria-label="Fechar" className="btn btn-ghost" style={{padding:'6px 10px'}}>✕</button>
        </div>
        <div className="m360-modal-body" style={{display:'grid', gap:12, gridTemplateColumns: '1fr', alignItems:'start'}}>
          <div>
            <img alt={product.title} src={product.img} className="thumb" />
          </div>
          <div>
            <p className="m360-modal-text">{product.desc}</p>
            <p className="small" style={{marginTop:6}}>Marca: {product.brand}</p>
            <p className="m360-modal-text" style={{fontWeight:700, marginTop:6}}>R$ {product.price?.toFixed?.(2)}</p>
            <div className="m360-actions" style={{flexWrap:'wrap', gap:8}}>
              {vendors.map(([key, href]) => (
                <a key={key} href={href} target="_blank" rel="noopener noreferrer">
                  <Btn>{key === "amazon" ? "Ver na loja" : key === "shopee" ? "Ver na loja" : "Ver opção"}</Btn>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="m360-actions">
          <Btn variant="ghost" onClick={onClose}>Fechar</Btn>
        </div>
      </div>
    </div>
  );
}
