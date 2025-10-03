/** DO NOT re-export this file. Keep this as a direct server page (no client hooks). */

import React from 'react'
import MessageOfTheDay from '@/components/MessageOfTheDay'
import ActivityOfDay from '@/components/ActivityOfDay'
import PlannerSection from '@/components/planner/PlannerSection'
import WeeklyProgress from '@/components/today/WeeklyProgress'
import Container from '@/components/Container'
import SectionTitle from '@/components/ui/SectionTitle'
import Card from '@/components/ui/Card'

export const dynamic = 'force-static'

export default async function Page() {
  return (
    <Container className="min-h-screen bg-white pt-4 pb-24">
      <header className="pt-6">
        <h1 className="text-2xl font-semibold text-[#2F3A56]">Olá, Simone <span aria-hidden>💛</span></h1>
        <p className="text-sm text-[#2F3A56]">Que bom ter você aqui, vamos juntos criar momentos especiais hoje.</p>
      </header>

      <section
        className="rounded-2xl border border-[color:var(--neutral-100)] bg-[color:var(--neutral-50)] shadow-elev-1 p-4 animate-fadeUp active:scale-[0.995] transition-transform"
        style={{ animationDelay: '40ms' }}
        aria-label="Mini hero"
      >
        <div className="flex items-start gap-3">
          <div className="shrink-0 mt-0.5" aria-hidden>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2l1.5 3.9 3.9 1.5-3.9 1.5L12 13l-1.5-4.1-3.9-1.5 3.9-1.5L12 2z" fill="currentColor" opacity=".9" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[15px] font-semibold text-[color:var(--brand-navy)] tracking-[-0.01em]">Olá, Simone</p>
              <span className="inline-flex items-center rounded-full border border-[color:var(--neutral-100)] bg-white/80 px-2 py-0.5 text-[11px] font-medium text-[color:var(--brand-navy)]/80">Semana 3 / 8 • 62% concluído</span>
            </div>
            <p className="mt-1 text-sm text-[color:var(--ink)]">Que bom ter você aqui, vamos juntos criar momentos especiais hoje.</p>
          </div>
        </div>
      </section>

      <div className="space-y-6">
        <Card className="ring-0 border border-[color:var(--neutral-100)] bg-white shadow-elev-1 p-4 animate-fadeUp active:scale-[0.995] transition-transform" style={{ animationDelay: '80ms' }}>
          <div className="flex items-center justify-between mb-2">
            <SectionTitle className="text-[22px] leading-7 font-semibold text-[color:var(--brand-navy)] tracking-[-0.01em]">Mensagem do dia</SectionTitle>
            <span className="ml-3 inline-flex items-center rounded-full border border-[color:var(--neutral-100)] bg-[color:var(--neutral-50)] px-2 py-0.5 text-[11px] font-medium text-[color:var(--brand-navy)]/70">Hoje</span>
          </div>
          <MessageOfTheDay
            initial={"Pequenos momentos se transformam em grandes lembranças."}
            textClassName="text-[color:var(--ink)]"
            buttonClassName="bg-[color:var(--brand-coral)] text-white rounded-md px-3.5 py-2 font-semibold shadow-elev-1 hover:opacity-95 active:opacity-90 focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-coral)]/40 focus:ring-offset-2"
          />
        </Card>

        <Card className="p-4 ring-[#E5E5E5]">
          <SectionTitle className="text-[#2F3A56]">Atividade do dia</SectionTitle>
          <ActivityOfDay
            titleClassName="text-[#2F3A56]"
            bodyClassName="text-[#2F3A56]"
            primaryButtonClassName="font-bold uppercase rounded-md shadow-sm"
            secondaryButtonClassName="font-bold uppercase rounded-md shadow-sm"
            secondaryButtonVariantOverride="primary"
          />
        </Card>
      </div>

      <section>
        <SectionTitle className="text-[#2F3A56]">Planner</SectionTitle>
        <PlannerSection />
      </section>

      <section>
        <SectionTitle className="text-[#2F3A56]">Progresso da semana</SectionTitle>
        <WeeklyProgress />
      </section>
    </Container>
  )
}
