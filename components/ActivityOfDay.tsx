export default function ActivityOfDay() {
  return (
    <div>
      <div className="flex items-start justify-between">
        <span className="inline-flex rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 ml-auto">10 min</span>
      </div>

      <h3 className="mt-2 text-lg font-medium text-gray-900 sm:text-xl">Brincadeira de blocos criativos</h3>
      <p className="mt-1.5 text-gray-700 leading-relaxed">Separe alguns blocos de montar e convide seu filho para criar juntos uma torre, um animal ou o que a imaginação mandar.</p>

      <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 transition"
        >
          Iniciar
        </button>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 transition"
        >
          Salvar no Planner
        </button>
      </div>
    </div>
  );
}
