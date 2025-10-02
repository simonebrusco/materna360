export default function ActivityOfDay() {
  return (
    <div>
      <div className="flex items-start justify-between">
        <span className="inline-flex rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 ml-auto">10 min</span>
      </div>

      <h3 className="mt-2 text-lg font-medium text-gray-900 sm:text-xl">Brincadeira de blocos criativos</h3>
      <p className="mt-1.5 text-gray-700">Separe alguns blocos de montar e convide seu filho para criar juntos uma torre, um animal ou o que a imaginação mandar.</p>

      <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600/50 disabled:opacity-40"
        >
          Iniciar
        </button>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-600/30"
        >
          Salvar no Planner
        </button>
      </div>
    </div>
  );
}
