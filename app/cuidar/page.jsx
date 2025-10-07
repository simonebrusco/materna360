import Card from "../../components/ui/Card";
import NavyCard from "../../components/ui/NavyCard";
import Btn from "../../components/ui/Btn";
import MentoringCard from "../../components/mentoring/MentoringCard";

export default function Cuidar(){
  return (
    <div className="container">
      <h1 className="h1">Cuidar</h1>

      <div className="grid-2">
        <NavyCard><div className="iconToken">🧘‍♀️</div><div>Meditar</div></NavyCard>
        <MentoringCard />
      </div>

      <div className="space"></div>

      <Card className="card-navy">
        <div className="text-strong mb-6">Receita saudável</div>
        <div className="small">Omelete de espinafre</div>
      </Card>

      <div className="space"></div>

      <h3 className="h3 section-title-tight text-strong">Faça uma pausa</h3>
      <div className="grid-2">
        <NavyCard><div className="iconToken">◐</div><div>Respirar</div></NavyCard>
        <NavyCard><div className="iconToken">🎵</div><div>Alegrar</div></NavyCard>
      </div>
    </div>
  );
}
