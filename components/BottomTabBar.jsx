"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const tabs=[
  { href:"/", label:"Meu Dia", icon:"🏠" },
  { href:"/cuidar", label:"Cuidar", icon:"🌿" },
  { href:"/descobrir", label:"Descobrir", icon:"✨" },
  { href:"/eu360", label:"Eu360", icon:"💫" }
];
export default function BottomTabBar(){
  const path=usePathname();
  return <nav className="bottom-nav">
    {tabs.map(t=>{
      const active = path===t.href;
      return (
        <Link key={t.href} href={t.href} className={`tab ${active?"tab-active":""}`}>
          <div className="icon" aria-hidden>{t.icon}</div>
          {t.label}
        </Link>
      );
    })}
  </nav>;
}
