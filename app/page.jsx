import MessageOfDayCard from "../components/motd/MessageOfDayCard";
import HomeClient from "../components/HomeClient";

export default function Page(){
  // Render deterministic static HTML on the server to avoid hydration mismatches.
  return (
    <div className="container">
      <h1 className="h1">Bom dia, Simone <span>💛</span></h1>
      <p className="sub">Como você está hoje?</p>

      <div className="grid-2">
        <div className="card">
          <strong className="motd-title">“Mensagem do dia”</strong>
          <p className="small motd-text">Com você, por você. Força.</p>
          <button className="btn btn-primary">Nova mensagem</button>
        </div>

        <div className="card">
          <div style={{display:"grid",gridTemplateColumns:"48px 1fr",gap:12,alignItems:"center"}}>
            <div className="iconToken">🙂</div>
            <div>
              <div style={{fontWeight:800}}>Como você se sente?</div>
              <div className="small" style={{opacity:.75}}>Toque para registrar</div>
            </div>
          </div>
        </div>
      </div>

      <div className="space"></div>

      <div className="actions-grid">
        <div className="card card-navy"><div className="iconToken">◐</div><div>Respirar</div></div>
        <div className="card" style={{minHeight:110,display:"grid",placeItems:"center"}}><div className="iconStack"><div className="iconToken">♡</div><div>Refletir</div></div></div>
        <div className="card card-navy"><div className="iconToken">🔔</div><div>Inspirar</div></div>
        <div className="card" style={{minHeight:110,display:"grid",placeItems:"center"}}><div className="iconStack"><div className="iconToken">Ⅱ</div><div>Pausar</div></div></div>
      </div>

      <HomeClient />
    </div>
  );
}
