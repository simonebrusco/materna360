import dynamic from 'next/dynamic';
import Greeting from '../../components/Greeting';
const MessageOfTheDay = dynamic(() => import('../../components/MessageOfTheDay'), { ssr: false });
import ActivityOfDay from '../../components/ActivityOfDay';

export default function Page() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-6">
      <div data-ui-flag="diagnostic-v2" className="mb-4 rounded-lg border border-red-500 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
        UI DIAGNOSTIC: This is app/(tabs)/page.tsx – Tailwind should show red background/border/text.
      </div>

      <Greeting />

      <section className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200/60 p-6 space-y-3">
        <h2 className="text-base font-semibold leading-7 text-gray-900">🌟 Mensagem do dia</h2>
        <div className="mt-3">
          <MessageOfTheDay initial={"Pequenos momentos se transformam em grandes lembranças."} />
        </div>
      </section>

      <section className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200/60 p-6 space-y-3">
        <h2 className="text-base font-semibold leading-7 text-gray-900">🧩 Atividade do dia</h2>
        <div className="mt-3">
          <ActivityOfDay />
        </div>
      </section>

      <section className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200/60 p-6 space-y-3">
        <h2 className="text-base font-semibold leading-7 text-gray-900">💡 Dica de hoje</h2>
        <p className="mt-3 text-gray-700">Reserve alguns minutos para respirar fundo e apreciar um pequeno momento do dia.</p>
      </section>
    </div>
  );
}
