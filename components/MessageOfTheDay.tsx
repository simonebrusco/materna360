export default function MessageOfTheDay() {
  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-xl bg-white shadow-sm ring-1 ring-black/5 p-4 sm:p-5">
        <span className="absolute left-4 top-3 text-orange-500">“</span>
        <p className="pl-5 text-gray-900">Pequenos momentos se transformam em grandes lembranças.</p>
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            aria-label="Nova mensagem"
            className="inline-flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md px-3 py-1 transition"
          >
            Nova mensagem
          </button>
        </div>
      </div>
    </section>
  );
}
