"use client";
import React from "react";
import QuadCard from "./QuadCard";
import RoundActionButton from "@/components/ui/RoundActionButton";

export default function QuadCards() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 1) Rotina & Planner */}
      <QuadCard
        title="Rotina & Planner"
        subtitle="Organize seu dia e a semana."
        icon={<span>🏠</span>}
      >
        <RoundActionButton label="Rotina da Casa" icon="🏠" href="/rotina" />
        <RoundActionButton label="Planner da Família" icon="🗓️" href="/planner" />
        <RoundActionButton label="Checklist do Dia" icon="✅" href="/checklist" />
        <RoundActionButton label="Compras & Lembretes" icon="🧾" href="/compras" />
      </QuadCard>

      {/* 2) Conexão & Emoções */}
      <QuadCard
        title="Conexão & Emoções"
        subtitle="Registre sentimentos e momentos."
        icon={<span>🙂</span>}
      >
        <RoundActionButton label="Humor & Emoções" icon="🙂" href="/humor" />
        <RoundActionButton label="Momento com Meu Filho" icon="💗" href="/momentos" />
        <RoundActionButton label="Gratidão" icon="✨" href="/gratidao" />
        <RoundActionButton label="Humor da Semana" icon="📈" href="/humor/semana" />
      </QuadCard>

      {/* 3) Cuidar de Mim */}
      <QuadCard
        title="Cuidar de Mim"
        subtitle="Pequenas pausas para você."
        icon={<span>🌿</span>}
      >
        <RoundActionButton label="Meditar" icon="🧘" href="/meditar" />
        <RoundActionButton label="Respirar" icon="🌬️" href="/respirar" />
        <RoundActionButton label="Momento para Mim" icon="☕" href="/pausas" />
        <RoundActionButton label="Afirmações" icon="💬" href="/afirmacoes" />
      </QuadCard>

      {/* 4) Descobrir & Aprender */}
      <QuadCard
        title="Descobrir & Aprender"
        subtitle="Ideias e sugestões para hoje."
        icon={<span>💡</span>}
      >
        <RoundActionButton label="Ideia do Dia" icon="💡" href="/ideia" />
        <RoundActionButton label="Descobrir" icon="🔍" href="/descobrir" />
        <RoundActionButton label="Conquistas" icon="🏆" href="/conquistas" />
        <RoundActionButton label="Downloads" icon="📥" href="/downloads" />
      </QuadCard>
    </div>
  );
}
