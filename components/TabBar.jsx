'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { href: '/', label: 'Meu Dia', icon: '🏠' },
  { href: '/cuidar', label: 'Cuidar', icon: '🌿' },
  { href: '/descobrir', label: 'Descobrir', icon: '✨' },
  { href: '/eu360', label: 'Eu360', icon: '🫶' },
];

export default function TabBar() {
  const pathname = usePathname();

  return (
    <nav className="tabbar">
      <ul className="tabbar-list">
        {tabs.map((t) => {
          const active = pathname === t.href;
          return (
            <li key={t.href} className="tabbar-item">
              <Link href={t.href} className={`tabbar-link ${active ? 'is-active' : ''}`}>
                <span className="tabbar-icon" aria-hidden>{t.icon}</span>
                <span className="tabbar-label">{t.label}</span>
                {active && <span className="tabbar-dot" />}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
