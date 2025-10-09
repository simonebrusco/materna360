"use client";

import * as React from "react";
import QuadCard from "./QuadCard";
import RoundActionButton from "@/components/ui/RoundActionButton";

// util para single-open
function useSingleOpen(defaultId: string) {
  const [openId, setOpenId] = React.useState(defaultId);
  const onToggle = (id: string) => setOpenId((prev) => (prev === id ? "" : id));
  const isOpen = (id: string) => openId === id;
  return { openId, onToggle, isOpen };
}

export default function QuadCards() {
  // Abra o primeiro por padrão
  const { onToggle, isOpen } = useSingleOpen("planner");

  return (
    <div className="mx-auto max-w-[1200px] px-4 grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* Rotina & Planner */}
      <QuadCard id="planner" title="Rotina & Planner" open={isOpen("planner")} onToggle={onToggle}>
        <RoundActionButton label="Rotina da Casa" href="/rotina" />
        <RoundActionButton label="Planner da Família" href="/planner" />
        <RoundActionButton label="Checklist do Dia" href="/checklist" />
        <RoundActionButton label="Compras & Lembretes" href="/compras" />
      </QuadCard>

      {/* Conexão & Emoções */}
      <QuadCard id="emocoes" title="Conexão & Emoções" open={isOpen("emocoes")} onToggle={onToggle}>
        <RoundActionButton label="Humor & Emoções" href="/humor" />
        <RoundActionButton label="Momento com Meu Filho" href="/momentos" />
        <RoundActionButton label="Gratidão" href="/gratidao" />
        <RoundActionButton label="Humor da Semana" href="/humor/semana" />
      </QuadCard>

      {/* Cuidar de Mim */}
      <QuadCard id="cuidar" title="Cuidar de Mim" open={isOpen("cuidar")} onToggle={onToggle}>
        <RoundActionButton label="Meditar" href="/meditar" />
        <RoundActionButton label="Respirar" href="/respirar" />
        <RoundActionButton label="Momento para Mim" href="/pausas" />
      </QuadCard>

      {/* Descobrir & Aprender */}
      <QuadCard id="descobrir" title="Descobrir & Aprender" open={isOpen("descobrir")} onToggle={onToggle}>
        <RoundActionButton label="Ideia do Dia" href="/ideia" />
        <RoundActionButton label="Descobrir" href="/descobrir" />
        <RoundActionButton label="Conquistas" href="/conquistas" />
      </QuadCard>
    </div>
  );
}
