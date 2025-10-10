import Link from "next/link";
import Logo from "@/components/brand/Logo";

export default function AppHeader() {
  return (
    <header className="brand-header" role="banner" aria-label="Cabeçalho Materna360">
      <div className="brand-header-row" aria-label="Barra do topo">
        <div className="header-spacer-left" aria-hidden="true" />

        <div className="header-center-logo">
          <Link href="/" aria-label="Materna360" className="tap-scale logo-link">
            <Logo width={184} height={36} className="brand-logo-img" />
          </Link>
        </div>

        <div className="header-actions" aria-label="Ações do topo"></div>
      </div>
      <div className="sunrise-ray" aria-hidden="true" />
    </header>
  );
}
