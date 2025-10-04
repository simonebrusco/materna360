import Card from "../../components/ui/Card";
import NavyCard from "../../components/ui/NavyCard";
import Btn from "../../components/ui/Btn";
import RecipeOfTheDay from "../../components/cuidar/RecipeOfTheDay";

export const metadata={title:"Cuidar • Materna360"};

export default function Cuidar(){
  return (
    <div className="container">
      <h1 className="h1">Cuidar</h1>

      <div className="grid-2">
        <NavyCard><div className="iconToken">🧘‍♀️</div><div>Meditar</div></NavyCard>
        <NavyCard><div className="iconToken">💬</div><div>Mentoria</div></NavyCard>
      </div>

      <div className="space"></div>

      <RecipeOfTheDay />

      <div className="space"></div>

      <h3 className="h3" style={{margin:"0 0 10px",fontWeight:800}}>Faça uma pausa</h3>
      <div className="grid-2">
        <NavyCard><div className="iconToken">◐</div><div>Respirar</div></NavyCard>
        <NavyCard><div className="iconToken">🎵</div><div>Alegrar</div></NavyCard>
      </div>
    </div>
  );
}
