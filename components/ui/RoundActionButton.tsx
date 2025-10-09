"use client";

import * as React from "react";
import Link from "next/link";

type Props =
  | { label: string; icon?: React.ReactNode; href: string; onClick?: never }
  | { label: string; icon?: React.ReactNode; onClick: () => void; href?: never };

export default function RoundActionButton({ label, icon, href, onClick }: Props) {
  const Inner = (
    <span
      className="
        inline-flex items-center gap-2 rounded-full px-3 py-2
        bg-white/70 backdrop-blur-sm shadow-sm
        hover:bg-white transition
        focus:outline-none
      "
    >
      {icon ? <span className="shrink-0">{icon}</span> : null}
      <span className="text-sm font-medium text-slate-800">{label}</span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="focus:outline-none">
        {Inner}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className="focus:outline-none">
      {Inner}
    </button>
  );
}
