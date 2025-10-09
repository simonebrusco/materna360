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

      <style jsx>{`
        .materna-hero {
          background: linear-gradient(180deg, #F9C9B7 0%, #FFFFFF 100%);
          border-radius: 16px;
          padding: 36px 20px;
          box-shadow: 0 8px 24px rgba(17,17,17,0.06);
          text-align: center;
          margin-bottom: 18px;
        }
        .hero-inner { display: grid; gap: 10px; place-items: center; }
        .hero-title { font-family: Poppins, system-ui; font-weight: 700; color: #2F3A56; font-size: 28px; }
        .hero-sub { color: rgba(47,58,86,.9); max-width: 720px; margin: 0 auto 8px; }

        .materna-about { margin: 14px 0 6px; }
        .about-grid { display: grid; grid-template-columns: 1fr; gap: 16px; align-items: center; }
        .about-title { font-family: Poppins, system-ui; font-weight: 700; font-size: 20px; color: #2F3A56; margin: 0 0 6px; }
        .about-text { color: rgba(47,58,86,.9); }
        .about-figure { display: grid; place-items: center; }
        .about-icon { width: 120px; height: 120px; border-radius: 24px; background: #FFF6F1; border: 2px solid #F9C9B7; display: grid; place-items: center; font-size: 42px; box-shadow: 0 8px 18px rgba(17,17,17,.06); }

        @media (min-width: 768px) {
          .about-grid { grid-template-columns: 1.2fr .8fr; }
        }

        .features-grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 12px; margin: 18px 0; }
        .feature-card { display: grid; grid-template-columns: auto 1fr; gap: 12px; align-items: center; }
        .feature-emoji { width: 40px; height: 40px; border-radius: 12px; border: 1.5px solid rgba(47,58,86,.25); display: grid; place-items: center; font-size: 20px; color: #2F3A56; }
        .feature-title { font-family: Poppins, system-ui; font-weight: 700; color: #2F3A56; }
        .feature-sub { color: rgba(47,58,86,.75); }

        .materna-cta { background: #F9C9B7; border-radius: 16px; padding: 16px; margin: 8px 0 16px; }
        .cta-inner { display: flex; flex-direction: column; gap: 10px; align-items: center; justify-content: center; text-align: center; }
        .cta-text { font-family: Poppins, system-ui; font-weight: 600; color: #2F3A56; }

        @media (min-width: 768px) { .cta-inner { flex-direction: row; justify-content: space-between; text-align: left; } }
      `}</style>
    </div>
  );
}
