export default function ActivityOfTheDay() {
  // TODO: Replace static activity content with data from our activity engine.
  // TODO: Wire “Iniciar” to the actual activity flow and “Salvar no Planner” to the weekly planner.
  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5 p-5 sm:p-6">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">🎲</div>
          <span className="ml-auto inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">10 min</span>
        </div>
        <h2 className="mt-3 text-lg sm:text-xl font-semibold tracking-tight text-gray-900">Brincadeira de blocos criativos</h2>
        <p className="mt-2 text-sm text-gray-600">Separe alguns blocos de montar e convide seu filho para criar juntos uma torre, um animal ou o que a imaginação mandar.</p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <button type="button" className="inline-flex items-center justify-center rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50 transition">Iniciar</button>
          <button type="button" className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400/40 transition">Salvar no Planner</button>
        </div>
      </div>
    </section>
  );
}
