import Link from "next/link";
import Logo from "@/components/brand/Logo";

export default function AppHeader() {
  return (
    <header className="brand-header" role="banner" aria-label="Cabeçalho Materna360">
      <div className="header-ribbon" aria-hidden="false">
        <Link href="/" aria-label="Materna360" className="tap-scale">
          <Logo width={184} height={36} className="header-logo" />
        </Link>
      </div>
    </header>
  );
}
