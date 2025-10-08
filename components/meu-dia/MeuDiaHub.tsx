"use client";

import dynamic from "next/dynamic";
import { flags } from "../../lib/flags";

const CardMeditar = dynamic(() => import("./cards/CardMeditar"), { ssr: false });
const CardRespirar = dynamic(() => import("./cards/CardRespirar"), { ssr: false });
const CardAlegrar = dynamic(() => import("./cards/CardAlegrar"), { ssr: false });

const CardIdeiaDoDia = dynamic(() => import("./cards/CardIdeiaDoDia"), { ssr: false });
const CardVitrine = dynamic(() => import("./cards/CardVitrine"), { ssr: false });

const CardHumorSemana = dynamic(() => import("./cards/CardHumorSemana"), { ssr: false });
const CardConquistas = dynamic(() => import("./cards/CardConquistas"), { ssr: false });
const CardGratidao = dynamic(() => import("./cards/CardGratidao"), { ssr: false });

const CardRotinaCasa = dynamic(() => import("./cards/CardRotinaCasa"), { ssr: false });
const CardTempoFilho = dynamic(() => import("./cards/CardTempoFilho"), { ssr: false });
const CardMomentoMim = dynamic(() => import("./cards/CardMomentoMim"), { ssr: false });

export default function MeuDiaHub(){
  if (!flags.newHomeMaternal) return null;

  return (
    <section className="meu-dia-hub" aria-label="Resumo do Meu Dia">
      <div className="hub-grid">
        {/* Cuidar */}
        {flags.careMeditation && <CardMeditar />}
        {flags.careBreathwork && <CardRespirar />}
        {flags.careJoy && <CardAlegrar />}

        {/* Descobrir */}
        {flags.discoverIdeas && <CardIdeiaDoDia />}
        {flags.discoverShop && <CardVitrine />}

        {/* Eu360 */}
        {flags.moodTracker && <CardHumorSemana />}
        {flags.gamification && <CardConquistas />}
        {flags.gratitudeModule && <CardGratidao />}

        {/* Planner */}
        {flags.houseRoutine && <CardRotinaCasa />}
        {flags.childrenProfiles && <CardTempoFilho />}
        {flags.plannerFamily && <CardMomentoMim />}
      </div>
    </section>
  );
}
