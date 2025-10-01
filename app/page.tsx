export default function HomePage() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-3xl font-semibold">Olá, este é um teste do Materna360 🚀</h1>
      <p className="mt-3 text-gray-600">Next.js App Router + Tailwind CSS initialized successfully.</p>
      <div className="mt-6 flex justify-center">
        <a
          href="https://google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-[#359b9d] px-6 py-3 text-white text-lg font-medium shadow-md hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#359b9d]/50"
        >
          Saiba Mais
        </a>
      </div>
    </main>
  );
}
