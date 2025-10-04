import Card from "../../components/ui/Card";
import NavyCard from "../../components/ui/NavyCard";
import Btn from "../../components/ui/Btn";

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

      <Card className="card-navy" style={{color:"#fff",background:"#0C1A2B"}}>
        <div style={{fontWeight:800,marginBottom:6}}>Receita saudável</div>
        <div className="small" style={{opacity:.9}}>Omelete de espinafre</div>
      </Card>

      <div className="space"></div>

      <h3 className="h3" style={{margin:"0 0 10px",fontWeight:800}}>Faça uma pausa</h3>
      <div className="grid-2">
        <NavyCard><div className="iconToken">◐</div><div>Respirar</div></NavyCard>
        <NavyCard><div className="iconToken">🎵</div><div>Alegrar</div></NavyCard>
      </div>
    </div>
  );
}
