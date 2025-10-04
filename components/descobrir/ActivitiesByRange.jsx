"use client";

import { useMemo, useState } from "react";
import Card from "../ui/Card";
import Btn from "../ui/Btn";
import { getForRange } from "../../lib/activities";

const RANGES = ["0–2", "3–4", "5–7", "8+"];

export default function ActivitiesByRange() {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const all = useMemo(() => (selected ? getForRange(selected) : []), [selected]);
  const preview = all.slice(0, 2);

  return (
    <>
      <div className="chips-row" role="tablist" aria-label="Faixa etária">
        {RANGES.map((r) => (
          <button
            key={r}
            type="button"
            role="tab"
            aria-selected={selected === r}
            className={`chip ${selected === r ? "chip-active" : ""}`.trim()}
            onClick={() => setSelected(r)}
          >
            {r}
          </button>
        ))}
      </div>

      {selected && (
        <Card style={{ marginTop: 12 }}>
          <strong>Sugestões ({selected})</strong>
          <ul className="small" style={{ marginTop: 8, paddingLeft: 18 }}>
            {preview.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
          <div className="space"></div>
          <Btn onClick={() => setOpen(true)}>Ver sugestões</Btn>
        </Card>
      )}

      {open && (
        <div className="sheet-overlay" onClick={() => setOpen(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-title">Sugestões completas ({selected})</div>
            <ul className="small" style={{ paddingLeft: 18 }}>
              {all.map((s, i) => (
                <li key={i} style={{ marginBottom: 6 }}>{s}</li>
              ))}
            </ul>
            <div className="sheet-actions">
              <Btn variant="subtle" onClick={() => setOpen(false)}>Fechar</Btn>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
