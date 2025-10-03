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
    <Container className="min-h-screen bg-white flex flex-col gap-6 pb-24">
      <header className="pt-6">
        <h1 className="text-2xl font-semibold text-[#2F3A56]">Olá, Simone <span aria-hidden>💛</span></h1>
        <p className="text-sm text-[#2F3A56]">Que bom ter você aqui, vamos juntos criar momentos especiais hoje.</p>
      </header>

      <div className="space-y-4">
        <Card className="p-4 bg-[#F9C9B7] text-[#2F3A56] ring-[#E5E5E5]">
          <SectionTitle className="text-[#2F3A56]">Mensagem do dia</SectionTitle>
          <MessageOfTheDay
            initial={"Pequenos momentos se transformam em grandes lembranças."}
            textClassName="text-[#2F3A56]"
            buttonClassName="font-bold uppercase rounded-md shadow-sm"
          />
        </Card>

        <Card className="p-4 ring-[#E5E5E5]">
          <SectionTitle className="text-[#2F3A56]">Atividade do dia</SectionTitle>
          <ActivityOfDay
            titleClassName="text-[#2F3A56]"
            bodyClassName="text-[#2F3A56]"
            primaryButtonClassName="font-bold uppercase rounded-md shadow-sm"
            secondaryButtonClassName="font-bold uppercase rounded-md shadow-sm text-[#2F3A56] ring-[#E5E5E5] bg-transparent hover:bg-[#F5F5F5]"
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
