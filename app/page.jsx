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
        <Card style={{minHeight:110,display:"grid",placeItems:"center"}}><div className="iconStack"><div className="iconToken" style={{color:"var(--navy)",borderColor:"var(--navy)"}}>♡</div><div>Refletir</div></div></Card>
        <NavyCard><div className="iconToken">🔔</div><div>Inspirar</div></NavyCard>
        <Card style={{minHeight:110,display:"grid",placeItems:"center"}}><div className="iconStack"><div className="iconToken" style={{color:"var(--navy)",borderColor:"var(--navy)"}}>Ⅱ</div><div>Pausar</div></div></Card>
      </div>

      <div className="space"></div>

      <Card>
        <strong>Planner da semana</strong>
        <div style={{display:"flex",gap:12,marginTop:10}}>
          {["S","T","Q","Q","S","S","D"].map((d,i)=>(
            <div key={i} style={{width:28,height:28,borderRadius:14,display:"grid",placeItems:"center",background:i===0?"#FF005E":"#EAEFF6",color:i===0?"#fff":"#0C1A2B"}}>{d}</div>
          ))}
        </div>
        <p className="small" style={{marginTop:8}}>0/7 concluídos 💖</p>
      </Card>

      <div className="space"></div>

      <Card>
        <strong>Afirmação de hoje</strong>
        <p className="small" style={{marginTop:6}}>“Eu me acolho no meu ritmo.”</p>
        <Btn variant="ghost">Ver outra</Btn>
      </Card>

      <div className="space"></div>

      <Card className="card-navy" style={{color:"#fff",background:"#0C1A2B"}}>
        <div style={{fontWeight:800,marginBottom:6}}>Seu bem-estar também é importante</div>
        <div className="small" style={{opacity:.9}}>Dicas simples para o seu dia.</div>
      </Card>
    </div>
  );
}
