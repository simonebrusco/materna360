"use client";
import { useId } from "react";
import { ChevronDown } from "lucide-react";

import type { ReactNode } from "react";
export type QuadCardProps = {
  title: string;
  children: ReactNode;
  open?: boolean;
  onToggle?: () => void;
  className?: string;
};

/**
 * Glass card with SSR-safe grid collapse (no hairlines).
 * No borders, no outlines, no dividers. Header is a real button.
 */
export default function QuadCard({
  title,
  children,
  open = false,
  onToggle,
  className,
}: QuadCardProps) {
  const id = useId();

  const containerCls = [
    "relative rounded-2xl bg-white/90 backdrop-blur-sm shadow-[0_8px_30px_rgba(0,0,0,0.06)]",
    "transition",
    String(className || ""),
  ]
    .filter(Boolean)
    .join(" ");

  const headerCls = [
    "w-full select-none px-4 py-3",
    "flex items-center justify-between",
    "bg-transparent text-slate-900 font-medium leading-none",
  ].join(" ");

  const chevronCls = [
    "shrink-0 transition-transform duration-200",
    open ? "rotate-180 opacity-100" : "opacity-70",
  ].join(" ");

  const panelGridCls = [
    "grid transition-all duration-300 ease-out",
    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
  ].join(" ");

  return (
    <div data-ui="quad-card" className={containerCls} style={{ borderWidth: 0 }}>
      <button
        type="button"
        id={`h-${id}`}
        aria-controls={`p-${id}`}
        aria-expanded={open}
        onClick={onToggle}
        className={headerCls}
      >
        <span>{title}</span>
        <ChevronDown className={chevronCls} size={18} aria-hidden="true" />
      </button>

      <div
        id={`p-${id}`}
        role="region"
        aria-labelledby={`h-${id}`}
        className={panelGridCls}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="px-4 pb-4 pt-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
