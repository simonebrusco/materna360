"use client";
import Link from "next/link";

type Props = {
  href?: string;
  onClick?: () => void;
  label: string;
  icon?: React.ReactNode;
};

const base =
  "inline-flex items-center gap-2 rounded-full px-3.5 py-2 " +
  "text-sm font-medium text-slate-800 " +
  "bg-white/85 backdrop-blur ring-1 ring-white/50 hover:ring-pink-300 " +
  "transition active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-pink-300";

export default function RoundActionButton({ href, onClick, label, icon }: Props) {
  const inner = (
    <>
      {icon ? <span className="shrink-0">{icon}</span> : null}
      <span className="whitespace-nowrap">{label}</span>
    </>
  );

  if (href) {
    return (
      <Link className={base} href={href} prefetch>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" className={base} onClick={onClick}>
      {inner}
    </button>
  );
}
