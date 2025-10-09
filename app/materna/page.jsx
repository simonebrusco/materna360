import Card from "../../components/ui/Card";
import Btn from "../../components/ui/Btn";

export default function Materna() {
  return (
    <div className="container materna-page" aria-label="Materna – introdução">
      {/* Hero */}
      <section className="materna-hero" aria-label="Boas-vindas Materna360">
        <div className="hero-inner">
          <h1 className="hero-title">Bem-vinda ao Materna360 💕</h1>
          <p className="hero-sub">Seu espaço diário para organização, conexão e equilíbrio emocional.</p>
          <Btn href="/">
            Começar minha jornada
          </Btn>
        </div>
      </section>

      {/* About */}
      <section className="materna-about" aria-label="Sobre a experiência Materna360">
        <div className="about-grid">
          <div>
            <h2 className="about-title">Sobre o Materna360</h2>
            <p className="about-text">
              O Materna360 ajuda mães a simplificarem sua rotina, reconectarem-se consigo mesmas e viverem momentos significativos com seus filhos — tudo em um só lugar.
            </p>
          </div>
          <div className="about-figure" aria-hidden>
            <div className="about-icon">💗</div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section aria-label="Destaques da experiência">
        <div className="features-grid">
          <Card>
            <div className="feature-card">
              <div className="feature-emoji" aria-hidden>🏡</div>
              <div>
                <div className="feature-title">Meu Dia</div>
                <div className="feature-sub">“organize sua rotina e o dia da família.”</div>
              </div>
            </div>
          </Card>
          <Card>
            <div className="feature-card">
              <div className="feature-emoji" aria-hidden>💕</div>
              <div>
                <div className="feature-title">Cuidar</div>
                <div className="feature-sub">“momentos de bem-estar e autocuidado.”</div>
              </div>
            </div>
          </Card>
          <Card>
            <div className="feature-card">
              <div className="feature-emoji" aria-hidden>🌿</div>
              <div>
                <div className="feature-title">Descobrir</div>
                <div className="feature-sub">“atividades, ideias e brincadeiras para aprender juntos.”</div>
              </div>
            </div>
          </Card>
          <Card>
            <div className="feature-card">
              <div className="feature-emoji" aria-hidden>🎓</div>
              <div>
                <div className="feature-title">Eu360</div>
                <div className="feature-sub">“seu espaço de autoconhecimento e equilíbrio emocional.”</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="materna-cta" aria-label="Convite para entrar">
        <div className="cta-inner">
          <div className="cta-text">Você não precisa fazer tudo sozinha. Vamos cuidar juntas 💗.</div>
          <Btn href="/">
            Junte-se ao Materna360
          </Btn>
        </div>
      </section>

    </div>
  );
}
