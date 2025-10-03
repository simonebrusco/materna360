import * as React from "react";
import { cn } from "@/lib/utils";

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      {...props}
      className={cn(
        "rounded-2xl border border-stone-200 bg-white shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}

export default Card;
