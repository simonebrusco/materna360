import dynamic from 'next/dynamic';
import Greeting from '../../components/Greeting';
const MessageOfTheDay = dynamic(() => import('../../components/MessageOfTheDay'), { ssr: false });
import ActivityOfDay from '../../components/ActivityOfDay';
import Card from '../../components/ui/Card';
import SectionTitle from '../../components/ui/SectionTitle';

export default function Page() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 space-y-5 sm:space-y-6 lg:space-y-8">
      <Greeting />

      <Card>
        <SectionTitle>🌟 Mensagem do dia</SectionTitle>
        <MessageOfTheDay initial={"Pequenos momentos se transformam em grandes lembranças."} />
      </Card>

      <Card>
        <SectionTitle>🧩 Atividade do dia</SectionTitle>
        <ActivityOfDay />
      </Card>

      <Card>
        <SectionTitle>💡 Dica de hoje</SectionTitle>
        <p className="text-gray-600 leading-relaxed">Reserve alguns minutos para respirar fundo e apreciar um pequeno momento do dia.</p>
      </Card>
    </div>
  );
}
