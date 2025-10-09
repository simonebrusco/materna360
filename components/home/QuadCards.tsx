"use client";
import { useState } from "react";
import QuadCard from "./QuadCard";
import RoundActionButton from "@/components/ui/RoundActionButton";

const SECTIONS = [
  {
    id: "planner",
    title: "Rotina &amp; Planner",
    chips: [
      { label: "Rotina da Casa", href: "/planner/home" },
      { label: "Planner da Família", href: "/planner/family" },
      { label: "Checklist do Dia", href: "/planner/checklist" },
      { label: "Compras &amp; Lembretes", href: "/planner/list" },
    ],
  },
  {
    id: "emocoes",
    title: "Conexão &amp; Emoções",
    chips: [
      { label: "Humor &amp; Emoções", href: "/mood" },
      { label: "Momento com Meu Filho", href: "/moments" },
      { label: "Gratidão", href: "/gratitude" },
      { label: "Humor da Semana", href: "/mood/weekly" },
    ],
  },
  {
    id: "cuidar",
    title: "Cuidar de Mim",
    chips: [
      { label: "Meditar", href: "/self/meditate" },
      { label: "Respirar", href: "/self/breathe" },
      { label: "Momento para Mim", href: "/self/me-time" },
    ],
  },
  {
    id: "descobrir",
    title: "Descobrir &amp; Aprender",
    chips: [
      { label: "Ideia do Dia", href: "/discover/idea" },
      { label: "Descobrir", href: "/discover" },
      { label: "Conquistas", href: "/badges" },
    ],
  },
];

export default function QuadCards() {
  const [openId, setOpenId] = useState<string | null>(SECTIONS[0].id);

  return (
    <div className="quad-guard mx-auto max-w-[1200px] px-4 mt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
      {SECTIONS.map((s) => {
        const open = openId === s.id;
        return (
          <QuadCard
            key={s.id}
            id={s.id}
            title={s.title}
            open={open}
            onToggle={() => setOpenId(open ? null : s.id)}
          >
            {s.chips.map((c) => (
              <RoundActionButton key={c.label} href={c.href} label={c.label} />
            ))}
          </QuadCard>
        );
      })}
    </div>
  );
}
