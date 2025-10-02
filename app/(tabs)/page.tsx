import dynamic from 'next/dynamic';
import Greeting from '../../components/Greeting';
const MessageOfTheDay = dynamic(() => import('../../components/MessageOfTheDay'), { ssr: false });
import ActivityOfDay from '../../components/ActivityOfDay';
import Card from '../../components/ui/Card';
import SectionTitle from '../../components/ui/SectionTitle';

export default function Page() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <Greeting />

      <Card className="ring-gray-200 p-6">
        <div className="mb-2"><SectionTitle>🌟 Mensagem do dia</SectionTitle></div>
        <div>
          <MessageOfTheDay initial={"Pequenos momentos se transformam em grandes lembranças."} />
        </div>
      </Card>

      <Card className="ring-gray-200 p-6">
        <div className="mb-2"><SectionTitle>🧩 Atividade do dia</SectionTitle></div>
        <div>
          <ActivityOfDay />
        </div>
      </Card>

      <Card className="ring-gray-200 p-6">
        <div className="mb-2"><SectionTitle>💡 Dica de hoje</SectionTitle></div>
        <p className="text-gray-600">Reserve alguns minutos para respirar fundo e apreciar um pequeno momento do dia.</p>
      </Card>
    </div>
  );
}
