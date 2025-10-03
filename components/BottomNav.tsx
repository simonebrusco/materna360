"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function cx(...args: Array<string | false | null | undefined>) {
  return args.filter(Boolean).join(" ");
}

const items = [
  { href: "/", label: "Hoje", key: "home" },
  { href: "/atividades", label: "Atividades", key: "atividades" },
  { href: "/bem-estar", label: "Bem-estar", key: "bem-estar" },
  { href: "/perfil", label: "Perfil", key: "perfil" },
];

export default function BottomNav() {
  const pathname = usePathname() || "/";

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 inset-x-0 z-20 border-t border-gray-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 [padding-bottom:calc(1.5rem+env(safe-area-inset-bottom))]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <ul className="grid grid-cols-4 gap-1 py-2">
          {items.map((it) => (
            <li key={it.key}>
              <Link
                href={it.href}
                className={cx(
                  "flex flex-col items-center justify-center rounded-xl px-3 py-2 text-xs sm:text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#AD8567] focus-visible:ring-offset-2",
                  isActive(it.href) ? "text-[#AD8567] font-medium" : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                )}
                aria-current={isActive(it.href) ? "page" : undefined}
              >
                <span className="mt-1 leading-none">{it.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
