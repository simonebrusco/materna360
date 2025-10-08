import React from "react";

export default function VitrineSummary(){
  return (
    <article className="block" aria-label="Descobrir">
      <h3>Descobrir</h3>
      <p className="small">Sugestões e vitrine de hoje</p>
      <div style={{marginTop:8}}>
        <a className="btn btn-primary" href="/descobrir?view=vitrine">Abrir</a>
        <a className="btn btn-ghost" href="/descobrir?view=vitrine" style={{marginLeft:8}}>Ver mais</a>
      </div>
    </article>
  );
}
