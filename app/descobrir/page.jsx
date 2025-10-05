import Card from "../../components/ui/Card";
import NavyCard from "../../components/ui/NavyCard";
import Btn from "../../components/ui/Btn";
import AgeTitle from "../../components/discover/AgeTitle";

export const metadata={title:"Descobrir • Materna360"};

export default function Descobrir(){
  return (
    <div className="container">
      <h1 className="h1">Descobrir</h1>

      <Card className="card-navy">
        <div style={{display:"grid",gridTemplateColumns:"32px 1fr",gap:12,alignItems:"center"}}>
          <div className="iconToken">🐻</div>
          <div>
            <AgeTitle />
            <Btn variant="solid">Ver sugestões</Btn>
          </div>
        </div>
      </Card>

      <div className="space"></div>

      <div className="grid-2">
        <NavyCard><div className="iconToken">♡</div><div>Refletir</div></NavyCard>
        <NavyCard><div className="iconToken">🌙</div><div>Dormir</div></NavyCard>
      </div>
    </div>
  );
}
