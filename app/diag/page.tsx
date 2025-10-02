export default function Page() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div style={{padding: '8px', background: '#eef2ff', borderRadius: 8, marginBottom: 12}}>
        CSS DIAG: If body is light gray and this box is purple-ish, global CSS is loaded. Next, Tailwind styles should also appear.
      </div>
      <div
        data-ui-flag="diag-route"
        className="mb-6 rounded-lg border border-red-500 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800"
      >
        DIAG: You are on /diag. If this box is not red, Tailwind is not applying.
      </div>

      <section className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200/70 p-6 space-y-3">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Diagnóstico de UI</h1>
        <p className="text-gray-700">Este cartão deve estar branco, arredondado, com sombra e borda suave.</p>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600/50"
        >
          Botão de teste
        </button>
      </section>
    </div>
  );
}
