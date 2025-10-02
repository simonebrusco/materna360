import Greeting from '../../components/Greeting';
import MessageOfTheDay from '../../components/MessageOfTheDay';
import ActivityOfDay from '../../components/ActivityOfDay';
import Card from '../../components/ui/Card';
import SectionTitle from '../../components/ui/SectionTitle';
import { getRandomMessage } from '../../data/messages';

export default function Page() {
  const initialMessage: string = getRandomMessage();
  return (
    <div className="space-y-6 sm:space-y-8">
      <Greeting />

      <Card>
        <SectionTitle>🌟 Mensagem do dia</SectionTitle>
        <div className="mt-3">
          <MessageOfTheDay initial={initialMessage} />
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
