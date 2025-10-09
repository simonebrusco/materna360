import Link from "next/link";
import Logo from "@/components/brand/Logo";

export default function AppHeader() {
  return (
    <header className="brand-header" role="banner" aria-label="Cabeçalho Materna360">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
        <Link href="/" aria-label="Materna360" className="tap-scale" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Logo width={140} height={30} />
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} aria-label="Ações do topo"></div>
      </div>
    </header>
  );
}
