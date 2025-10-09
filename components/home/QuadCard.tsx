"use client";
import * as React from "react";

type QuadCardProps = {
  id: string;
  title: string;
  open: boolean;
  onToggle: (id: string) => void;
  children: React.ReactNode; // chips grid
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
      style={{ WebkitBackfaceVisibility: "hidden" as any }}
    >
      {/* Header – compacto */}
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        onClick={() => onToggle(id)}
        className="
          w-full flex items-center justify-between
          px-4 py-2.5 select-none cursor-pointer
          bg-transparent shadow-none
          focus:outline-none
        "
      >
        <span className="text-[15px] font-medium leading-6 text-slate-800">{title}</span>
        <svg
          viewBox="0 0 20 20"
          className={`
            h-4 w-4 shrink-0 opacity-70 transition-transform duration-200 ease-out
            ${open ? "rotate-90 opacity-100" : "rotate-0"}
          `}
          aria-hidden="true"
        >
          <path fill="currentColor" d="M7.5 5.5L12 10l-4.5 4.5-1.1-1.1L9.8 10 6.4 6.6z" />
        </svg>
      </button>

      {/* Collapsible – auto height */}
      <div
        id={`${id}-panel`}
        className={`
          grid transition-[grid-template-rows,opacity] duration-200 ease-out
          ${open ? "grid-rows-[auto] opacity-100" : "grid-rows-[0fr] opacity-0"}
        `}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="px-4 pb-3 pt-0">
            {/* Chips compactos com flex-wrap */}
            <div className="flex flex-wrap gap-2">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
