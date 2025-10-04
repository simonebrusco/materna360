"use client";
import Link from "next/link";

export default function Btn({ children, variant = "solid", href, onClick, style, ...rest }) {
  const className = `btn ${variant === "ghost" ? "btn-ghost" : variant === "subtle" ? "btn-subtle" : "btn-primary"}`;

  // Render a Link when href is provided (safe for server pages)
  if (href) {
    return (
      <Link href={href} className={className} style={style} {...rest}>
        {children}
      </Link>
    );
  }

  // Render a button only inside client components
  return (
    <button onClick={onClick} className={className} style={style} {...rest}>
      {children}
    </button>
  );
}
