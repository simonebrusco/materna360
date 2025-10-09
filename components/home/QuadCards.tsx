"use client";
import { useEffect, useState } from "react";
import QuadCard from "./QuadCard";
import RoundActionButton from "@/components/ui/RoundActionButton";

type Section = {
  title: string;
  chips: { label: string; href: string; icon?: any }[];
};

const SECTIONS: Section[] = [
  {
    title: "Rotina & Planner",
    chips: [
      { label: "Rotina da Casa", href: "/home/house" },
      { label: "Planner da Família", href: "/planner/family" },
      { label: "Checklist do Dia", href: "/checklist" },
      { label: "Compras & Lembretes", href: "/shopping" },
    ],
  },
  {
    title: "Conexão & Emoções",
    chips: [
      { label: "Humor & Emoções", href: "/mood" },
      { label: "Momento com Meu Filho", href: "/moments" },
      { label: "Gratidão", href: "/gratitude" },
    ],
  },
  {
    title: "Cuidar de Mim",
    chips: [
      { label: "Meditar", href: "/meditate" },
      { label: "Respirar", href: "/breathe" },
      { label: "Momento para Mim", href: "/self-time" },
    ],
  },
  {
    title: "Descobrir & Aprender",
    chips: [
      { label: "Ideia do Dia", href: "/ideas" },
      { label: "Conquistas", href: "/achievements" },
      { label: "Humor da Semana", href: "/weekly-mood" },
    ],
  },
];

export default function QuadCards() {
  // SSR: all closed; client: open the first
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  useEffect(() => {
    setOpenIndex(0);
  }, []);

  return (
    <div className="mx-auto max-w-[1200px] px-4 grid gap-6 grid-cols-1 md:grid-cols-2">
      {SECTIONS.map((s, idx) => (
        <QuadCard
          key={s.title}
          title={s.title}
          open={openIndex === idx}
          onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
          className="shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
        >
          <div className="flex flex-wrap gap-2">
            {s.chips.map((c) => (
              <RoundActionButton key={c.label} href={c.href} label={c.label} />
            ))}
          </div>
        </QuadCard>
      ))}
    </div>
  );
}
