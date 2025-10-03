"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function cx(...args: Array<string | false | null | undefined>) {
  return args.filter(Boolean).join(" ");
}

const tabs = [
  { href: "/", label: "Hoje", emoji: "🏠" },
  { href: "/atividades", label: "Atividades", emoji: "🎯" },
  { href: "/bem-estar", label: "Bem-estar", emoji: "🌿" },
  { href: "/perfil", label: "Perfil", emoji: "👤" },
];

export default function BottomNav() {
  const pathname = usePathname() || "/";
  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 border-t border-[color:var(--neutral-100)] bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_12px_rgba(20,25,40,.06)]"
      role="navigation"
      aria-label="Navegação inferior"
    >
      <ul className="mx-auto flex max-w-2xl items-stretch justify-between gap-1 px-4 py-2">
        {tabs.map((t) => {
          const active = pathname === t.href || (t.href !== "/" && pathname.startsWith(t.href));
          return (
            <li key={t.href} className="flex-1">
              <Link
                href={t.href}
                className={cx(
                  "flex h-12 flex-col items-center justify-center rounded-xl text-xs transition-colors",
                  active ? "text-[#AD8567] font-semibold" : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                )}
                aria-current={active ? "page" : undefined}
              >
                <span className="text-base" aria-hidden>
                  {t.emoji}
                </span>
                <span className="mt-0.5">{t.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
