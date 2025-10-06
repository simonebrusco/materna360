import React from "react";
import Card from "../../components/ui/Card";
import NavyCard from "../../components/ui/NavyCard";
import Btn from "../../components/ui/Btn";
import HealthyRecipeModal from "../../components/recipes/HealthyRecipeModal";
import MentoringCard from "../../components/mentoring/MentoringCard";
import { getLastAgeGroup } from "../../lib/storage";

export default function Cuidar(){
  const [recipeOpen, setRecipeOpen] = React.useState(false);
  const [ageRange] = React.useState(getLastAgeGroup ? getLastAgeGroup() : "3-4");
  const [place] = React.useState("home");

  return (
    <div className="container">
      <h1 className="h1">Cuidar</h1>

      <div className="grid-2">
        <NavyCard><div className="iconToken">🧘‍♀️</div><div>Meditar</div></NavyCard>
        <MentoringCard />
      </div>

      <div className="space"></div>

      <Card className="card-navy">
        <div style={{fontWeight:800,marginBottom:6}}>Receita saudável</div>
        <div className="small" style={{opacity:.9, marginBottom:12}}>Omelete de espinafre</div>
        <Btn onClick={() => setRecipeOpen(true)}>Ver sugestões</Btn>
      </Card>

      <HealthyRecipeModal isOpen={recipeOpen} onClose={() => setRecipeOpen(false)} ageRange={ageRange} place={place} />

      <div className="space"></div>

      <h3 className="h3" style={{margin:"0 0 10px",fontWeight:800}}>Faça uma pausa</h3>
      <div className="grid-2">
        <NavyCard><div className="iconToken">◐</div><div>Respirar</div></NavyCard>
        <NavyCard><div className="iconToken">🎵</div><div>Alegrar</div></NavyCard>
      </div>
    </div>
  );
}
