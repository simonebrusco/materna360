"use client";
import React from "react";

export default function MentoringCard({ onClick }){
  return (
    <div className="card-navy" style={{minHeight:110,display:"grid",placeItems:"center",cursor:"pointer"}} onClick={onClick}>
      <div className="iconStack">
        <div className="iconToken">💬</div>
        <div style={{textAlign:"center"}}>
          <div style={{fontWeight:700}}>Mentoria</div>
          <div style={{fontSize:14, color:"#0F1B2D", opacity:.7, marginTop:4}}>Converse comigo sobre o seu momento.</div>
        </div>
      </div>
    </div>
  );
}
