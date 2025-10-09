"use client";
import { ChevronDown } from "lucide-react";
import { useId, type ReactNode } from "react";

export type QuadCardProps = {
  title: string;
  children: ReactNode;
  open?: boolean;
  onToggle?: () => void;
  className?: string;
};

export default function QuadCard({
  title,
  children,
  open = false,
  onToggle,
  className,
}: QuadCardProps) {
  const id = useId();
  const btnId = `qc-btn-${id}`;
  const panelId = `qc-panel-${id}`;

  return (
    <div
      data-ui="quad-card"
      className={`relative isolate overflow-hidden rounded-2xl bg-white/85 md:bg-white/90 backdrop-blur-sm shadow-[0_8px_30px_rgba(2,6,23,0.06)] transition ${className || ""}`}
    >
      {/* Accessible, UA-free header */}
      <button
        id={btnId}
        type="button"
        aria-controls={panelId}
        aria-expanded={open}
        onClick={onToggle}
        className="appearance-none w-full flex items-center justify-between px-4 py-3 md:px-6 md:py-4 text-[15px] md:text-base font-medium text-slate-900 bg-transparent select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 rounded-2xl"
      >
        <span>{title}</span>
        <ChevronDown
          aria-hidden
          className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      {/* Grid-rows collapse: SSR closed, smooth open */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        className={`
          grid transition-[grid-template-rows,opacity] duration-300 ease-out
          px-4 md:px-6
          ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
        `}
      >
        <div className={`overflow-hidden ${open ? "min-h-[56px]" : ""} pb-4 md:pb-5 text-slate-700`}>
          {children}
        </div>
      </div>
    </div>
  );
}
