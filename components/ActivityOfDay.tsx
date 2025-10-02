export default function ActivityOfDay() {
  return (
    <div>
      <div className="flex items-start justify-between">
        <span className="inline-flex rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 ml-auto">10 min</span>
      </div>

      <h3 className="mt-2 text-lg font-medium text-gray-900 sm:text-xl">Brincadeira de blocos criativos</h3>
      <p className="mt-1.5 text-sm sm:text-base text-gray-600 leading-relaxed">Separe alguns blocos de montar e convide seu filho para criar juntos uma torre, um animal ou o que a imaginação mandar.</p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 w-full sm:w-auto h-11 sm:h-auto"
        >
          Iniciar
        </button>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg bg-gray-100 text-gray-700 px-4 py-2 hover:bg-gray-200 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 w-full sm:w-auto h-11 sm:h-auto"
        >
          Salvar no Planner
        </button>
      </div>
    </div>
  );
}
