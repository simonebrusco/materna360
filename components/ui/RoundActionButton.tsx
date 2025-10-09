"use client";

type Props = {
  label: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  badgeCount?: number;
  variant?: "primary" | "secondary";
  ariaLabel?: string;
  className?: string;
};

export default function RoundActionButton({
  label,
  icon,
  href,
  onClick,
  badgeCount,
  variant = "secondary",
  ariaLabel,
  className = "",
}: Props) {
  const circleBase =
    "relative grid place-items-center w-[64px] h-[64px] rounded-full shadow-md transition-colors";
  const circlePrimary = "bg-[#FF005E] text-white border border-transparent";
  const circleSecondary =
    "bg-white text-[#2F3A56] border border-black/10 hover:bg-black/5";
  const labelCls = "text-[12px] leading-[14px] text-[#2F3A56] mt-2";

  const Inner = (
    <div
      className={`group flex flex-col items-center select-none focus:outline-none ${className}`}
    >
      <span
        className={`${circleBase} ${
          variant === "primary" ? circlePrimary : circleSecondary
        }`}
      >
        {badgeCount ? (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#FF005E] text-white text-[10px] leading-[18px] text-center">
            {badgeCount}
          </span>
        ) : null}
        <span className="text-[22px]">{icon}</span>
      </span>
      <span className={labelCls}>{label}</span>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        aria-label={ariaLabel || label}
        className="active:scale-[.98] transition-transform"
      >
        {Inner}
      </a>
    ) as any;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel || label}
      className="active:scale-[.98] transition-transform"
    >
      {Inner}
    </button>
  );
}
