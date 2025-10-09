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
      className="relative isolate overflow-hidden rounded-2xl bg-white/90 bg-clip-padding
                 backdrop-blur-sm shadow-[0_6px_24px_rgba(0,0,0,0.08)] ring-0 outline-none"
      aria-labelledby={`${id}-header`}
    >
      {/* Local guard to kill any UA/3rd-party hairlines inside this card */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
[data-ui="quad-card"] summary,
[data-ui="quad-card"] details,
[data-ui="quad-card"] fieldset,
[data-ui="quad-card"] legend,
[data-ui="quad-card"] select,
[data-ui="quad-card"] option,
[data-ui="quad-card"] hr { display: none !important; }
[data-ui="quad-card"] * { border-color: transparent !important; }
          `,
        }}
      />

      <button
        id={`${id}-header`}
        type="button"
        onClick={onToggle}
        aria-controls={`${id}-panel`}
        aria-expanded={open}
        className="w-full bg-transparent border-0 outline-none flex items-center justify-between
                   px-5 py-4 min-h-[44px] text-slate-900 font-semibold text-base md:text-lg
                   leading-none select-none cursor-pointer"
      >
        <span className="truncate">{title}</span>
        <ChevronDown size={20} className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`} />
      </button>

      {/* IMPORTANT: content is hidden when closed to avoid any 1px artifacts */}
      <div id={`${id}-panel`} hidden={!open} className="px-5 pb-4">
        {/* flex + gap ensure chips never collapse into a single text run */}
        <div className="flex flex-wrap items-center gap-2">
          {children}
        </div>
      </div>
    </div>
  );
}
