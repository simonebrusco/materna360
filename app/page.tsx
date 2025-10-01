import Link from "next/link";
import AlertButton from "../components/AlertButton";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-3xl font-semibold">Olá, este é um teste do Materna360 🚀</h1>
      <p className="mt-3 text-gray-600">Next.js App Router + Tailwind CSS initialized successfully.</p>
      <div className="mt-6 flex justify-center">
        <AlertButton label="Mostrar Alerta" />
      </div>
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
      <div className="mt-4 flex justify-center">
        <Link
          href="/sobre"
          aria-label="Ir para a página Sobre"
          className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl border border-[#359b9d] px-6 py-3 text-[#359b9d] text-base font-medium shadow-sm hover:bg-[#359b9d]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#359b9d]/40"
        >
          Sobre
        </Link>
      </div>
    </main>
  );
}
