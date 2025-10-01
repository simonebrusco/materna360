import Link from 'next/link';

export default function SobrePage() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <section className="mx-auto w-full max-w-2xl rounded-2xl bg-white p-8 shadow">
        <h1 className="text-2xl font-semibold">Sobre o Materna360</h1>
        <p className="mt-3 text-gray-700">
          Esta é uma página de teste criada para validar a navegação interna utilizando o Next.js App Router.
          Ela demonstra uma rota simples com layout em cartão e um botão de retorno para a página inicial.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            aria-label="Voltar para a Home"
            className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-gray-900 px-5 py-3 text-white shadow-md hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/50"
          >
            Voltar para a Home
          </Link>
        </div>
      </section>
    </main>
  );
}
