"use client";

import { useState } from "react";
import Card from "../ui/Card";
import Btn from "../ui/Btn";
import { recipeOfTheDay } from "../../lib/recipes";

export default function RecipeOfTheDay() {
  const [open, setOpen] = useState(false);
  const recipe = recipeOfTheDay();

  return (
    <>
      <Card className="card-navy">
        <div
          role="button"
          onClick={() => setOpen(true)}
          style={{ display: "grid", gridTemplateColumns: "32px 1fr", gap: 12, alignItems: "center", cursor: "pointer" }}
          aria-label={`Abrir receita: ${recipe.title}`}
        >
          <div className="iconToken">🍽️</div>
          <div>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>{recipe.title}</div>
            <div className="small" style={{ opacity: .9 }}>Toque para ver o modo de preparo</div>
          </div>
        </div>
      </Card>

      {open && (
        <div className="sheet-overlay" onClick={() => setOpen(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-title">{recipe.title}</div>
            <ol className="small" style={{ paddingLeft: 18 }}>
              {recipe.steps.slice(0, 3).map((s, i) => (
                <li key={i} style={{ marginBottom: 6 }}>{s}</li>
              ))}
            </ol>
            <div className="sheet-actions">
              <Btn variant="subtle" onClick={() => setOpen(false)}>Fechar</Btn>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
