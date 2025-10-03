/** DO NOT re-export this file. Keep this as a direct server page (no client hooks). */

import React from 'react'
import MessageOfTheDay from '@/components/MessageOfTheDay'
import ActivityOfDay from '@/components/ActivityOfDay'
import PlannerSection from '@/components/planner/PlannerSection'
import WeeklyProgress from '@/components/today/WeeklyProgress'
import Container from '@/components/Container'
import SectionTitle from '@/components/ui/SectionTitle'
import Card from '@/components/ui/Card'
import ProgressRing from '@/components/ui/ProgressRing'
import { Sparkles, BookOpen, Wind, Smile, HeartHandshake, Lightbulb, PlusCircle } from 'lucide-react'

export const dynamic = 'force-static'

export default async function Page() {
  return (
    <Container className="min-h-screen bg-white pt-0 pb-0">
      <header className="sr-only">
        <h1 className="text-2xl font-semibold text-[#2F3A56]">Olá, Simone <span aria-hidden>💛</span></h1>
        <p className="text-sm text-[#2F3A56]">Que bom ter você aqui, vamos juntos criar momentos especiais hoje.</p>
      </header>

      <div className="mx-auto max-w-2xl px-4 pt-5 pb-[96px] space-y-8 text-[color:var(--ink)]">
        <section className="relative overflow-hidden rounded-2xl border border-[color:var(--neutral-100)] shadow-elev-2 p-5 animate-fadeUp hover-lift"
          style={{ background: 'linear-gradient(135deg, rgba(249,201,183,.35), #fff 40%, #fff 100%)' }}
          aria-label="Hero"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wide text-[color:var(--brand-navy)]/65 flex items-center gap-1">
                <Sparkles size={14} /> Materna360
              </div>
              <h1 className="font-display text-[24px] leading-7 md:text-[26px] font-semibold mt-1 text-[color:var(--brand-navy)] tracking-[-0.012em]">
                Olá, você!
              </h1>
              <p className="mt-1 text-sm text-[color:var(--brand-navy)]/75">
                Um passo por dia — mais conexão e leveza na sua rotina.
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-2">
              <ProgressRing value={62} />
              <div className="text-xs text-[color:var(--brand-navy)]/70">
                Semana 3/8 • <span className="font-medium text-[color:var(--brand-navy)]">62%</span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-[11px] text-[color:var(--brand-navy)]/70">
            <HeartHandshake size={14} />
            <span>Conteúdos pensados para mães ocupadas</span>
          </div>
          <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full" style={{ background: 'radial-gradient(closest-side, rgba(255,111,97,.18), transparent)', filter: 'blur(6px)' }} />
        </section>

        <section className="animate-fadeUp" style={{ animationDelay: '60ms' }}>
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-display text-[16px] font-semibold text-[color:var(--brand-navy)]">Ações rápidas</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[
              { icon: PlusCircle, label: 'Nova meta' },
              { icon: BookOpen,  label: 'Atividade' },
              { icon: Wind,      label: 'Respirar' },
              { icon: Smile,     label: 'Gratidão' },
            ].map(({icon:Icon,label},i)=> (
              <button key={label} className="shrink-0 rounded-xl border border-[color:var(--neutral-100)] bg-white px-3.5 py-2.5 text-sm shadow-elev-1 hover-lift active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-coral)]/30" style={{animationDelay: `${80 + i*20}ms`}}>
                <span className="flex items-center gap-2 text-[color:var(--brand-navy)]">
                  <Icon size={16} />
                  {label}
                </span>
              </button>
            ))}
          </div>
        </section>

        <div className="space-y-6">
        <Card className="ring-0 border border-[color:var(--neutral-100)] bg-white shadow-elev-1 p-4 animate-fadeUp active:scale-[0.995] transition-transform" style={{ animationDelay: '80ms' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--neutral-100)] bg-[color:var(--neutral-50)]">
                <Sparkles size={14} className="text-[color:var(--brand-navy)]/80" />
              </span>
              <h2 className="font-display text-[18px] leading-6 font-semibold tracking-[-0.01em] text-[color:var(--brand-navy)]">Mensagem do dia</h2>
            </div>
            <span className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-[color:var(--neutral-50)] text-[color:var(--brand-navy)]/70 border border-[color:var(--neutral-100)]">Hoje</span>
          </div>
          <MessageOfTheDay
            initial={"Pequenos momentos se transformam em grandes lembranças."}
            textClassName="text-[color:var(--ink)]"
            buttonClassName="bg-[color:var(--brand-coral)] text-white rounded-md px-3.5 py-2 font-semibold shadow-elev-1 hover:opacity-95 active:opacity-90 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-coral)]/40 focus:ring-offset-2"
          />
        </Card>

        <Card className="ring-0 border border-[color:var(--neutral-100)] bg-white shadow-elev-2 p-4 animate-fadeUp active:scale-[0.995] transition-transform" style={{ animationDelay: '120ms' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--neutral-100)] bg-[color:var(--neutral-50)]">
                <BookOpen size={14} className="text-[color:var(--brand-navy)]/80" />
              </span>
              <h2 className="font-display text-[18px] leading-6 font-semibold tracking-[-0.01em] text-[color:var(--brand-navy)]">Atividade do dia</h2>
            </div>
            <span className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-[color:var(--neutral-50)] text-[color:var(--brand-navy)]/70 border border-[color:var(--neutral-100)]">Destaque</span>
          </div>
          <ActivityOfDay
            titleClassName="text-[color:var(--brand-navy)]"
            bodyClassName="text-[color:var(--ink)]"
            primaryButtonClassName="bg-[color:var(--brand-coral)] text-white rounded-md px-3.5 py-2 font-semibold shadow-elev-1 hover:opacity-95 active:opacity-90 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-coral)]/40 focus:ring-offset-2"
            secondaryButtonClassName="bg-[color:var(--brand-coral)] text-white rounded-md px-3.5 py-2 font-semibold shadow-elev-1 hover:opacity-95 active:opacity-90 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-coral)]/40 focus:ring-offset-2"
            secondaryButtonVariantOverride="primary"
          />
        </Card>

        <Card className="ring-0 border border-[color:var(--brand-peach)]/50 bg-[color:var(--brand-peach)]/35 text-[color:var(--brand-navy)] shadow-elev-1 p-4 animate-fadeUp hover-lift" style={{ animationDelay: '140ms' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--neutral-100)] bg-white/70">
                <Lightbulb size={14} className="text-[color:var(--brand-navy)]/80" />
              </span>
              <h2 className="font-display text-[18px] leading-6 font-semibold tracking-[-0.01em] text-[color:var(--brand-navy)]">Tip do dia</h2>
            </div>
            <span className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-white/70 text-[color:var(--brand-navy)]/80 border border-[color:var(--neutral-100)]">Aconselhável</span>
          </div>
          <p className="text-sm text-[color:var(--ink)]">Reserve 5 minutos para respirar profundamente hoje. Pequenas pausas restauram sua energia para estar presente com seu filho.</p>
          <div className="mt-3 flex justify-end">
            <a href="#" className="inline-flex items-center bg-[color:var(--brand-coral)] text-white rounded-md px-3.5 py-2 font-semibold shadow-elev-1 hover:opacity-95 active:opacity-90 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-coral)]/40 focus:ring-offset-2">Ver dica</a>
          </div>
        </Card>
        </div>
      </div>

      <div className="divider-hairline" />
      <section className="animate-fadeUp active:scale-[0.995] transition-transform" style={{ animationDelay: '160ms' }}>
        <SectionTitle className="text-[22px] leading-7 font-semibold text-[color:var(--brand-navy)] tracking-[-0.01em]">Planner</SectionTitle>
        <PlannerSection />
      </section>

      <section className="animate-fadeUp active:scale-[0.995] transition-transform" style={{ animationDelay: '200ms' }}>
        <SectionTitle className="text-[22px] leading-7 font-semibold text-[color:var(--brand-navy)] tracking-[-0.01em]">Progresso da semana</SectionTitle>
        <WeeklyProgress />
      </section>
    </Container>
  )
}
