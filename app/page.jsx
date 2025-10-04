export default function Home() {
  return (
    <div className="container">
      <header>
        <h1 className="h1">Bom dia, Simone <span>💛</span></h1>
        <p className="sub">Como você está hoje?</p>
      </header>

      <section className="card">
        <strong className="daily-message-label">“Mensagem do dia”</strong>
        <p className="daily-message-text">Comece pelo simples. Funciona.</p>
        <button className="btn" type="button">Nova mensagem</button>
      </section>
    </div>
  );
}
