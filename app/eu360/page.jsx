import Card from "../../components/ui/Card";
import Btn from "../../components/ui/Btn";

export const metadata={title:"Eu360 • Materna360"};

export default function Eu360(){
  return (
    <div className="container">
      <h1 className="h1">Eu360</h1>

      <Card className="card-navy" style={{color:"#fff",background:"#0C1A2B",display:"grid",gridTemplateColumns:"140px 1fr",gap:18,alignItems:"center"}}>
        <div className="ring" style={{"--p":"72%",background:"conic-gradient(#FF3B84 var(--p), rgba(255,255,255,.25) 0)"}}>
          <div>Círculo<br/>350</div>
        </div>
        <div>
          <div style={{fontWeight:800,marginBottom:6}}>Você é importante</div>
          <div className="small" style={{opacity:.9}}>Siga no seu ritmo 💛</div>
        </div>
      </Card>

      <div className="space"></div>

      <Card>
        <strong>Converse com alguém da sua rede</strong>
        <p className="small">Troque experiências, sem julgamentos.</p>
        <Btn variant="solid">Iniciar conversa</Btn>
      </Card>

      <div className="space"></div>

      <Card>
        <strong>Humor da semana</strong>
        <div style={{display:"flex",alignItems:"center",gap:10,marginTop:8}}>
          <div className="iconToken" style={{color:"var(--navy)",borderColor:"var(--navy)"}}>🙂</div>
          <div className="small">Feliz</div>
        </div>
      </Card>

      <div className="space"></div>

      <Card>
        <strong>Conquistas</strong>
        <div className="small" style={{marginTop:8}}>2 metas alcançadas</div>
      </Card>

      <div className="space"></div>

      <Card>
        <strong>Gratidão</strong>
        <div className="space"></div>
        <Btn>Registrar</Btn>
      </Card>
      <div className="space"></div>
      <Card>
        <strong>Preciso de ajuda agora</strong>
        <p className="small">Conte com apoio imediato. Você não está sozinha.</p>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          <a className="btn" href="#" rel="noreferrer">Contatos de apoio</a>
          <a className="btn btn-ghost" href="#" rel="noreferrer">Ver recursos</a>
        </div>
      </Card>
    </div>
  );
}
