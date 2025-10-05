"use client";
import { useState } from "react";
import Card from "../../components/ui/Card";
import NavyCard from "../../components/ui/NavyCard";
import Btn from "../../components/ui/Btn";
import RecipeModal from "../../components/cuidar/RecipeModal";

export default function Cuidar(){
  const [showRecipe, setShowRecipe] = useState(false);
  const wa = process.env.NEXT_PUBLIC_MENTOR_WHATSAPP || "#";
  const cal = process.env.NEXT_PUBLIC_MENTOR_CALENDLY || "#";

  return (
    <div className="container">
      <h1 className="h1">Cuidar</h1>

      <div className="grid-2">
        <NavyCard><div className="iconToken">🧘‍♀️</div><div>Meditar</div></NavyCard>
        <Card>
          <div style={{display:"grid",gridTemplateColumns:"32px 1fr",gap:12,alignItems:"center", marginBottom:8}}>
            <div className="iconToken">💬</div>
            <div>
              <div style={{fontWeight:800}}>Mentoria</div>
              <div className="small" style={{opacity:.8}}>Pergunte o que quiser ou agende um encontro.</div>
            </div>
          </div>
          <div style={{display:"flex", gap:10}}>
            <a href={wa} target="_blank" rel="noopener noreferrer"><Btn>Enviar pergunta</Btn></a>
            <a href={cal} target="_blank" rel="noopener noreferrer"><Btn variant="ghost">Agendar mentoria</Btn></a>
          </div>
        </Card>
      </div>

      <div className="space"></div>

      <Card className="card-navy">
        <div style={{fontWeight:800,marginBottom:6}}>Receita saudável</div>
        <div className="small" style={{opacity:.9}}>Ideias rápidas e gostosas para agora.</div>
        <div style={{marginTop:12}}>
          <Btn onClick={()=> setShowRecipe(true)}>Ver sugestão</Btn>
        </div>
      </Card>

      <div className="space"></div>

      <h3 className="h3" style={{margin:"0 0 10px",fontWeight:800}}>Faça uma pausa</h3>
      <div className="grid-2">
        <NavyCard><div className="iconToken">◐</div><div>Respirar</div></NavyCard>
        <NavyCard><div className="iconToken">🎵</div><div>Alegrar</div></NavyCard>
      </div>

      <RecipeModal open={showRecipe} onClose={()=> setShowRecipe(false)} />
    </div>
  );
}
