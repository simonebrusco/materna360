import type React from 'react';

const LOGO_URL =
  "" ||
  "/Materna1000_300.svg";

function BrandLogo() {
  const onError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const el = e.currentTarget;
    el.outerHTML = `
      <svg width="106" height="32" viewBox="0 0 106 32" xmlns="http://www.w3.org/2000/svg" style="opacity:.95">
        <rect rx="6" width="106" height="32" fill="#2F3A56"/>
        <circle cx="12" cy="16" r="5" fill="#FF6F61"/>
        <text x="24" y="20" fill="white" font-size="12" font-family="system-ui, -apple-system, Segoe UI, Inter, sans-serif">Materna360</text>
      </svg>
    `;
  };

  return (
    <img
      src={LOGO_URL}
      alt="Materna360"
      className="block h-7 md:h-8 w-auto object-contain opacity-95"
      loading="eager"
      decoding="async"
      fetchPriority="high"
      onError={onError}
    />
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-6 pb-3 [padding-top:calc(1.5rem+env(safe-area-inset-top))]">
        <BrandLogo />
        <p className="mt-0.5 text-xs sm:text-sm text-grayMid">
          Que bom ter você aqui, vamos juntos criar momentos especiais hoje.
        </p>
      </div>
    </header>
  );
}
