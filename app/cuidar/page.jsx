import Header from "../../components/Header";
import Card from "../../components/ui/Card";
import Btn from "../../components/ui/Btn";
export const metadata={ title:"Cuidar • Materna360" };
export default function Cuidar(){
  return (
    <div className="container">
      <Header name="Simone"/>
      <div className="grid-2">
        <Card><strong>Respiração guiada</strong><p>5 minutos para você.</p><Btn>Começar</Btn></Card>
        <Card><strong>Pausa consciente</strong><p>Desacelere com carinho.</p><Btn variant="ghost">Iniciar</Btn></Card>
      </div>
      <div className="divider"/>
      <Card>
        <span className="badge">🍽️ Receitas por IA</span>
        <p style={{margin:"10px 0 12px"}}>Sugestões práticas e equilibradas para hoje.</p>
        <Btn variant="ghost">Ver sugestões</Btn>
      </Card>
    </div>
  );
}
