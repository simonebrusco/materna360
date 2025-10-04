"use client";
import Link from "next/link";

export default function Btn({
  children,
  variant = "solid",
  href,
  onClick,
  style,
  className = "",
  ...rest
}) {
  const clsBase = `btn ${variant === "ghost" ? "btn-ghost" : variant === "subtle" ? "btn-subtle" : ""}`.trim();
  const cls = `${clsBase} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={cls} style={style} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={cls} style={style} {...rest}>
      {children}
    </button>
  );
}
