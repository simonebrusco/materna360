import dynamic from 'next/dynamic';
import Greeting from '../../components/Greeting';
const MessageOfTheDay = dynamic(() => import('../../components/MessageOfTheDay'), { ssr: false });
import ActivityOfDay from '../../components/ActivityOfDay';
import Card from '@/components/ui/Card';
import SectionTitle from '@/components/ui/SectionTitle';

export default function Page() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <Greeting />

      <Card>
        <SectionTitle>🌟 Mensagem do dia</SectionTitle>
        <div className="mt-3">
          <MessageOfTheDay initial={"Pequenos momentos se transformam em grandes lembranças."} />
        </div>
      </Card>

      <Card>
        <SectionTitle>🧩 Atividade do dia</SectionTitle>
        <div className="mt-3">
          <ActivityOfDay />
        </div>
      </Card>

      <Card>
        <SectionTitle>💡 Dica de hoje</SectionTitle>
        <p className="mt-3 text-gray-700">Reserve alguns minutos para respirar fundo e apreciar um pequeno momento do dia.</p>
      </Card>
    </div>
  );
}
