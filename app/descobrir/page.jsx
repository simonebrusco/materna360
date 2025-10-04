"use client";

import { useState } from "react";
import Card from "../../components/ui/Card";
import NavyCard from "../../components/ui/NavyCard";
import Btn from "../../components/ui/Btn";
import { getActivitiesByAge } from "../../lib/recs";
import { sampleProducts } from "../../lib/products";

const AGE_GROUPS = ["0–2", "3–4", "5–7", "8+"] as const;

export default function Descobrir() {
  const [ageGroup, setAgeGroup] = useState<typeof AGE_GROUPS[number]>("3–4");
  const activities = getActivitiesByAge(ageGroup);

  return (
    <div className="container">
      <h1 className="h1">Descobrir</h1>

      <div className="age-tabs">
        {AGE_GROUPS.map((g) => (
          <button
            key={g}
            className={`age-tab ${g === ageGroup ? "age-tab-active" : ""}`}
            onClick={() => setAgeGroup(g)}
          >
            {g}
          </button>
        ))}
      </div>

      <Card className="card-navy">
        <div className="hero-row">
          <div className="iconToken">🐻</div>
          <div>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>Atividades para {ageGroup} anos</div>
            <Btn variant="solid" href="/descobrir/sugestoes">Ver sugestões</Btn>
          </div>
        </div>
      </Card>

      <div className="space"></div>

      <div className="grid-2">
        {activities.map((a) => (
          <Card key={a.id}>
            <div className="hero-row">
              <div className="iconToken">{a.icon ?? "⭐"}</div>
              <div>
                <div style={{ fontWeight: 800, marginBottom: 6 }}>{a.title}</div>
                <div className="small" style={{ opacity: .9 }}>{a.blurb}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="space"></div>

      <h3 className="h3" style={{ margin: "0 0 10px", fontWeight: 800 }}>Recommendations</h3>

      <div className="grid-2">
        <Card>
          <div className="hero-row">
            <div className="iconToken">📖</div>
            <div>
              <div style={{ fontWeight: 800, marginBottom: 6 }}>{sampleProducts.book.title}</div>
              <div className="small" style={{ opacity: .9 }}>{sampleProducts.book.blurb}</div>
              <div className="recommend-ctas">
                <Btn variant="subtle" href={sampleProducts.book.links.amazon} target="_blank" rel="noopener noreferrer">View on Amazon</Btn>
                <Btn variant="subtle" href={sampleProducts.book.links.shopee} target="_blank" rel="noopener noreferrer">View on Shopee</Btn>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="hero-row">
            <div className="iconToken">🧸</div>
            <div>
              <div style={{ fontWeight: 800, marginBottom: 6 }}>{sampleProducts.toy.title}</div>
              <div className="small" style={{ opacity: .9 }}>{sampleProducts.toy.blurb}</div>
              <div className="recommend-ctas">
                <Btn variant="subtle" href={sampleProducts.toy.links.amazon} target="_blank" rel="noopener noreferrer">View on Amazon</Btn>
                <Btn variant="subtle" href={sampleProducts.toy.links.shopee} target="_blank" rel="noopener noreferrer">View on Shopee</Btn>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}