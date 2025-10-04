import Header from "../../components/Header";
import Card from "../../components/ui/Card";
import Btn from "../../components/ui/Btn";
export const metadata={ title:"Eu360 • Materna360" };
export default function Eu360(){
  return (
    <div className="container">
      <Header name="Simone"/>
      <Card>
        <strong>Círculo 360</strong>
        <p style={{margin:"8px 0 12px"}}>Uma reflexão suave para hoje.</p>
        <Btn>Ouvir agora</Btn>
      </Card>
      <div className="divider"/>
      <div className="grid-2">
        <Card><strong>Humor da semana</strong><p>Resumo visual em breve.</p></Card>
        <Card><strong>Gratidão</strong><p>Registre uma linha por dia.</p><Btn variant="ghost">Anotar</Btn></Card>
      </div>
      <div className="divider"/>
      <Card><strong>Minhas conquistas</strong><p>Pequenos passos contam muito 💖</p></Card>
    </div>
  );
}
