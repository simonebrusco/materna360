import Header from "../../components/Header";
import Card from "../../components/ui/Card";
import Btn from "../../components/ui/Btn";
export const metadata={ title:"Descobrir • Materna360" };
export default function Descobrir(){
  return (
    <div className="container">
      <Header name="Simone"/>
      <Card>
        <strong>Atividades por faixa etária (IA)</strong>
        <p style={{margin:"8px 0 12px"}}>Encontre ideias leves e educativas.</p>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {["0-2","3-4","5-7","8-10","11+"].map(a=>(
            <button key={a} className="btn-outline" style={{padding:"8px 12px"}}>{a} anos</button>
          ))}
        </div>
      </Card>
      <div className="divider"/>
      <div className="grid-2">
        <Card><strong>Livros indicados</strong><p>Links Amazon/Shopee.</p><Btn variant="ghost">Ver</Btn></Card>
        <Card><strong>Brinquedos</strong><p>Curadoria afetiva.</p><Btn variant="ghost">Explorar</Btn></Card>
      </div>
    </div>
  );
}
