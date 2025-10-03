import * as React from "react";
import { cn } from "@/lib/utils";

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      {...props}
      className={cn(
        "rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg)] text-[color:var(--text)] shadow-card",
        className
      )}
    >
      {children}
    </div>
  );
}

export default Card;
