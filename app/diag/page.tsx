import Container from "../../components/Container";
import Card from "../../components/ui/Card";
import SectionTitle from "../../components/ui/SectionTitle";

export default function Page() {
  return (
    <Container>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl bg-orange-500 text-white shadow-sm ring-1 ring-black/5 p-6">Orange</div>
        <div className="rounded-2xl bg-indigo-500 text-white shadow-sm ring-1 ring-black/5 p-6">Indigo</div>
        <div className="rounded-2xl bg-emerald-500 text-white shadow-sm ring-1 ring-black/5 p-6">Emerald</div>
        <div className="rounded-2xl bg-rose-500 text-white shadow-sm ring-1 ring-black/5 p-6">Rose</div>
      </div>

      <Card className="ring-gray-200 p-6 space-y-4">
        <SectionTitle>Card de exemplo</SectionTitle>
        <p className="text-gray-700">Este é um cartão de amostra para validar a tipografia, espaçamentos e bordas.</p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600/30"
          >
            Primário
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400/20"
          >
            Secundário
          </button>
        </div>
      </Card>

      <p className="text-sm text-gray-600">If you see colors, rounded corners and shadows here, Tailwind is working.</p>
    </Container>
  );
}
