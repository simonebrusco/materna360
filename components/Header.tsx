const LOGO_URL = "/Materna1000_300.svg";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-6 pb-3 [padding-top:calc(1.5rem+env(safe-area-inset-top))]">
        <img
          src={LOGO_URL}
          alt="Materna360"
          className="h-7 md:h-8 w-auto object-contain opacity-95"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <p className="mt-0.5 text-xs sm:text-sm text-grayMid">
          Que bom ter você aqui, vamos juntos criar momentos especiais hoje.
        </p>
      </div>
    </header>
  );
}
