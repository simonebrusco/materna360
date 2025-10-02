export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-6 pb-6 [padding-top:env(safe-area-inset-top)]">
        <h1 className="truncate text-lg sm:text-xl font-semibold text-charcoal">
          Olá, Simone <span className="text-coral" aria-hidden>♥</span>
        </h1>
        <p className="mt-0.5 text-xs sm:text-sm text-grayMid">
          Que bom ter você aqui, vamos juntos criar momentos especiais hoje.
        </p>
      </div>
    </header>
  );
}
