export default function ActivityOfDay() {
  return (
    <section className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm ring-1 ring-black/5 p-5 sm:p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="text-2xl select-none" aria-hidden>🧩</div>
          <p className="text-base/6 font-semibold text-gray-900">Atividade do dia</p>
        </div>
        <span className="inline-flex rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">10 min</span>
      </div>

      <h3 className="mt-2 text-lg font-medium text-gray-900 sm:text-xl">Brincadeira de blocos criativos</h3>
      <p className="mt-1.5 text-gray-700">Separe alguns blocos de montar e convide seu filho para criar juntos uma torre, um animal ou o que a imaginação mandar.</p>

      <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Iniciar
        </button>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
        >
          Salvar no Planner
        </button>
      </div>
    </section>
  );
}
