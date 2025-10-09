"use client";

import { useState } from "react";
import QuadCard from "./ui/QuadCard";
import CircleAction from "./ui/CircleAction";

import {
  Home,
  CalendarCheck2,
  CheckCircle,
  ShoppingCart,
  Smile,
  Heart,
  Sparkles,
  BarChart3,
  Coffee,
  Wind,
  Quote,
  Lightbulb,
  Search,
  Trophy,
  Download,
} from "lucide-react";

export default function HomeQuadGrid() {
  const [openId, setOpenId] = useState<string | null>(null);
  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <div className={["grid gap-4", "grid-cols-1", "md:grid-cols-2"].join(" ")}>
      {/* 1) Rotina & Planner */}
      <QuadCard
        id="routine-planner"
        title="Rotina & Planner"
        microcopy="Organize seu dia e a semana."
        icon={<Home size={44} />}
        progressText="0 de 3 hoje"
        isOpen={openId === "routine-planner"}
        onToggle={toggle}
      >
        <CircleAction
          icon={<Home size={24} />}
          label="Rotina da Casa"
          href="/rotina"
          ariaLabel="Abrir Rotina da Casa"
          badgeCount={1}
          isPrimary
          index={0}
        />
        <CircleAction
          icon={<CalendarCheck2 size={24} />}
          label="Planner da Família"
          href="/planner"
          ariaLabel="Abrir Planner da Família"
          index={1}
        />
        <CircleAction
          icon={<CheckCircle size={24} />}
          label="Checklist do Dia"
          href="/checklist"
          ariaLabel="Abrir Checklist do Dia"
          index={2}
        />
        <CircleAction
          icon={<ShoppingCart size={24} />}
          label="Compras & Lembretes"
          href="/compras"
          ariaLabel="Abrir Compras e Lembretes"
          index={3}
        />
      </QuadCard>

      {/* 2) Conexão & Emoções */}
      <QuadCard
        id="connection-emotions"
        title="Conexão & Emoções"
        microcopy="Registre sentimentos e momentos."
        icon={<Smile size={44} />}
        progressText="humor: 3/7"
        isOpen={openId === "connection-emotions"}
        onToggle={toggle}
      >
        <CircleAction icon={<Smile size={24} />} label="Humor & Emoções" href="/bem-estar/checkin" ariaLabel="Abrir check-in emocional" isPrimary index={0} />
        <CircleAction icon={<Heart size={24} />} label="Momento com Meu Filho" href="/momentos" ariaLabel="Registrar momento com meu filho" index={1} />
        <CircleAction icon={<Sparkles size={24} />} label="Gratidão" href="/gratidão" ariaLabel="Abrir diário de gratidão" index={2} />
        <CircleAction icon={<BarChart3 size={24} />} label="Humor da Semana" href="/bem-estar/relatorios" ariaLabel="Ver humor da semana" index={3} />
      </QuadCard>

      {/* 3) Cuidar de Mim */}
      <QuadCard
        id="self-care"
        title="Cuidar de Mim"
        microcopy="Pequenas pausas para você."
        icon={<Coffee size={44} />}
        isOpen={openId === "self-care"}
        onToggle={toggle}
      >
        <CircleAction icon={<Quote size={24} />} label="Meditar" href="/bem-estar/audios" ariaLabel="Ouvir meditação" isPrimary index={0} />
        <CircleAction icon={<Wind size={24} />} label="Respirar" href="/bem-estar/respirar" ariaLabel="Exercício de respiração" index={1} />
        <CircleAction icon={<Coffee size={24} />} label="Momento para Mim" href="/bem-estar/momento" ariaLabel="Abrir momento para mim" index={2} />
        <CircleAction icon={<Quote size={24} />} label="Afirmações" href="/bem-estar/afirmacoes" ariaLabel="Ver afirmações" index={3} />
      </QuadCard>

      {/* 4) Descobrir & Aprender */}
      <QuadCard
        id="discover-learn"
        title="Descobrir & Aprender"
        microcopy="Ideias e sugestões para hoje."
        icon={<Lightbulb size={44} />}
        progressText="2 sugestões novas"
        isOpen={openId === "discover-learn"}
        onToggle={toggle}
      >
        <CircleAction icon={<Lightbulb size={24} />} label="Ideia do Dia" href="/atividades/ideia-do-dia" ariaLabel="Abrir ideia do dia" isPrimary index={0} />
        <CircleAction icon={<Search size={24} />} label="Descobrir" href="/descobrir" ariaLabel="Explorar vitrine de conteúdos" index={1} />
        <CircleAction icon={<Trophy size={24} />} label="Conquistas" href="/selos" ariaLabel="Ver conquistas" index={2} />
        <CircleAction icon={<Download size={24} />} label="Downloads" href="/recursos/downloads" ariaLabel="Abrir downloads" index={3} />
      </QuadCard>
    </div>
  );
}
