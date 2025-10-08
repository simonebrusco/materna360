import React from "react";
import dynamic from "next/dynamic";
import { flags } from "../../lib/flags";

const PlannerMini = dynamic(() => import("./summary/PlannerMini"), { ssr: false });
const ChecklistTodaySummary = dynamic(() => import("./summary/ChecklistTodaySummary"), { ssr: false });
const MoodQuickLogSummary = dynamic(() => import("./summary/MoodQuickLogSummary"), { ssr: false });
const MomentosFilhoSummary = dynamic(() => import("./summary/MomentosFilhoSummary"), { ssr: false });
const GratidaoSummary = dynamic(() => import("./summary/GratidaoSummary"), { ssr: false });
const MeditarSummary = dynamic(() => import("./summary/MeditarSummary"), { ssr: false });
const RespirarSummary = dynamic(() => import("./summary/RespirarSummary"), { ssr: false });
const MomentoMimSummary = dynamic(() => import("./summary/MomentoMimSummary"), { ssr: false });
const IdeiaDoDiaSummary = dynamic(() => import("./summary/IdeiaDoDiaSummary"), { ssr: false });
const VitrineSummary = dynamic(() => import("./summary/VitrineSummary"), { ssr: false });
const HumorSemanaMini = dynamic(() => import("./summary/HumorSemanaMini"), { ssr: false });
const ConquistasMini = dynamic(() => import("./summary/ConquistasMini"), { ssr: false });

export default function HomeHub() {
  return (
    <section className="meu-dia hub">
      <div className="block">
        <h3>Rotina & Planner</h3>
        <div className="hub-grid">
          {flags.todayChecklist ? <ChecklistTodaySummary /> : null}
          {flags.plannerFamily ? <PlannerMini /> : null}
        </div>
      </div>

      <div className="block">
        <h3>Conexão & Emoções</h3>
        <div className="hub-grid">
          {flags.moodTracker ? <MoodQuickLogSummary /> : null}
          {flags.childrenProfiles ? <MomentosFilhoSummary /> : null}
          {flags.gratitudeModule ? <GratidaoSummary /> : null}
        </div>
      </div>

      <div className="block">
        <h3>Cuidar de Mim</h3>
        <div className="hub-grid">
          {flags.careMeditation ? <MeditarSummary /> : null}
          {flags.careBreathwork ? <RespirarSummary /> : null}
          {flags.careJoy ? <MomentoMimSummary /> : null}
        </div>
      </div>

      <div className="block">
        <h3>Descobrir & Aprender</h3>
        <div className="hub-grid">
          {flags.discoverIdeas ? <IdeiaDoDiaSummary /> : null}
          {flags.discoverShop ? <VitrineSummary /> : null}
          {flags.gamification ? <ConquistasMini /> : null}
          {flags.moodTracker ? <HumorSemanaMini /> : null}
        </div>
      </div>
    </section>
  );
}
