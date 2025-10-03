/** DO NOT re-export this file. Keep this as a direct server page (no client hooks). */

import React from 'react'
import MessageOfTheDay from '@/components/MessageOfTheDay'
import ActivityOfDay from '@/components/ActivityOfDay'
import PlannerSection from '@/components/planner/PlannerSection'
import WeeklyProgress from '@/components/today/WeeklyProgress'
import Container from '@/components/Container'
import SectionTitle from '@/components/ui/SectionTitle'

export const dynamic = 'force-static'

export default async function Page() {
  return (
    <Container className="min-h-screen bg-offwhite flex flex-col gap-6 pb-24">
      <header className="pt-6">
        <h1 className="text-2xl font-semibold text-gray-900">Olá, Simone <span aria-hidden>💛</span></h1>
        <p className="text-sm text-gray-600">Que bom ter você aqui, vamos juntos criar momentos especiais hoje.</p>
      </header>

      <section>
        <SectionTitle>Mensagem do dia</SectionTitle>
        <MessageOfTheDay initial={"Pequenos momentos se transformam em grandes lembranças."} />
      </section>

      <section>
        <SectionTitle>Atividade do dia</SectionTitle>
        <ActivityOfDay />
      </section>

      <section>
        <SectionTitle>Planner</SectionTitle>
        <PlannerSection />
      </section>

      <section>
        <SectionTitle>Progresso da semana</SectionTitle>
        <WeeklyProgress />
      </section>
    </Container>
  )
}
