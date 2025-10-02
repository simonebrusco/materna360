"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Hoje", icon: "🏠" },
  { href: "/atividades", label: "Atividades", icon: "🎯" },
  { href: "/bem-estar", label: "Bem-estar", icon: "🌿" },
  { href: "/perfil", label: "Perfil", icon: "👤" },
];

export default function BottomNav() {
  const pathname = usePathname() || "/";
  return (
    <nav className="sticky bottom-0 z-20 border-t border-gray-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 [padding-bottom:env(safe-area-inset-bottom)]">
      <div className="mx-auto max-w-3xl px-2 sm:px-4">
        <ul className="grid grid-cols-4 gap-1 py-2">
          {items.map((it) => {
            const active = pathname === it.href;
            return (
              <li key={it.href}>
                <Link
                  href={it.href}
                  className={[
                    "flex flex-col items-center justify-center rounded-xl px-3 py-2 text-xs sm:text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2",
                    active
                      ? "bg-coral text-white"
                      : "text-grayMid hover:bg-gray-100",
                  ].join(" ")}
                >
                  <span aria-hidden className="text-base sm:text-lg leading-none">{it.icon}</span>
                  <span className="mt-1 leading-none">{it.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
