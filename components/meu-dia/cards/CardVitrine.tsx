"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "../../ui/Icon";
import { getLastProductsCategory } from "../../../lib/storage";

export default function CardVitrine(){
  const [cat, setCat] = useState<string>("");

  useEffect(()=>{ try{ setCat(getLastProductsCategory()); }catch{ setCat(""); } },[]);

  function win(){ try{ window.dispatchEvent(new CustomEvent('m360:win', { detail:{ source:'hub', action:'vitrine' } })); }catch{} }

  return (
    <div className="hub-card tap-scale">
      <div className="hub-card-head">
        <Icon name="shop" className="icon-20 icon-accent" />
        <div className="hub-card-titles">
          <div className="hub-card-title">Vitrine</div>
          <div className="hub-card-sub">Curadoria de produtos</div>
        </div>
      </div>
      <div className="hub-card-body">
        <div className="hub-meta">Última categoria: {cat || 'Livros'}</div>
      </div>
      <div className="hub-card-actions">
        <Link className="btn btn-primary" href="/descobrir" onClick={win}>Abrir vitrine</Link>
        <Link className="btn btn-outline" href="/descobrir">ver mais</Link>
      </div>
    </div>
  );
}
