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
                <div className="feature-title">Rotina da Casa</div>
                <div className="feature-sub">organize suas tarefas e compromissos familiares.</div>
              </div>
            </div>
          </Card>
          <Card>
            <div className="feature-card">
              <div className="feature-emoji" aria-hidden>💕</div>
              <div>
                <div className="feature-title">Conexão com o Filho</div>
                <div className="feature-sub">compartilhe momentos especiais com seu filho.</div>
              </div>
            </div>
          </Card>
          <Card>
            <div className="feature-card">
              <div className="feature-emoji" aria-hidden>🌿</div>
              <div>
                <div className="feature-title">Momento para Mim</div>
                <div className="feature-sub">respiração guiada, gratidão e autocuidado.</div>
              </div>
            </div>
          </Card>
          <Card>
            <div className="feature-card">
              <div className="feature-emoji" aria-hidden>🎓</div>
              <div>
                <div className="feature-title">Mentoria Especializada</div>
                <div className="feature-sub">acesso a especialistas em parentalidade e desenvolvimento infantil.</div>
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
