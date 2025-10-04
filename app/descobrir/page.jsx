import Card from "../../components/ui/Card";
import NavyCard from "../../components/ui/NavyCard";
import Btn from "../../components/ui/Btn";
import ActivitiesByRange from "../../components/descobrir/ActivitiesByRange";

export const metadata={title:"Descobrir • Materna360"};

export default function Descobrir(){
  return (
    <div className="container">
      <h1 className="h1">Descobrir</h1>

      <Card className="card-navy">
        <div style={{fontWeight:800,marginBottom:6}}>Filtrar por idade</div>
        <ActivitiesByRange />
      </Card>

      <div className="space"></div>

      <div className="grid-2">
        <NavyCard><div className="iconToken">♡</div><div>Refletir</div></NavyCard>
        <NavyCard><div className="iconToken">🌙</div><div>Dormir</div></NavyCard>
      </div>
    </div>
  );
}
