import BrandLogo from "./BrandLogo";


export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-6 pb-3 [padding-top:calc(1.5rem+env(safe-area-inset-top))]">
        <BrandLogo />
      </div>
    </header>
  );
}
