export default function ActivityOfDay() {
  return (
    <div>
      <div className="flex items-start justify-between">
        <span className="inline-flex rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 ml-auto">10 min</span>
      </div>

      <h3 className="mt-2 text-lg font-medium text-charcoal sm:text-xl">Brincadeira de blocos criativos</h3>
      <p className="mt-1.5 text-sm sm:text-base text-grayMid leading-relaxed">Separe alguns blocos de montar e convide seu filho para criar juntos uma torre, um animal ou o que a imaginação mandar.</p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg bg-coral px-4 py-2 text-sm font-medium text-white hover:bg-coral-hover active:bg-coral-active shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 transition w-full sm:w-auto min-h-[44px]"
        >
          Iniciar
        </button>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-coral text-coral px-4 py-2 text-sm font-medium hover:bg-coral-light hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 w-full sm:w-auto min-h-[44px]"
        >
          Salvar no Planner
        </button>
      </div>
    </div>
  );
}
