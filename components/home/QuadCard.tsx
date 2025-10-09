"use client";
import { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

type QuadCardProps = {
  id: string;
  title: string;
  open: boolean;
  onToggle: () => void;
  children?: ReactNode;
};

export default function QuadCard({ id, title, open, onToggle, children }: QuadCardProps) {
  return (
    <div
      data-ui="quad-card"
      className="
        relative isolate overflow-hidden rounded-2xl
        bg-white/90 bg-clip-padding backdrop-blur-sm
        shadow-[0_6px_24px_rgba(0,0,0,0.08)]
      "
      style={{ WebkitBackfaceVisibility: "hidden" }}
      aria-labelledby={`${id}-header`}
    >
      {/* header */}
      <button
        id={`${id}-header`}
        type="button"
        onClick={onToggle}
        aria-controls={`${id}-panel`}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-4 py-2.5 select-none cursor-pointer"
      >
        <span className="text-slate-800 font-semibold">{title}</span>
        <ChevronDown
          className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180 opacity-100" : "rotate-0 opacity-80"}`}
          size={18}
        />
      </button>

      {/* content (zero height when closed) */}
      <div id={`${id}-panel`} hidden={!open} className="px-4 pb-3">
        <div className="flex flex-wrap gap-2">
          {children}
        </div>
      </div>
    </div>
  );
}
