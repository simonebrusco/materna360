import Header from "../components/Header";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-3xl font-semibold">Olá, este é um teste do Materna360 🚀</h1>
      <p className="mt-3 text-gray-600">Next.js App Router + Tailwind CSS initialized successfully.</p>
    </main>
    </>
  );
}
