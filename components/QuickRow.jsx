'use client';
import Link from 'next/link';

export default function QuickRow(){
  const items = [
    { href: '/config/reminders', label: 'Lembretes', icon: '🔔' },
    { href: '/eu360',            label: 'Gratidão',  icon: '✨'  },
    { href: '/descobrir',        label: 'Descobrir', icon: '📚' },
    { href: '/cuidar',           label: 'Áudios',    icon: '🎧' },
  ];
  return (
    <div className="quick-row">
      {items.map((it) => (
        <Link key={it.href} href={it.href} className="quick-link">
          <div className="quick-icon">{it.icon}</div>
          <div className="quick-label">{it.label}</div>
        </Link>
      ))}
    </div>
  );
}
