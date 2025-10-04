import Card from "../../components/ui/Card";
import NavyCard from "../../components/ui/NavyCard";
import Btn from "../../components/ui/Btn";
import ActivitiesByRange from "../../components/descobrir/ActivitiesByRange";
import { picks } from "../../lib/reco";

export const metadata={title:"Descobrir • Materna360"};

export default function Descobrir(){
  return (
    <div className="container">
      <h1 className="h1">Descobrir</h1>

      <Card className="card-navy">
        <div style={{fontWeight:800,marginBottom:6}}>Filtrar por idade</div>
        <ActivitiesByRange />
      </Card>

      <div className="space"></div>

      <div className="grid-2">
        <NavyCard><div className="iconToken">♡</div><div>Refletir</div></NavyCard>
        <NavyCard><div className="iconToken">🌙</div><div>Dormir</div></NavyCard>
      </div>

      <div className="space"></div>

      <Card className="card-navy">
        <strong>Book recommendation</strong>
        <div className="small" style={{ marginTop: 8, fontWeight: 700 }}>{picks.book.title}</div>
        <div className="small" style={{ opacity: .9 }}>{picks.book.description}</div>
        <div className="space"></div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Btn variant="ghost" className="btn-ghost-magenta" onClick={() => window.open(picks.book.amazonUrl, "_blank", "noopener,noreferrer")}>View on Amazon</Btn>
          <Btn variant="ghost" className="btn-ghost-magenta" onClick={() => window.open(picks.book.shopeeUrl, "_blank", "noopener,noreferrer")}>View on Shopee</Btn>
        </div>
      </Card>

      <div className="space"></div>

      <Card className="card-navy">
        <strong>Toy recommendation</strong>
        <div className="small" style={{ marginTop: 8, fontWeight: 700 }}>{picks.toy.title}</div>
        <div className="small" style={{ opacity: .9 }}>{picks.toy.description}</div>
        <div className="space"></div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Btn variant="ghost" className="btn-ghost-magenta" onClick={() => window.open(picks.toy.amazonUrl, "_blank", "noopener,noreferrer")}>View on Amazon</Btn>
          <Btn variant="ghost" className="btn-ghost-magenta" onClick={() => window.open(picks.toy.shopeeUrl, "_blank", "noopener,noreferrer")}>View on Shopee</Btn>
        </div>
      </Card>
    </div>
  );
}
