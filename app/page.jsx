import Btn from "../components/ui/Btn";

export default function Home() {
  return (
    <div className="container">
      <section className="stack-xl">
        <header className="stack-xs">
          <h1 className="title-hero">Bom dia, Simone <span className="emoji">💛</span></h1>
          <p className="muted">Como você está hoje? 😊</p>
        </header>

        <div className="grid-2">
          <div className="card">
            <h3>“Mensagem do dia”</h3>
            <p>Com você, por você. Força.</p>
            <Btn variant="primary" className="mt-2">Nova mensagem</Btn>
          </div>

          <div className="card">
            <div className="row-start">
              <span className="badge-emoji">🙂</span>
              <div>
                <h3>Como você se sente?</h3>
                <p className="muted">Toque para registrar</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid-2">
          <div className="card center">
            <span className="badge-emoji">⏱️</span>
            <h4>Respirar</h4>
          </div>
          <div className="card center">
            <span className="badge-emoji">💖</span>
            <h4>Refletir</h4>
          </div>
        </div>

        <div className="grid-2">
          <div className="card center">
            <span className="badge-emoji">🔔</span>
            <h4>Inspirar</h4>
          </div>
          <div className="card center">
            <span className="badge-emoji">⏸️</span>
            <h4>Pausar</h4>
          </div>
        </div>

        <div className="card">
          <h3>Seu bem-estar também é importante</h3>
          <p className="muted">Dicas simples para o seu dia.</p>
        </div>
      </section>
    </div>
  );
}
