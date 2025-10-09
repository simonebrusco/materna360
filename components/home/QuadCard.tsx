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
        <header
          role="button"
          tabIndex={0}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setOpen(!open);
            }
          }}
          className="flex items-center justify-between px-5 py-3 select-none cursor-pointer bg-transparent shadow-none"
        >
          <div className="flex items-center gap-3">
            {icon ? <div className="text-[20px]">{icon}</div> : null}
            <div>
              <h3 className="text-[15px] font-medium leading-6 text-slate-800">{title}</h3>
              {subtitle ? (
                <p className="text-[13px] text-[#6B7280]">{subtitle}</p>
              ) : null}
            </div>
          </div>
          <svg
            className={`shrink-0 opacity-70 transition-transform duration-200 ease-out ${open ? "rotate-90 opacity-100" : "rotate-0"}`}
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
        </header>

        {/* Smooth expand/collapse with CSS only */}
        <div
          className={`transition-[grid-template-rows,opacity,margin] duration-200 ease-out overflow-hidden
        ${open ? "grid grid-rows-[1fr] opacity-100" : "grid grid-rows-[0fr] opacity-0"}`}
        >
          <div className="min-h-0 px-5 pb-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
