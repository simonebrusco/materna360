"use client";

import Link from "next/link";
import Icon from "../../ui/Icon";

export default function CardMomentoMim(){
  function win(){ try{ window.dispatchEvent(new CustomEvent('m360:win', { detail:{ source:'hub', action:'momento-mim' } })); }catch{} }
  return (
    <div className="hub-card tap-scale">
      <div className="hub-card-head">
        <Icon name="pause" className="icon-20 icon-accent" />
        <div className="hub-card-titles">
          <div className="hub-card-title">Momento para Mim</div>
          <div className="hub-card-sub">Pequena pausa de cuidado</div>
        </div>
      </div>
      <div className="hub-card-body">
        <div className="hub-meta">Reserve 3 a 5 minutos</div>
      </div>
      <div className="hub-card-actions">
        <Link className="btn btn-primary" href="/" onClick={win}>Fazer agora</Link>
        <Link className="btn btn-outline" href="/">ver mais</Link>
      </div>
    </div>
  );
}
