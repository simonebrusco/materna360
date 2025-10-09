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
      {/* Local hard reset against stray native controls */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
[data-ui="quad-card"] summary,
[data-ui="quad-card"] select,
[data-ui="quad-card"] option,
[data-ui="quad-card"] hr {
  all: unset !important;
  display: none !important;
}
        `.trim(),
        }}
      />

      {/* HEADER */}
      <button
        id={`${id}-header`}
        type="button"
        onClick={onToggle}
        aria-controls={`${id}-panel`}
        aria-expanded={open}
        className="
          w-full appearance-none bg-transparent border-0 outline-none
          flex items-center justify-between
          px-4 py-3 min-h-[44px]
          text-slate-800 font-semibold text-base leading-none
          select-none cursor-pointer
        "
      >
        <span className="truncate">{title}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180 opacity-100" : "rotate-0 opacity-80"}`}
        />
      </button>

      {/* CONTENT */}
      <div id={`${id}-panel`} hidden={!open} className="px-4 pb-3">
        <div className="flex flex-wrap gap-2">
          {children}
        </div>
      </div>
    </div>
  );
}
