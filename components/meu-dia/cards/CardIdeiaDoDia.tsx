"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "../../ui/Icon";
import { getLastAgeGroup, getLastContext } from "../../../lib/storage";
import { generateIdeas } from "../../../lib/ideas";

export default function CardIdeiaDoDia(){
  const [title, setTitle] = useState<string>("");

  useEffect(()=>{
    try{
      const age = getLastAgeGroup("3-4");
      const ctx = getLastContext("Casa");
      const ideas = generateIdeas(age, ctx);
      setTitle(ideas?.[0]?.title || "");
    }catch{ setTitle(""); }
  },[]);

  function win(){ try{ window.dispatchEvent(new CustomEvent('m360:win', { detail:{ source:'hub', action:'ideia' } })); }catch{} }

  return (
    <div className="hub-card tap-scale">
      <div className="hub-card-head">
        <Icon name="light" className="icon-20 icon-accent" />
        <div className="hub-card-titles">
          <div className="hub-card-title">Ideia do Dia</div>
          <div className="hub-card-sub">Uma atividade simples</div>
        </div>
      </div>
      <div className="hub-card-body">
        {title && <div className="hub-meta">{title}</div>}
      </div>
      <div className="hub-card-actions">
        <Link className="btn btn-primary" href="/descobrir" onClick={win}>Fazer agora</Link>
        <Link className="btn btn-outline" href="/descobrir">ver mais</Link>
      </div>
    </div>
  );
}
