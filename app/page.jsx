import Header from "../components/Header";
import CarouselRow from "../components/CarouselRow";
import Card from "../components/ui/Card";
import Btn from "../components/ui/Btn";
import QuickActions from "../components/QuickActions";

export default function Page(){
  return (
    <div className="container">
      <Header name="Simone"/>

      <CarouselRow>
        <Card>
          <strong>Mensagem do dia</strong>
          <p style={{margin:"8px 0 12px"}}>Com você, por você. Força.</p>
          <Btn>Nova mensagem</Btn>
        </Card>
        <Card>
          <strong>Como você se sente?</strong>
          <p style={{margin:"8px 0 12px",opacity:.9}}>🙂  😐  😔  🤩  😅</p>
          <Btn variant="ghost">Registrar humor</Btn>
        </Card>
        <Card>
          <strong>Mini Planner</strong>
          <p style={{margin:"8px 0 12px",opacity:.9}}>3/7 concluídos 💖</p>
          <Btn variant="ghost">Ver semana</Btn>
        </Card>
      </CarouselRow>

      <div style={{height:16}}/>
      <QuickActions/>

      <div style={{height:18}}/>
      <div className="quote">
        <strong>“Você está fazendo o seu melhor.”</strong>
        <div style={{height:10}}/>
        <Btn variant="ghost">Ouvir agora</Btn>
      </div>
    </div>
  );
}
