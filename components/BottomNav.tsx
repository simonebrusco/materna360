"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
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
    <nav className="fixed bottom-0 inset-x-0 border-t bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <ul className="mx-auto flex max-w-2xl items-center justify-between px-6 py-3">
        {items.map((it) => (
          <li key={it.key}>
            <Link
              href={it.href}
              className={cn(
                "inline-flex flex-col items-center text-sm",
                isActive(it.href) ? "text-[#AD8567] font-medium" : "text-gray-500 hover:text-gray-700"
              )}
            >
              <span>{it.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
