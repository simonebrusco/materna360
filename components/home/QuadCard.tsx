"use client";
import { useState } from "react";
import type React from "react";

export default function QuadCard({
  title,
  subtitle,
  icon,
  children,
  openExternal,
  onToggle,
}: {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  openExternal?: boolean;            // controlled (from parent)
  onToggle?: (next: boolean) => void; // notify parent to toggle
}) {
  const [openInternal, setOpenInternal] = useState(false);
  const open = typeof openExternal === "boolean" ? openExternal : openInternal;
  const setOpen = (v: boolean) => {
    if (typeof openExternal === "boolean") onToggle?.(v);
    else setOpenInternal(v);
  };

  return (
    <section
      data-ui="quad-card"
      className="
       relative transform-gpu overflow-hidden
       rounded-2xl shadow-[0_6px_24px_rgba(0,0,0,0.08)]
     "
      style={{ WebkitBackfaceVisibility: "hidden" }}
    >
      {/* Blur background layer to provide glass effect without edge seams */}
      <div
        aria-hidden="true"
        className="
          absolute inset-px rounded-2xl
          bg-white/80 backdrop-blur-sm
          pointer-events-none
        "
      />

      {/* Solid inner surface */}
      <div className="relative rounded-2xl bg-white">
        <header className="flex items-center justify-between px-4 py-2.5 select-none cursor-pointer bg-transparent shadow-none">
          <div className="flex items-center gap-3">
            {icon ? <div className="text-[20px]">{icon}</div> : null}
            <div>
              <h3 className="text-[15px] font-medium leading-6 text-slate-800">{title}</h3>
              {subtitle ? (
                <p className="text-[13px] text-[#6B7280]">{subtitle}</p>
              ) : null}
            </div>
          </div>
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="h-9 px-4 rounded-full bg-white border border-black/10 shadow-sm text-[13px] text-[#2F3A56] hover:bg-black/5 transition flex items-center gap-2"
          >
            <svg
              className={`shrink-0 opacity-70 transition-all duration-200 ease-out ${open ? "rotate-90 opacity-100" : "rotate-0"}`}
              width="14"
              height="14"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M7 5l6 5-6 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{open ? "Fechar" : "Abrir"}</span>
          </button>
        </header>

        {/* Smooth expand/collapse with CSS only */}
        <div
          className={`transition-[grid-template-rows,opacity,margin] duration-200 ease-out overflow-hidden
        ${open ? "grid grid-rows-[1fr] mt-4 opacity-100" : "grid grid-rows-[0fr] mt-0 opacity-0"}`}
        >
          <div className="min-h-0 px-4 pb-4">
            {/* Actions grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
