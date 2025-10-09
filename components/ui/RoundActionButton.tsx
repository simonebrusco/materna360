import Link from "next/link";

export default function RoundActionButton({
  href,
  label,
  onClick,
}: {
  href?: string;
  label: string;
  onClick?: () => void;
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-3 py-1.5 " +
    "text-sm font-medium text-slate-800 bg-white/70 backdrop-blur-sm " +
    "shadow-sm hover:bg-white/90 active:scale-[.98] transition " +
    "no-underline select-none";

  if (href) return <Link href={href} className={base}>{label}</Link>;
  return <button type=\"button\" onClick={onClick} className={base}>{label}</button>;
}