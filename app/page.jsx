import Card from "../components/ui/Card";
import NavyCard from "../components/ui/NavyCard";
import Btn from "../components/ui/Btn";

export default function Home(){
  return (
    <div className="container">
      <h1 className="h1">Bom dia, Simone <span>💛</span></h1>
      <p className="sub">Como você está hoje? 😌</p>

      <div className="grid-2">
        <Card>
          <strong style={{display:"block",marginBottom:8}}>“Mensagem do dia”</strong>
          <p className="small" style={{margin:"0 0 12px"}}>Com você, por você. Força.</p>
          <Btn>Nova mensagem</Btn>
        </Card>

        <Card>
          <div style={{display:"grid",gridTemplateColumns:"48px 1fr",gap:12,alignItems:"center"}}>
            <div className="iconToken" style={{color:"#0C1A2B",borderColor:"#0C1A2B"}}>🙂</div>
            <div>
              <div style={{fontWeight:800}}>Como você se sente?</div>
              <div className="small" style={{opacity:.75}}>Toque para registrar</div>
            </div>
          </div>
        </Card>
      </div>

      <div className="space"></div>

      <div className="grid-2">
        <NavyCard><div className="iconToken">◐</div><div>Respirar</div></NavyCard>
        <NavyCard><div className="iconToken">♡</div><div>Refletir</div></NavyCard>
        <NavyCard><div className="iconToken">🔔</div><div>Inspirar</div></NavyCard>
        <NavyCard><div className="iconToken">Ⅱ</div><div>Pausar</div></NavyCard>
      </div>

      <div className="space"></div>

      <Card className="card-navy" style={{color:"#fff",background:"#0C1A2B"}}>
        <div style={{fontWeight:800,marginBottom:6}}>Seu bem-estar também é importante</div>
        <div className="small" style={{opacity:.9}}>Dicas simples para o seu dia.</div>
      </Card>
    </div>
  );
}
