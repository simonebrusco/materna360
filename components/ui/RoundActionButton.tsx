import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
  label: string;
  className?: string;
};

export default function RoundActionButton({
  href,
  onClick,
  icon,
  label,
  className,
}: Props) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-3 py-2 " +
    "bg-white/80 backdrop-blur-sm shadow-sm " +
    "text-[13px] font-medium text-slate-800 " +
    "outline-none ring-0 focus-visible:ring-2 focus-visible:ring-pink-200 " +
    "transition active:scale-[0.98]";

  const classes = [base, className || ""].filter(Boolean).join(" ");

  const inner = (
    <>
      {icon ? <span className="grid place-items-center">{icon}</span> : null}
      <span>{label}</span>
    </>
  );

  return href ? (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  ) : (
    <button type="button" onClick={onClick} className={classes}>
      {inner}
    </button>
  );
}
