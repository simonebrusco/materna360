import Link from "next/link";
import Logo from "@/components/brand/Logo";

export default function AppHeader() {
  return (
    <header className="brand-header" role="banner" aria-label="Cabeçalho Materna360">
      <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <Link href="/" aria-label="Materna360" className="tap-scale" style={{display:'flex',alignItems:'center',gap:8}}>
          <Logo width={160} height={40} className="brand-logo" />
        </Link>
        <div style={{display:'flex',alignItems:'center',gap:8}} aria-label="Ações do topo"></div>
      </div>
    </header>
  );
}
