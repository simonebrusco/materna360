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
  const cls =
    "inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium " +
    "bg-white/70 backdrop-blur-sm shadow-sm hover:bg-white/90 active:scale-[.98] " +
    "transition";

  if (href) {
    return (
      <Link href={href} className={cls}>
        {label}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {label}
    </button>
  );
}
