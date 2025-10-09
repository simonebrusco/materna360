"use client";
import React, { useState } from "react";

export default function QuadCard({
  title, subtitle, icon, children, openExternal, onToggle
}: {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  openExternal?: boolean;             // controlled prop
  onToggle?: (next: boolean) => void; // controlled callback
}) {
  const [openInternal, setOpenInternal] = useState(false);
  const open = typeof openExternal === "boolean" ? openExternal : openInternal;
  const setOpen = (v: boolean) => {
    if (typeof openExternal === "boolean") onToggle?.(v);
    else setOpenInternal(v);
  };

  return (
    <section className="rounded-3xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-black/5 p-5">
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {icon ? <div className="text-[20px]">{icon}</div> : null}
          <div>
            <h3 className="text-[18px] font-semibold text-[#2F3A56]">{title}</h3>
            {subtitle ? <p className="text-[13px] text-[#6B7280]">{subtitle}</p> : null}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="h-9 px-4 rounded-full bg-white border border-black/10 shadow-sm text-[13px] text-[#2F3A56] hover:bg-black/5 transition"
        >
          {open ? "Fechar" : "Abrir"}
        </button>
      </header>

      <div
        className={`grid transition-[grid-template-rows,opacity,margin] duration-200 ease-out overflow-hidden
        ${open ? "mt-4 opacity-100 grid-rows-[1fr]" : "mt-0 opacity-0 grid-rows-[0fr]"}`}
      >
        <div className="min-h-0">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
