"use client";
import Link from "next/link";

type Props = {
  href?: string;
  onClick?: () => void;
  label: string;
  icon?: React.ReactNode;
};

export default function RoundActionButton({ href, onClick, label, icon }: Props) {
  const classes = `
    inline-flex items-center gap-2 rounded-full
    px-3.5 py-2 text-sm font-medium text-slate-800
    bg-white/80 backdrop-blur ring-1 ring-white/40
    hover:ring-pink-300 active:scale-[0.98]
    transition
  `;
  const contents = (
    <>
      {icon ? <span className="shrink-0">{icon}</span> : null}
      <span>{label}</span>
    </>
  );

  if (href) {
    return (
      <Link className={classes} href={href} prefetch>
        {contents}
      </Link>
    );
  }
  return (
    <button type="button" className={classes} onClick={onClick}>
      {contents}
    </button>
  );
}
