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
  openExternal?: boolean;
  onToggle?: (next: boolean) => void;
}) {
  const [openInternal, setOpenInternal] = useState(false);
  const open = typeof openExternal === "boolean" ? openExternal : openInternal;
  const setOpen = (v: boolean) => {
    if (typeof openExternal === "boolean") onToggle?.(v);
    else setOpenInternal(v);
  };

  return (
    <section className="rounded-2xl bg-white/90 backdrop-blur-sm shadow-[0_8px_30px_rgba(0,0,0,0.06)] ring-1 ring-black/5 transition p-5">
      <header
        className="flex items-center justify-between px-4 py-3 select-none cursor-pointer"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          {icon ? <div className="text-[20px]">{icon}</div> : null}
          <div>
            <h3 className="text-[18px] font-semibold text-[#2F3A56]">{title}</h3>
            {subtitle ? (
              <p className="text-[13px] text-[#6B7280]">{subtitle}</p>
            ) : null}
          </div>
        </div>
        <button
          type="button"
          aria-expanded={open}
          onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#2F3A56] hover:bg-black/5 transition"
        >
          <span className={`shrink-0 transition-transform ${open ? "rotate-180" : "rotate-0"}`} aria-hidden>⌄</span>
        </button>
      </header>

      <div
        className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out
        ${open ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0 -mt-2"}`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="flex flex-wrap gap-2">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
