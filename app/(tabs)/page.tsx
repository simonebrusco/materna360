export const dynamic = "force-static";

import React from "react";
import ActivityOfDay from "@/components/ActivityOfDay";
import WeeklyProgress from "@/components/today/WeeklyProgress";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import { Sparkles, BookOpen, Wind, Smile, Lightbulb, PlusCircle, Calendar } from "lucide-react";

type Insight = { id: string; title: string; text: string };

export default function HomePage() {
  const demoInsights: Insight[] = [
    { id: "i1", title: "Respiro de 2 minutos", text: "Uma pausa curta muda seu dia." },
    { id: "i2", title: "Água + alongar", text: "Levante e hidrate-se agora." },
    { id: "i3", title: "Gentileza consigo", text: "Tudo bem fazer menos hoje." },
  ];
  const demoDays: string[] = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
  const todayIndex = (() => {
    const d = new Date().getDay(); // 0=Sun..6=Sat
    // Map to our array index (Seg..Dom)
    // Seg(1)->0, Ter(2)->1, Qua(3)->2, Qui(4)->3, Sex(5)->4, Sáb(6)->5, Dom(0)->6
    return d === 0 ? 6 : d - 1;
  })();
  const anyProps = {} as any;
  const insights: Insight[] = Array.isArray(anyProps?.insights) && anyProps.insights.length ? (anyProps.insights as Insight[]) : demoInsights;
  const days: string[] = Array.isArray(anyProps?.days) && anyProps.days.length ? (anyProps.days as string[]) : demoDays;

  return (
    <div className="mx-auto max-w-2xl px-4 pt-5 pb-[96px] space-y-6 text-[color:var(--ink)]">
      {/* If these sections/components already exist in this file, KEEP them in place. */}

      {/* Greeting Card */}
      <section
        className="relative overflow-hidden rounded-2xl border border-[color:var(--neutral-100)] bg-white shadow-elev-2 p-5 animate-fadeUp hover-lift"
        aria-label="Greeting"
      >
        <p className="text-sm sm:text-base text-[color:var(--brand-navy)]">
          Que bom ter você aqui. Vamos criar momentos especiais hoje.
        </p>
        <div className="mt-4">
          <div className="h-2 w-full rounded-full bg-[color:rgba(47,58,86,.12)] overflow-hidden">
            <div className="h-full rounded-full bg-[color:var(--brand-coral)]" style={{ width: "62%" }} />
          </div>
          <p className="mt-2 text-xs text-[color:var(--brand-navy)]/70">Você está indo muito bem — continue no seu ritmo.</p>
        </div>
        <div
          className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full"
          style={{
            background: "radial-gradient(closest-side, rgba(249,201,183,.18), transparent)",
            filter: "blur(6px)",
          }}
        />
      </section>

      {/* Ações rápidas */}
      <section className="animate-fadeUp" style={{ animationDelay: "60ms" }}>
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-display text-[18px] leading-6 font-semibold tracking-[-0.01em] text-[color:var(--brand-navy)]">Ações rápidas</h2>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {[
            { icon: PlusCircle, label: "Nova meta" },
            { icon: BookOpen, label: "Atividade" },
            { icon: Wind, label: "Respirar" },
            { icon: Smile, label: "Gratidão" },
          ].map(({ icon: Icon, label }, i) => (
            <button
              key={label}
              className="shrink-0 rounded-xl border border-[color:var(--neutral-100)] bg-transparent px-3.5 py-2.5 text-sm shadow-elev-1 hover-lift active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-coral)]/40 focus:ring-offset-2 hover:border-[color:var(--brand-coral)]"
              style={{ animationDelay: `${80 + i * 20}ms` }}
            >
              <span className="flex items-center gap-2 text-[color:var(--brand-navy)]">
                <Icon size={16} />
                {label}
              </span>
            </button>
          ))}
        </div>
      </section>

      <div className="space-y-6">
        {/* Atividade do dia */}
        <Card
          className="ring-0 border border-[color:var(--neutral-100)] bg-white shadow-elev-2 p-5 animate-fadeUp hover-lift"
          style={{ animationDelay: "80ms", backgroundImage: "linear-gradient(180deg, rgba(255,111,97,.06), #fff 24%)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--neutral-100)] bg-[color:var(--neutral-50)]">
                <BookOpen size={14} className="text-[color:var(--brand-navy)]/80" />
              </span>
              <h2 className="font-display text-[18px] leading-6 font-semibold tracking-[-0.01em] text-[color:var(--brand-navy)]">
                Atividade do dia
              </h2>
            </div>
            <span className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-[color:var(--neutral-50)] text-[color:var(--brand-navy)]/70 border border-[color:var(--neutral-100)]">
              Destaque
            </span>
          </div>
          <ActivityOfDay
            titleClassName="text-[color:var(--brand-navy)]"
            bodyClassName="text-[#333333]"
            primaryButtonClassName="bg-[color:var(--brand-coral)] text-white rounded-md px-3.5 py-2 font-semibold shadow-elev-1 hover:opacity-95 active:opacity-90 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-coral)]/40 focus:ring-offset-2"
            secondaryButtonClassName="ring-1 ring-[color:var(--brand-coral)] text-[color:var(--brand-navy)] rounded-md px-3.5 py-2 font-semibold hover:bg-white focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-coral)]/40 focus:ring-offset-2"
          />
        </Card>

        {/* Insights para você */}
        <section className="animate-fadeUp" style={{ animationDelay: "120ms" }}>
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--neutral-100)] bg-[color:var(--neutral-50)]">
              <Sparkles size={14} className="text-[color:var(--brand-navy)]/80" />
            </span>
            <h2 className="font-display text-[18px] leading-6 font-semibold tracking-[-0.01em] text-[color:var(--brand-navy)]">Insights para você</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {insights.map((i: Insight) => (
              <div
                key={i.id}
                className="shrink-0 w-[220px] rounded-2xl border border-[color:var(--neutral-100)] bg-white shadow-elev-1 p-4 hover-lift animate-fadeUp"
                style={{ boxShadow: "0 6px 16px rgba(249,201,183,0.08), 0 2px 6px rgba(20,25,40,0.04)" }}
              >
                <h3 className="font-display text-[16px] font-semibold text-[color:var(--brand-navy)] mb-1">{i.title}</h3>
                <p className="text-sm text-[color:var(--ink)]/80">{i.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Insight do dia */}
        <Card
          className="ring-0 border border-[color:var(--brand-peach)]/50 bg-[color:var(--brand-peach)]/35 text-[color:var(--brand-navy)] shadow-elev-1 p-4 animate-fadeUp hover-lift mb-0"
          style={{ animationDelay: "140ms" }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--neutral-100)] bg-white/70">
                <Lightbulb size={14} className="text-[color:var(--brand-navy)]/80" />
              </span>
              <h2 className="font-display text-[18px] leading-6 font-semibold tracking-[-0.01em] text-[color:var(--brand-navy)]">
                Insight do dia
              </h2>
            </div>
            <span className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-white/70 text-[color:var(--brand-navy)]/80 border border-[color:var(--neutral-100)]">
              Aconselhável
            </span>
          </div>
          <p className="text-sm text-[color:var(--ink)]">
            Reserve 5 minutos para respirar profundamente hoje. Pequenas pausas restauram sua energia para estar presente com seu filho.
          </p>
          <div className="mt-3 flex justify-end">
            <a
              href="#"
              className="inline-flex items-center bg-[color:var(--brand-coral)] text-white rounded-md px-3.5 py-2 font-semibold shadow-elev-1 hover:opacity-95 active:opacity-90 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-coral)]/40 focus:ring-offset-2"
            >
              Ver dica
            </a>
          </div>
        </Card>

        {/* Planner da Semana */}
        <section data-planner className="space-y-3 animate-fadeUp" style={{ animationDelay: "160ms" }}>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--neutral-100)] bg-[color:var(--neutral-50)]">
              <Calendar size={14} className="text-[color:var(--brand-navy)]/80" />
            </span>
            <h2 className="font-display text-[18px] leading-6 font-semibold tracking-[-0.01em] text-[color:var(--brand-navy)] mt-0">
              Planner da Semana
            </h2>
          </div>
          <div className="md:hidden">
            <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scroll-px-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {days.map((d: string, idx: number) => (
                <div
                  key={d}
                  className={[
                    "shrink-0 snap-start w-[140px] rounded-xl bg-white shadow-elev-1 p-3 flex flex-col justify-between hover-lift",
                    idx === todayIndex ? "border-2 border-[color:var(--brand-coral)]" : "border border-[color:var(--neutral-100)]",
                  ].join(" ")}
                >
                  <span className="text-xs text-[color:var(--brand-navy)]/70 font-medium">{d}</span>
                  <span className="text-sm font-semibold text-[color:var(--brand-navy)]">2 tarefas</span>
                </div>
              ))}
              <div className="shrink-0 snap-start w-[180px] rounded-xl border border-[color:var(--neutral-100)] bg-[color:var(--neutral-50)] shadow-elev-1 p-3 flex flex-col justify-between">
                <span className="text-xs text-[color:var(--brand-navy)]/70 font-medium">Resumo da semana</span>
                <div className="mt-1 text-sm text-[color:var(--ink)]/80">
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-[color:var(--brand-coral)]"></span>
                    62% concluído
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-[color:rgba(47,58,86,.12)]">
                    <div className="h-2 rounded-full bg-[color:var(--brand-coral)]" style={{ width: "62%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:grid md:grid-cols-3 md:gap-3">
            {days.map((d: string, idx: number) => (
              <div
                key={d}
                className={[
                  "rounded-xl bg-white shadow-elev-1 p-3 flex flex-col justify-between hover-lift",
                  idx === todayIndex ? "border-2 border-[color:var(--brand-coral)]" : "border border-[color:var(--neutral-100)]",
                ].join(" ")}
              >
                <span className="text-xs text-[color:var(--brand-navy)]/70 font-medium">{d}</span>
                <span className="text-sm font-semibold text-[color:var(--brand-navy)]">2 tarefas</span>
              </div>
            ))}
            <div className="rounded-xl border border-[color:var(--neutral-100)] bg-[color:var(--neutral-50)] shadow-elev-1 p-3 flex flex-col justify-between md:col-span-3">
              <span className="text-xs text-[color:var(--brand-navy)]/70 font-medium">Resumo da semana</span>
              <div className="mt-1 text-sm text-[color:var(--ink)]/80">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-[color:var(--brand-coral)]"></span>
                  62% concluído
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-[color:rgba(47,58,86,.12)]">
                  <div className="h-2 rounded-full bg-[color:var(--brand-coral)]" style={{ width: "62%" }} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Progresso da semana (preservado) */}
      <section className="animate-fadeUp active:scale-[0.995] transition-transform" style={{ animationDelay: "200ms" }}>
        <SectionTitle className="text-[22px] leading-7 font-semibold text-[color:var(--brand-navy)] tracking-[-0.01em]">
          Progresso da semana
        </SectionTitle>
        <WeeklyProgress />
      </section>
    </div>
  );
}
