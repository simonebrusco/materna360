import Card from "../../components/ui/Card";
import Btn from "../../components/ui/Btn";

export default function Materna() {
  return (
    <div className="container" aria-label="Materna – introdução">
      {/* Hero */}
      <section className="materna-hero" aria-label="Boas-vindas Materna360">
        <div className="hero-inner">
          <h1 className="hero-title">Welcome to Materna360 💕</h1>
          <p className="hero-sub">Your daily space for organization, connection, and emotional balance.</p>
          <Btn href="/" style={{ backgroundColor: "#FF6F61", borderColor: "#FF6F61", color: "#FFFFFF" }}>
            Start my journey
          </Btn>
        </div>
      </section>

      {/* About */}
      <section className="materna-about" aria-label="Sobre a experiência Materna360">
        <div className="about-grid">
          <div>
            <h2 className="about-title">About Materna</h2>
            <p className="about-text">
              Materna360 helps mothers simplify their routine, reconnect with themselves, and enjoy meaningful moments with their children — all in one place.
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
                <div className="feature-title">Daily Routine</div>
                <div className="feature-sub">organize your day and family tasks.</div>
              </div>
            </div>
          </Card>
          <Card>
            <div className="feature-card">
              <div className="feature-emoji" aria-hidden>💕</div>
              <div>
                <div className="feature-title">Connection Moments</div>
                <div className="feature-sub">share special memories with your child.</div>
              </div>
            </div>
          </Card>
          <Card>
            <div className="feature-card">
              <div className="feature-emoji" aria-hidden>🌿</div>
              <div>
                <div className="feature-title">Self-Care</div>
                <div className="feature-sub">guided breathing, gratitude and mindfulness.</div>
              </div>
            </div>
          </Card>
          <Card>
            <div className="feature-card">
              <div className="feature-emoji" aria-hidden>🎓</div>
              <div>
                <div className="feature-title">Mentorship</div>
                <div className="feature-sub">access specialists in parenting and child development.</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="materna-cta" aria-label="Convite para entrar">
        <div className="cta-inner">
          <div className="cta-text">You don’t need to do it all alone. Let’s take care together 💗.</div>
          <Btn href="/" style={{ backgroundColor: "#FF6F61", borderColor: "#FF6F61", color: "#FFFFFF" }}>
            Join Materna360
          </Btn>
        </div>
      </section>

    </div>
  );
}
