import dynamic from 'next/dynamic';
const MessageOfTheDay = dynamic(() => import('../../components/MessageOfTheDay'), { ssr: false });
import ActivityOfDay from '../../components/ActivityOfDay';
import Card from '../../components/ui/Card';
import SectionTitle from '../../components/ui/SectionTitle';
import WeeklyProgress from '../../components/today/WeeklyProgress';
import WeeklyGoals from '../../components/goals/WeeklyGoals';
import PlannerSection from '@/components/planner/PlannerSection';
import HeaderGreeting from '@/components/shell/HeaderGreeting';

export default function Page() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <HeaderGreeting />

      <Card>
        <SectionTitle>🌟 Mensagem do dia</SectionTitle>
        <MessageOfTheDay initial={"Pequenos momentos se transformam em grandes lembranças."} />
      </Card>

      <PlannerSection />

      <WeeklyGoals />

      <Card>
        <SectionTitle>🧩 Atividade do dia</SectionTitle>
        <ActivityOfDay />
      </Card>

      <Card>
        <SectionTitle>💡 Dica de hoje</SectionTitle>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">Reserve alguns minutos para respirar fundo e apreciar um pequeno momento do dia.</p>
      </Card>

      <WeeklyProgress />
    </div>
  );
}
