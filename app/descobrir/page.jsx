import Card from "../../components/ui/Card";
import NavyCard from "../../components/ui/NavyCard";
import Btn from "../../components/ui/Btn";

export const metadata={title:"Descobrir • Materna360"};

export default function Descobrir(){
  const ages = ["0–2", "3–4", "5–7", "8+"];
  return (
    <div className="container">
      <h1 className="h1">Descobrir</h1>

      <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap"}}>
        {ages.map(a=> <span key={a} className="badge" style={{background:"#FFE6F1",color:"#B80045"}}>{a}</span>)}
      </div>

      <Card className="card-navy" style={{color:"#fff",background:"#0C1A2B"}}>
        <div style={{display:"grid",gridTemplateColumns:"32px 1fr",gap:12,alignItems:"center"}}>
          <div className="iconToken" style={{borderColor:"#fff"}}>🐻</div>
          <div>
            <div style={{fontWeight:800,marginBottom:6}}>Atividades para 3 a 4 anos</div>
            <Btn variant="solid">Ver sugestões</Btn>
          </div>
        </div>
      </Card>

      <div className="space"></div>

      <div className="grid-2">
        <NavyCard><div className="iconToken">♡</div><div>Refletir</div></NavyCard>
        <NavyCard><div className="iconToken">🌙</div><div>Dormir</div></NavyCard>
      </div>

      <div className="space"></div>
      <h3 className="h3" style={{fontWeight:800,margin:"0 0 10px"}}>Indicações</h3>
      <div className="grid-2">
        <Card>
          <strong>Livro: “Maternidade Real”</strong>
          <p className="small">Leve, honesto e acolhedor.</p>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <a className="btn" href="#" target="_blank" rel="noreferrer">Ver na Amazon</a>
            <a className="btn btn-ghost" href="#" target="_blank" rel="noreferrer">Ver na Shopee</a>
          </div>
        </Card>
        <Card>
          <strong>Brinquedo: Blocos sensoriais</strong>
          <p className="small">Estimula coordenação &amp; foco.</p>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <a className="btn" href="#" target="_blank" rel="noreferrer">Ver na Amazon</a>
            <a className="btn btn-ghost" href="#" target="_blank" rel="noreferrer">Ver na Shopee</a>
          </div>
        </Card>
      </div>
    </div>
  );
}
